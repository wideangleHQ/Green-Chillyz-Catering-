interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  dark = false,
  className = '',
}: SectionHeadingProps) {
  return (
    <div
      className={`max-w-2xl ${
        className ? className : 'mb-10 md:mb-14'
      } ${
        align === 'center' ? 'mx-auto text-center' : 'text-left'
      }`}
    >
      {eyebrow && (
        <span
          className={`inline-block text-xs font-bold tracking-[0.15em] uppercase mb-3 ${
            dark ? 'text-brand-yellow' : 'text-chilli-red'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display leading-tight ${
          dark ? 'text-white' : 'text-chef-black'
        }`}
        style={{ fontSize: 'clamp(1.875rem, 3.5vw + 0.5rem, 2.75rem)' }}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base md:text-lg leading-relaxed ${
            dark ? 'text-sand-300' : 'text-muted-charcoal'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
