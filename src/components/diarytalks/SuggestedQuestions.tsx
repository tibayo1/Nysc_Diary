interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
  disabled?: boolean;
}

const suggestions = [
  'What documents should I take to camp?',
  'What should I do if my PPA rejects me?',
  'How does relocation work?',
  'How can I correct a registration error?',
  'Who qualifies for an exemption certificate?',
  'What happens if I miss monthly clearance?',
];

export default function SuggestedQuestions({ onSelect, disabled }: SuggestedQuestionsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {suggestions.map((q) => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          disabled={disabled}
          className="text-left px-4 py-3 rounded-xl border border-gray-200 bg-white hover:border-nysc-300 hover:bg-nysc-50/50 text-sm font-body text-gray-700 hover:text-nysc-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
