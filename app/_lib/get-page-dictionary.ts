import { cache } from 'react';
import { notFound } from 'next/navigation';
import { lang } from 'next/root-params';
import type { Metadata } from 'next';

import { isLocale } from '@/app/_lib/locale';
import type { Dictionary } from '@/app/[lang]/dictionaries';
import { getDictionary } from '@/app/[lang]/dictionaries';

// Both a page's `generateMetadata` and its component call this, so cache()
// dedupes the root-param + dictionary lookup to once per request.
export const getPageDictionary = cache(async () => {
  const locale = await lang();
  if (!locale || !isLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  return { locale, dict };
});

export async function getSectionMetadata(
  section: keyof Dictionary['pages'],
): Promise<Metadata> {
  const { dict } = await getPageDictionary();
  const page = dict.pages[section];
  return {
    title: page.metaTitle,
    description: page.metaDescription,
  };
}
