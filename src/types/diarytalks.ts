// ─── DiaryTalks Type Definitions ─────────────────────────────────────────────

export interface KnowledgeEntry {
  id: string;
  canonicalQuestion: string;
  alternativeQuestions: string[];
  category: string;
  answer: string;
  nextSteps?: string[];
  warnings?: string[];
  sourceType: 'official' | 'verified' | 'state_specific' | 'general';
  sourceTitle: string;
  sourceUrl: string;
  lastVerified: string;
  requiresOfficialConfirmation: boolean;
}

export type InformationType =
  | 'official'
  | 'verified'
  | 'state_specific'
  | 'confirmation_required'
  | 'insufficient';

export interface ChatSource {
  title: string;
  url: string;
  lastVerified: string;
}

export interface ChatResponse {
  answer: string;
  status: 'verified' | 'partial' | 'insufficient';
  category: string;
  informationType: InformationType;
  sources: ChatSource[];
  requiresOfficialConfirmation: boolean;
  suggestedFollowUp?: string;
  nextSteps?: string[];
  warnings?: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  response?: ChatResponse;
  timestamp: number;
  feedbackGiven?: 'helpful' | 'not_helpful' | 'reported';
}

export interface DiaryTalksConversation {
  id: string;
  messages: ChatMessage[];
  createdAt: number;
}

export interface FeedbackPayload {
  conversationId: string;
  answerId: string;
  rating: 'helpful' | 'not_helpful' | 'reported';
  reason?: string;
  createdAt: string;
}

export interface UnansweredQuestion {
  question: string;
  predictedCategory: string;
  createdAt: string;
  reviewStatus: 'pending' | 'resolved' | 'dismissed';
}

export interface AdminStats {
  totalQuestions: number;
  helpfulCount: number;
  notHelpfulCount: number;
  reportedCount: number;
  unansweredCount: number;
  topCategories: { category: string; count: number }[];
}
