'use client';

import {
  ChangeEvent,
  ReactNode,
  SubmitEvent,
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

import {
  HEADING_FONT_CLASS,
  HEADING_WEIGHT_CLASS,
  type Locale,
} from '@/app/_lib/locale';
import type { Dictionary } from '@/app/[lang]/dictionaries';

interface FormDataState {
  name: string;
  email: string;
  phone: string;
  company: string;
  intendedUse: string;
  message: string;
}

interface Props {
  lang: Locale;
  dict: Dictionary['contactForm'];
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

export function ContactForm({ lang, dict }: Props) {
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

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: 送出處理邏輯
    setIsSubmitting(false);
  };

  return (
    <div className="pt-10 pb-2 px-2">
      <div className="mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand block">
          {dict.eyebrow}
        </span>
        <h2
          className={`mt-2 text-2xl sm:text-3xl text-content-main ${HEADING_FONT_CLASS[lang]} ${HEADING_WEIGHT_CLASS[lang]}`}
        >
          {dict.heading}
        </h2>
        <p className="mt-2 text-sm text-content-muted leading-relaxed">
          {dict.description}
          <br />
          {dict.descriptionNote}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <FormField id="name" label={dict.nameLabel} required>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder={dict.namePlaceholder}
              className={inputBaseStyles}
            />
          </FormField>

          <FormField id="email" label={dict.emailLabel}>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={dict.emailPlaceholder}
              className={inputBaseStyles}
            />
          </FormField>

          <FormField id="phone" label={dict.phoneLabel}>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder={dict.phonePlaceholder}
              className={inputBaseStyles}
            />
          </FormField>

          <FormField id="company" label={dict.companyLabel}>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder={dict.companyPlaceholder}
              className={inputBaseStyles}
            />
          </FormField>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className={labelStyles}>{dict.uploadLabel}</span>
            <span className="text-[11px] text-content-muted">
              {dict.uploadHint}
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
                  aria-label={dict.removeFile}
                >
                  <XMarkIcon className="size-2.5 stroke-[2.5]" />
                </button>
              </div>
            ))}

            {files.length < 2 && (
              <label className="flex flex-col items-center justify-center size-20 border-2 border-dashed border-border-subtle hover:border-brand rounded-xl bg-background cursor-pointer transition-colors group">
                <ArrowUpTrayIcon className="size-4 text-content-muted group-hover:text-brand" />
                <span className="mt-1 text-[10px] text-content-muted group-hover:text-brand">
                  {dict.chooseFile}
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

        <FormField id="intendedUse" label={dict.intendedUseLabel} required>
          <input
            type="text"
            id="intendedUse"
            name="intendedUse"
            value={formData.intendedUse}
            onChange={handleInputChange}
            placeholder={dict.intendedUsePlaceholder}
            className={inputBaseStyles}
          />
        </FormField>

        <FormField id="message" label={dict.messageLabel} required>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            value={formData.message}
            onChange={handleInputChange}
            placeholder={dict.messagePlaceholder}
            className={`${inputBaseStyles} resize-y`}
          />
        </FormField>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-brand text-white font-medium text-sm hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 transition-all disabled:opacity-50 cursor-pointer shadow-sm"
        >
          {isSubmitting ? dict.submitting : dict.submit}
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
                aria-label={dict.closePreview}
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
