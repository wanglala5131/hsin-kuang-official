'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

const LANGUAGES = [
  { code: 'zh', label: '繁體中文' },
  { code: 'en', label: 'English' },
];

interface LanguageSwitcherProps {
  isTransparent?: boolean;
}

export function LanguageSwitcher({
  isTransparent = false,
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('zh');
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleSelectLanguage = (code: string) => {
    setCurrentLang(code);
    setIsOpen(false);
    // TODO: 未來在此串接 i18n 路由或切換語系的邏輯
  };

  return (
    <div
      className="relative inline-block text-left cursor-pointer"
      ref={dropdownRef}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all  ${
          isTransparent
            ? 'bg-background/30 text-background hover:bg-background/40'
            : 'bg-border-subtle/40 text-content-main hover:bg-border-subtle/60'
        }`}
        aria-expanded={isOpen}
        aria-label="切換語言"
      >
        <GlobeAltIcon className="size-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 origin-top-right rounded-lg border border-border-subtle/80 bg-background shadow-lg ring-1 ring-black/5 focus:outline-hidden z-50">
          {LANGUAGES.map((lang) => {
            const isSelected = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelectLanguage(lang.code)}
                className={`flex w-full items-center justify-between px-4 py-2 text-md transition-colors hover:bg-border-subtle/30 ${
                  isSelected
                    ? 'font-bold text-brand'
                    : 'font-normal text-content-main'
                }`}
              >
                <span>{lang.label}</span>
                {isSelected && <CheckIcon className="size-5 text-brand" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
