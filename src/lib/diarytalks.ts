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
const sensitivePatterns = [
  /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/,         // card numbers
  /\b\d{10}\b/,                                            // 10-digit numbers (account/phone)
  /password/i,
  /\bpin\b/i,
  /\bbvn\b/i,
  /\bnin\b/i,
  /bank\s*(account|details|number)/i,
  /call[\s-]?up[\s-]?number/i,
  /portal[\s-]?password/i,
  /login[\s-]?(code|details|credentials)/i,
];

export function containsSensitiveInfo(text: string): boolean {
  return sensitivePatterns.some((pattern) => pattern.test(text));
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
  if (containsSensitiveInfo(message)) {
    return {
      valid: false,
      error:
        '⚠️ It looks like you may be sharing sensitive information. ' +
        'Please do not share passwords, bank details, call-up numbers, BVN, NIN, or other personal credentials.',
    };
  }
  return { valid: true };
}
