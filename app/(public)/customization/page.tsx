import CustomizationDeck from '@/app/_components/Customization/CustomizationDeck';
import PageBanner from '@/app/_components/PageBanner';

export const metadata = {
  title: '客製服務 | 新光織帶 HSIN-KUANG',
  description:
    '從用途、外型與織法、材質、顏色尺寸到後端加工，提供一站式織帶客製化服務。',
};

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export default function CustomizationPage() {
  return (
    <main className="min-h-screen bg-background mt-[65px] lg:mt-[60px]">
      <PageBanner
        imageUrl={`${IMAGE_BASE_URL}/customization/pet-rope.webp`}
        title="客製服務"
        enTitle="Customization Service"
      />

      <div className="py-8 lg:py-12">
        <div className="mx-auto mb-7 lg:mb-12 max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-wen-kai-zh text-2xl font-bold text-content-main sm:text-3xl">
            可選擇的客製化項目
          </h2>
          <p className="mt-2 text-md text-content-muted">
            點選標籤，來知道更多細節
          </p>
        </div>

        <CustomizationDeck />
      </div>
    </main>
  );
}
