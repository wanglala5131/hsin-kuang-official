import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import ProductDetail from '@/app/_components/Collections/ProductDetail';
import { getPageDictionary } from '@/app/_lib/get-page-dictionary';
import {
  getAllSlugs,
  getProductBySlug,
} from '@/app/[lang]/(public)/collections/_data';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

interface Params {
  slug: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const { locale, dict } = await getPageDictionary();
  const product = getProductBySlug(slug, locale);

  if (!product) {
    return { title: dict.pages.collections.notFoundTitle };
  }

  return {
    title: `${product.title} | ${dict.common.brand}`,
    description: product.description.join(locale === 'en' ? ', ' : '，'),
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const { locale, dict } = await getPageDictionary();
  const product = getProductBySlug(slug, locale);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background mt-[65px] lg:mt-[60px]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-14">
        <Link
          href={`/${locale}/collections`}
          className="mb-6 inline-flex items-center gap-1.5 text-md font-medium text-content-muted transition-colors hover:text-brand"
        >
          <ArrowLeftIcon className="size-5" />
          {dict.pages.collections.backToCollections}
        </Link>

        <ProductDetail product={product} dict={dict.collections} />
      </div>
    </main>
  );
}
