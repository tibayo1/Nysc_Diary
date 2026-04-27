export const TAGS = [
  { label: 'All', emoji: '' },
  { label: 'Camp Life', emoji: '🏕️' },
  { label: 'PPA', emoji: '🏢' },
  { label: 'Allowance', emoji: '💸' },
  { label: 'Jobs & Opportunities', emoji: '💼' },
  { label: 'Rant', emoji: '📣' },
  { label: 'Advice', emoji: '📖' },
  { label: 'Wins', emoji: '🏆' },
  { label: 'State Guide', emoji: '🗺️' },
];

export const TAG_COLORS: Record<string, string> = {
  'Camp Life': 'bg-green-100 text-green-800',
  PPA: 'bg-blue-100 text-blue-800',
  Allowance: 'bg-yellow-100 text-yellow-800',
  'Jobs & Opportunities': 'bg-indigo-100 text-indigo-800',
  Rant: 'bg-red-100 text-red-800',
  Advice: 'bg-purple-100 text-purple-800',
  Wins: 'bg-orange-100 text-orange-800',
  'State Guide': 'bg-teal-100 text-teal-800',
  General: 'bg-gray-100 text-gray-700',
};

interface TagFilterBarProps {
  activeTag: string;
  onChange: (tag: string) => void;
}

export default function TagFilterBar({ activeTag, onChange }: TagFilterBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide" role="tablist" aria-label="Filter threads by topic">
      {TAGS.map(({ label, emoji }) => (
        <button
          key={label}
          role="tab"
          aria-selected={activeTag === label}
          onClick={() => onChange(label)}
          className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-display font-semibold transition-all duration-200 ${
            activeTag === label
              ? 'bg-nysc-600 text-white shadow-md shadow-nysc-600/20'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {emoji ? `${emoji} ${label}` : label}
        </button>
      ))}
    </div>
  );
}
