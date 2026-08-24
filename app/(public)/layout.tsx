import { LXGW_WenKai_Mono_TC, Noto_Sans_TC } from 'next/font/google';
import type { Metadata } from 'next';

import '@/app/globals.css';

import Footer from '@/app/_components/Footer';
import Header from '@/app/_components/Header.tsx';

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

export const metadata: Metadata = {
  title: '新光織帶 | 客製化各種織帶、後端加工',
  description: '待思考',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${sansFont.variable} ${wenKaiZh.variable}`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <div className="bg-background">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
