export const LOCALES = ['zh', 'en'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_COOKIE = 'NEXT_LOCALE';

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export type Localized<T> = Record<Locale, T>;

// The decorative LXGW WenKai heading font is zh-only; en headings fall back
// to the page's default sans font instead.
export const HEADING_FONT_CLASS: Localized<string> = {
  zh: 'font-wen-kai-zh',
  en: '',
};

// Noto Sans TC's 700 weight reads heavier than LXGW WenKai's, so en headings
// use a lighter weight to match the zh version's visual boldness.
export const HEADING_WEIGHT_CLASS: Localized<string> = {
  zh: 'font-bold',
  en: 'font-medium',
};
