import { LXGW_WenKai_Mono_TC, Noto_Sans_TC } from 'next/font/google';
import { notFound } from 'next/navigation';

import '@/app/globals.css';

import Footer from '@/app/_components/Footer';
import Header from '@/app/_components/Header.tsx';
import { getSectionMetadata } from '@/app/_lib/get-page-dictionary';
import { isLocale, LOCALES } from '@/app/_lib/locale';
import { getDictionary } from '@/app/[lang]/dictionaries';

const sansFont = Noto_Sans_TC({
  weight: ['300', '400', '500', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const wenKaiZh = LXGW_WenKai_Mono_TC({
  weight: ['300', '400', '700'],
  variable: '--font-wen-kai-zh',
  display: 'swap',
});

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const generateMetadata = () => getSectionMetadata('root');

export default async function RootLayout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang === 'zh' ? 'zh-TW' : 'en'}
      className={`${sansFont.variable} ${wenKaiZh.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <Header
          lang={lang}
          dict={dict.nav}
          languageDict={dict.languageSwitcher}
        />
        <div className="bg-background">{children}</div>
        <Footer lang={lang} dict={dict.footer} />
      </body>
    </html>
  );
}
