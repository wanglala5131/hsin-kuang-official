import 'server-only';

import type { Locale } from '@/app/_lib/locale';

import en from './dictionaries/en.json';
import zh from './dictionaries/zh.json';

const dictionaries = { zh, en };

export async function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
