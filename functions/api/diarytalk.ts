// POST /api/diarytalk
// Server-side endpoint for DiaryTalks — keeps API keys secret.
// Falls back to local matching when OpenAI is not configured.

interface Env {
  OPENAI_API_KEY?: string;
  OPENAI_MODEL?: string;
}

interface RequestBody {
  message: string;
  conversationId?: string;
  state?: string;
  languagePreference?: string;
  history?: { role: 'user' | 'assistant'; content: string }[];
}

// Rate limiting via simple in-memory map (per-isolate, resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20; // requests per window
const RATE_WINDOW_MS = 60_000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

// Sensitive info patterns
const sensitivePatterns = [
  /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/,
  /\b\d{10}\b/,
  /password/i,
  /\bpin\b/i,
  /\bbvn\b/i,
  /\bnin\b/i,
  /bank\s*(account|details|number)/i,
  /call[\s-]?up[\s-]?number/i,
  /portal[\s-]?password/i,
  /login[\s-]?(code|details|credentials)/i,
];

function containsSensitive(text: string): boolean {
  return sensitivePatterns.some((p) => p.test(text));
}

const SYSTEM_PROMPT = `You are DiaryTalks, a knowledgeable and friendly AI assistant for NYSC Diary (nyscdiary.com). You specialise exclusively in helping Nigerian corps members, prospective corps members, and their families navigate the National Youth Service Corps (NYSC) programme.

━━━━━━━━━━━━━━━━━━━━━━━━
PERSONALITY & TONE
━━━━━━━━━━━━━━━━━━━━━━━━
- Warm, friendly, and encouraging — like an older corps member giving advice
- Speak plainly and practically, not like a government pamphlet
- You can understand and respond in Nigerian Pidgin English if the user writes in Pidgin
- Keep answers focused and actionable. Use bullet points for lists. Bold key terms.
- For off-topic questions (not related to NYSC or life in Nigeria), politely redirect.

━━━━━━━━━━━━━━━━━━━━━━━━
CORE NYSC KNOWLEDGE BASE
━━━━━━━━━━━━━━━━━━━━━━━━

**PROGRAMME OVERVIEW**
- NYSC is a one-year mandatory service for Nigerians who graduated under age 30 from Nigerian or foreign universities
- Service year runs: 3 weeks orientation camp + ~11 months active service
- Batches: Batch A (Stream 1 & 2), Batch B (Stream 1 & 2), Batch C — each year
- Age exemption: Graduates aged 30+ at time of graduation may apply for exemption

**REGISTRATION & MOBILISATION**
- Registration is done on the NYSC portal: portal.nysc.org.ng
- Required documents for online registration: degree certificate/statement of result, NYSC online registration form, valid ID, passport photo (white background)
- Senate list verification is mandatory — name must appear exactly as registered
- Call-up letters are published on the portal and can be printed there
- Corps members are mobilised based on institution batch and NYSC schedule
- Posting is random — NYSC posts you to any state (excluding your state of origin and institution state, usually)

**ORIENTATION CAMP**
- Duration: 21 days (3 weeks)
- What to bring: Printed call-up letter (3 copies), original + photocopies of degree certificate, NYSC registration printout, valid ID, 8 recent passport photos (white background), NHIS evidence, white shorts and T-shirts (for drills), comfortable footwear, toiletries, padlock, rechargeable lamp, insect repellent, basic medications, ATM card/sufficient cash
- Camp activities: Drills, lectures, Man O War, CDS group registration, PPA posting
- Phones are generally allowed but may be restricted during drills
- Medical facilities are available on camp; declare any medical condition early
- Camp is usually held in a government facility in the posted state

**PRIMARY PLACE OF ASSIGNMENT (PPA)**
- PPA is where corps members serve for the bulk of the service year
- Posted by NYSC — can be a school, government ministry, NGO, or private company
- PPA rejection: If PPA is unsuitable, visit the NYSC state secretariat with a rejection letter from the employer or a valid reason. You can be reposted
- Self-placement is not officially allowed but corps members can source their own PPA and get it approved by the NYSC Zonal/State office
- Change of PPA is possible but requires proper documentation and approval

**RELOCATION & REDEPLOYMENT**
- Relocation (within a state): Possible for health, marriage, or security reasons
- Redeployment (to another state): Allowed for: marriage (to spouse's state), medical grounds with certified documents, security threats, pregnancy/nursing
- Process: Write a formal letter to the NYSC State Coordinator with supporting documents, submit at the state secretariat
- Redeployment is not guaranteed — it is at NYSC's discretion
- Redeployment is typically processed within 1–4 weeks

**MONTHLY CLEARANCE**
- Corps members must do monthly clearance (biometric verification) at their LGA secretariat
- Clearance is required to earn the monthly allowance (allawee)
- Missing clearance can lead to withheld allowance and delayed discharge
- Clearance is usually done in the first or second week of each month

**ALLOWANCES**
- Federal government allawee: ₦33,000/month (subject to government review)
- State government may add a top-up allowance (varies by state — Lagos, Rivers, and a few others are known for higher top-ups)
- Allowance is paid into the corps member's dedicated NYSC bank account
- Allowance may be delayed if clearance is missed or documentation is incomplete
- Food/feeding allowance is provided during orientation camp

**CDS (COMMUNITY DEVELOPMENT SERVICE)**
- Corps members must register with a CDS group during orientation camp
- CDS meetings are typically held weekly (usually Thursdays)
- CDS groups undertake community development projects
- Attendance is compulsory — absences must be formally excused
- Corps members can also start independent/personal CDS projects with NYSC approval

**LEAVE & TRAVEL PASS**
- Corps members can apply for annual leave (usually 2 weeks)
- Travel passes are required to leave the state of service
- Apply for travel pass at the LGA secretariat before travelling
- Travelling without a travel pass can lead to sanctions

**MARRIED CORPS MEMBERS**
- Married corps members can apply for redeployment to their spouse's state
- Required documents: marriage certificate, spouse's employment/residence proof
- Submit application at NYSC state secretariat

**PREGNANT & NURSING MOTHERS**
- Pregnant corps members can defer orientation camp or get light posting
- Nursing mothers (with infants under 12 months) may apply for relocation to their home state
- Medical documentation is required in both cases

**EXEMPTION & EXCLUSION**
- Exemption: For those who graduated at age 30 or above, or have a qualifying medical condition
- Exclusion: For those who are not qualified to serve (e.g., non-citizens, holders of HND from polytechnics if the institution isn't mobilised)
- Apply via the NYSC portal with supporting documents

**DISCHARGE CERTIFICATE**
- Awarded upon successful completion of the service year
- Requirements: complete 365 days of service, pass all monthly clearances, complete CDS obligations, no outstanding queries or sanctions
- Do NOT miss clearance months — each missed month can extend service

**NYSC PORTAL & CONTACTS**
- Portal: portal.nysc.org.ng
- Official NYSC website: nysc.gov.ng
- For issues: contact your Local Government Inspector (LGI) at the LGA secretariat, or the NYSC State Coordinator at the state secretariat

━━━━━━━━━━━━━━━━━━━━━━━━
RESPONSE RULES
━━━━━━━━━━━━━━━━━━━━━━━━
- Always give practical, actionable answers based on the knowledge above and your broader knowledge of Nigeria and NYSC
- If something varies by state or batch, say so clearly
- Never invent specific deadlines, fees, or contact numbers — direct users to the NYSC portal or secretariat for those
- Never ask for or encourage sharing of passwords, BVN, NIN, call-up numbers, or bank details
- For medical or legal emergencies, direct to appropriate authorities immediately

Respond in valid JSON:
{
  "answer": "your full answer here (use \\n for line breaks, **text** for bold)",
  "status": "verified|partial|insufficient",
  "category": "Registration|Camp|PPA|Relocation|Clearance|Allowances|CDS|Leave|Marriage|Exemption|Discharge|General",
  "informationType": "official|verified|state_specific|confirmation_required|insufficient",
  "sources": [{"title": "source name", "url": "url if applicable", "lastVerified": "YYYY-MM-DD"}],
  "requiresOfficialConfirmation": true|false,
  "suggestedFollowUp": "a useful follow-up question the user might want to ask next",
  "nextSteps": ["actionable step 1", "actionable step 2"],
  "warnings": ["any important cautions"]
}`;


