'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import ArrowLink from '@/app/_components/ArrowLink';
import SectionHeader from '@/app/_components/SectionHeader';

interface StyleSlide {
  tag: string;
  description: string;
  imageUrl: string;
  alt: string;
}

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const STYLE_SLIDES: StyleSlide[] = [
  {
    tag: '各色尼龍帶',
    description: '豐富色彩的尼龍繩，觸感柔軟，可用於手腕帶、拐杖帶等用途。',
    imageUrl: `${IMAGE_BASE_URL}/feature/wrist-strap.webp`,
    alt: '各色尼龍帶',
  },
  {
    tag: '成衣棉繩',
    description: '多用於衣褲類，材質可選用純棉或特多棉等等較為柔軟的材質。',
    imageUrl: `${IMAGE_BASE_URL}/feature/tetoron-cotton.webp`,
    alt: '成衣棉繩',
  },
  {
    tag: '實心包心帶',
    description: '可用於需要較強拉力的情況，例如寵物帶等用途。',
    imageUrl: `${IMAGE_BASE_URL}/feature/solid-core-round-cord.webp`,
    alt: '實心包心帶',
  },
  {
    tag: '風管包心帶',
    description: '風管可成為被織帶包覆的材質，讓風管有更漂亮的外觀。',
    imageUrl: `${IMAGE_BASE_URL}/feature/air-duct.webp`,
    alt: '風管包心帶',
  },
  {
    tag: '撚繩',
    description: '利用旋轉方式編織而成，能承受較大拉伸強度。',
    imageUrl: `${IMAGE_BASE_URL}/feature/twisted.webp`,
    alt: '撚繩',
  },
  {
    tag: '子母帶',
    description: '具有特殊編法的織帶，常用於裝飾藝術。',
    imageUrl: `${IMAGE_BASE_URL}/feature/子母帶.webp`,
    alt: '子母帶',
  },
  {
    tag: '印刷',
    description: '可自由選擇印刷類型與形式',
    imageUrl: `${IMAGE_BASE_URL}/feature/print.webp`,
    alt: '印刷帶',
  },
  {
    tag: '各種編織高速帶',
    description: '可利用不同顏色的絲線，編織出各種形式的高速帶',
    imageUrl: `${IMAGE_BASE_URL}/feature/speed-style.webp`,
    alt: '高速帶各式編織',
  },
  // TODO 要補拍
  {
    tag: '各種編織走馬帶',
    description: '可利用不同顏色的絲線，編織出各種形式的走馬帶',
    imageUrl: `${IMAGE_BASE_URL}/feature/braiding-style.webp`,
    alt: '各種編織走馬帶',
  },
  {
    tag: '段染',
    description: '可搭配喜愛的漸層色彩',
    imageUrl: `${IMAGE_BASE_URL}/feature/variegated.webp`,
    alt: '段染',
  },
  {
    tag: '提花帶',
    description: '可在織帶中加入裝飾與藝術的圖樣，圖樣包含圖騰、Logo等。',
    imageUrl: `${IMAGE_BASE_URL}/feature/jacquard.webp`,
    alt: '提花帶',
  },
  {
    tag: '止滑帶',
    description: '加入橡膠防止滑動的特殊織帶。',
    imageUrl: `${IMAGE_BASE_URL}/feature/anti-slip.webp`,
    alt: '止滑帶',
  },
  {
    tag: '彈力圓帶',
    description: '將高彈力橡膠包覆於走馬帶中，使織帶具備彈性。',
    imageUrl: `${IMAGE_BASE_URL}/feature/elasticity-cord.webp`,
    alt: '彈力走馬帶',
  },
  {
    tag: '彈力扁帶',
    description: '將高彈力橡膠編入高速帶中，使織帶具備彈性。',
    imageUrl: `${IMAGE_BASE_URL}/feature/elasticity-belt.webp`,
    alt: '彈力扁帶',
  },
  {
    tag: '反光帶',
    description: '將具備反光能力的材質編入織帶中，常用於運動衣物、工作服。',
    imageUrl: `${IMAGE_BASE_URL}/feature/reflective.webp`,
    alt: '反光帶',
  },
  {
    tag: '金蔥/銀蔥',
    description: '將金蔥線或銀蔥線編入織帶中，達到閃亮效果',
    imageUrl: `${IMAGE_BASE_URL}/feature/golden:sliver.webp`,
    alt: '金蔥 銀蔥',
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

export default function Customization() {
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
          title="客製化服務"
          subtitle="Customization Services"
          className="mb-12"
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          <div
            className={`${cardSharedClassName} order-3 flex flex-col justify-between lg:order-1 lg:col-span-4`}
          >
            <div>
              <h3 className={titleSharedClassName}>織帶的規格與材質</h3>
              <p className={descriptionSharedClassName}>
                提供特多龍、尼龍、純棉及各種機能紗線等多樣材質的選擇。
                <br />
                顏色、材質、尺寸規格、厚薄度、彈性表現、包心材質與是否具備彈性，皆可依需求高度客製化。
              </p>
            </div>
            <div className="relative mt-4 h-40 w-full overflow-hidden rounded-lg">
              <Image
                src={`${IMAGE_BASE_URL}/scenarios/bag1.webp`}
                alt="織帶的規格與材質"
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
                  <h3 className={titleSharedClassName}>多種樣式選擇</h3>
                  <p className={descriptionSharedClassName}>
                    {STYLE_SLIDES[activeSlideIndex].description}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {STYLE_SLIDES.map((slide, idx) => {
                    const isActive = idx === activeSlideIndex;
                    return (
                      <button
                        key={slide.tag}
                        type="button"
                        onClick={() => setActiveSlideIndex(idx)}
                        className={`cursor-pointer rounded-md px-2 py-[1px] text-sm font-medium transition-all duration-200 bg-border-subtle/50 border-2 ${
                          isActive ? 'border-brand' : 'border-transparent'
                        }`}
                      >
                        {slide.tag}
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-end pt-2 pr-2">
                  <ArrowLink href="/collections">看更多</ArrowLink>
                </div>
              </div>

              <div className="relative h-48 w-full overflow-hidden rounded-lg  sm:h-full sm:w-1/2">
                <Image
                  src={STYLE_SLIDES[activeSlideIndex].imageUrl}
                  alt={STYLE_SLIDES[activeSlideIndex].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover transition-opacity duration-300 ease-out"
                />

                <div className="pointer-events-none absolute inset-y-0 left-1 right-1 flex gap-1 items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrevSlide}
                    aria-label="Previous Slide"
                    className="cursor-pointer pointer-events-auto flex h-7 w-7 items-center justify-center rounded-full bg-black/10 text-white backdrop-blur-sm transition-colors hover:bg-black/20"
                  >
                    <ChevronLeftIcon className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextSlide}
                    aria-label="Next Slide"
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
                  alt="後段加工代工"
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
              </div>

              <div className="sm:w-1/2">
                <h3 className={titleSharedClassName}>後段加工處理</h3>
                <p className={descriptionSharedClassName}>
                  協助各種織帶後段加工處理。
                  <br />
                  如熱轉印刷、鋼板印刷、指定長度裁切、打頭加工等等。
                </p>
              </div>
            </div>
          </div>

          <div
            className={`${cardSharedClassName} order-1 group relative flex min-h-[190px] flex-col justify-center overflow-hidden lg:order-4 lg:col-span-5`}
          >
            <Image
              src={`${IMAGE_BASE_URL}/feature/speed.webp`}
              alt="根據用途提供建議"
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover opacity-20"
            />

            <div className="relative z-10 text-center">
              <h3 className={titleSharedClassName}>不清楚材質與做法？</h3>
              <p className={descriptionSharedClassName}>
                沒關係，仍然可以直接聯絡我們。
                <br />
                告訴我們用途與需求，我們將會推薦最佳做法與合適的材質，並提供合理報價
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
