import CollectionForm from '@/app/_components/Admin/CollectionForm';

import { getLabelCategories, getLabels } from '../_data';

export default async function NewCollectionPage() {
  const [labels, categories] = await Promise.all([
    getLabels(),
    getLabelCategories(),
  ]);

  return (
    <CollectionForm mode="create" labels={labels} categories={categories} />
  );
}
