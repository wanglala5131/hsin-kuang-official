'use client';

import { useState } from 'react';
import { ShareIcon } from '@heroicons/react/24/outline';

interface Props {
  title: string;
}

export default function ShareProductButton({ title }: Props) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // 使用者取消分享，不做任何處理
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard 無法使用時靜默失敗
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-brand px-5 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-brand/10"
    >
      <ShareIcon className="size-4" />
      {copied ? '連結已複製' : '分享產品頁面'}
    </button>
  );
}
