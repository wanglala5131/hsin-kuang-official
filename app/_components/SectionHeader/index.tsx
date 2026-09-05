import {
  HEADING_FONT_CLASS,
  HEADING_WEIGHT_CLASS,
  type Locale,
} from '@/app/_lib/locale';

interface SectionHeaderProps {
  lang: Locale;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeader({
  lang,
  title,
  subtitle,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <h3
        className={`text-3xl tracking-widest text-brand sm:text-4xl ${HEADING_FONT_CLASS[lang]} ${HEADING_WEIGHT_CLASS[lang]}`}
      >
        {title}
      </h3>

      {subtitle && (
        <span className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand/80 sm:text-sm">
          {subtitle}
        </span>
      )}

      <div className="mt-5 h-px w-20 bg-brand/30 sm:w-28" />
    </div>
  );
}
