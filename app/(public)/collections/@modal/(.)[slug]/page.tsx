import { notFound } from 'next/navigation';

import ProductDetail from '@/app/_components/Collections/ProductDetail';
import ProductModal from '@/app/_components/Collections/ProductModal';
import { getProductBySlug } from '@/app/(public)/collections/_data';

export default async function ProductModalPage({
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
    <ProductModal>
      <ProductDetail product={product} />
    </ProductModal>
  );
}
