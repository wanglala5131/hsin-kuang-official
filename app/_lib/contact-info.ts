import type { Localized } from '@/app/_lib/locale';

// Single source of truth for the factory's contact details, consumed by both
// the Footer and the Contact page's ContactInfo panel. These used to be
// hardcoded independently in each place and had drifted out of sync — keep
// any future correction here instead of editing the components directly.
export const CONTACT_INFO = {
  phone: {
    display: {
      zh: '(04) 755-2626',
      en: '+886 4 755-2626',
    } satisfies Localized<string>,
    tel: '+88647552626',
  },
  mobile: {
    display: {
      zh: '0928-552-626',
      en: '+886 928-552-626',
    } satisfies Localized<string>,
    tel: '+886928552626',
  },
  fax: {
    display: {
      zh: '(04) 755-2633',
      en: '+886 4 755-2633',
    } satisfies Localized<string>,
  },
  email: 'sue4100035045@gmail.com',
  address: {
    zh: '彰化縣和美鎮彰美路四段135號',
    en: 'No. 135, Sec. 4, Zhangmei Rd., Hemei Township, Changhua County, Taiwan',
  } satisfies Localized<string>,
  hours: {
    zh: '週一至週五 08:00 - 17:00',
    en: 'Mon–Fri 08:00–17:00',
  } satisfies Localized<string>,
  owner: {
    name: {
      zh: '王為正',
      en: 'Wei-Zheng Wang',
    } satisfies Localized<string>,
    mobile: {
      display: {
        zh: '0928-525-626',
        en: '+886 928-525-626',
      } satisfies Localized<string>,
      tel: '+886928525626',
    },
  },
} as const;
