import type { Locale, Localized } from '@/app/_lib/locale';

export interface Product {
  slug: string;
  title: string;
  images: string[];
  tags: string[];
  description: string[];
}

export interface FilterGroup {
  id: string;
  label: string;
  tags: string[];
}

type TagId =
  | 'wrist-strap'
  | 'shoelace'
  | 'pet-supplies'
  | 'bag-handle'
  | 'lanyard'
  | 'apparel-accessory'
  | 'nylon'
  | 'cotton'
  | 'polyester'
  | 'elastic-material'
  | 'reflective-material'
  | 'metallic-thread'
  | 'custom-printing'
  | 'jacquard-pattern'
  | 'variegated-dye'
  | 'anti-slip-finish'
  | 'woven-pattern';

// Display labels are resolved from this canonical ID so a translated label
// can never drift from the ID used for filter matching (see getProducts /
// getFilterGroups below, which always resolve both sides from this map).
const TAG_LABELS: Record<TagId, Localized<string>> = {
  'wrist-strap': { zh: '手腕帶', en: 'Wrist Strap' },
  shoelace: { zh: '鞋帶', en: 'Shoelace' },
  'pet-supplies': { zh: '寵物用品', en: 'Pet Supplies' },
  'bag-handle': { zh: '包袋提把', en: 'Bag Handle' },
  lanyard: { zh: '識別證掛繩', en: 'Lanyard' },
  'apparel-accessory': { zh: '服飾配件', en: 'Apparel Accessory' },
  nylon: { zh: '尼龍', en: 'Nylon' },
  cotton: { zh: '純棉', en: 'Cotton' },
  polyester: { zh: '特多龍', en: 'Polyester' },
  'elastic-material': { zh: '彈力材質', en: 'Elastic Material' },
  'reflective-material': { zh: '反光材質', en: 'Reflective Material' },
  'metallic-thread': { zh: '金蔥線', en: 'Metallic Thread' },
  'custom-printing': { zh: '客製印刷', en: 'Custom Printing' },
  'jacquard-pattern': { zh: '提花圖案', en: 'Jacquard Pattern' },
  'variegated-dye': { zh: '段染', en: 'Variegated Dye' },
  'anti-slip-finish': { zh: '止滑處理', en: 'Anti-Slip Finish' },
  'woven-pattern': { zh: '編織花色', en: 'Woven Pattern' },
};

interface FilterGroupDef {
  id: string;
  label: Localized<string>;
  tags: TagId[];
}

// TODO: 目前為佔位資料，待實際產品資料 / CMS 就緒後替換
const FILTER_GROUP_DEFS: FilterGroupDef[] = [
  {
    id: 'usage',
    label: { zh: '用途', en: 'Usage' },
    tags: [
      'wrist-strap',
      'shoelace',
      'pet-supplies',
      'bag-handle',
      'lanyard',
      'apparel-accessory',
    ],
  },
  {
    id: 'material',
    label: { zh: '材質', en: 'Material' },
    tags: [
      'nylon',
      'cotton',
      'polyester',
      'elastic-material',
      'reflective-material',
      'metallic-thread',
    ],
  },
  {
    id: 'other',
    label: { zh: '其他', en: 'Other' },
    tags: [
      'custom-printing',
      'jacquard-pattern',
      'variegated-dye',
      'anti-slip-finish',
      'woven-pattern',
    ],
  },
];

