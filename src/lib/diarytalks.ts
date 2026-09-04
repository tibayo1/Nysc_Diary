import { knowledgeBase } from '../data/diarytalks-kb';
import type { ChatResponse, KnowledgeEntry } from '../types/diarytalks';

// ─── Pidgin / Informal Normalization ─────────────────────────────────────────
const pidginMap: Record<string, string> = {
  'wetin': 'what',
  'dey': 'is',
  'go': 'will',
  'fit': 'can',
  'wan': 'want',
  'no': 'not',
  'dat': 'that',
  'dis': 'this',
  'dem': 'them',
  'naim': 'that is',
  'abi': 'or',
  'shey': 'is it that',
  'sef': 'even',
  'na': 'is',
  'wey': 'that',
  'how': 'how',
  'abeg': 'please',
  'comot': 'leave',
  'wahala': 'problem',
  'kpai': 'die',
  'gist': 'tell',
  'chop': 'eat',
  'beg': 'please',
  'e': 'it',
  'im': 'his',
};

function normalize(text: string): string {
  let normalized = text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Replace pidgin words
  const words = normalized.split(' ');
  const mapped = words.map((w) => pidginMap[w] || w);
  normalized = mapped.join(' ');

  return normalized;
}

// ─── Text Similarity ─────────────────────────────────────────────────────────
function tokenize(text: string): Set<string> {
  const stopWords = new Set([
    'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'can', 'shall', 'to', 'of', 'in', 'for',
    'on', 'with', 'at', 'by', 'from', 'it', 'its', 'i', 'me', 'my',
    'we', 'our', 'you', 'your', 'he', 'she', 'they', 'them', 'their',
    'this', 'that', 'these', 'those', 'am', 'if', 'or', 'and', 'but',
    'not', 'so', 'up', 'out', 'about', 'just', 'also', 'very',
  ]);

  return new Set(
    normalize(text)
      .split(' ')
      .filter((w) => w.length > 1 && !stopWords.has(w))
  );
}

function jaccardSimilarity(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 0;
  const intersection = new Set([...a].filter((x) => b.has(x)));
  const union = new Set([...a, ...b]);
  return intersection.size / union.size;
}

// Check if query keywords appear as substrings in target text
function keywordOverlap(query: string, target: string): number {
  const queryWords = normalize(query).split(' ').filter((w) => w.length > 2);
  const targetNorm = normalize(target);
  if (queryWords.length === 0) return 0;
  const matches = queryWords.filter((w) => targetNorm.includes(w));
  return matches.length / queryWords.length;
}

// ─── Entry Scoring ───────────────────────────────────────────────────────────
interface ScoredEntry {
  entry: KnowledgeEntry;
  score: number;
}

function scoreEntry(query: string, entry: KnowledgeEntry): number {
  const queryTokens = tokenize(query);

  // Score against canonical question
  const canonicalScore = jaccardSimilarity(queryTokens, tokenize(entry.canonicalQuestion));
  const canonicalKeyword = keywordOverlap(query, entry.canonicalQuestion);

  // Score against alternatives
  let bestAltScore = 0;
  let bestAltKeyword = 0;
  for (const alt of entry.alternativeQuestions) {
    const altScore = jaccardSimilarity(queryTokens, tokenize(alt));
    const altKeyword = keywordOverlap(query, alt);
    bestAltScore = Math.max(bestAltScore, altScore);
    bestAltKeyword = Math.max(bestAltKeyword, altKeyword);
  }

  // Score against category
  const categoryScore = keywordOverlap(query, entry.category);

  // Weighted combination
  const score =
    Math.max(canonicalScore, bestAltScore) * 0.5 +
    Math.max(canonicalKeyword, bestAltKeyword) * 0.35 +
    categoryScore * 0.15;

  return score;
}

// ─── Public API ──────────────────────────────────────────────────────────────

const MATCH_THRESHOLD = 0.28; // Raised: must be a confident match

// Core NYSC topic keywords — if none present, question is off-topic
const NYSC_KEYWORDS = [
  'nysc', 'corps', 'corper', 'camp', 'ppa', 'cds', 'lga', 'lgi',
  'call.?up', 'mobilization', 'mobilisation', 'posting', 'redeployment',
  'relocation', 'clearance', 'allowance', 'allawee', 'senate.?list',
  'orientation', 'service.?year', 'pass.?out', 'exemption', 'exclusion',
  'primary.?place', 'assignment', 'batch', 'stream', 'portal', 'pcm',
  'pregnant', 'nursing', 'married', 'leave', 'travel.?pass',
  'food.?allowance', 'nhis', 'hazard', 'discharge', 'certificate',
];

function isNyscRelated(query: string): boolean {
  const lower = query.toLowerCase();
  return NYSC_KEYWORDS.some((kw) => new RegExp(kw).test(lower));
}

