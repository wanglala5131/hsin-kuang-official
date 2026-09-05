import type { Locale, Localized } from '@/app/_lib/locale';

// Icon components are functions, and functions aren't serializable across
// the Server -> Client Component boundary, so icons are looked up by `id`
// on the client (in CustomizationDeck) instead of traveling through this data.
export interface CustomizationItem {
  id: string;
  title: string;
  description: string;
  bulletList: string[];
  image: string;
  imageCaption: string;
  imageClassName?: string;
}

interface CustomizationItemDef {
  id: string;
  title: Localized<string>;
  description: Localized<string>;
  bulletList: Localized<string[]>;
  image: string;
  imageCaption: Localized<string>;
  imageClassName?: string;
}

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

// TODO: 目前為佔位資料，待實際產品資料 / CMS 就緒後替換
const CUSTOMIZATION_ITEM_DEFS: CustomizationItemDef[] = [
  {
    id: 'shape-weave',
    title: { zh: '外型與織法', en: 'Shape & Weave' },
    description: {
      zh: '透過不同機台織出不同形式織帶，可調整織帶外觀立體感、厚薄度、寬度與拉伸延展性。',
      en: 'Different machines weave different webbing forms, letting us adjust the dimensional look, thickness, width, and stretch of the webbing.',
    },
    bulletList: {
      zh: [
        '高速帶：平紋、斜紋、人字紋、提花織造...等',
        '走馬帶：空心繩、實心繩、順軸織法、變軸織法...等',
        '撚繩',
        '其他特殊織法與紋理結構',
      ],
      en: [
        'High-speed webbing: plain weave, twill, herringbone, jacquard, and more',
        'Braided webbing: hollow cord, solid cord, straight-axis and cross-axis weaves, and more',
        'Twisted cord',
        'Other special weaves and textures',
      ],
    },
    image: `${IMAGE_BASE_URL}/feature/speed-style.webp`, // TODO 補三種織帶的圖
    imageCaption: {
      zh: '由上而下分別為高速帶、走馬帶與撚繩',
      en: 'From top to bottom: high-speed webbing, braided webbing, and twisted cord',
    },
  },
  {
    id: 'usage',
    title: { zh: '用途', en: 'Usage' },
    description: {
      zh: '織帶可用於各式場景，依據不同的使用情境，客製出最適宜的織帶',
      en: 'Webbing can be used across countless scenarios — we customize the best webbing for your specific use case.',
    },
    bulletList: {
      zh: [
        '日常配件：證件帶、手機掛繩、寵物帶、背包帶',
        '戶外運動：登山背帶、露營拉繩、運動護具',
        '工業物流：貨物捆綁帶、吊裝吊帶、安全防護帶',
        '醫療防護：固定帶、輔具束帶',
        '其他特定應用情境',
      ],
      en: [
        'Everyday accessories: lanyards, phone straps, pet leashes, backpack straps',
        'Outdoor & sports: hiking harnesses, camping cords, sports gear',
        'Industrial & logistics: cargo tie-down straps, lifting slings, safety webbing',
        'Medical & protective: fixation straps, orthopedic support bands',
        'Other specific applications',
      ],
    },
    image: `${IMAGE_BASE_URL}/scenarios/wrist strap.webp`, // TODO 補拐杖帶
    imageCaption: {
      zh: '拐杖帶實拍案例',
      en: 'Cane strap, real product photo',
    },
  },

  {
    id: 'material',
    title: { zh: '材質選擇', en: 'Material Options' },
    description: {
      zh: '提供多種天然纖維與化學合成紗線，依材質的耐磨性、耐久度及手感需求來選擇。',
      en: 'A range of natural fiber and synthetic yarns are available, selected by abrasion resistance, durability, and hand feel.',
    },
    bulletList: {
      zh: [
        '尼龍（Nylon)：富有光澤、具回彈性、強力耐磨、順滑柔軟，常應用於服飾、醫療等需親膚的產業',
        '特多龍（Polyester)：強力抗拉、耐磨快乾、吸濕性低、抗紫外線能力優異，常應用於戶外或海洋產業',
        '特多棉：常用於成衣，耐磨、強韌、不易皺、不易受潮發霉',
        'PP（Polypropylene）：質輕、抗水性強、價格較便宜',
        '純棉（Cotton）：舒適柔軟、吸濕性好、 吸汗透氣',
        '其他砂線，如環保紗線、金蔥、銀蔥',
      ],
      en: [
        'Nylon: glossy, resilient, highly abrasion-resistant, smooth and soft — common in apparel, medical, and other skin-contact uses',
        'Polyester: high tensile strength, abrasion-resistant, quick-drying, low moisture absorption, excellent UV resistance — common in outdoor and marine uses',
        'Poly-cotton: common in apparel — abrasion-resistant, durable, wrinkle- and mildew-resistant',
        'PP (Polypropylene): lightweight, highly water-resistant, and more economical',
        'Cotton: comfortable and soft, highly absorbent, breathable',
        'Other yarns, such as eco-friendly yarns, gold and silver metallic thread',
      ],
    },
    image: `${IMAGE_BASE_URL}/feature/wrist-strap.webp`,
    imageCaption: {
      zh: '尼龍材質，顏色鮮豔且富有光澤、順滑柔軟',
      en: 'Nylon material — vivid color, glossy, smooth and soft',
    },
    imageClassName: 'object-[0_65%]',
  },
  {
    id: 'color-size',
    title: { zh: '顏色與尺寸', en: 'Color & Size' },
    description: {
      zh: '支援指定色號染色與多色紗線交織配色，寬度、厚度皆能訂製。',
      en: 'Supports dyeing to a specified color code and multi-color yarn blends; width and thickness are both customizable.',
    },
    bulletList: {
      zh: [
        '自選寬度與厚度',
        '染色：單色、段染',
        '有色紗線交織配色',
        '其他尺寸與配色指定需求',
      ],
      en: [
        'Custom width and thickness',
        'Dyeing: solid color or variegated',
        'Color-blended yarn weaves',
        'Other size and color specification requests',
      ],
    },
    image: `${IMAGE_BASE_URL}/customization/variegated-yarn.webp`,
    imageCaption: {
      zh: '段染漸層配色',
      en: 'Variegated gradient coloring',
    },
  },
  {
    id: 'core-elastic',
    title: { zh: '包芯/彈力帶', en: 'Core-Filled / Elastic Webbing' },
    description: {
      zh: '高速帶能編入橡膠做成彈力帶；走馬帶亦可包覆彈性橡膠或支撐芯材，，以增加彈力與維持立體度。',
      en: 'Rubber can be woven into high-speed webbing to create elastic webbing; braided webbing can likewise be wrapped around elastic rubber or a core material to add stretch and maintain its shape.',
    },
    bulletList: {
      zh: [
        '各式彈力橡膠',
        'PE材質',
        '空心風管/矽膠軟管',
        '其他客製硬度與規格包芯材質',
      ],
      en: [
        'Various elastic rubbers',
        'PE material',
        'Hollow air ducts / silicone tubing',
        'Other custom hardness and core-filling specifications',
      ],
    },
    image: `${IMAGE_BASE_URL}/customization/core-filled.webp`,
    imageCaption: {
      zh: '走馬帶包覆彈性橡膠，以增加彈性',
      en: 'Braided webbing wrapped around elastic rubber for added stretch',
    },
  },
  {
    id: 'printing',
    title: { zh: '印刷', en: 'Printing' },
    description: {
      zh: '採用高牢度印刷呈現文字與圖樣，耐洗滌且圖形邊緣清晰不掉色。',
      en: "High-fastness printing renders text and patterns that are wash-resistant, with crisp edges that won't fade.",
    },
    bulletList: {
      zh: ['熱轉印刷', '網版印刷', '其他客製化 Logo 與圖騰印製方式'],
      en: [
        'Heat-transfer printing',
        'Screen printing',
        'Other custom logo and pattern printing methods',
      ],
    },
    image: `${IMAGE_BASE_URL}/customization/screen-printing.webp`,
    imageCaption: {
      zh: '網版印刷',
      en: 'Screen printing',
    },
  },
  {
    id: 'finishing',
    title: { zh: '後端加工', en: 'Finishing' },
    description: {
      zh: '提供裁切、打頭、五金組裝與強力車縫，出廠即為可直接使用的成品或半成品。',
      en: 'We offer cutting, tipping, hardware assembly, and heavy-duty sewing, shipping finished or semi-finished products ready to use.',
    },
    bulletList: {
      zh: [
        '精準裁切',
        '鞋帶式打頭（膠片包頭、金屬打頭）',
        '金屬配件組裝',
        '其他車縫固定與加工成型服務',
      ],
      en: [
        'Precision cutting',
        'Shoelace-style tipping (plastic-wrapped or metal aglets)',
        'Metal hardware assembly',
        'Other sewing, fixing, and shaping services',
      ],
    },
    image: `${IMAGE_BASE_URL}/customization/cut.webp`,
    imageCaption: {
      zh: '利用高溫切斷織帶，切面平整且不易脫線',
      en: 'High-heat cutting leaves a clean edge that resists fraying',
    },
    imageClassName: 'object-[0_25%]',
  },
  {
    id: 'special-processing',
    title: { zh: '其他特殊加工', en: 'Other Special Processing' },
    description: {
      zh: '透過混編特殊材質，賦予織帶防護、警示與安全機能。',
      en: 'Blending in special materials gives the webbing protective, warning, and safety functions.',
    },
    bulletList: {
      zh: [
        '高可視反光條夾織（提升夜間安全）',
        '矽膠波浪點膠（強化抓地止滑）',
        '其他特殊功能性表面處理需求',
      ],
      en: [
        'High-visibility reflective strips woven in (improves nighttime safety)',
        'Wavy silicone dot coating (enhances grip and slip resistance)',
        'Other special functional surface treatment requests',
      ],
    },
    image: `${IMAGE_BASE_URL}/feature/anti-slip.webp`,
    imageCaption: {
      zh: '高速帶編入橡膠，以增加止滑力',
      en: 'Rubber woven into high-speed webbing to improve slip resistance',
    },
  },
];

export function getCustomizationItems(locale: Locale): CustomizationItem[] {
  return CUSTOMIZATION_ITEM_DEFS.map((item) => ({
    id: item.id,
    title: item.title[locale],
    description: item.description[locale],
    bulletList: item.bulletList[locale],
    image: item.image,
    imageCaption: item.imageCaption[locale],
    imageClassName: item.imageClassName,
  }));
}
