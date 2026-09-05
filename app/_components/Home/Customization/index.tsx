'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import ArrowLink from '@/app/_components/ArrowLink';
import SectionHeader from '@/app/_components/SectionHeader';
import type { Locale, Localized } from '@/app/_lib/locale';
import type { Dictionary } from '@/app/[lang]/dictionaries';

interface StyleSlide {
  tag: Localized<string>;
  description: Localized<string>;
  imageUrl: string;
  alt: Localized<string>;
}

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const STYLE_SLIDES: StyleSlide[] = [
  {
    tag: { zh: '各色尼龍帶', en: 'Nylon Cords' },
    description: {
      zh: '豐富色彩的尼龍繩，觸感柔軟，可用於手腕帶、拐杖帶等用途。',
      en: 'Nylon cord in a wide range of colors, soft to the touch — used for wrist straps, cane straps, and more.',
    },
    imageUrl: `${IMAGE_BASE_URL}/feature/wrist-strap.webp`,
    alt: { zh: '各色尼龍帶', en: 'Nylon cords in various colors' },
  },
  {
    tag: { zh: '成衣棉繩', en: 'Cotton Drawstring' },
    description: {
      zh: '多用於衣褲類，材質可選用純棉或特多棉等等較為柔軟的材質。',
      en: 'Mostly used for apparel drawstrings; available in soft materials like pure cotton or cotton-poly blends.',
    },
    imageUrl: `${IMAGE_BASE_URL}/feature/tetoron-cotton.webp`,
    alt: { zh: '成衣棉繩', en: 'Cotton drawstring cord' },
  },
  {
    tag: { zh: '實心包心帶', en: 'Solid-Core Cord' },
    description: {
      zh: '可用於需要較強拉力的情況，例如寵物帶等用途。',
      en: 'Suited to applications needing higher tensile strength, such as pet leashes.',
    },
    imageUrl: `${IMAGE_BASE_URL}/feature/solid-core-round-cord.webp`,
    alt: { zh: '實心包心帶', en: 'Solid-core cord' },
  },
  {
    tag: { zh: '風管包心帶', en: 'Duct-Covering Webbing' },
    description: {
      zh: '風管可成為被織帶包覆的材質，讓風管有更漂亮的外觀。',
      en: 'Webbing woven around air ducts for a cleaner, more finished appearance.',
    },
    imageUrl: `${IMAGE_BASE_URL}/feature/air-duct.webp`,
    alt: { zh: '風管包心帶', en: 'Duct-covering webbing' },
  },
  {
    tag: { zh: '撚繩', en: 'Twisted Cord' },
    description: {
      zh: '利用旋轉方式編織而成，能承受較大拉伸強度。',
      en: 'Woven using a twisting technique, able to withstand higher tensile stress.',
    },
    imageUrl: `${IMAGE_BASE_URL}/feature/twisted.webp`,
    alt: { zh: '撚繩', en: 'Twisted cord' },
  },
  {
    tag: { zh: '子母帶', en: 'Two-Tone Webbing' },
    description: {
      zh: '具有特殊編法的織帶，常用於裝飾藝術。',
      en: 'A specially woven webbing pattern, often used for decorative and artistic purposes.',
    },
    imageUrl: `${IMAGE_BASE_URL}/feature/子母帶.webp`,
    alt: { zh: '子母帶', en: 'Two-tone woven webbing' },
  },
  {
    tag: { zh: '印刷', en: 'Printing' },
    description: {
      zh: '可自由選擇印刷類型與形式',
      en: 'Choose freely from a variety of printing types and formats.',
    },
    imageUrl: `${IMAGE_BASE_URL}/feature/print.webp`,
    alt: { zh: '印刷帶', en: 'Printed webbing' },
  },
  {
    tag: { zh: '各種編織高速帶', en: 'Woven High-Speed Webbing' },
    description: {
      zh: '可利用不同顏色的絲線，編織出各種形式的高速帶',
      en: 'Different colored threads can be woven into high-speed webbing in a variety of patterns.',
    },
    imageUrl: `${IMAGE_BASE_URL}/feature/speed-style.webp`,
    alt: {
      zh: '高速帶各式編織',
      en: 'Various woven high-speed webbing patterns',
    },
  },
  // TODO 要補拍
  {
    tag: { zh: '各種編織走馬帶', en: 'Woven Braided Webbing' },
    description: {
      zh: '可利用不同顏色的絲線，編織出各種形式的走馬帶',
      en: 'Different colored threads can be woven into braided webbing in a variety of patterns.',
    },
    imageUrl: `${IMAGE_BASE_URL}/feature/braiding-style.webp`,
    alt: {
      zh: '各種編織走馬帶',
      en: 'Various woven braided webbing patterns',
    },
  },
  {
    tag: { zh: '段染', en: 'Variegated Dye' },
    description: {
      zh: '可搭配喜愛的漸層色彩',
      en: 'Pair it with your favorite gradient color combinations.',
    },
    imageUrl: `${IMAGE_BASE_URL}/feature/variegated.webp`,
    alt: { zh: '段染', en: 'Variegated dye webbing' },
  },
  {
    tag: { zh: '提花帶', en: 'Jacquard Webbing' },
    description: {
      zh: '可在織帶中加入裝飾與藝術的圖樣，圖樣包含圖騰、Logo等。',
      en: 'Decorative and artistic patterns — including totems, logos, and more — can be woven directly into the webbing.',
    },
    imageUrl: `${IMAGE_BASE_URL}/feature/jacquard.webp`,
    alt: { zh: '提花帶', en: 'Jacquard webbing' },
  },
  {
    tag: { zh: '止滑帶', en: 'Anti-Slip Webbing' },
    description: {
      zh: '加入橡膠防止滑動的特殊織帶。',
      en: 'A specialty webbing with rubber woven in to prevent slipping.',
    },
    imageUrl: `${IMAGE_BASE_URL}/feature/anti-slip.webp`,
    alt: { zh: '止滑帶', en: 'Anti-slip webbing' },
  },
  {
    tag: { zh: '彈力圓帶', en: 'Elastic Round Cord' },
    description: {
      zh: '將高彈力橡膠包覆於走馬帶中，使織帶具備彈性。',
      en: 'High-elasticity rubber is encased within braided webbing to give it stretch.',
    },
    imageUrl: `${IMAGE_BASE_URL}/feature/elasticity-cord.webp`,
    alt: { zh: '彈力走馬帶', en: 'Elastic braided cord' },
  },
  {
    tag: { zh: '彈力扁帶', en: 'Elastic Flat Webbing' },
    description: {
      zh: '將高彈力橡膠編入高速帶中，使織帶具備彈性。',
      en: 'High-elasticity rubber is woven into high-speed webbing to give it stretch.',
    },
    imageUrl: `${IMAGE_BASE_URL}/feature/elasticity-belt.webp`,
    alt: { zh: '彈力扁帶', en: 'Elastic flat webbing' },
  },
  {
    tag: { zh: '反光帶', en: 'Reflective Webbing' },
    description: {
      zh: '將具備反光能力的材質編入織帶中，常用於運動衣物、工作服。',
      en: 'Reflective material is woven into the webbing, commonly used in sportswear and workwear.',
    },
    imageUrl: `${IMAGE_BASE_URL}/feature/reflective.webp`,
    alt: { zh: '反光帶', en: 'Reflective webbing' },
  },
  {
    tag: { zh: '金蔥/銀蔥', en: 'Gold/Silver Metallic Thread' },
    description: {
      zh: '將金蔥線或銀蔥線編入織帶中，達到閃亮效果',
      en: 'Gold or silver metallic thread is woven into the webbing for a sparkling effect.',
    },
    imageUrl: `${IMAGE_BASE_URL}/feature/golden:sliver.webp`,
    alt: { zh: '金蔥 銀蔥', en: 'Gold and silver metallic thread webbing' },
  },
];

