'use client';

import { useState, type SubmitEvent } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

import {
  fieldLabelStyles,
  inputStyles,
} from '@/app/_components/Admin/formStyles';
import Modal from '@/app/_components/Admin/Modal';
import type {
  Label,
  LabelCategory,
} from '@/app/(admin)/admin/collections/_data';

interface Props {
  categories: LabelCategory[];
  initialLabel: Label | null;
  onClose: () => void;
  onSave: (label: Label) => void;
}

const selectStyles = `${inputStyles} appearance-none pr-9`;

export default function LabelModal({
  categories,
  initialLabel,
  onClose,
  onSave,
}: Props) {
  const [nameZh, setNameZh] = useState(initialLabel?.name.zh ?? '');
  const [nameEn, setNameEn] = useState(initialLabel?.name.en ?? '');
  const [categoryId, setCategoryId] = useState(
    initialLabel?.categoryId ?? categories[0]?.id ?? '',
  );

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({
      id: initialLabel?.id ?? crypto.randomUUID(),
      categoryId,
      name: { zh: nameZh, en: nameEn },
    });
  };

  return (
    <Modal title={initialLabel ? '編輯標籤' : '新增標籤'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="label-name-zh" className={fieldLabelStyles}>
            中文名稱
          </label>
          <input
            id="label-name-zh"
            required
            value={nameZh}
            onChange={(e) => setNameZh(e.target.value)}
            className={inputStyles}
          />
        </div>
        <div>
          <label htmlFor="label-name-en" className={fieldLabelStyles}>
            英文名稱
          </label>
          <input
            id="label-name-en"
            required
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            className={inputStyles}
          />
        </div>
        <div>
          <label htmlFor="label-category" className={fieldLabelStyles}>
            分類
          </label>
          <div className="relative">
            <select
              id="label-category"
              required
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className={selectStyles}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name.zh}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-content-muted" />
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-border-subtle px-4 py-2 text-sm font-medium text-content-main transition-colors hover:bg-warm-gray/20"
          >
            取消
          </button>
          <button
            type="submit"
            className="rounded-xl bg-brand px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-brand/90"
          >
            儲存
          </button>
        </div>
      </form>
    </Modal>
  );
}
