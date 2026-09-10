'use client';

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type SubmitEvent,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeftIcon,
  ArrowUpTrayIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import { slugify } from '@/app/_lib/slugify';
import type {
  AdminCollection,
  Label,
  LabelCategory,
} from '@/app/(admin)/admin/collections/_data';

import { errorTextStyles, fieldLabelStyles, inputStyles } from '../formStyles';
import { collectionFormSchema, type CollectionFormErrors } from './schema';

interface Props {
  mode: 'create' | 'edit';
  initialData?: AdminCollection;
  labels: Label[];
  categories: LabelCategory[];
}

interface FilePreview {
  file: File;
  url: string;
}

export default function CollectionForm({
  mode,
  initialData,
  labels,
  categories,
}: Props) {
  const router = useRouter();

  const [titleZh, setTitleZh] = useState(initialData?.title.zh ?? '');
  const [titleEn, setTitleEn] = useState(initialData?.title.en ?? '');
  const [slug, setSlug] = useState(initialData?.slug ?? '');
  // Only auto-derive slug from the title while creating — editing would break the published URL.
  const [isSlugEditing, setIsSlugEditing] = useState(false);
  const [errors, setErrors] = useState<CollectionFormErrors>({});

  const handleTitleEnChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Feeds the public en-locale title + slug, so non-English/number chars are stripped as typed.
    const value = e.target.value.replace(/[^A-Za-z0-9\s]/g, '');
    setTitleEn(value);
    if (mode === 'create' && !isSlugEditing) setSlug(slugify(value));
  };
  const [descriptionZh, setDescriptionZh] = useState(
    initialData?.description.zh.join('\n') ?? '',
  );
  const [descriptionEn, setDescriptionEn] = useState(
    initialData?.description.en.join('\n') ?? '',
  );
  const [labelIds, setLabelIds] = useState<string[]>(
    initialData?.labelIds ?? [],
  );
  const [existingImages, setExistingImages] = useState<string[]>(
    initialData?.images ?? [],
  );
  const [newPreviews, setNewPreviews] = useState<FilePreview[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cleanup runs only on unmount, so it needs a ref to see the latest
  // previews rather than the stale array from when the effect was set up.
  const newPreviewsRef = useRef(newPreviews);
  useEffect(() => {
    newPreviewsRef.current = newPreviews;
  }, [newPreviews]);

  useEffect(() => {
    return () => {
      newPreviewsRef.current.forEach((preview) =>
        URL.revokeObjectURL(preview.url),
      );
    };
  }, []);

  const toggleLabel = (id: string) => {
    setLabelIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const added = Array.from(e.target.files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setNewPreviews((prev) => [...prev, ...added]);
    e.target.value = '';
  };

  const removeNewPreview = (index: number) => {
    setNewPreviews((prev) => {
      const target = prev[index];
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = collectionFormSchema.safeParse({
      titleZh,
      titleEn,
      slug,
      descriptionZh,
      descriptionEn,
    });
    if (!result.success) {
      const fieldErrors: CollectionFormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof CollectionFormErrors;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    setIsSubmitting(true);
    // TODO: 資料庫 / API 就緒後，於此呼叫新增或更新產品的 API
    // TODO: 送出前檢查 slug 是否與其他產品重複
    router.push('/admin/collections');
  };

  return (
    <div className="p-8">
      <Link
        href="/admin/collections"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-content-muted transition-colors hover:text-brand"
      >
        <ArrowLeftIcon className="size-4" /> 返回產品列表
      </Link>

      <h1 className="text-2xl font-bold text-content-main">
        {mode === 'create' ? '新增產品' : '編輯產品'}
      </h1>

      <form onSubmit={handleSubmit} className="mt-6 max-w-3xl space-y-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="title-zh" className={fieldLabelStyles}>
              標題（中文）
            </label>
            <input
              id="title-zh"
              required
              value={titleZh}
              onChange={(e) => setTitleZh(e.target.value)}
              className={inputStyles}
            />
            {errors.titleZh && (
              <p className={errorTextStyles}>{errors.titleZh}</p>
            )}
          </div>
          <div>
            <label htmlFor="title-en" className={fieldLabelStyles}>
              標題（英文）
            </label>
            <input
              id="title-en"
              required
              value={titleEn}
              onChange={handleTitleEnChange}
              className={inputStyles}
            />
            {errors.titleEn ? (
              <p className={errorTextStyles}>{errors.titleEn}</p>
            ) : (
              <p className="mt-1.5 text-xs text-content-muted">
                僅能輸入英文字母與數字
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="slug" className={fieldLabelStyles}>
            網址代稱
          </label>
          <div className="flex items-center rounded-lg border border-border-subtle bg-background focus-within:border-brand focus-within:ring-1 focus-within:ring-brand">
            <span className="pl-3.5 text-sm text-content-muted">
              /collections/
            </span>
            <input
              id="slug"
              required
              value={slug}
              onChange={(e) => {
                setIsSlugEditing(true);
                setSlug(e.target.value);
              }}
              placeholder="nylon-wrist-strap"
              className="w-full bg-transparent py-2.5 pr-3.5 text-sm text-content-main focus:outline-none"
            />
          </div>
          <p
            className={
              errors.slug
                ? errorTextStyles
                : 'mt-1.5 text-xs text-content-muted'
            }
          >
            {errors.slug ?? '預設由英文標題自動產生，也可以直接修改。'}
          </p>
        </div>

        <div>
          <span className={fieldLabelStyles}>標籤</span>
          <div className="flex flex-wrap gap-2">
            {labels.map((label) => {
              const selected = labelIds.includes(label.id);
              return (
                <button
                  key={label.id}
                  type="button"
                  onClick={() => toggleLabel(label.id)}
                  className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    selected
                      ? 'bg-brand text-background'
                      : 'bg-warm-gray/30 text-content-main hover:bg-warm-gray/50'
                  }`}
                >
                  {label.name.zh}
                </button>
              );
            })}
          </div>
          {categories.length === 0 && (
            <p className="mt-1.5 text-xs text-content-muted">
              尚無可選標籤，請先於標籤列表新增。
            </p>
          )}
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className={fieldLabelStyles}>圖片</span>
            <span className="text-xs text-content-muted">
              僅預覽，上傳功能開發中
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {existingImages.map((src, index) => (
              <div
                key={src}
                className="group relative size-20 overflow-hidden rounded-lg border border-border-subtle bg-warm-gray/20"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() =>
                    setExistingImages((prev) =>
                      prev.filter((_, i) => i !== index),
                    )
                  }
                  className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-brand text-background"
                  aria-label="移除圖片"
                >
                  <XMarkIcon className="size-3" />
                </button>
              </div>
            ))}
            {newPreviews.map(({ file, url }, index) => (
              <div
                key={`${file.name}-${index}`}
                className="group relative size-20 overflow-hidden rounded-lg border border-border-subtle bg-warm-gray/20"
              >
                <Image
                  src={url}
                  alt={file.name}
                  fill
                  unoptimized
                  sizes="80px"
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeNewPreview(index)}
                  className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-brand text-background"
                  aria-label="移除圖片"
                >
                  <XMarkIcon className="size-3" />
                </button>
              </div>
            ))}
            <label className="flex size-20 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border-subtle text-content-muted transition-colors hover:border-brand hover:text-brand">
              <ArrowUpTrayIcon className="size-4.5" />
              <span className="mt-1 text-[11px]">選擇圖片</span>
              <input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="description-zh" className={fieldLabelStyles}>
              說明（中文，每行一點）
            </label>
            <textarea
              id="description-zh"
              rows={4}
              value={descriptionZh}
              onChange={(e) => setDescriptionZh(e.target.value)}
              className={`${inputStyles} resize-y`}
            />
            {errors.descriptionZh && (
              <p className={errorTextStyles}>{errors.descriptionZh}</p>
            )}
          </div>
          <div>
            <label htmlFor="description-en" className={fieldLabelStyles}>
              說明（英文，每行一點）
            </label>
            <textarea
              id="description-en"
              rows={4}
              value={descriptionEn}
              onChange={(e) => setDescriptionEn(e.target.value)}
              className={`${inputStyles} resize-y`}
            />
            {errors.descriptionEn && (
              <p className={errorTextStyles}>{errors.descriptionEn}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-border-subtle pt-5">
          <Link
            href="/admin/collections"
            className="rounded-xl border border-border-subtle px-5 py-2.5 text-sm font-medium text-content-main transition-colors hover:bg-warm-gray/20"
          >
            取消
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-brand px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-brand/90 disabled:opacity-50"
          >
            {isSubmitting ? '儲存中…' : '儲存'}
          </button>
        </div>
      </form>
    </div>
  );
}