export function findBestMatch(query: string): ScoredEntry | null {
  if (!query || query.trim().length < 2) return null;

  const scored: ScoredEntry[] = knowledgeBase.map((entry) => ({
    entry,
    score: scoreEntry(query, entry),
  }));

  scored.sort((a, b) => b.score - a.score);

  const best = scored[0];
  if (!best || best.score < MATCH_THRESHOLD) return null;

  return best;
}

export function buildResponse(query: string): ChatResponse {
  // First check: is this even an NYSC-related question?
  if (!isNyscRelated(query)) {
    return {
      answer:
        'I\'m DiaryTalks, an assistant specifically for NYSC-related questions. ' +
        'I can\'t help with that particular question, but I\'m here to help with anything about your NYSC service year!\n\n' +
        'Try asking about: **registration**, **camp**, **call-up letters**, **PPA**, **relocation**, **allowances**, **CDS**, or **clearance**.',
      status: 'insufficient',
      category: 'General',
      informationType: 'insufficient',
      sources: [],
      requiresOfficialConfirmation: false,
      suggestedFollowUp: 'What aspect of your NYSC service year can I help you with?',
    };
  }

  const match = findBestMatch(query);

  if (!match) {
    return {
      answer:
        'I don\'t have enough verified information to answer that specific question reliably. ' +
        'I recommend contacting your **Local Government Inspector (LGI)**, your **NYSC state secretariat**, ' +
        'or visiting the official NYSC website at **nysc.gov.ng** for accurate guidance.',
      status: 'insufficient',
      category: 'General',
      informationType: 'insufficient',
      sources: [],
      requiresOfficialConfirmation: true,
      suggestedFollowUp:
        'Would you like to ask about a different NYSC topic? I can help with camp requirements, PPA, relocation, clearance, exemption, and more.',
    };
  }

  const entry = match.entry;

  return {
    answer: entry.answer,
    status: match.score > 0.4 ? 'verified' : 'partial',
    category: entry.category,
    informationType: entry.sourceType === 'official' ? 'official' : 'verified',
    sources: [
      {
        title: entry.sourceTitle,
        url: entry.sourceUrl,
        lastVerified: entry.lastVerified,
      },
    ],
    requiresOfficialConfirmation: entry.requiresOfficialConfirmation,
    suggestedFollowUp: entry.nextSteps?.[0]
      ? `Would you like to know more about: ${entry.nextSteps[0]}?`
      : undefined,
    nextSteps: entry.nextSteps,
    warnings: entry.warnings,
  };
}

// ─── Sensitive Information Detection ─────────────────────────────────────────
//
// Design goals:
//   • Do NOT trigger on the mere mention of "BVN", "NIN", "password", etc.
//   • Trigger (and redact) only when the user appears to provide an actual value.
//   • Redact the sensitive value from the text before sending to AI so the
//     surrounding NYSC question can still be answered.
//   • NYSC call-up numbers follow the pattern: NY/YYYY/NN/NNNNN or similar.
//
// Each rule has:
//   pattern  – regex to find the sensitive disclosure
//   label    – human-readable name used in the warning
//   redact   – replacement text (keeps the sentence readable for the AI)

interface SensitiveRule {
  pattern: RegExp;
  label: string;
  redact: string;
}

