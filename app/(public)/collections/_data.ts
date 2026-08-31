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

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

// TODO: 目前為佔位資料，待實際產品資料 / CMS 就緒後替換
export const FILTER_GROUPS: FilterGroup[] = [
  {
    id: 'usage',
    label: '用途',
    tags: ['手腕帶', '鞋帶', '寵物用品', '包袋提把', '識別證掛繩', '服飾配件'],
  },
  {
    id: 'material',
    label: '材質',
    tags: ['尼龍', '純棉', '特多龍', '彈力材質', '反光材質', '金蔥線'],
  },
  {
    id: 'other',
    label: '其他',
    tags: ['客製印刷', '提花圖案', '段染', '止滑處理', '編織花色'],
  },
];

export const PRODUCTS: Product[] = [
  {
    slug: 'nylon-wrist-strap',
    title: '各色尼龍手腕帶',
    images: [
      `${IMAGE_BASE_URL}/feature/wrist-strap.webp`,
      `${IMAGE_BASE_URL}/scenarios/wrist strap.webp`,
    ],
    tags: ['手腕帶', '尼龍'],
    description: [
      '豐富色彩的尼龍繩，觸感柔軟',
      '可用於手腕帶、拐杖帶等用途',
      '支援指定長度裁切與打頭加工',
    ],
  },
  {
    slug: 'cotton-drawstring',
    title: '成衣棉繩束口帶',
    images: [
      `${IMAGE_BASE_URL}/feature/tetoron-cotton.webp`,
      `${IMAGE_BASE_URL}/scenarios/drawstring-clothes.webp`,
    ],
    tags: ['服飾配件', '純棉'],
    description: [
      '多用於衣褲類抽繩',
      '材質可選用純棉或特多龍等柔軟材質',
      '可依需求客製顏色與長度',
    ],
  },
  {
    slug: 'solid-core-pet-leash',
    title: '實心包心寵物牽繩',
    images: [
      `${IMAGE_BASE_URL}/feature/solid-core-round-cord.webp`,
      `${IMAGE_BASE_URL}/scenarios/pet1.webp`,
      `${IMAGE_BASE_URL}/scenarios/pet2.webp`,
    ],
    tags: ['寵物用品', '特多龍'],
    description: [
      '適用於需要較強拉力的情況',
      '常見於寵物牽繩、項圈等用途',
      '可調整粗細與拉力規格',
    ],
  },
  {
    slug: 'air-duct-webbing',
    title: '風管包心織帶',
    images: [`${IMAGE_BASE_URL}/feature/air-duct.webp`],
    tags: ['服飾配件', '特多龍'],
    description: [
      '將風管包覆於織帶中',
      '讓風管呈現更漂亮的外觀',
      '可依管徑客製包覆尺寸',
    ],
  },
  {
    slug: 'twisted-cord',
    title: '撚繩織帶',
    images: [
      `${IMAGE_BASE_URL}/feature/twisted.webp`,
      `${IMAGE_BASE_URL}/scenarios/bag1.webp`,
    ],
    tags: ['包袋提把', '特多龍'],
    description: [
      '利用旋轉方式編織而成',
      '能承受較大拉伸強度',
      '適合包袋、束口等承重用途',
    ],
  },
  {
    slug: 'parent-child-webbing',
    title: '子母帶',
    images: [`${IMAGE_BASE_URL}/feature/子母帶.webp`],
    tags: ['服飾配件', '編織花色'],
    description: [
      '具有特殊編法的織帶',
      '常用於裝飾與藝術用途',
      '可搭配多種配色組合',
    ],
  },
  {
    slug: 'custom-print-webbing',
    title: '客製印刷織帶',
    images: [
      `${IMAGE_BASE_URL}/feature/print.webp`,
      `${IMAGE_BASE_URL}/scenarios/lanyard.webp`,
    ],
    tags: ['識別證掛繩', '客製印刷'],
    description: [
      '可自由選擇印刷類型與形式',
      '支援熱轉印、鋼板印刷等工法',
      '常用於識別證掛繩、品牌織帶',
    ],
  },
  {
    slug: 'speed-style-webbing',
    title: '各式編織高速帶',
    images: [`${IMAGE_BASE_URL}/feature/speed-style.webp`],
    tags: ['包袋提把', '編織花色'],
    description: [
      '利用不同顏色絲線編織而成',
      '可呈現多種花色與紋路',
      '適合包袋提把、裝飾用途',
    ],
  },
  {
    slug: 'braiding-style-webbing',
    title: '各式編織走馬帶',
    images: [
      `${IMAGE_BASE_URL}/feature/braiding-style.webp`,
      `${IMAGE_BASE_URL}/scenarios/shoelace1.webp`,
      `${IMAGE_BASE_URL}/scenarios/shoelace2.webp`,
    ],
    tags: ['鞋帶', '編織花色'],
    description: [
      '利用不同顏色絲線編織而成',
      '可呈現多種花色與紋路',
      '適合鞋帶、束口繩等用途',
    ],
  },
  {
    slug: 'variegated-webbing',
    title: '段染織帶',
    images: [`${IMAGE_BASE_URL}/feature/variegated.webp`],
    tags: ['服飾配件', '段染'],
    description: [
      '可搭配喜愛的漸層色彩',
      '呈現獨特的視覺效果',
      '適合服飾配件、包袋裝飾',
    ],
  },
  {
    slug: 'jacquard-webbing',
    title: '提花帶',
    images: [`${IMAGE_BASE_URL}/feature/jacquard.webp`],
    tags: ['識別證掛繩', '提花圖案'],
    description: [
      '可在織帶中加入裝飾與藝術圖樣',
      '圖樣包含圖騰、Logo 等',
      '適合品牌識別、禮贈品用途',
    ],
  },
  {
    slug: 'anti-slip-webbing',
    title: '止滑織帶',
    images: [
      `${IMAGE_BASE_URL}/feature/anti-slip.webp`,
      `${IMAGE_BASE_URL}/scenarios/backpack1.webp`,
      `${IMAGE_BASE_URL}/scenarios/backpack2.webp`,
    ],
    tags: ['包袋提把', '止滑處理'],
    description: [
      '加入橡膠防止滑動的特殊織帶',
      '提升止滑抓地與耐磨表現',
      '適合背包背帶、瑜珈帶等用途',
    ],
  },
  {
    slug: 'elasticity-cord',
    title: '彈力圓帶',
    images: [`${IMAGE_BASE_URL}/feature/elasticity-cord.webp`],
    tags: ['服飾配件', '彈力材質'],
    description: [
      '將高彈力橡膠包覆於走馬帶中',
      '使織帶具備良好彈性',
      '適合服飾、鬆緊帶等用途',
    ],
  },
  {
    slug: 'elasticity-belt',
    title: '彈力扁帶',
    images: [`${IMAGE_BASE_URL}/feature/elasticity-belt.webp`],
    tags: ['服飾配件', '彈力材質'],
    description: [
      '將高彈力橡膠編入高速帶中',
      '使織帶具備良好彈性',
      '適合腰帶、運動用品等用途',
    ],
  },
  {
    slug: 'reflective-webbing',
    title: '反光織帶',
    images: [`${IMAGE_BASE_URL}/feature/reflective.webp`],
    tags: ['服飾配件', '反光材質'],
    description: [
      '將反光材質編入織帶中',
      '提升夜間辨識度與安全性',
      '常用於運動衣物、工作服',
    ],
  },
  {
    slug: 'golden-silver-webbing',
    title: '金蔥銀蔥織帶',
    images: [`${IMAGE_BASE_URL}/feature/golden:sliver.webp`],
    tags: ['識別證掛繩', '金蔥線'],
    description: [
      '將金蔥線或銀蔥線編入織帶中',
      '達到閃亮吸睛效果',
      '適合節慶禮品、裝飾用途',
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}
