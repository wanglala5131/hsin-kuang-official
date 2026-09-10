import { z } from 'zod';

// title/slug feed the public en-locale and URL, so they're URL-safe charset only.
export const collectionFormSchema = z.object({
  titleZh: z.string().trim().min(1, '請輸入中文標題'),
  titleEn: z
    .string()
    .trim()
    .min(1, '請輸入英文標題')
    .regex(/^[A-Za-z0-9\s]+$/, '英文標題僅能輸入英文字母與數字'),
  slug: z
    .string()
    .trim()
    .min(1, '請輸入網址代稱')
    .regex(
      /^[a-z0-9]+(-[a-z0-9]+)*$/,
      '網址代稱僅能使用小寫英文字母、數字與連字號',
    ),
  descriptionZh: z.string().trim().min(1, '請輸入中文說明'),
  descriptionEn: z.string().trim().min(1, '請輸入英文說明'),
});

export type CollectionFormValues = z.infer<typeof collectionFormSchema>;
export type CollectionFormErrors = Partial<
  Record<keyof CollectionFormValues, string>
>;