const SENSITIVE_RULES: SensitiveRule[] = [
  // ── BVN: 11-digit number after explicit BVN keyword + linking word ──────────
  // Matches: "my BVN is 12345678901", "BVN: 12345678901", "bvn=12345678901"
  {
    pattern: /\bBVN\b\s*(?:is|:|=|number\s*(?:is|:)|#)?\s*(\d{11})\b/i,
    label: 'BVN',
    redact: '[BVN redacted]',
  },
  // ── NIN: 11-digit number after explicit NIN keyword ──────────────────────────
  {
    pattern: /\bNIN\b\s*(?:is|:|=|number\s*(?:is|:)|#)?\s*(\d{11})\b/i,
    label: 'NIN',
    redact: '[NIN redacted]',
  },
  // ── NYSC call-up number pattern  NY/YYYY/NN/NNNNN  (e.g. NY/2024/08/32981) ─
  {
    pattern: /\bNY\/\d{4}\/\d{2}\/\d{4,6}\b/i,
    label: 'call-up number',
    redact: '[call-up number redacted]',
  },
  // ── Password disclosure: "my password is X", "password: X", "password=X" ────
  // Only triggers when the password value is present after the keyword.
  {
    pattern: /\bpassword\s*(?:is|:|=)\s*\S+/i,
    label: 'password',
    redact: 'password [value redacted]',
  },
  // ── Bank account number: 10-digit number after explicit account context ──────
  {
    pattern: /\b(?:account\s*(?:number|no\.?)\s*(?:is|:|=)?\s*)(\d{10})\b/i,
    label: 'bank account number',
    redact: '[account number redacted]',
  },
  // ── 16-digit card number (groups of 4 separated by space/dash or run together)
  {
    pattern: /\b(\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4})\b/,
    label: 'card number',
    redact: '[card number redacted]',
  },
];

export interface SensitiveCheckResult {
  /** True when at least one sensitive value was detected */
  detected: boolean;
  /** Message with sensitive values replaced by [X redacted] placeholders */
  redactedText: string;
  /** Human-readable labels of what was detected, e.g. ["BVN", "password"] */
  detectedLabels: string[];
}

/**
 * Inspect `text` for actual sensitive-value disclosures (not mere keyword mentions).
 * Returns the detection result and a redacted copy of the text safe to send to the AI.
 */
export function checkSensitiveInfo(text: string): SensitiveCheckResult {
  let redactedText = text;
  const detectedLabels: string[] = [];

  for (const rule of SENSITIVE_RULES) {
    // Use a global copy of the pattern so we replace ALL occurrences
    const globalPattern = new RegExp(rule.pattern.source, rule.pattern.flags.includes('g') ? rule.pattern.flags : rule.pattern.flags + 'g');
    if (globalPattern.test(text)) {
      detectedLabels.push(rule.label);
      // Reset lastIndex after the test
      globalPattern.lastIndex = 0;
      redactedText = redactedText.replace(globalPattern, rule.redact);
    }
  }

  return {
    detected: detectedLabels.length > 0,
    redactedText,
    detectedLabels,
  };
}

/**
 * @deprecated Use checkSensitiveInfo() for redaction-based handling.
 * Kept for backward-compat with any callers that only need a boolean.
 */
export function containsSensitiveInfo(text: string): boolean {
  return checkSensitiveInfo(text).detected;
}

// ─── Input Validation ────────────────────────────────────────────────────────
export function validateMessage(message: string): { valid: boolean; error?: string } {
  if (!message || message.trim().length === 0) {
    return { valid: false, error: 'Please enter a question.' };
  }
  if (message.trim().length < 3) {
    return { valid: false, error: 'Your question is too short. Please provide more detail.' };
  }
  if (message.length > 1000) {
    return { valid: false, error: 'Your message is too long. Please keep it under 1000 characters.' };
  }
  // NOTE: We no longer block sensitive messages here.
  // checkSensitiveInfo() is called in the send pipeline and redacts values before
  // forwarding to the AI, while displaying a warning in the UI.
  return { valid: true };
}

// ─── Tests (run via: npx ts-node src/lib/diarytalks.ts) ──────────────────────
// Uncomment to run manually:
/*
function runSensitiveTests() {
  const cases: Array<{ input: string; expectDetected: boolean; label: string }> = [
    // False positives — must NOT be detected
    { input: 'Can a different signature on my BVN affect me in camp?', expectDetected: false, label: 'BVN mention (no value)' },
    { input: 'Do I need my BVN for camp?', expectDetected: false, label: 'BVN question' },
    { input: 'My NIN details are different from my NYSC details.', expectDetected: false, label: 'NIN mention (no value)' },
    { input: 'How do I find my call-up number?', expectDetected: false, label: 'call-up question' },
    { input: 'I forgot my NYSC portal password.', expectDetected: false, label: 'password mention (no value)' },
    { input: 'What is the BVN policy for corps members?', expectDetected: false, label: 'BVN policy question' },
    { input: 'My PIN is needed for what?', expectDetected: false, label: 'PIN mention (no value)' },

    // True positives — MUST be detected and redacted
    { input: 'My BVN is 12345678901', expectDetected: true, label: 'BVN with value' },
    { input: 'My NIN: 12345678901', expectDetected: true, label: 'NIN with value (colon)' },
    { input: 'My password is examplePassword123', expectDetected: true, label: 'password disclosure' },
    { input: 'Call-up number NY/2024/08/32981', expectDetected: true, label: 'NYSC call-up number' },
    { input: 'bvn=12345678901', expectDetected: true, label: 'BVN equals value' },
    { input: 'My account number is 1234567890', expectDetected: true, label: 'account number' },
    { input: 'Card: 1234 5678 9012 3456', expectDetected: true, label: 'card number' },
  ];

  let passed = 0;
  for (const { input, expectDetected, label } of cases) {
    const result = checkSensitiveInfo(input);
    const ok = result.detected === expectDetected;
    console.log(`${ok ? '✅' : '❌'} [${label}]`);
    if (!ok) console.log(`   Input: "${input}"\n   Expected detected=${expectDetected}, got ${result.detected}`);
    if (result.detected) console.log(`   Redacted: "${result.redactedText}"`);
    if (ok) passed++;
  }
  console.log(`\n${passed}/${cases.length} tests passed`);
}
runSensitiveTests();
*/
