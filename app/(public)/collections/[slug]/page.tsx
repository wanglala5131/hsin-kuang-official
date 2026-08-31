import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import ProductDetail from '@/app/_components/ProductDetail';
import { getProductBySlug, PRODUCTS } from '@/app/(public)/collections/_data';

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: '找不到產品 | 新光織帶 HSIN-KUANG' };
  }

  return {
    title: `${product.title} | 新光織帶 HSIN-KUANG`,
    description: product.description.join('，'),
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background mt-[65px] lg:mt-[60px]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-14">
        <Link
          href="/collections"
          className="mb-6 inline-flex items-center gap-1.5 text-md font-medium text-content-muted transition-colors hover:text-brand"
        >
          <ArrowLeftIcon className="size-5" />
          返回產品展示
        </Link>

        <ProductDetail product={product} />
      </div>
    </main>
  );
}
