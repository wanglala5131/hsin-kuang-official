'use client';

import { usePathname, useRouter } from 'next/navigation';

import type { Locale } from '@/app/_lib/locale';
import { setLocaleCookie } from '@/app/_lib/set-locale-cookie';

// Shared by the desktop dropdown and the mobile menu's plain buttons, so
// both switch locale the same way instead of duplicating this logic.
export function useLocaleSwitch(currentLang: Locale) {
  const pathname = usePathname();
  const router = useRouter();

  return (locale: Locale) => {
    if (locale === currentLang) return;

    // Swap the leading /zh or /en segment of the current path and remember
    // the choice so the proxy honors it on the next visit to an un-prefixed URL.
    const segments = pathname.split('/');
    segments[1] = locale;
    const nextPath = segments.join('/');

    setLocaleCookie(locale);
    router.push(nextPath);
  };
}
