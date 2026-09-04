'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}

// `fill` next/image with a spinner overlay shown until it loads.
export default function ImageWithSpinner({
  src,
  alt,
  sizes,
  className = '',
  priority,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  // Reset the spinner when `src` changes (adjust state during render, not an effect).
  const [prevSrc, setPrevSrc] = useState(src);
  if (src !== prevSrc) {
    setPrevSrc(src);
    setLoaded(false);
  }

  return (
    <>
      <Image
        key={src}
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={className}
        onLoad={() => setLoaded(true)}
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background">
          <div className="size-8 animate-spin rounded-full border-2 border-border-subtle border-t-content-muted" />
        </div>
      )}
    </>
  );
}
