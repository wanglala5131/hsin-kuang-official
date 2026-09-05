import { notFound } from 'next/navigation';

import ProductDetail from '@/app/_components/Collections/ProductDetail';
import ProductModal from '@/app/_components/Collections/ProductModal';
import { getPageDictionary } from '@/app/_lib/get-page-dictionary';
import { getProductBySlug } from '@/app/[lang]/(public)/collections/_data';

interface Params {
  slug: string;
}

export default async function ProductModalPage({
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
    <ProductModal closeLabel={dict.collections.close}>
      <ProductDetail product={product} dict={dict.collections} />
    </ProductModal>
  );
}
