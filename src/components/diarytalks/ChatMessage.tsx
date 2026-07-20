import React, { useState } from 'react';
import { Copy, Check, ThumbsUp, ThumbsDown, Flag, ChevronDown, ChevronUp } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '../../types/diarytalks';
import SourceCard from './SourceCard';
import DiaryTalksIcon from './DiaryTalksIcon';

interface ChatMessageProps {
  message: ChatMessageType;
  onFeedback?: (messageId: string, rating: 'helpful' | 'not_helpful' | 'reported') => void;
}

/** Lightweight inline markdown: **bold**, *italic*, newlines → JSX */
function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split('\n');
  return lines.map((line, li) => {
    // Split by **bold** and *italic*
    const parts: React.ReactNode[] = [];
    const regex = /\*\*(.+?)\*\*|\*(.+?)\*/g;
    let last = 0;
    let match;
    let key = 0;
    while ((match = regex.exec(line)) !== null) {
      if (match.index > last) parts.push(line.slice(last, match.index));
      if (match[1] !== undefined) {
        parts.push(<strong key={key++} className="font-semibold text-gray-900">{match[1]}</strong>);
      } else if (match[2] !== undefined) {
        parts.push(<em key={key++}>{match[2]}</em>);
      }
      last = match.index + match[0].length;
    }
    if (last < line.length) parts.push(line.slice(last));
    return (
      <span key={li}>
        {parts.length > 0 ? parts : line}
        {li < lines.length - 1 && <br />}
      </span>
    );
  });
}

export default function ChatMessage({ message, onFeedback }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  const isUser = message.role === 'user';
  const response = message.response;

  const handleCopy = () => {
    const textToCopy = response ? response.answer : message.content;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[85%] sm:max-w-[75%]">
          <div className="bg-nysc-600 text-white px-5 py-3.5 rounded-2xl rounded-br-md font-body text-sm leading-relaxed shadow-sm">
            {message.content}
          </div>
          <p className="text-xs text-gray-400 mt-1.5 text-right font-body">
            {new Date(message.timestamp).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    );
  }

  // Assistant message
  return (
    <div className="flex gap-3 mb-6">
      <div className="flex-shrink-0 mt-1">
        <DiaryTalksIcon size={34} />
      </div>
      <div className="flex-1 max-w-[85%] sm:max-w-[80%]">
        <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-md shadow-sm px-5 py-4">
          {/* Answer text — with inline markdown rendering */}
          <p className="font-body text-sm text-gray-800 leading-relaxed">
            {renderMarkdown(response?.answer || message.content)}
          </p>

          {/* Next steps (collapsible) */}
          {response?.nextSteps && response.nextSteps.length > 0 && (
            <div className="mt-4">
              <button
                onClick={() => setShowSteps(!showSteps)}
                className="flex items-center gap-1.5 text-xs font-display font-semibold text-nysc-600 hover:text-nysc-700 transition-colors"
              >
                {showSteps ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                Recommended next steps ({response.nextSteps.length})
              </button>
              {showSteps && (
                <ul className="mt-2 space-y-1.5 pl-1">
                  {response.nextSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-body text-gray-600">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-nysc-400 flex-shrink-0" />
                      {step}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Warnings */}
          {response?.warnings && response.warnings.length > 0 && (
            <div className="mt-3 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2.5">
              <p className="text-xs font-display font-semibold text-amber-700 mb-1">⚠️ Important</p>
              <ul className="space-y-1">
                {response.warnings.map((w, i) => (
                  <li key={i} className="text-xs font-body text-amber-600 flex items-start gap-1.5">
                    <span className="mt-1 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Source card */}
          {response && response.status !== 'insufficient' && (
            <SourceCard
              sources={response.sources}
              informationType={response.informationType}
              requiresOfficialConfirmation={response.requiresOfficialConfirmation}
            />
          )}

          {/* Actions bar */}
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-1 flex-wrap">
            {/* Copy button */}
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-body text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              aria-label="Copy answer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-nysc-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>

            {/* Feedback buttons */}
            {onFeedback && !message.feedbackGiven && (
              <>
                <div className="w-px h-4 bg-gray-200 mx-1" />
                <button
                  onClick={() => onFeedback(message.id, 'helpful')}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-body text-gray-500 hover:bg-nysc-50 hover:text-nysc-700 transition-colors"
                  aria-label="Mark as helpful"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  Helpful
                </button>
                <button
                  onClick={() => onFeedback(message.id, 'not_helpful')}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-body text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                  aria-label="Mark as not helpful"
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                  Not helpful
                </button>
                <button
                  onClick={() => onFeedback(message.id, 'reported')}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-body text-gray-500 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                  aria-label="Report outdated information"
                >
                  <Flag className="w-3.5 h-3.5" />
                  Report
                </button>
              </>
            )}

            {/* Feedback confirmation */}
            {message.feedbackGiven && (
              <>
                <div className="w-px h-4 bg-gray-200 mx-1" />
                <span className="text-xs font-body text-gray-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-nysc-500" />
                  Thanks for your feedback
                </span>
              </>
            )}
          </div>
        </div>

        {/* Timestamp */}
        <p className="text-xs text-gray-400 mt-1.5 font-body">
          {new Date(message.timestamp).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}
        </p>

        {/* Follow-up suggestion */}
        {response?.suggestedFollowUp && (
          <p className="text-xs text-nysc-600 mt-2 font-body italic">
            {response.suggestedFollowUp}
          </p>
        )}
      </div>
    </div>
  );
}
