import CollectionsGrid from '@/app/_components/Collections/CollectionsGrid';
import PageBanner from '@/app/_components/PageBanner';
import {
  getPageDictionary,
  getSectionMetadata,
} from '@/app/_lib/get-page-dictionary';
import {
  getFilterGroups,
  getProducts,
} from '@/app/[lang]/(public)/collections/_data';

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export const generateMetadata = () => getSectionMetadata('collections');

export default async function CollectionsPage() {
  const { locale, dict } = await getPageDictionary();

  return (
    <main className="min-h-screen bg-background mt-[65px] lg:mt-[60px]">
      <PageBanner
        lang={locale}
        imageUrl={`${IMAGE_BASE_URL}/speed-group.webp`}
        imageAlt={dict.common.brandAlt}
        title={dict.pages.collections.bannerTitle}
        enTitle={dict.pages.collections.bannerEnTitle}
      />

      <CollectionsGrid
        products={getProducts(locale)}
        filterGroups={getFilterGroups(locale)}
        lang={locale}
        dict={dict.collections}
      />
    </main>
  );
}
