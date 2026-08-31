'use client';

import {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Image from 'next/image';
import {
  ArrowUpTrayIcon,
  MagnifyingGlassPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface FormDataState {
  name: string;
  email: string;
  phone: string;
  company: string;
  intendedUse: string;
  message: string;
}

const inputBaseStyles =
  'w-full px-3.5 py-2.5 bg-background border border-border-subtle rounded-md text-sm text-content-main placeholder:text-content-muted/60 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all';
const labelStyles = 'block text-sm font-semibold text-content-main mb-1.5';

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  children: ReactNode;
}

function FormField({ id, label, required, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={labelStyles}>
        {label} {required && <span className="text-brand">*</span>}
      </label>
      {children}
    </div>
  );
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    email: '',
    phone: '',
    company: '',
    intendedUse: '',
    message: '',
  });

  const [files, setFiles] = useState<File[]>([]);
  const [previewModalImage, setPreviewModalImage] = useState<{
    url: string;
    name: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const previewFiles = useMemo(() => {
    return files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
  }, [files]);

  useEffect(() => {
    return () => {
      previewFiles.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, [previewFiles]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    const combinedFiles = [...files, ...selectedFiles].slice(0, 2);
    setFiles(combinedFiles);
    e.target.value = '';
  };

  const handleRemoveFile = (index: number) => {
    if (previewModalImage?.url === previewFiles[index]?.url) {
      setPreviewModalImage(null);
    }
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: 送出處理邏輯
    setIsSubmitting(false);
  };

  return (
    <div className="pt-10 pb-2 px-2">
      <div className="mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand block">
          Send us a message
        </span>
        <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-content-main font-wen-kai-zh">
          需求與規格諮詢
        </h2>
        <p className="mt-2 text-sm text-content-muted leading-relaxed">
          也歡迎填寫表單來聯絡我們，請詳細填寫您的聯絡方式與織帶規格需求，我們將儘速提供回覆。
          <br />
          (手機與信箱請至少擇一填寫)
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <FormField id="name" label="稱呼" required>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder="例：王先生 / 林小姐"
              className={inputBaseStyles}
            />
          </FormField>

          <FormField id="email" label="信箱">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="example@company.com"
              className={inputBaseStyles}
            />
          </FormField>

          <FormField id="phone" label="電話">
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="例：0912-345-678 / 04-1234567"
              className={inputBaseStyles}
            />
          </FormField>

          <FormField id="company" label="公司名稱">
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="例：新光實業有限公司"
              className={inputBaseStyles}
            />
          </FormField>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className={labelStyles}>上傳參考圖</span>
            <span className="text-[11px] text-content-muted">
              至多兩張（JPG / PNG）
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {previewFiles.map(({ file, url }, idx) => (
              <div
                key={`${file.name}-${idx}`}
                onClick={() => setPreviewModalImage({ url, name: file.name })}
                className="group relative size-20 rounded-md border border-border-subtle bg-background overflow-hidden shadow-2xs cursor-pointer hover:border-brand transition-all"
              >
                <Image
                  src={url}
                  alt={file.name}
                  fill
                  unoptimized
                  sizes="80px"
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                />

                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-10">
                  <MagnifyingGlassPlusIcon className="size-4.5 text-white drop-shadow-sm" />
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-xs px-1.5 py-0.5 pointer-events-none z-10">
                  <p className="text-[8px] text-white truncate font-medium">
                    {file.name}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(idx);
                  }}
                  className="absolute top-1 right-1 size-4.5 bg-brand text-white rounded-full flex items-center justify-center hover:opacity-90 cursor-pointer shadow-sm z-20"
                  aria-label="移除檔案"
                >
                  <XMarkIcon className="size-2.5 stroke-[2.5]" />
                </button>
              </div>
            ))}

            {files.length < 2 && (
              <label className="flex flex-col items-center justify-center size-20 border-2 border-dashed border-border-subtle hover:border-brand rounded-xl bg-background cursor-pointer transition-colors group">
                <ArrowUpTrayIcon className="size-4 text-content-muted group-hover:text-brand" />
                <span className="mt-1 text-[10px] text-content-muted group-hover:text-brand">
                  選擇檔案
                </span>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  className="hidden"
                  onChange={handleFileChange}
                  multiple={files.length === 0}
                />
              </label>
            )}
          </div>
        </div>

        <FormField id="intendedUse" label="預計用途" required>
          <input
            type="text"
            id="intendedUse"
            name="intendedUse"
            value={formData.intendedUse}
            onChange={handleInputChange}
            placeholder="例：成衣織帶、鞋材飾帶、背包提把、工業用織帶"
            className={inputBaseStyles}
          />
        </FormField>

        <FormField id="message" label="需求描述" required>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            value={formData.message}
            onChange={handleInputChange}
            placeholder="請填寫織帶規格（寬度、材質、顏色）、預估訂購數量或交期需求..."
            className={`${inputBaseStyles} resize-y`}
          />
        </FormField>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-brand text-white font-medium text-sm hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 transition-all disabled:opacity-50 cursor-pointer shadow-sm"
        >
          {isSubmitting ? '送出中...' : '送出需求單'}
        </button>
      </form>

      {previewModalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4"
          onClick={() => setPreviewModalImage(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-background border border-border-subtle rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle bg-white">
              <p className="text-xs sm:text-sm font-semibold text-content-main truncate max-w-xs sm:max-w-md">
                {previewModalImage.name}
              </p>
              <button
                type="button"
                onClick={() => setPreviewModalImage(null)}
                className="size-7 rounded-full hover:bg-warm-gray/40 flex items-center justify-center text-content-muted hover:text-content-main transition-colors cursor-pointer"
                aria-label="關閉"
              >
                <XMarkIcon className="size-4.5" />
              </button>
            </div>
            <div className="relative w-full h-[60vh] bg-black/5 p-4 flex items-center justify-center">
              <Image
                src={previewModalImage.url}
                alt={previewModalImage.name}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-contain p-2"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
