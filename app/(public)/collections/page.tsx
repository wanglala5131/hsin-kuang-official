import CollectionsGrid from '@/app/_components/CollectionsGrid';
import PageBanner from '@/app/_components/PageBanner';
import { FILTER_GROUPS, PRODUCTS } from '@/app/(public)/collections/_data';

export const metadata = {
  title: '產品展示 | 新光織帶 HSIN-KUANG',
  description:
    '瀏覽新光織帶各式客製化織帶、繩帶產品，依用途、材質篩選您需要的規格。',
};

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-background mt-[65px] lg:mt-[60px]">
      <PageBanner
        imageUrl={`${IMAGE_BASE_URL}/speed-group.webp`}
        title="產品展示"
        enTitle="Collections"
      />

      <CollectionsGrid products={PRODUCTS} filterGroups={FILTER_GROUPS} />
    </main>
  );
}
