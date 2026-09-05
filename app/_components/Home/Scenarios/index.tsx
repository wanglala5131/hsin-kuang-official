'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import SectionHeader from '@/app/_components/SectionHeader';
import type { Locale, Localized } from '@/app/_lib/locale';
import type { Dictionary } from '@/app/[lang]/dictionaries';

export interface ScenarioItem {
  id: string;
  alt: Localized<string>;
  imageUrl: string;
}

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const BAG_HANDLE_ALT: Localized<string> = {
  zh: '包袋提把織帶',
  en: 'Bag handle webbing',
};
const BACKPACK_ALT: Localized<string> = {
  zh: '後背包織帶配件',
  en: 'Backpack webbing hardware',
};
const SHOELACE_ALT: Localized<string> = {
  zh: '機能鞋帶',
  en: 'Performance shoelace',
};
const PET_ALT: Localized<string> = {
  zh: '寵物項圈牽繩',
  en: 'Pet collar & leash',
};
const CAMERA_ALT: Localized<string> = { zh: '相機背帶', en: 'Camera strap' };
const SECURITY_ALT: Localized<string> = {
  zh: '安全防護織帶',
  en: 'Safety webbing',
};

const BASE_SCENARIO_IMAGES: ScenarioItem[] = [
  {
    id: 'bag1',
    imageUrl: `${IMAGE_BASE_URL}/scenarios/bag1.webp`,
    alt: BAG_HANDLE_ALT,
  },
  {
    id: 'suitcase',
    imageUrl: `${IMAGE_BASE_URL}/scenarios/suitcase.webp`,
    alt: { zh: '行李箱固定束帶', en: 'Luggage strap' },
  },
  {
    id: 'backpack1',
    imageUrl: `${IMAGE_BASE_URL}/scenarios/backpack1.webp`,
    alt: BACKPACK_ALT,
  },
  {
    id: 'shoelace1',
    imageUrl: `${IMAGE_BASE_URL}/scenarios/shoelace1.webp`,
    alt: SHOELACE_ALT,
  },
  {
    id: 'pet1',
    imageUrl: `${IMAGE_BASE_URL}/scenarios/pet1.webp`,
    alt: PET_ALT,
  },
  {
    id: 'camera1',
    imageUrl: `${IMAGE_BASE_URL}/scenarios/camera1.webp`,
    alt: CAMERA_ALT,
  },
  {
    id: 'security2',
    imageUrl: `${IMAGE_BASE_URL}/scenarios/security2.webp`,
    alt: SECURITY_ALT,
  },

  {
    id: 'gift1',
    imageUrl: `${IMAGE_BASE_URL}/scenarios/gift1.webp`,
    alt: { zh: '禮品包裝緞帶', en: 'Gift wrapping ribbon' },
  },
  {
    id: 'drawstring-clothes',
    imageUrl: `${IMAGE_BASE_URL}/scenarios/drawstring-clothes.webp`,
    alt: { zh: '服飾抽繩織帶', en: 'Apparel drawstring' },
  },
  {
    id: 'hand1',
    imageUrl: `${IMAGE_BASE_URL}/scenarios/hand1.webp`,
    alt: { zh: '手提掛繩', en: 'Carrying strap' },
  },
  {
    id: 'lanyard',
    imageUrl: `${IMAGE_BASE_URL}/scenarios/lanyard.webp`,
    alt: { zh: '識別證掛繩', en: 'Lanyard' },
  },
  {
    id: 'wrist-strap',
    imageUrl: `${IMAGE_BASE_URL}/scenarios/wrist strap.webp`,
    alt: { zh: '手腕帶', en: 'Wrist strap' },
  },
  {
    id: 'security1',
    imageUrl: `${IMAGE_BASE_URL}/scenarios/security1.webp`,
    alt: SECURITY_ALT,
  },
  {
    id: 'backpack2',
    imageUrl: `${IMAGE_BASE_URL}/scenarios/backpack2.webp`,
    alt: BACKPACK_ALT,
  },

  {
    id: 'pet2',
    imageUrl: `${IMAGE_BASE_URL}/scenarios/pet2.webp`,
    alt: PET_ALT,
  },
  {
    id: 'bag3',
    imageUrl: `${IMAGE_BASE_URL}/scenarios/bag3.webp`,
    alt: BAG_HANDLE_ALT,
  },
  {
    id: 'security3',
    imageUrl: `${IMAGE_BASE_URL}/scenarios/security3.webp`,
    alt: SECURITY_ALT,
  },
  {
    id: 'shoelace2',
    imageUrl: `${IMAGE_BASE_URL}/scenarios/shoelace2.webp`,
    alt: SHOELACE_ALT,
  },

  {
    id: 'camera2',
    imageUrl: `${IMAGE_BASE_URL}/scenarios/camera2.webp`,
    alt: CAMERA_ALT,
  },
  {
    id: 'bag2',
    imageUrl: `${IMAGE_BASE_URL}/scenarios/bag2.webp`,
    alt: BAG_HANDLE_ALT,
  },
];

const OFFSET_VARIANTS = [
  'translate-y-3',
  'translate-y-8',
  'translate-y-1',
  'translate-y-7',
  'translate-y-6',
  '-translate-y-2',
  'translate-y-9',
  '-translate-y-3',
  'translate-y-5',
  'translate-y-0',
];

interface Props {
  lang: Locale;
  dict: Dictionary['home']['scenarios'];
}

export default function Scenarios({ lang, dict }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const marqueeList = [...BASE_SCENARIO_IMAGES, ...BASE_SCENARIO_IMAGES];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden py-20 transition-all duration-1000 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
        <Image
          src={`${IMAGE_BASE_URL}/speed.webp`}
          alt={dict.backgroundAlt}
          fill
          sizes="100vw"
          className="object-cover opacity-15 grayscale contrast-125 blur-[1px]"
        />
        {/* 柔和遮罩：確保與上下背景完全融合 */}
        <div className="absolute inset-0 [background:linear-gradient(to_bottom,var(--color-background)_0%,transparent_1%,transparent_99%,var(--color-background)_100%)]" />{' '}
      </div>

      <SectionHeader
        lang={lang}
        title={dict.title}
        subtitle={dict.subtitle}
        className="mb-6 z-10 relative"
      />

      <div className="relative flex w-full select-none z-10">
        <div className="z-auto absolute w-full h-[5px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+8px)] bg-brand/30" />
        <div className="z-auto absolute w-full h-[5px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand/70" />
        <div className="z-auto absolute w-full h-[5px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%-8px)] bg-brand/30" />

        <div className="flex w-max shrink-0 animate-marquee items-center pt-8 pb-16 will-change-transform [backface-visibility:hidden] motion-reduce:animate-none hover:[animation-play-state:paused]">
          {marqueeList.map((item, index) => {
            const offsetClass = OFFSET_VARIANTS[index % OFFSET_VARIANTS.length];

            return (
              <div
                key={`${item.id}-${index}`}
                className={`group relative mr-9 shrink-0 transition-transform duration-300 rounded-md ${offsetClass}`}
              >
                <div className="relative h-64 w-48 rounded-md shadow-lg duration-300 group-hover:shadow-md sm:h-80 sm:w-60">
                  <Image
                    src={item.imageUrl}
                    alt={item.alt[lang]}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 192px, 240px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 rounded-md"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
