'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

import { LOCALES, type Locale } from '@/app/_lib/locale';
import { useLocaleSwitch } from '@/app/_lib/use-locale-switch';
import type { Dictionary } from '@/app/[lang]/dictionaries';

interface LanguageSwitcherProps {
  lang: Locale;
  dict: Dictionary['languageSwitcher'];
  isTransparent?: boolean;
}

export function LanguageSwitcher({
  lang,
  dict,
  isTransparent = false,
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const switchLocale = useLocaleSwitch(lang);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (locale: Locale) => {
    setIsOpen(false);
    switchLocale(locale);
  };

  return (
    <div
      className="relative inline-block text-left cursor-pointer"
      ref={dropdownRef}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
          isTransparent
            ? 'bg-background/30 text-background hover:bg-background/40'
            : 'bg-border-subtle/40 text-content-main hover:bg-border-subtle/60'
        }`}
        aria-expanded={isOpen}
        aria-label={dict.label}
      >
        <GlobeAltIcon className="size-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 origin-top-right rounded-lg border border-border-subtle/80 bg-background shadow-lg ring-1 ring-black/5 focus:outline-hidden z-50">
          {LOCALES.map((locale) => {
            const isSelected = lang === locale;
            return (
              <button
                key={locale}
                type="button"
                onClick={() => handleSelectLanguage(locale)}
                className={`flex w-full items-center justify-between px-4 py-2 text-md transition-colors hover:bg-border-subtle/30 ${
                  isSelected
                    ? 'font-bold text-brand'
                    : 'font-normal text-content-main'
                }`}
              >
                <span>{dict[locale]}</span>
                {isSelected && <CheckIcon className="size-5 text-brand" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
