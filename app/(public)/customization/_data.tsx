import type { ComponentType, SVGProps } from 'react';
import {
  PaintBrushIcon,
  RectangleGroupIcon,
  ScissorsIcon,
  SparklesIcon,
  Square3Stack3DIcon,
  StopCircleIcon,
  SwatchIcon,
  TagIcon,
} from '@heroicons/react/24/solid';

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface CustomizationItem {
  id: string;
  title: string;
  description: string;
  bulletList: string[];
  image: string;
  imageCaption: string;
  imageClassName?: string;
  icon: IconComponent;
}

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export const CUSTOMIZATION_ITEMS: CustomizationItem[] = [
  {
    id: 'shape-weave',
    title: '外型與織法',
    description:
      '透過不同機台織出不同形式織帶，可調整織帶外觀立體感、厚薄度、寬度與拉伸延展性。',
    bulletList: [
      '高速帶：平紋、斜紋、人字紋、提花織造...等',
      '走馬帶：空心繩、實心繩、順軸織法、變軸織法...等',
      '撚繩',
      '其他特殊織法與紋理結構',
    ],
    image: `${IMAGE_BASE_URL}/feature/speed-style.webp`, // TODO 補三種織帶的圖
    imageCaption: '由上而下分別為高速帶、走馬帶與撚繩',
    icon: Square3Stack3DIcon,
  },
  {
    id: 'usage',
    title: '用途',
    description: '織帶可用於各式場景，依據不同的使用情境，客製出最適宜的織帶',
    bulletList: [
      '日常配件：證件帶、手機掛繩、寵物帶、背包帶',
      '戶外運動：登山背帶、露營拉繩、運動護具',
      '工業物流：貨物捆綁帶、吊裝吊帶、安全防護帶',
      '醫療防護：固定帶、輔具束帶',
      '其他特定應用情境',
    ],
    image: `${IMAGE_BASE_URL}/scenarios/wrist strap.webp`, // TODO 補拐杖帶
    imageCaption: '拐杖帶實拍案例',
    icon: TagIcon,
  },

  {
    id: 'material',
    title: '材質選擇',
    description:
      '提供多種天然纖維與化學合成紗線，依材質的耐磨性、耐久度及手感需求來選擇。',
    bulletList: [
      '尼龍（Nylon)：富有光澤、具回彈性、強力耐磨、順滑柔軟，常應用於服飾、醫療等需親膚的產業',
      '特多龍（Polyester)：強力抗拉、耐磨快乾、吸濕性低、抗紫外線能力優異，常應用於戶外或海洋產業',
      '特多棉：常用於成衣，耐磨、強韌、不易皺、不易受潮發霉',
      'PP（Polypropylene）：質輕、抗水性強、價格較便宜',
      '純棉（Cotton）：舒適柔軟、吸濕性好、 吸汗透氣',
      '其他砂線，如環保紗線、金蔥、銀蔥',
    ],
    image: `${IMAGE_BASE_URL}/feature/wrist-strap.webp`,
    imageCaption: '尼龍材質，顏色鮮豔且富有光澤、順滑柔軟',
    imageClassName: 'object-[0_65%]',
    icon: SwatchIcon,
  },
  {
    id: 'color-size',
    title: '顏色與尺寸',
    description: '支援指定色號染色與多色紗線交織配色，寬度、厚度皆能訂製。',
    bulletList: [
      '自選寬度與厚度',
      '染色：單色、段染',
      '有色紗線交織配色',
      '其他尺寸與配色指定需求',
    ],
    image: `${IMAGE_BASE_URL}/customization/variegated-yarn.webp`,
    imageCaption: '段染漸層配色',
    icon: RectangleGroupIcon,
  },
  {
    id: 'core-elastic',
    title: '包芯/彈力帶',
    description:
      '高速帶能編入橡膠做成彈力帶；走馬帶亦可包覆彈性橡膠或支撐芯材，，以增加彈力與維持立體度。',
    bulletList: [
      '各式彈力橡膠',
      'PE材質',
      '空心風管/矽膠軟管',
      '其他客製硬度與規格包芯材質',
    ],
    image: `${IMAGE_BASE_URL}/customization/core-filled.webp`,
    imageCaption: '走馬帶包覆彈性橡膠，以增加彈性',
    icon: StopCircleIcon,
  },
  {
    id: 'printing',
    title: '印刷',
    description: '採用高牢度印刷呈現文字與圖樣，耐洗滌且圖形邊緣清晰不掉色。',
    bulletList: ['熱轉印刷', '網版印刷', '其他客製化 Logo 與圖騰印製方式'],
    image: `${IMAGE_BASE_URL}/customization/screen-printing.webp`,
    imageCaption: '網版印刷',
    icon: PaintBrushIcon,
  },
  {
    id: 'finishing',
    title: '後端加工',
    description:
      '提供裁切、打頭、五金組裝與強力車縫，出廠即為可直接使用的成品或半成品。',
    bulletList: [
      '精準裁切',
      '鞋帶式打頭（膠片包頭、金屬打頭）',
      '金屬配件組裝',
      '其他車縫固定與加工成型服務',
    ],
    image: `${IMAGE_BASE_URL}/customization/cut.webp`,
    imageCaption: '利用高溫切斷織帶，切面平整且不易脫線',
    imageClassName: 'object-[0_25%]',
    icon: ScissorsIcon,
  },
  {
    id: 'special-processing',
    title: '其他特殊加工',
    description: '透過混編特殊材質，賦予織帶防護、警示與安全機能。',
    bulletList: [
      '高可視反光條夾織（提升夜間安全）',
      '矽膠波浪點膠（強化抓地止滑）',
      '其他特殊功能性表面處理需求',
    ],
    image: `${IMAGE_BASE_URL}/feature/anti-slip.webp`,
    imageCaption: '高速帶編入橡膠，以增加止滑力',
    icon: SparklesIcon,
  },
];
