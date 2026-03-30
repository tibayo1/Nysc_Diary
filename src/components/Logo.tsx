interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
  className?: string;
}

export default function Logo({ size = 'md', variant = 'full', className = '' }: LogoProps) {
  const sizes = {
    sm: { img: 'h-8 w-8', text: 'text-lg' },
    md: { img: 'h-10 w-10', text: 'text-xl' },
    lg: { img: 'h-14 w-14', text: 'text-2xl' },
  };

  const s = sizes[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src="/ndlogo-clr_final_copy.jpg"
        alt="NYSC Diary Logo"
        className={`${s.img} rounded-md object-contain`}
        width={size === 'sm' ? 32 : size === 'md' ? 40 : 56}
        height={size === 'sm' ? 32 : size === 'md' ? 40 : 56}
      />
      {variant === 'full' && (
        <span className={`${s.text} font-display font-bold tracking-tight`}>
          <span className="text-nysc-600">NYSC</span>
          {' '}
          <span className="text-accent-500">Diary</span>
        </span>
      )}
    </div>
  );
}
