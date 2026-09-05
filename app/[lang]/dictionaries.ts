import 'server-only';

import type { Locale } from '@/app/_lib/locale';

const dictionaries = {
  zh: () => import('./dictionaries/zh.json').then((module) => module.default),
  en: () => import('./dictionaries/en.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
