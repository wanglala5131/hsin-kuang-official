import { notFound } from 'next/navigation';

import CollectionForm from '@/app/_components/Admin/CollectionForm';

import {
  getCollectionBySlug,
  getLabelCategories,
  getLabels,
} from '../../_data';

interface Params {
  slug: string;
}

export default async function EditCollectionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const [collection, labels, categories] = await Promise.all([
    getCollectionBySlug(slug),
    getLabels(),
    getLabelCategories(),
  ]);

  if (!collection) notFound();

  return (
    <CollectionForm
      mode="edit"
      initialData={collection}
      labels={labels}
      categories={categories}
    />
  );
}
