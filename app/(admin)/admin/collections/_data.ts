import type { Localized } from '@/app/_lib/locale';

// Admin-only mock data, kept separate from the public collections _data.ts.

export interface LabelCategory {
  id: string;
  name: Localized<string>;
}

export interface Label {
  id: string;
  categoryId: string;
  name: Localized<string>;
}

export interface AdminCollection {
  slug: string;
  title: Localized<string>;
  images: string[];
  labelIds: string[];
  description: Localized<string[]>;
}

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const CATEGORY_DEFS: LabelCategory[] = [
  { id: 'usage', name: { zh: '用途', en: 'Usage' } },
  { id: 'material', name: { zh: '材質', en: 'Material' } },
  { id: 'other', name: { zh: '其他', en: 'Other' } },
];

const LABEL_DEFS: Label[] = [
  {
    id: 'wrist-strap',
    categoryId: 'usage',
    name: { zh: '手腕帶', en: 'Wrist Strap' },
  },
  { id: 'shoelace', categoryId: 'usage', name: { zh: '鞋帶', en: 'Shoelace' } },
  {
    id: 'pet-supplies',
    categoryId: 'usage',
    name: { zh: '寵物用品', en: 'Pet Supplies' },
  },
  { id: 'nylon', categoryId: 'material', name: { zh: '尼龍', en: 'Nylon' } },
  { id: 'cotton', categoryId: 'material', name: { zh: '純棉', en: 'Cotton' } },
  {
    id: 'polyester',
    categoryId: 'material',
    name: { zh: '特多龍', en: 'Polyester' },
  },
  {
    id: 'custom-printing',
    categoryId: 'other',
    name: { zh: '客製印刷', en: 'Custom Printing' },
  },
  {
    id: 'reflective-material',
    categoryId: 'other',
    name: { zh: '反光材質', en: 'Reflective Material' },
  },
];

const COLLECTION_DEFS: AdminCollection[] = [
  {
    slug: 'nylon-wrist-strap',
    title: { zh: '各色尼龍手腕帶', en: 'Multicolor Nylon Wrist Strap' },
    images: [`${IMAGE_BASE_URL}/feature/wrist-strap.webp`],
    labelIds: ['wrist-strap', 'nylon'],
    description: {
      zh: ['豐富色彩的尼龍繩，觸感柔軟', '可用於手腕帶、拐杖帶等用途'],
      en: [
        'Nylon cord in a wide range of colors, soft to the touch',
        'Suitable for wrist straps, cane straps, and similar uses',
      ],
    },
  },
  {
    slug: 'cotton-drawstring',
    title: { zh: '成衣棉繩束口帶', en: 'Cotton Drawstring Cord' },
    images: [`${IMAGE_BASE_URL}/feature/tetoron-cotton.webp`],
    labelIds: ['cotton'],
    description: {
      zh: ['多用於衣褲類抽繩', '材質可選用純棉或特多龍等柔軟材質'],
      en: [
        'Commonly used as drawstrings for apparel',
        'Available in soft materials such as cotton or polyester',
      ],
    },
  },
  {
    slug: 'solid-core-pet-leash',
    title: { zh: '實心包心寵物牽繩', en: 'Solid-Core Pet Leash' },
    images: [`${IMAGE_BASE_URL}/feature/solid-core-round-cord.webp`],
    labelIds: ['pet-supplies', 'polyester'],
    description: {
      zh: ['適用於需要較強拉力的情況', '常見於寵物牽繩、項圈等用途'],
      en: [
        'Suited to applications requiring higher tensile strength',
        'Commonly used for pet leashes, collars, and similar items',
      ],
    },
  },
  {
    slug: 'custom-print-webbing',
    title: { zh: '客製印刷織帶', en: 'Custom-Printed Webbing' },
    images: [`${IMAGE_BASE_URL}/feature/print.webp`],
    labelIds: ['custom-printing'],
    description: {
      zh: ['可自由選擇印刷類型與形式', '常用於識別證掛繩、品牌織帶'],
      en: [
        'Choose freely from a variety of printing types and formats',
        'Commonly used for lanyards and branded webbing',
      ],
    },
  },
  {
    slug: 'reflective-webbing',
    title: { zh: '反光織帶', en: 'Reflective Webbing' },
    images: [`${IMAGE_BASE_URL}/feature/reflective.webp`],
    labelIds: ['reflective-material'],
    description: {
      zh: ['將反光材質編入織帶中', '提升夜間辨識度與安全性'],
      en: [
        'Reflective material is woven into the webbing',
        'Improves nighttime visibility and safety',
      ],
    },
  },
];

// TODO: 待資料庫 / API 就緒後，改為實際的 fetch 呼叫
// TODO: 屆時決定 page.tsx 走 server component 還是 client component 抓資料，擇一不要混用
export async function getCollections(): Promise<AdminCollection[]> {
  return COLLECTION_DEFS;
}

export async function getCollectionBySlug(
  slug: string,
): Promise<AdminCollection | undefined> {
  return COLLECTION_DEFS.find((collection) => collection.slug === slug);
}

export async function getLabelCategories(): Promise<LabelCategory[]> {
  return CATEGORY_DEFS;
}

export async function getLabels(): Promise<Label[]> {
  return LABEL_DEFS;
}