function FlowingRibbonCorrectedPattern({
  className = '',
}: {
  className?: string;
}) {
  return (
    <svg
      className={`pointer-events-none absolute select-none text-[#5A1E1E] ${className}`}
      // viewBox 寬度增加到 700
      viewBox="0 0 700 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ================= 細線圖層 ================= */}
      <g stroke="currentColor" strokeWidth="2.5" opacity="0.85">
        {/* 組一（中段大迴旋細線）：位置維持與上次一樣（向左上拉開） */}
        <path d="M -95 235 C 170 65, 420 135, 400 265 C 370 385, 130 455, -95 575" />
        <path
          d="M -95 305 C 165 205, 460 215, 430 315 C 390 445, 110 555, -95 715"
          strokeWidth="1.8"
        />

        {/* 組二（右側高拱細線）：位置與上次一樣（向右下平移），但現在畫布夠寬，不會被切到 */}
        <path d="M 395 835 C 435 535, 475 265, 555 265 C 595 265, 610 495, 625 835" />
      </g>

      {/* ================= 粗線圖層 ================= */}
      <g
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* 組一（中段大迴旋粗線） */}
        <path d="M -95 250 C 165 130, 395 120, 355 200 C 305 280, 65 380, -95 500" />

        {/* 組二（右側高拱粗線） */}
        <path d="M 375 835 C 415 615, 455 435, 515 435 C 575 435, 605 595, 635 835" />
      </g>
    </svg>
  );
}

interface Props {
  lang: Locale;
  dict: Dictionary['home']['customization'];
}

