import Image from 'next/image';

interface Props {
  imageUrl: string;
  title: string;
  enTitle?: string;
  imageClassName?: string;
}

export default function PageBanner({
  imageUrl,
  title,
  enTitle = '',
  imageClassName,
}: Props) {
  return (
    <section className="relative w-full h-30 sm:h-70 flex flex-col items-center justify-center overflow-hidden">
      <Image
        src={imageUrl}
        alt="新光織帶"
        fill
        priority
        className={imageClassName}
      />

      <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/20 via-transparent/40 to-black/80" />

      <span className="z-10 text-xs sm:text-sm tracking-widest text-warm-gray font-bold uppercase text-shadow-xl">
        {enTitle}
      </span>
      <h1 className="z-10 mt-2 text-2xl sm:text-4xl font-bold text-white font-wen-kai-zh tracking-wide text-shadow-xl">
        {title}
      </h1>
    </section>
  );
}
