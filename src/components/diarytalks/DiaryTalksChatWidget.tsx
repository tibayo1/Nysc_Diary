import { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, Sparkles, MessageSquare } from 'lucide-react';
import { buildResponse } from '../../lib/diarytalks';
import { checkSensitiveInfo } from '../../lib/diarytalks';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

const GREETING: Message = {
  role: 'assistant',
  content:
    "Hi! I'm **DiaryTalks**, your NYSC AI assistant 👋\n\nAsk me anything about camp, call-up letters, PPA, allowances, redeployment, and more!",
};

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

interface Props {
  onOpenFull: () => void;
}

export default function DiaryTalksChatWidget({ onOpenFull }: Props) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [convId] = useState(generateId);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  const handleSend = async (text?: string) => {
    const q = (text ?? input).trim();
    if (!q || loading) return;

    setInput('');
    const userMsg: Message = { role: 'user', content: q };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    // Redact sensitive info before sending
    const { redactedText } = checkSensitiveInfo(q);

    try {
      // Try Cloudflare Function
      const res = await fetch('/api/diarytalk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: redactedText,
          conversationId: convId,
          history: messages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      let answer = '';
      if (res.ok) {
        const data = await res.json();
        if (!data.fallback && data.answer) {
          answer = data.answer;
        }
      }

      // Fallback to local matching
      if (!answer) {
        const local = buildResponse(redactedText);
        answer =
          local.status !== 'insufficient'
            ? local.answer
            : "I'm not sure about that one. Try the full DiaryTalks page for a more detailed answer!";
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Something went wrong. Please try again or open the full DiaryTalks page.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Render message content: bold (**text**) and line breaks
  const renderContent = (content: string) => {
    const parts = content.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) =>
      part.startsWith('**') && part.endsWith('**') ? (
        <strong key={i}>{part.slice(2, -2)}</strong>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <>
      {/* ── Floating button ── */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open DiaryTalks AI chat"
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
          open
            ? 'bg-gray-800 hover:bg-gray-900 rotate-0'
            : 'bg-nysc-600 hover:bg-nysc-700 hover:scale-110'
        }`}
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Sparkles className="w-6 h-6 text-white" />
        )}
        {/* Pulse ring when closed */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-nysc-400 animate-ping opacity-25 pointer-events-none" />
        )}
      </button>

      {/* ── Chat popup ── */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-80 sm:w-96 flex flex-col rounded-2xl shadow-2xl border border-gray-200 bg-white overflow-hidden transition-all duration-300 origin-bottom-right ${
          open ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-90 opacity-0 pointer-events-none'
        }`}
        style={{ maxHeight: '520px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-nysc-600 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm leading-none">DiaryTalks</p>
              <p className="text-xs text-nysc-100 leading-none mt-0.5">NYSC AI Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenFull}
              className="text-xs text-nysc-100 hover:text-white underline underline-offset-2 transition-colors"
            >
              Full chat →
            </button>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50" style={{ minHeight: 0, maxHeight: '340px' }}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-nysc-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-nysc-600" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-nysc-600 text-white rounded-tr-sm'
                    : 'bg-white text-gray-800 rounded-tl-sm shadow-sm border border-gray-100'
                }`}
              >
                {msg.content.split('\n').map((line, j) => (
                  <p key={j} className={j > 0 ? 'mt-1' : ''}>
                    {renderContent(line)}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-2 justify-start">
              <div className="w-7 h-7 rounded-full bg-nysc-100 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-nysc-600" />
              </div>
              <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100">
                <div className="flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-nysc-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-nysc-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-nysc-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick suggestions (only shown when 1 message = greeting) */}
        {messages.length === 1 && (
          <div className="px-4 pb-2 flex gap-1.5 flex-wrap bg-gray-50">
            {['What to bring to camp?', 'How is allawee paid?', 'Can I change my PPA?'].map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="text-xs px-2.5 py-1.5 rounded-full border border-nysc-200 text-nysc-700 bg-white hover:bg-nysc-50 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-3 py-3 border-t border-gray-100 bg-white flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask an NYSC question…"
            disabled={loading}
            className="flex-1 text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-nysc-300 bg-gray-50 disabled:opacity-60"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="w-9 h-9 rounded-xl bg-nysc-600 text-white flex items-center justify-center hover:bg-nysc-700 disabled:opacity-40 transition-all flex-shrink-0"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] text-gray-400 pb-2 bg-white">
          Powered by <span className="font-semibold text-nysc-600">NYSC Diary</span>
          {' · '}DiaryTalks can make mistakes
        </p>
      </div>
    </>
  );
}
