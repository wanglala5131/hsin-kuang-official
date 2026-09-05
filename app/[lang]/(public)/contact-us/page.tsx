import { ContactForm } from '@/app/_components/ContactUs/ContactForm';
import { ContactInfo } from '@/app/_components/ContactUs/ContactInfo';
import PageBanner from '@/app/_components/PageBanner';
import {
  getPageDictionary,
  getSectionMetadata,
} from '@/app/_lib/get-page-dictionary';

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export const generateMetadata = () => getSectionMetadata('contactUs');

export default async function ContactPage() {
  const { locale, dict } = await getPageDictionary();

  return (
    <main className="min-h-screen bg-background mt-[65px] lg:mt-[60px]">
      <PageBanner
        lang={locale}
        imageUrl={`${IMAGE_BASE_URL}/hsin-kuang.webp`}
        imageAlt={dict.common.brandAlt}
        title={dict.pages.contactUs.bannerTitle}
        enTitle={dict.pages.contactUs.bannerEnTitle}
        imageClassName="object-[0_44%]"
      />

      <div className="max-w-6xl py-15 lg:py-20 relative z-20 px-3 md:mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 lg:md:gap-12 items-start">
          <div className="md:col-span-6 lg:col-span-5 h-full">
            <ContactInfo lang={locale} dict={dict.contactInfo} />
          </div>
          <div className="md:col-span-6 lg:col-span-7">
            <ContactForm lang={locale} dict={dict.contactForm} />
          </div>
        </div>
      </div>

      <section className="w-full border-t border-border-subtle bg-background">
        <div className="w-full h-[380px] sm:h-[450px] lg:h-[500px]">
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3641.939784071261!2d120.51010087534694!3d24.10361297843096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3469474588bc5303%3A0xe25fb7609fdab3bb!2z5paw5YWJ57mU5bi25bug!5e0!3m2!1s${dict.pages.contactUs.mapHl}!2stw!4v1788097031917!5m2!1s${dict.pages.contactUs.mapHl}!2stw`}
            width={'100%'}
            height={'100%'}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>
      </section>
    </main>
  );
}
