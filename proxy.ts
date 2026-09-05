import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_COOKIE,
  type Locale,
} from '@/app/_lib/locale';

function localeFromAcceptLanguage(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;

  const preferred = header.split(',')[0]?.trim().toLowerCase();
  return preferred?.startsWith('zh') ? 'zh' : DEFAULT_LOCALE;
}

function resolveLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && isLocale(cookieLocale)) return cookieLocale;

  return localeFromAcceptLanguage(request.headers.get('accept-language'));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Path already has a /zh or /en prefix — nothing to do.
  const [, firstSegment] = pathname.split('/');
  if (firstSegment && isLocale(firstSegment)) {
    return NextResponse.next();
  }

  // No locale in the path yet: figure out which one to use and redirect there.
  // (Root path gets `/en`, not `/en/` — the trailing slash would otherwise
  // cost a second redirect through Next's own trailing-slash normalization.)
  const locale = resolveLocale(request);
  const nextUrl = request.nextUrl.clone();
  nextUrl.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;

  // Remember the choice for next time.
  const response = NextResponse.redirect(nextUrl);
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}

export const config = {
  matcher: [
    // Skip Next internals, API routes, and static/image assets.
    '/((?!_next|api|favicon.ico|logo.svg|.*\\.(?:png|jpg|jpeg|webp|svg|ico)$).*)',
  ],
};
