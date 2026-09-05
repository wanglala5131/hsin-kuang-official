'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bars3Icon,
  ChatBubbleLeftEllipsisIcon,
  ClipboardDocumentListIcon,
  RectangleGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import { LanguageSwitcher } from '@/app/_components/LanguageSwitcher';
import type { Locale } from '@/app/_lib/locale';
import type { Dictionary } from '@/app/[lang]/dictionaries';

interface HeaderProps {
  lang: Locale;
  dict: Dictionary['nav'];
  languageDict: Dictionary['languageSwitcher'];
}

export default function Header({ lang, dict, languageDict }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const homeHref = `/${lang}`;
  const isHomePage = pathname === homeHref;

  const NAV_LINKS = [
    {
      name: dict.collections,
      href: `/${lang}/collections`,
      icon: RectangleGroupIcon,
    },
    {
      name: dict.customization,
      href: `/${lang}/customization`,
      icon: ClipboardDocumentListIcon,
    },
    {
      name: dict.contactUs,
      href: `/${lang}/contact-us`,
      icon: ChatBubbleLeftEllipsisIcon,
    },
  ];

  const isLinkActive = (href: string) => {
    if (href === homeHref) {
      return pathname === homeHref;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.8);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const isTransparent = isHomePage && !isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent
            ? 'bg-transparent py-5'
            : 'bg-background/80 backdrop-blur-md py-3 shadow-xs border-b border-border-subtle/60'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href={homeHref} className="flex items-center gap-3 group">
              <Image
                src="/logo.svg"
                width={isTransparent ? 52 : 36}
                height={isTransparent ? 52 : 36}
                alt="hsin kuang logo"
                priority
              />
              <span
                className={`text-2xl font-bold text-brand font-wen-kai-zh transition-all ${
                  isTransparent ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {dict.brand}
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-lg font-medium transition-all relative after:h-[2px] after:bg-brand after:absolute after:left-0 after:bottom-[-2px] after:transition-all ${
                      active
                        ? 'after:w-full text-brand font-semibold'
                        : 'after:w-0 hover:after:w-full'
                    } ${
                      isTransparent && !active
                        ? 'text-background text-shadow-md'
                        : isTransparent && active
                          ? 'text-white'
                          : !active
                            ? 'text-content-main'
                            : ''
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <LanguageSwitcher
                lang={lang}
                dict={languageDict}
                isTransparent={isTransparent}
              />
            </nav>

            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-md transition-colors cursor-pointer ${
                  isTransparent
                    ? 'text-background hover:bg-background/10'
                    : 'text-content-main hover:bg-border-subtle/40'
                }`}
                aria-label={dict.openMenu}
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="size-6" />
                ) : (
                  <Bars3Icon className="size-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        onClick={() => setIsMobileMenuOpen(false)}
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      <div
        className={`fixed inset-y-0 right-0 z-50 flex h-dvh w-full flex-col bg-background px-4 py-5 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-border-subtle/60 pb-4">
          <Link
            href={homeHref}
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3"
          >
            <Image
              src="/logo.svg"
              width={36}
              height={36}
              alt="hsin kuang logo"
            />
            <span className="text-3xl font-wen-kai-zh font-bold tracking-wider text-brand">
              {dict.brand}
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="rounded-md p-2 text-content-main hover:bg-border-subtle/40 cursor-pointer"
            aria-label={dict.closeMenu}
          >
            <XMarkIcon className="size-6" />
          </button>
        </div>

        <div className="flex flex-col gap-8 pt-8">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-xl flex gap-3 px-3 py-2.5 rounded-xl items-center font-medium transition-colors ${
                    active
                      ? 'bg-brand/10 text-brand font-semibold'
                      : 'text-content-main hover:text-brand hover:bg-border-subtle/20'
                  }`}
                >
                  <Icon className="size-6" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-border-subtle/60 pt-6">
            <LanguageSwitcher lang={lang} dict={languageDict} />
          </div>
        </div>
      </div>
    </>
  );
}
