import Image from 'next/image';

import {
  HEADING_FONT_CLASS,
  HEADING_WEIGHT_CLASS,
  type Locale,
} from '@/app/_lib/locale';

interface Props {
  lang: Locale;
  imageUrl: string;
  imageAlt: string;
  title: string;
  enTitle?: string;
  imageClassName?: string;
}

export default function PageBanner({
  lang,
  imageUrl,
  imageAlt,
  title,
  enTitle = '',
  imageClassName = '',
}: Props) {
  return (
    <section className="relative w-full h-30 sm:h-70 flex flex-col items-center justify-center overflow-hidden">
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        priority
        className={`object-cover ${imageClassName}`}
      />

      <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/20 via-transparent/40 to-black/80" />

      <span className="z-10 text-xs sm:text-sm tracking-widest text-warm-gray font-bold uppercase text-shadow-xl">
        {enTitle}
      </span>
      <h1
        className={`z-10 mt-2 text-2xl sm:text-4xl text-white tracking-wide text-shadow-xl ${HEADING_FONT_CLASS[lang]} ${HEADING_WEIGHT_CLASS[lang]}`}
      >
        {title}
      </h1>
    </section>
  );
}
