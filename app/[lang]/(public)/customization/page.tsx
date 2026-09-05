import CustomizationDeck from '@/app/_components/Customization/CustomizationDeck';
import PageBanner from '@/app/_components/PageBanner';
import {
  getPageDictionary,
  getSectionMetadata,
} from '@/app/_lib/get-page-dictionary';
import { getCustomizationItems } from '@/app/[lang]/(public)/customization/_data';

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export const generateMetadata = () => getSectionMetadata('customization');

export default async function CustomizationPage() {
  const { locale, dict } = await getPageDictionary();
  const items = getCustomizationItems(locale);

  return (
    <main className="min-h-screen bg-background mt-[65px] lg:mt-[60px]">
      <PageBanner
        imageUrl={`${IMAGE_BASE_URL}/customization/pet-rope.webp`}
        imageAlt={dict.common.brandAlt}
        title={dict.pages.customization.bannerTitle}
        enTitle={dict.pages.customization.bannerEnTitle}
      />

      <div className="py-8 lg:py-12">
        <div className="mx-auto mb-7 lg:mb-12 max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-wen-kai-zh text-2xl font-bold text-content-main sm:text-3xl">
            {dict.pages.customization.sectionTitle}
          </h2>
          <p className="mt-2 text-md text-content-muted">
            {dict.pages.customization.sectionSubtitle}
          </p>
        </div>

        <CustomizationDeck items={items} />
      </div>
    </main>
  );
}
