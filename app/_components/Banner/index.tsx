'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import BannerIndicator, { CirclePhase } from './BannerIndicator';

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const bannerImages = [
  `${IMAGE_BASE_URL}/banner/braiding-machine.webp`,
  `${IMAGE_BASE_URL}/banner/high-speed.webp`,
  `${IMAGE_BASE_URL}/banner/webbing.webp`,
  `${IMAGE_BASE_URL}/banner/silks.webp`,
];

const DISPLAY_TIME = 5000; // fill time
const TRANSITION_TIME = 1000; // clear time
const TOTAL_SLIDE_TIME = DISPLAY_TIME + TRANSITION_TIME; // 5000ms

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<CirclePhase>(CirclePhase.Idle);
  const [isInitialMount, setIsInitialMount] = useState(true);

  useEffect(() => {
    const startFillTimer = setTimeout(() => {
      setPhase(CirclePhase.Filling);
      setIsInitialMount(false);
    }, 50);

    const startClearTimer = setTimeout(() => {
      setPhase(CirclePhase.Clearing);
    }, DISPLAY_TIME);

    const nextSlideTimer = setTimeout(() => {
      setPhase(CirclePhase.Idle);
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, TOTAL_SLIDE_TIME);

    return () => {
      clearTimeout(startFillTimer);
      clearTimeout(startClearTimer);
      clearTimeout(nextSlideTimer);
    };
  }, [currentIndex]);

  // Shows next slide ahead of time during the 1s clearing phase
  const targetIndex =
    phase === CirclePhase.Clearing
      ? (currentIndex + 1) % bannerImages.length
      : currentIndex;

  return (
    <div className="relative w-full h-dvh overflow-hidden bg-black">
      {bannerImages.map((src, index) => {
        const isActive = index === targetIndex;
        const isInitialIdle = isInitialMount && phase === CirclePhase.Idle;

        const opacity = isActive ? 'opacity-100' : 'opacity-0';
        const scale = isInitialIdle
          ? 'scale-105'
          : isActive
            ? 'scale-100'
            : 'scale-105';

        return (
          <Image
            key={src}
            src={src}
            alt="Banner Image"
            fill
            priority
            sizes="100vw"
            style={{
              transitionProperty: 'opacity, scale',
              transitionDuration: `${TRANSITION_TIME}ms, ${TOTAL_SLIDE_TIME}ms`,
            }}
            className={`object-cover linear pointer-events-none ${opacity} ${scale}`}
          />
        );
      })}

      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

      <div className="absolute w-full p-1 z-30 top-1/2 left-1/2 md:left-1/7 -translate-x-1/2 md:-translate-x-0 -translate-y-1/2 text-white text-center md:text-left">
        <p className="text-shadow-md text-white/80">since 1986</p>
        <h1 className="font-wen-kai-zh text-5xl/15 md:text-6xl/17 text-shadow-xl tracking-widest">
          新光織帶
        </h1>
        <h2 className="text-3xl/8 md:text-3xl/10 text-shadow-md text-white/90">
          HSIN KWANG WEBBING MILLS
        </h2>
        <p className="font-wen-kai-zh text-[26px] md:text-4xl/12 text-shadow-sm mt-12 font-thin md:flex before:h-[calc(100% + 10px)] before:w-[2px] before:bg-white/60 before:block before:mr-4">
          以四十年的經驗
          <br />
          專注於各式織帶的品質與技術
        </p>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-white">
        <span className="text-sm uppercase tracking-[0.35em] font-light opacity-90 text-shadow-sm">
          SCROLL
        </span>
        <svg
          className="w-6 h-6 animate-bounce opacity-90"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>

      <BannerIndicator
        total={bannerImages.length}
        activeIndex={targetIndex}
        phase={phase}
        displayTime={DISPLAY_TIME}
        transitionTime={TRANSITION_TIME}
      />
    </div>
  );
}
