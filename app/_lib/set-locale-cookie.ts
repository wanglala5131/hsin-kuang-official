import { LOCALE_COOKIE, type Locale } from '@/app/_lib/locale';

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

// Kept as a standalone module function (rather than inline in a component)
// so the browser-global mutation isn't analyzed as part of a component body.
export function setLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${ONE_YEAR_IN_SECONDS}; samesite=lax`;
}
