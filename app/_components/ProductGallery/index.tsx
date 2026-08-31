'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Props {
  images: string[];
  alt: string;
}

export default function ProductGallery({ images, alt }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const hasMultipleImages = images.length > 1;

  const goToIndex = (index: number) => {
    if (index === activeIndex) return;
    setIsLoading(true);
    setActiveIndex(index);
  };

  const goToPrev = () => {
    goToIndex(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
  };

  const goToNext = () => {
    goToIndex(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
  };

  return (
    <div>
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-warm-gray ring ring-border-subtle/20">
        <Image
          key={images[activeIndex]}
          src={images[activeIndex]}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          onLoad={() => setIsLoading(false)}
        />

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background">
            <div className="size-8 animate-spin rounded-full border-2 border-border-subtle border-t-content-muted" />
          </div>
        )}

        {hasMultipleImages && (
          <div className="pointer-events-none absolute inset-y-0 left-2 right-2 flex items-center justify-between">
            <button
              type="button"
              onClick={goToPrev}
              aria-label="上一張圖片"
              className="pointer-events-auto flex size-9 cursor-pointer items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/35"
            >
              <ChevronLeftIcon className="size-5" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label="下一張圖片"
              className="pointer-events-auto flex size-9 cursor-pointer items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/35"
            >
              <ChevronRightIcon className="size-5" />
            </button>
          </div>
        )}
      </div>

      {hasMultipleImages && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => goToIndex(index)}
              aria-label={`前往第 ${index + 1} 張圖片`}
              className={`size-2 cursor-pointer rounded-full transition-colors ${
                index === activeIndex ? 'bg-brand' : 'bg-border-subtle'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
