import {
  ClockIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

import { CONTACT_INFO } from '@/app/_lib/contact-info';
import {
  HEADING_FONT_CLASS,
  HEADING_WEIGHT_CLASS,
  type Locale,
} from '@/app/_lib/locale';
import type { Dictionary } from '@/app/[lang]/dictionaries';

interface Props {
  lang: Locale;
  dict: Dictionary['contactInfo'];
}

interface TextOrLinkProps {
  text: string;
  href?: string;
}

function ContactValueItem({ text, href }: TextOrLinkProps) {
  const isExternal = href?.startsWith('http');
  const className =
    'text-sm sm:text-base text-content-main break-words inline-block';

  if (!href) {
    return <p className={className}>{text}</p>;
  }

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`${className} hover:underline hover:text-brand transition-colors`}
    >
      {text}
    </a>
  );
}

export function ContactInfo({ lang, dict }: Props) {
  const contactDetails = [
    {
      id: 'address',
      icon: MapPinIcon,
      label: dict.addressLabel,
      value: CONTACT_INFO.address[lang],
    },
    {
      id: 'phone',
      icon: PhoneIcon,
      label: dict.phoneLabel,
      value: `TEL: ${CONTACT_INFO.phone.display[lang]}`,
      subValue: `FAX: ${CONTACT_INFO.fax.display[lang]}`,
      href: `tel:${CONTACT_INFO.phone.tel}`,
    },
    {
      id: 'email',
      icon: EnvelopeIcon,
      label: dict.emailLabel,
      value: CONTACT_INFO.email,
      href: `mailto:${CONTACT_INFO.email}`,
    },
    {
      id: 'hours',
      icon: ClockIcon,
      label: dict.hoursLabel,
      value: CONTACT_INFO.hours[lang],
    },
    {
      id: 'head',
      icon: UserIcon,
      label: dict.ownerLabel,
      value: CONTACT_INFO.owner.name[lang],
      subValue: CONTACT_INFO.owner.mobile.display[lang],
      subValueHref: `tel:${CONTACT_INFO.owner.mobile.tel}`,
    },
  ];

  return (
    <div className="rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col bg-warm-gray ring ring-border-subtle/20 shadow-sm h-full">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-brand block">
          {dict.eyebrow}
        </span>
        <h3
          className={`mt-2 text-2xl sm:text-3xl text-content-main ${HEADING_FONT_CLASS[lang]} ${HEADING_WEIGHT_CLASS[lang]}`}
        >
          {dict.heading}
        </h3>
        <p className="mt-2 text-sm text-content-muted leading-relaxed">
          {dict.description}
        </p>
      </div>

      <ul className="mt-8">
        {contactDetails.map((item) => {
          const Icon = item.icon;
          return (
            <li
              key={item.id}
              className="flex items-center gap-2 lg:gap-4 py-5 border-t-2 border-brand/20 last:border-b-2 last:border-brand/20"
            >
              <div className="flex-shrink-0 size-8 lg:size-11 rounded-full bg-brand flex items-center justify-center">
                <Icon className="size-5 text-white" />
              </div>
              <div className="min-w-0 flex-1 flex flex-col">
                <p className="text-xs font-medium text-brand tracking-wide">
                  {item.label}
                </p>

                <ContactValueItem text={item.value} href={item.href} />

                {item.subValue && (
                  <ContactValueItem
                    text={item.subValue}
                    href={item.subValueHref}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
