interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  dark?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  dark = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`max-w-2xl mb-10 md:mb-14 ${
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
        className={`font-display text-3xl md:text-4xl lg:text-[2.75rem] leading-tight ${
          dark ? 'text-white' : 'text-chef-black'
        }`}
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
