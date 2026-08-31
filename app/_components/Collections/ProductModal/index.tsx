'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Props {
  children: React.ReactNode;
}

export default function ProductModal({ children }: Props) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') router.back();
    };
    document.addEventListener('keydown', handleKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [router]);

  return (
    <div
      onClick={() => router.back()}
      className="animate-fade-in fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/60 p-4 pt-20 backdrop-blur-xs sm:pt-24"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="animate-modal-in relative w-full max-w-4xl rounded-2xl bg-background p-5 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="關閉"
          className="absolute right-4 top-4 z-10 cursor-pointer rounded-full bg-background p-2 text-content-main shadow-sm ring-1 ring-border-subtle/60 transition-colors hover:bg-border-subtle/30"
        >
          <XMarkIcon className="size-5" />
        </button>

        {children}
      </div>
    </div>
  );
}