export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  // Rate limiting
  const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (isRateLimited(clientIP)) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please try again in a minute.' }),
      { status: 429, headers: corsHeaders }
    );
  }

  try {
    const body: RequestBody = await request.json();
    const message = (body.message || '').trim();

    // Validate input
    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Please enter a question.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (message.length > 1000) {
      return new Response(
        JSON.stringify({ error: 'Message too long. Please keep it under 1000 characters.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (containsSensitive(message)) {
      return new Response(
        JSON.stringify({
          error: 'Please do not share sensitive personal information such as passwords, bank details, or identification numbers.',
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    // If OpenAI key is not set, return a signal for the client to use local matching
    if (!env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ fallback: true, reason: 'AI service not configured' }),
        { status: 503, headers: corsHeaders }
      );
    }

    // Call OpenAI
    const model = env.OPENAI_MODEL || 'gpt-4o-mini';
    const history = (body.history || []).slice(-8); // last 8 turns for context

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.map((h) => ({ role: h.role, content: h.content })),
      { role: 'user', content: message },
    ];

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.4,
        max_tokens: 1200,
        response_format: { type: 'json_object' },
      }),
    });

    if (!openaiResponse.ok) {
      console.error('OpenAI error:', openaiResponse.status, await openaiResponse.text());
      return new Response(
        JSON.stringify({ fallback: true, reason: 'AI service temporarily unavailable' }),
        { status: 503, headers: corsHeaders }
      );
    }

    const openaiData = await openaiResponse.json() as {
      choices: { message: { content: string } }[];
    };
    const content = openaiData.choices?.[0]?.message?.content;

    if (!content) {
      return new Response(
        JSON.stringify({ fallback: true, reason: 'Empty AI response' }),
        { status: 503, headers: corsHeaders }
      );
    }

    // Parse and return the structured response
    const parsed = JSON.parse(content);
    return new Response(JSON.stringify(parsed), { status: 200, headers: corsHeaders });

  } catch (err) {
    console.error('DiaryTalks API error:', err);
    return new Response(
      JSON.stringify({
        error: 'Something went wrong. Please try again.',
        fallback: true,
      }),
      { status: 500, headers: corsHeaders }
    );
  }
};

// Handle CORS preflight
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
