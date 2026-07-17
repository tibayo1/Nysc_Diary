interface DiaryTalksIconProps {
  size?: number;
  className?: string;
}

export default function DiaryTalksIcon({ size = 40, className = '' }: DiaryTalksIconProps) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-nysc-600 to-nysc-700 shadow-lg shadow-nysc-600/20 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        style={{ width: size * 0.55, height: size * 0.55 }}
      >
        {/* Book / diary shape */}
        <rect x="6" y="4" width="20" height="24" rx="3" fill="white" opacity="0.9" />
        <rect x="9" y="8" width="10" height="2" rx="1" fill="#16a34a" />
        <rect x="9" y="12" width="14" height="1.5" rx="0.75" fill="#16a34a" opacity="0.5" />
        <rect x="9" y="15.5" width="12" height="1.5" rx="0.75" fill="#16a34a" opacity="0.5" />
        <rect x="9" y="19" width="8" height="1.5" rx="0.75" fill="#16a34a" opacity="0.3" />
        {/* Chat bubble accent */}
        <circle cx="23" cy="23" r="6" fill="#f97316" />
        <path
          d="M20.5 22l1.5 1.5 3-3"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
