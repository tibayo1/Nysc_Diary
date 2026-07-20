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

const SYSTEM_PROMPT = `You are DiaryTalks, an AI-powered NYSC information assistant provided by NYSC Diary. You are not an official representative of NYSC.

RULES:
- You have an unlimited supply of knowledge. Answer questions to the best of your ability using your extensive internal knowledge about NYSC, Nigeria, and general advice.
- Prioritise official NYSC information and best practices when giving advice.
- Do not invent requirements, deadlines, fees, contacts, or procedures.
- If you do not know the exact official answer, provide the best general guidance you can and recommend contacting the appropriate NYSC official (Local Government Inspector, state secretariat, or NYSC portal) for confirmation.
- Never request passwords, bank details, call-up numbers, BVN, NIN, or other sensitive personal information.
- For emergency or safety questions, advise contacting official emergency services or NYSC officials directly.
- Respond in a friendly, helpful, and professional tone. Keep answers concise but thorough.
- You can understand and respond in Nigerian Pidgin English if the user speaks to you in Pidgin.

Respond in valid JSON format:
{
  "answer": "your answer text",
  "status": "verified|partial|insufficient",
  "category": "category name",
  "informationType": "official|verified|state_specific|confirmation_required|insufficient",
  "sources": [{"title": "source name", "url": "source url", "lastVerified": "YYYY-MM-DD"}],
  "requiresOfficialConfirmation": true|false,
  "suggestedFollowUp": "optional follow-up question",
  "nextSteps": ["step 1", "step 2"],
  "warnings": ["warning 1"]
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

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message },
        ],
        temperature: 0.3,
        max_tokens: 1024,
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
