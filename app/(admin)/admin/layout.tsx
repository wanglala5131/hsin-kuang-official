import { LXGW_WenKai_Mono_TC, Noto_Sans_TC } from 'next/font/google';
import type { Metadata } from 'next';

import '@/app/globals.css';

import AdminSidebar from '@/app/_components/Admin/AdminSidebar';

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
  title: '新光織帶 | 後台管理',
  robots: { index: false, follow: false },
};

// Admin panel is zh-only and lives outside the [lang] tree, so this is the
// root layout for that branch (Next.js supports multiple root layouts).
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW" className={`${sansFont.variable} ${wenKaiZh.variable}`}>
      <body className="min-h-dvh bg-background">
        <div className="flex h-dvh overflow-hidden">
          <AdminSidebar />
          <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
