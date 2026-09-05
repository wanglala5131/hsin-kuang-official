import Image from 'next/image';
import Link from 'next/link';

import { CONTACT_INFO } from '@/app/_lib/contact-info';
import {
  HEADING_FONT_CLASS,
  HEADING_WEIGHT_CLASS,
  type Locale,
} from '@/app/_lib/locale';
import type { Dictionary } from '@/app/[lang]/dictionaries';

interface FooterProps {
  lang: Locale;
  dict: Dictionary['footer'];
}

export default function Footer({ lang, dict }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const itemClassName =
    'col-span-2 grid grid-cols-subgrid items-center gap-x-3';
  const labelClassName =
    'text-xs font-medium text-content-muted tracking-wider uppercase bg-border-subtle/40 px-1.5 py-0.5 rounded text-center';
  const linkClassName =
    'hover:text-brand transition-colors underline underline-offset-4 decoration-border-subtle hover:decoration-brand';

  return (
    <footer className="relative w-full bg-warm-gray/20 border-t border-border-subtle text-content-main px-6 pt-10 pb-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-start gap-8 md:gap-12">
        <div className="flex flex-col gap-2 shrink-0">
          <Link href={`/${lang}`} className="flex items-center gap-3 group">
            <Image
              src="/logo.svg"
              alt={`${dict.brandAlt} Logo`}
              width={60}
              height={60}
              className="h-10 w-auto object-contain"
              priority={false}
            />
            <span
              className={`text-3xl tracking-wider text-brand transition-opacity group-hover:opacity-90 ${HEADING_FONT_CLASS[lang]} ${HEADING_WEIGHT_CLASS[lang]}`}
            >
              {dict.brand}
            </span>
          </Link>
          <p className="text-xs text-content-muted tracking-widest pl-0.5 whitespace-pre-line">
            {dict.tagline}
          </p>
        </div>

        <div className="w-full h-px md:w-px md:h-24 bg-border-subtle shrink-0" />

        <address className="grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto_1fr] gap-x-8 gap-y-3 text-sm text-content-main not-italic leading-relaxed">
          <div className={itemClassName}>
            <span className={labelClassName}>{dict.phone}</span>
            <div className="text-content-muted">
              <Link
                href={`tel:${CONTACT_INFO.phone.tel}`}
                className="hover:text-brand transition-colors mr-1"
              >
                {CONTACT_INFO.phone.display[lang]}
              </Link>
              /
              <Link
                href={`tel:${CONTACT_INFO.mobile.tel}`}
                className="hover:text-brand transition-colors ml-1"
              >
                {CONTACT_INFO.mobile.display[lang]}
              </Link>
            </div>
          </div>

          <div className={itemClassName}>
            <span className={labelClassName}>{dict.email}</span>
            <Link
              href={`mailto:${CONTACT_INFO.email}`}
              className={`${linkClassName} text-content-muted`}
            >
              {CONTACT_INFO.email}
            </Link>
          </div>

          <div className={itemClassName}>
            <span className={labelClassName}>{dict.fax}</span>
            <span className="text-content-muted">
              {CONTACT_INFO.fax.display[lang]}
            </span>
          </div>

          <div className={itemClassName}>
            <span className={labelClassName}>{dict.partner}</span>
            <Link
              href="https://pengsbrand.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClassName} text-content-muted`}
            >
              Peng&apos;s Laces
            </Link>
          </div>

          <div className={itemClassName}>
            <span className={labelClassName}>{dict.address}</span>
            <span className="text-content-muted">
              {CONTACT_INFO.address[lang]}
            </span>
          </div>
        </address>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-border-subtle/60 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-content-muted">
        <p>
          &copy; {currentYear} {dict.rightsReserved}
        </p>
        <p className="tracking-wide">{dict.designedBy}</p>
      </div>
    </footer>
  );
}