interface ProductDef {
  slug: string;
  title: Localized<string>;
  images: string[];
  tags: TagId[];
  description: Localized<string[]>;
}

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const PRODUCT_DEFS: ProductDef[] = [
  {
    slug: 'nylon-wrist-strap',
    title: { zh: '各色尼龍手腕帶', en: 'Multicolor Nylon Wrist Strap' },
    images: [
      `${IMAGE_BASE_URL}/feature/wrist-strap.webp`,
      `${IMAGE_BASE_URL}/scenarios/wrist strap.webp`,
    ],
    tags: ['wrist-strap', 'nylon'],
    description: {
      zh: [
        '豐富色彩的尼龍繩，觸感柔軟',
        '可用於手腕帶、拐杖帶等用途',
        '支援指定長度裁切與打頭加工',
      ],
      en: [
        'Nylon cord in a wide range of colors, soft to the touch',
        'Suitable for wrist straps, cane straps, and similar uses',
        'Custom-length cutting and tipping available',
      ],
    },
  },
  {
    slug: 'cotton-drawstring',
    title: { zh: '成衣棉繩束口帶', en: 'Cotton Drawstring Cord' },
    images: [
      `${IMAGE_BASE_URL}/feature/tetoron-cotton.webp`,
      `${IMAGE_BASE_URL}/scenarios/drawstring-clothes.webp`,
    ],
    tags: ['apparel-accessory', 'cotton'],
    description: {
      zh: [
        '多用於衣褲類抽繩',
        '材質可選用純棉或特多龍等柔軟材質',
        '可依需求客製顏色與長度',
      ],
      en: [
        'Commonly used as drawstrings for apparel',
        'Available in soft materials such as cotton or polyester',
        'Color and length can be customized to your needs',
      ],
    },
  },
  {
    slug: 'solid-core-pet-leash',
    title: { zh: '實心包心寵物牽繩', en: 'Solid-Core Pet Leash' },
    images: [
      `${IMAGE_BASE_URL}/feature/solid-core-round-cord.webp`,
      `${IMAGE_BASE_URL}/scenarios/pet1.webp`,
      `${IMAGE_BASE_URL}/scenarios/pet2.webp`,
    ],
    tags: ['pet-supplies', 'polyester'],
    description: {
      zh: [
        '適用於需要較強拉力的情況',
        '常見於寵物牽繩、項圈等用途',
        '可調整粗細與拉力規格',
      ],
      en: [
        'Suited to applications requiring higher tensile strength',
        'Commonly used for pet leashes, collars, and similar items',
        'Thickness and tensile specs can be adjusted',
      ],
    },
  },
  {
    slug: 'air-duct-webbing',
    title: { zh: '風管包心織帶', en: 'Duct-Covering Webbing' },
    images: [`${IMAGE_BASE_URL}/feature/air-duct.webp`],
    tags: ['apparel-accessory', 'polyester'],
    description: {
      zh: [
        '將風管包覆於織帶中',
        '讓風管呈現更漂亮的外觀',
        '可依管徑客製包覆尺寸',
      ],
      en: [
        'Air ducts are woven directly into the webbing',
        'Giving the duct a cleaner, more finished appearance',
        'Wrap dimensions can be customized to the duct diameter',
      ],
    },
  },
  {
    slug: 'twisted-cord',
    title: { zh: '撚繩織帶', en: 'Twisted Cord Webbing' },
    images: [
      `${IMAGE_BASE_URL}/feature/twisted.webp`,
      `${IMAGE_BASE_URL}/scenarios/bag1.webp`,
    ],
    tags: ['bag-handle', 'polyester'],
    description: {
      zh: [
        '利用旋轉方式編織而成',
        '能承受較大拉伸強度',
        '適合包袋、束口等承重用途',
      ],
      en: [
        'Woven using a twisting technique',
        'Able to withstand higher tensile stress',
        'Suitable for load-bearing uses such as bags and drawstrings',
      ],
    },
  },
  {
    slug: 'parent-child-webbing',
    title: { zh: '子母帶', en: 'Two-Tone Webbing' },
    images: [`${IMAGE_BASE_URL}/feature/子母帶.webp`],
    tags: ['apparel-accessory', 'woven-pattern'],
    description: {
      zh: ['具有特殊編法的織帶', '常用於裝飾與藝術用途', '可搭配多種配色組合'],
      en: [
        'A specially woven webbing pattern',
        'Often used for decorative and artistic purposes',
        'Available in a variety of color combinations',
      ],
    },
  },
  {
    slug: 'custom-print-webbing',
    title: { zh: '客製印刷織帶', en: 'Custom-Printed Webbing' },
    images: [
      `${IMAGE_BASE_URL}/feature/print.webp`,
      `${IMAGE_BASE_URL}/scenarios/lanyard.webp`,
    ],
    tags: ['lanyard', 'custom-printing'],
    description: {
      zh: [
        '可自由選擇印刷類型與形式',
        '支援熱轉印、鋼板印刷等工法',
        '常用於識別證掛繩、品牌織帶',
      ],
      en: [
        'Choose freely from a variety of printing types and formats',
        'Supports heat-transfer printing, plate printing, and other techniques',
        'Commonly used for lanyards and branded webbing',
      ],
    },
  },
  {
    slug: 'speed-style-webbing',
    title: { zh: '各式編織高速帶', en: 'Woven High-Speed Webbing' },
    images: [`${IMAGE_BASE_URL}/feature/speed-style.webp`],
    tags: ['bag-handle', 'woven-pattern'],
    description: {
      zh: [
        '利用不同顏色絲線編織而成',
        '可呈現多種花色與紋路',
        '適合包袋提把、裝飾用途',
      ],
      en: [
        'Woven from threads of different colors',
        'Can display a variety of patterns and textures',
        'Suitable for bag handles and decorative uses',
      ],
    },
  },
  {
    slug: 'braiding-style-webbing',
    title: { zh: '各式編織走馬帶', en: 'Woven Braided Webbing' },
    images: [
      `${IMAGE_BASE_URL}/feature/braiding-style.webp`,
      `${IMAGE_BASE_URL}/scenarios/shoelace1.webp`,
      `${IMAGE_BASE_URL}/scenarios/shoelace2.webp`,
    ],
    tags: ['shoelace', 'woven-pattern'],
    description: {
      zh: [
        '利用不同顏色絲線編織而成',
        '可呈現多種花色與紋路',
        '適合鞋帶、束口繩等用途',
      ],
      en: [
        'Woven from threads of different colors',
        'Can display a variety of patterns and textures',
        'Suitable for shoelaces, drawstrings, and similar uses',
      ],
    },
  },
  {
    slug: 'variegated-webbing',
    title: { zh: '段染織帶', en: 'Variegated Dye Webbing' },
    images: [`${IMAGE_BASE_URL}/feature/variegated.webp`],
    tags: ['apparel-accessory', 'variegated-dye'],
    description: {
      zh: [
        '可搭配喜愛的漸層色彩',
        '呈現獨特的視覺效果',
        '適合服飾配件、包袋裝飾',
      ],
      en: [
        'Pair it with your favorite gradient color combinations',
        'Creates a distinctive visual effect',
        'Suitable for apparel accessories and bag decoration',
      ],
    },
  },
  {
    slug: 'jacquard-webbing',
    title: { zh: '提花帶', en: 'Jacquard Webbing' },
    images: [`${IMAGE_BASE_URL}/feature/jacquard.webp`],
    tags: ['lanyard', 'jacquard-pattern'],
    description: {
      zh: [
        '可在織帶中加入裝飾與藝術圖樣',
        '圖樣包含圖騰、Logo 等',
        '適合品牌識別、禮贈品用途',
      ],
      en: [
        'Decorative and artistic patterns can be woven into the webbing',
        'Patterns include totems, logos, and more',
        'Suitable for brand identity and gift items',
      ],
    },
  },
  {
    slug: 'anti-slip-webbing',
    title: { zh: '止滑織帶', en: 'Anti-Slip Webbing' },
    images: [
      `${IMAGE_BASE_URL}/feature/anti-slip.webp`,
      `${IMAGE_BASE_URL}/scenarios/backpack1.webp`,
      `${IMAGE_BASE_URL}/scenarios/backpack2.webp`,
    ],
    tags: ['bag-handle', 'anti-slip-finish'],
    description: {
      zh: [
        '加入橡膠防止滑動的特殊織帶',
        '提升止滑抓地與耐磨表現',
        '適合背包背帶、瑜珈帶等用途',
      ],
      en: [
        'A specialty webbing with rubber woven in to prevent slipping',
        'Improves grip and abrasion resistance',
        'Suitable for backpack straps, yoga straps, and similar uses',
      ],
    },
  },
  {
    slug: 'elasticity-cord',
    title: { zh: '彈力圓帶', en: 'Elastic Round Cord' },
    images: [`${IMAGE_BASE_URL}/feature/elasticity-cord.webp`],
    tags: ['apparel-accessory', 'elastic-material'],
    description: {
      zh: [
        '將高彈力橡膠包覆於走馬帶中',
        '使織帶具備良好彈性',
        '適合服飾、鬆緊帶等用途',
      ],
      en: [
        'High-elasticity rubber is encased within braided webbing',
        'Giving the webbing excellent stretch',
        'Suitable for apparel, elastic bands, and similar uses',
      ],
    },
  },
  {
    slug: 'elasticity-belt',
    title: { zh: '彈力扁帶', en: 'Elastic Flat Webbing' },
    images: [`${IMAGE_BASE_URL}/feature/elasticity-belt.webp`],
    tags: ['apparel-accessory', 'elastic-material'],
    description: {
      zh: [
        '將高彈力橡膠編入高速帶中',
        '使織帶具備良好彈性',
        '適合腰帶、運動用品等用途',
      ],
      en: [
        'High-elasticity rubber is woven into high-speed webbing',
        'Giving the webbing excellent stretch',
        'Suitable for waistbands, sports gear, and similar uses',
      ],
    },
  },
  {
    slug: 'reflective-webbing',
    title: { zh: '反光織帶', en: 'Reflective Webbing' },
    images: [`${IMAGE_BASE_URL}/feature/reflective.webp`],
    tags: ['apparel-accessory', 'reflective-material'],
    description: {
      zh: [
        '將反光材質編入織帶中',
        '提升夜間辨識度與安全性',
        '常用於運動衣物、工作服',
      ],
      en: [
        'Reflective material is woven into the webbing',
        'Improves nighttime visibility and safety',
        'Commonly used in sportswear and workwear',
      ],
    },
  },
  {
    slug: 'golden-silver-webbing',
    title: { zh: '金蔥銀蔥織帶', en: 'Gold/Silver Metallic Webbing' },
    images: [`${IMAGE_BASE_URL}/feature/golden:sliver.webp`],
    tags: ['lanyard', 'metallic-thread'],
    description: {
      zh: [
        '將金蔥線或銀蔥線編入織帶中',
        '達到閃亮吸睛效果',
        '適合節慶禮品、裝飾用途',
      ],
      en: [
        'Gold or silver metallic thread is woven into the webbing',
        'Creating a sparkling, eye-catching effect',
        'Suitable for festive gifts and decorative uses',
      ],
    },
  },
];

export function getFilterGroups(locale: Locale): FilterGroup[] {
  return FILTER_GROUP_DEFS.map((group) => ({
    id: group.id,
    label: group.label[locale],
    tags: group.tags.map((tag) => TAG_LABELS[tag][locale]),
  }));
}

export function getProducts(locale: Locale): Product[] {
  return PRODUCT_DEFS.map((product) => ({
    slug: product.slug,
    title: product.title[locale],
    images: product.images,
    tags: product.tags.map((tag) => TAG_LABELS[tag][locale]),
    description: product.description[locale],
  }));
}

export function getAllSlugs(): string[] {
  return PRODUCT_DEFS.map((product) => product.slug);
}

export function getProductBySlug(
  slug: string,
  locale: Locale,
): Product | undefined {
  return getProducts(locale).find((product) => product.slug === slug);
}
