import {
  // ChatBubbleLeftRightIcon,
  ClockIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

interface ContactDetail {
  id: string;
  icon: typeof MapPinIcon;
  label: string;
  value: string;
  subValue?: string;
  href?: string;
  subValueHref?: string;
}

const contactDetails: ContactDetail[] = [
  {
    id: 'address',
    icon: MapPinIcon,
    label: '工廠地址',
    value: '彰化縣和美鎮彰美路四段135號',
  },
  {
    id: 'phone',
    icon: PhoneIcon,
    label: '電話 / 傳真',
    value: 'TEL: 04-7552626',
    subValue: 'FAX: 04-7552633',
    href: 'tel:047552626',
  },
  {
    id: 'email',
    icon: EnvelopeIcon,
    label: '電子信箱',
    value: 'sue4100035035@gmail.com',
    href: 'mailto:sue4100035035@gmail.com',
  },
  // {
  //   id: 'line',
  //   icon: ChatBubbleLeftRightIcon,
  //   label: '官方 LINE',
  //   value: '@hsinkuang',
  //   href: 'https://line.me/R/ti/p/@hsinkuang',
  // },
  {
    id: 'hours',
    icon: ClockIcon,
    label: '營業時間',
    value: '週一至週五 08:00 - 17:00',
  },
  {
    id: 'head',
    icon: UserIcon,
    label: '負責人',
    value: '王為正',
    subValue: '0928-525-626',
    subValueHref: 'tel:0928552626',
  },
];

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

export function ContactInfo() {
  return (
    <div className="rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col bg-warm-gray ring ring-border-subtle/20 shadow-sm h-full">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-brand block">
          Get in Touch
        </span>
        <h3 className="mt-2 text-2xl sm:text-3xl font-bold font-wen-kai-zh text-content-main">
          即時諮詢
        </h3>
        <p className="mt-2 text-sm content-muted leading-relaxed">
          歡迎透過以下資訊我們聯絡，我們將為您安排專人接洽。
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
