import CollectionsManager from '@/app/_components/Admin/CollectionsManager';

import { getCollections, getLabelCategories, getLabels } from './_data';

export default async function CollectionsPage() {
  const [collections, categories, labels] = await Promise.all([
    getCollections(),
    getLabelCategories(),
    getLabels(),
  ]);

  return (
    <CollectionsManager
      initialCollections={collections}
      initialCategories={categories}
      initialLabels={labels}
    />
  );
}