export default function Customization({ lang, dict }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

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

  const handlePrevSlide = () => {
    setActiveSlideIndex((prev) =>
      prev === 0 ? STYLE_SLIDES.length - 1 : prev - 1,
    );
  };

  const handleNextSlide = () => {
    setActiveSlideIndex((prev) =>
      prev === STYLE_SLIDES.length - 1 ? 0 : prev + 1,
    );
  };

  const cardSharedClassName =
    'rounded-xl bg-white p-6 ring ring-border-subtle/20 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md';
  const titleSharedClassName =
    'mb-2 text-xl font-bold tracking-tight text-content-main inline-block z-0 relative before:h-2 before:w-full before:bg-brand/50 before:absolute before:bottom-0 before:left-0 before:-z-10';
  const descriptionSharedClassName = 'text-md text-content-muted';

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden bg-[var(--color-background)] py-24 transition-all duration-1000 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <div className="pointer-events-none absolute -top-16 -right-24 z-0 h-[580px] w-[510px] overflow-hidden opacity-[0.24] [mask-image:radial-gradient(ellipse_at_top_right,black_35%,transparent_85%)]">
        <FlowingRibbonCorrectedPattern className="h-full w-full rotate-180" />
      </div>

      <div className="pointer-events-none absolute -bottom-20 -left-16 z-0 h-[600px] w-[530px] overflow-hidden opacity-[0.22] [mask-image:radial-gradient(ellipse_at_bottom_left,black_35%,transparent_85%)]">
        <FlowingRibbonCorrectedPattern className="h-full w-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={dict.title}
          subtitle={dict.subtitle}
          className="mb-12"
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          <div
            className={`${cardSharedClassName} order-3 flex flex-col justify-between lg:order-1 lg:col-span-4`}
          >
            <div>
              <h3 className={titleSharedClassName}>{dict.specsTitle}</h3>
              <p className={descriptionSharedClassName}>
                {dict.specsBody1}
                <br />
                {dict.specsBody2}
              </p>
            </div>
            <div className="relative mt-4 h-40 w-full overflow-hidden rounded-lg">
              <Image
                src={`${IMAGE_BASE_URL}/scenarios/bag1.webp`}
                alt={dict.specsImageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover"
              />
            </div>
          </div>

          <div
            className={`${cardSharedClassName} order-2 flex flex-col justify-between lg:order-2 lg:col-span-8`}
          >
            <div className="flex flex-col gap-4 sm:flex-row items-center h-full">
              <div className="flex flex-col justify-between sm:w-1/2 h-full">
                <div>
                  <h3 className={titleSharedClassName}>{dict.stylesTitle}</h3>
                  <p className={descriptionSharedClassName}>
                    {STYLE_SLIDES[activeSlideIndex].description[lang]}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {STYLE_SLIDES.map((slide, idx) => {
                    const isActive = idx === activeSlideIndex;
                    return (
                      <button
                        key={slide.tag.zh}
                        type="button"
                        onClick={() => setActiveSlideIndex(idx)}
                        className={`cursor-pointer rounded-md px-2 py-[1px] text-sm font-medium transition-all duration-200 bg-border-subtle/50 border-2 ${
                          isActive ? 'border-brand' : 'border-transparent'
                        }`}
                      >
                        {slide.tag[lang]}
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-end pt-2 pr-2">
                  <ArrowLink href={`/${lang}/collections`}>
                    {dict.seeMore}
                  </ArrowLink>
                </div>
              </div>

              <div className="relative h-48 w-full overflow-hidden rounded-lg  sm:h-full sm:w-1/2">
                <Image
                  src={STYLE_SLIDES[activeSlideIndex].imageUrl}
                  alt={STYLE_SLIDES[activeSlideIndex].alt[lang]}
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover transition-opacity duration-300 ease-out"
                />

                <div className="pointer-events-none absolute inset-y-0 left-1 right-1 flex gap-1 items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrevSlide}
                    aria-label={dict.prevSlide}
                    className="cursor-pointer pointer-events-auto flex h-7 w-7 items-center justify-center rounded-full bg-black/10 text-white backdrop-blur-sm transition-colors hover:bg-black/20"
                  >
                    <ChevronLeftIcon className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextSlide}
                    aria-label={dict.nextSlide}
                    className="cursor-pointer pointer-events-auto flex h-7 w-7 items-center justify-center rounded-full bg-black/10 text-white backdrop-blur-sm transition-colors hover:bg-black/20"
                  >
                    <ChevronRightIcon className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${cardSharedClassName} order-4 flex flex-col justify-between lg:order-3 lg:col-span-7`}
          >
            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center">
              <div className="relative h-full w-full overflow-hidden rounded-lg sm:h-44 sm:w-1/2">
                <Image
                  src={`${IMAGE_BASE_URL}/feature/sewing.webp`}
                  alt={dict.finishingImageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
              </div>

              <div className="sm:w-1/2">
                <h3 className={titleSharedClassName}>{dict.finishingTitle}</h3>
                <p className={descriptionSharedClassName}>
                  {dict.finishingBody1}
                  <br />
                  {dict.finishingBody2}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`${cardSharedClassName} order-1 group relative flex min-h-[190px] flex-col justify-center overflow-hidden lg:order-4 lg:col-span-5`}
          >
            <Image
              src={`${IMAGE_BASE_URL}/feature/speed.webp`}
              alt={dict.adviceImageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover opacity-20"
            />

            <div className="relative z-10 text-center">
              <h3 className={titleSharedClassName}>{dict.unsureTitle}</h3>
              <p className={descriptionSharedClassName}>
                {dict.unsureBody1}
                <br />
                {dict.unsureBody2}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
