import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Plus, Loader2, AlertCircle, ShieldAlert, ArrowLeft } from 'lucide-react';
import { Reveal } from '../hooks/useScrollReveal';
import DiaryTalksIcon from '../components/diarytalks/DiaryTalksIcon';
import ChatMessageComp from '../components/diarytalks/ChatMessage';
import SuggestedQuestions from '../components/diarytalks/SuggestedQuestions';
import { buildResponse, validateMessage } from '../lib/diarytalks';
import type { ChatMessage, DiaryTalksConversation } from '../types/diarytalks';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

interface DiaryTalksProps {
  onNavigate?: (page: string) => void;
}

export default function DiaryTalks({ onNavigate }: DiaryTalksProps) {
  const [conversations, setConversations] = useState<DiaryTalksConversation[]>([
    { id: generateId(), messages: [], createdAt: Date.now() },
  ]);
  const [activeConvIndex, setActiveConvIndex] = useState(0);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const activeConv = conversations[activeConvIndex];
  const messages = activeConv?.messages || [];

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages.length, scrollToBottom]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);

  const handleSend = async (questionText?: string) => {
    const text = (questionText || input).trim();
    if (!text || loading) return;

    // Validate
    const validation = validateMessage(text);
    if (!validation.valid) {
      setError(validation.error || 'Invalid input');
      return;
    }

    setError('');
    setInput('');
    setLoading(true);

    // Add user message immediately
    const userMsg: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    setConversations((prev) => {
      const updated = [...prev];
      updated[activeConvIndex] = {
        ...updated[activeConvIndex],
        messages: [...updated[activeConvIndex].messages, userMsg],
      };
      return updated;
    });

    try {
      // Brief delay for natural feel
      await new Promise((resolve) => setTimeout(resolve, 600 + Math.random() * 400));

      // Try server API first, fall back to local matching
      let response;
      let usedLocalFallback = false;
      try {
        const res = await fetch('/api/diarytalk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            conversationId: activeConv.id,
            history: activeConv.messages.slice(-6).map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.fallback) throw new Error('Server fallback');
          response = data;
        } else {
          throw new Error('API unavailable');
        }
      } catch {
        response = buildResponse(text);
        usedLocalFallback = true;
      }

      // Safety: make sure answer is always a string
      if (!response || !response.answer) {
        response = {
          answer: 'Something went wrong getting an answer. Please try again.',
          status: 'insufficient',
          category: 'General',
          informationType: 'insufficient',
          sources: [],
          requiresOfficialConfirmation: false,
        };
        usedLocalFallback = true;
      }

      // If local matching has no answer, show a helpful fallback message
      if (usedLocalFallback && response.status === 'insufficient') {
        response = {
          ...response,
          answer:
            'The AI assistant needs an OpenAI API key to answer this question fully. ' +
            'Once it\'s configured, I\'ll be able to answer anything NYSC-related.\n\n' +
            'For now I can help with: **camp requirements**, **call-up letters**, **PPA**, ' +
            '**relocation**, **monthly clearance**, **allowances**, or **exemption**.',
        };
      }

      const assistantMsg: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: response.answer,
        response,
        timestamp: Date.now(),
      };

      setConversations((prev) => {
        const updated = [...prev];
        updated[activeConvIndex] = {
          ...updated[activeConvIndex],
          messages: [...updated[activeConvIndex].messages, assistantMsg],
        };
        return updated;
      });

      // Log unanswered questions anonymously
      if (response.status === 'insufficient') {
        try {
          await addDoc(collection(db, 'diarytalks_unanswered'), {
            question: text,
            predictedCategory: response.category || 'Unknown',
            createdAt: serverTimestamp(),
            reviewStatus: 'pending',
          });
        } catch {
          // Silently fail
        }
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      // Always unlock the input — this runs no matter what
      setLoading(false);
      // Re-focus so user can type immediately
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleFeedback = async (messageId: string, rating: 'helpful' | 'not_helpful' | 'reported') => {
    // Update UI immediately
    setConversations((prev) => {
      const updated = [...prev];
      const conv = { ...updated[activeConvIndex] };
      conv.messages = conv.messages.map((m) =>
        m.id === messageId ? { ...m, feedbackGiven: rating } : m
      );
      updated[activeConvIndex] = conv;
      return updated;
    });

    // Store feedback anonymously
    try {
      await addDoc(collection(db, 'diarytalks_feedback'), {
        conversationId: activeConv.id,
        answerId: messageId,
        rating,
        createdAt: serverTimestamp(),
      });
    } catch {
      // Silently fail
    }
  };

  const startNewConversation = () => {
    const newConv: DiaryTalksConversation = {
      id: generateId(),
      messages: [],
      createdAt: Date.now(),
    };
    setConversations((prev) => [...prev, newConv]);
    setActiveConvIndex(conversations.length);
    setInput('');
    setError('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top nav bar */}
      <div className="bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto flex items-center justify-between h-12">
          <button
            onClick={() => onNavigate?.('home')}
            className="inline-flex items-center gap-1.5 text-sm font-display font-medium text-gray-600 hover:text-nysc-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            NYSC Diary
          </button>
          <button
            onClick={() => onNavigate?.('admin-diarytalks')}
            className="text-xs font-body text-gray-400 hover:text-gray-600 transition-colors"
          >
            Admin
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-nysc-700 via-nysc-600 to-nysc-800 text-white">
        <div className="deco-circle w-72 h-72 bg-accent-500/10 -top-20 right-10 animate-float-slow" aria-hidden="true" />
        <div className="deco-circle w-40 h-40 bg-white/5 bottom-0 -left-10 animate-float" aria-hidden="true" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative z-10">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <DiaryTalksIcon size={52} />
              <div>
                <h1 className="text-3xl sm:text-4xl font-display font-bold">DiaryTalks</h1>
                <p className="text-nysc-200 text-sm font-display font-medium">AI-Powered NYSC Assistant</p>
              </div>
            </div>
            <p className="text-nysc-100 font-body text-base sm:text-lg leading-relaxed max-w-2xl">
              Ask DiaryTalks about NYSC registration, orientation camp, relocation, PPA, CDS, clearance, allowances, exemption and other service-year matters.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5">
              <AlertCircle className="w-4 h-4 text-accent-300" />
              <span className="text-xs font-display font-medium text-white/80">
                DiaryTalks is not an official NYSC service. Always verify critical information with official sources.
              </span>
            </div>
          </Reveal>
        </div>
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full"><path d="M0 20L720 40L1440 20V40H0V20Z" fill="#f9fafb"/></svg>
        </div>
      </section>

      {/* Chat area */}
      <section className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col">
        {/* Conversation header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-nysc-500 animate-pulse" />
            <span className="text-sm font-display font-medium text-gray-600">
              {messages.length === 0 ? 'New conversation' : `${messages.filter((m) => m.role === 'user').length} question${messages.filter((m) => m.role === 'user').length !== 1 ? 's' : ''}`}
            </span>
          </div>
          <button
            onClick={startNewConversation}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-sm font-display font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New conversation
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 min-h-0 overflow-y-auto pb-4" style={{ maxHeight: messages.length > 0 ? 'calc(100vh - 420px)' : 'auto' }}>
          {messages.length === 0 ? (
            <div className="py-8">
              <div className="text-center mb-8">
                <DiaryTalksIcon size={56} className="mx-auto mb-4" />
                <h2 className="text-xl font-display font-bold text-gray-800 mb-2">How can I help you?</h2>
                <p className="text-sm font-body text-gray-500 max-w-md mx-auto">
                  Choose a suggested question below or type your own question about NYSC.
                </p>
              </div>
              <SuggestedQuestions onSelect={(q) => handleSend(q)} disabled={loading} />
            </div>
          ) : (
            <div>
              {messages.map((msg) => (
                <ChatMessageComp
                  key={msg.id}
                  message={msg}
                  onFeedback={msg.role === 'assistant' ? handleFeedback : undefined}
                />
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex gap-3 mb-4">
                  <div className="flex-shrink-0 mt-1">
                    <DiaryTalksIcon size={34} />
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-md shadow-sm px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-nysc-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-nysc-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full bg-nysc-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-3 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 font-body flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Input area */}
        <div className="sticky bottom-0 bg-gray-50 pt-2 pb-4">
          {/* Privacy notice */}
          <div className="flex items-center gap-1.5 mb-2 px-1">
            <ShieldAlert className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <p className="text-xs text-gray-400 font-body">
              Do not share your NYSC portal password, call-up number, bank details, or other sensitive personal information.
            </p>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-2 items-end"
          >
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => { setInput(e.target.value); setError(''); }}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question about NYSC..."
                disabled={loading}
                rows={1}
                className="w-full px-4 py-3 pr-12 bg-white border border-gray-200 rounded-xl font-body text-sm resize-none focus:ring-2 focus:ring-nysc-500 focus:border-transparent transition-colors disabled:opacity-50 placeholder-gray-400"
                style={{ maxHeight: 120 }}
                aria-label="Type your NYSC question"
              />
              <span className="absolute right-3 bottom-3 text-xs text-gray-300 font-body pointer-events-none">
                {input.length > 0 ? `${input.length}/1000` : ''}
              </span>
            </div>
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-nysc-600 text-white hover:bg-nysc-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md flex-shrink-0"
              aria-label="Send question"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
