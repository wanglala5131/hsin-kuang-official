'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import ArrowLink from '@/app/_components/ArrowLink';
import SectionHeader from '@/app/_components/SectionHeader';

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-x-clip pt-20 sm:py-28"
    >
      <div
        className={`transition-all duration-700 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <SectionHeader title="關於我們" subtitle="About Us" className="mb-12" />
      </div>

      <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-12 md:gap-16">
        <div
          className={`relative w-full pr-6 transition-all duration-1000 ease-out md:col-span-6 lg:pr-0 ${
            isVisible
              ? 'translate-x-0 opacity-100'
              : '-translate-x-16 opacity-0'
          }`}
        >
          <div className="relative h-[300px] w-full overflow-hidden rounded-r-2xl bg-surface shadow-md md:h-[480px] lg:h-[580px]">
            <Image
              src={`${IMAGE_BASE_URL}/braiding-machine.webp`}
              alt="新光織帶 織造機台"
              fill
              className="object-cover object-[20px_70%] transition-transform duration-700 scale-110 hover:scale-115"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          <div
            className={`absolute -bottom-7 right-5 w-5/12 max-w-[150px] overflow-hidden rounded-xl bg-surface shadow-2xl transition-all duration-1000 delay-300 ease-out sm:-bottom-8 sm:right-4 md:-right-10 sm:max-w-[180px] md:max-w-[200px] lg:max-w-[260px] ${
              isVisible
                ? 'translate-y-0 scale-100 opacity-100'
                : 'translate-y-10 scale-90 opacity-0'
            }`}
          >
            <div className="relative aspect-square w-full">
              <Image
                src={`${IMAGE_BASE_URL}/webbing.webp`}
                alt="高品質織帶成品"
                fill
                className="scale-130 object-cover transition-transform duration-700 hover:scale-135"
                sizes="(max-width: 640px) 160px, 260px"
              />
            </div>
          </div>
        </div>

        <div
          className={`flex flex-col px-8 md:pl-1 md:pr-8 transition-all duration-1000 delay-200 ease-out md:col-span-6 lg:pl-8 lg:pr-16 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'
          }`}
        >
          <div className="bg-brand/20 text-brand font-bold px-3 py-[2px] rounded-2xl self-start">
            100% 台灣生產
          </div>

          <h2 className="mt-3 font-wen-kai-zh text-2xl font-bold tracking-tight text-content-main sm:text-3xl md:mt-5 lg:text-4xl">
            嚴謹品質，專業客製織造
          </h2>

          <p className="mt-4 text-base leading-relaxed text-content-muted sm:text-lg md:mt-6">
            立足台灣 40
            年，我們專注於高品質織造與客製服務。憑藉累積數十年的專業經驗，能依據您的實際用途推薦合適的材料與結構，並可同步完成印刷、針車等後續加工，省去多方發包的溝通成本。
          </p>

          <div className="mt-10 flex justify-end">
            <ArrowLink href="/collections">瀏覽產品</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
