import { ExternalLink, ShieldCheck, AlertTriangle, Info } from 'lucide-react';
import type { ChatSource, InformationType } from '../../types/diarytalks';

interface SourceCardProps {
  sources: ChatSource[];
  informationType: InformationType;
  requiresOfficialConfirmation: boolean;
}

const typeConfig: Record<InformationType, { label: string; color: string; icon: typeof ShieldCheck }> = {
  official: { label: 'Official guidance', color: 'bg-nysc-50 text-nysc-700 border-nysc-200', icon: ShieldCheck },
  verified: { label: 'Verified explanation', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Info },
  state_specific: { label: 'State-specific information', color: 'bg-amber-50 text-amber-700 border-amber-200', icon: AlertTriangle },
  confirmation_required: { label: 'Confirmation required', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: AlertTriangle },
  insufficient: { label: 'Insufficient verified information', color: 'bg-red-50 text-red-700 border-red-200', icon: AlertTriangle },
};

export default function SourceCard({ sources, informationType, requiresOfficialConfirmation }: SourceCardProps) {
  const config = typeConfig[informationType] || typeConfig.verified;
  const Icon = config.icon;

  return (
    <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50/50 p-4 space-y-3">
      {/* Information type badge */}
      <div className="flex items-center gap-2">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-display font-semibold border ${config.color}`}>
          <Icon className="w-3.5 h-3.5" />
          {config.label}
        </span>
      </div>

      {/* Sources */}
      {sources.length > 0 && (
        <div className="space-y-2">
          {sources.map((source, i) => (
            <div key={i} className="flex items-start justify-between gap-2 text-sm">
              <div className="space-y-0.5">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-nysc-600 hover:text-nysc-700 font-display font-medium hover:underline"
                >
                  {source.title}
                  <ExternalLink className="w-3 h-3" />
                </a>
                <p className="text-xs text-gray-400 font-body">
                  Last verified: {new Date(source.lastVerified).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation required notice */}
      {requiresOfficialConfirmation && (
        <p className="text-xs text-amber-600 font-body flex items-center gap-1.5 pt-1 border-t border-gray-100">
          <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
          We recommend confirming with your LGI or state secretariat for your specific situation.
        </p>
      )}
    </div>
  );
}
