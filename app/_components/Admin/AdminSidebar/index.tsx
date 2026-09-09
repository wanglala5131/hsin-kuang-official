'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArchiveBoxIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';

const NAV_LINKS = [
  { name: '貨單管理', href: '/admin', icon: TruckIcon },
  { name: '產品管理', href: '/admin/products', icon: ArchiveBoxIcon },
  { name: '訊息管理', href: '/admin/messages', icon: ChatBubbleLeftRightIcon },
  { name: '資料管理', href: '/admin/data', icon: DocumentTextIcon },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 shrink-0 flex-col gap-6 border-r border-border-subtle bg-background px-4 py-6">
      <Link
        href="/admin"
        className="flex justify-center items-center gap-3 px-2"
      >
        <div className="flex gap-3">
          <Image src="/logo.svg" width={32} height={32} alt="hsin kuang logo" />
          <span className="font-wen-kai-zh text-2xl font-bold text-brand">
            新光織帶
          </span>
        </div>
      </Link>

      <div className="border-t border-border-subtle" />

      <nav className="flex flex-col gap-3">
        {NAV_LINKS.map((link) => {
          const Icon = link.icon;
          const active =
            pathname === link.href ||
            (link.href !== '/admin' && pathname.startsWith(`${link.href}/`));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-colors ${
                active
                  ? 'bg-brand text-background'
                  : 'bg-warm-gray/30 text-content-main hover:bg-warm-gray/50'
              }`}
            >
              <Icon className="size-5" />
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
