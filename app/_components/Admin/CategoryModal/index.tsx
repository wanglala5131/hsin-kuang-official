'use client';

import { useState, type SubmitEvent } from 'react';

import {
  fieldLabelStyles,
  inputStyles,
} from '@/app/_components/Admin/formStyles';
import Modal from '@/app/_components/Admin/Modal';
import type { LabelCategory } from '@/app/(admin)/admin/collections/_data';

interface Props {
  initialCategory: LabelCategory | null;
  onClose: () => void;
  onSave: (category: LabelCategory) => void;
}

export default function CategoryModal({
  initialCategory,
  onClose,
  onSave,
}: Props) {
  const [nameZh, setNameZh] = useState(initialCategory?.name.zh ?? '');
  const [nameEn, setNameEn] = useState(initialCategory?.name.en ?? '');

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({
      id: initialCategory?.id ?? crypto.randomUUID(),
      name: { zh: nameZh, en: nameEn },
    });
  };

  return (
    <Modal title={initialCategory ? '編輯分類' : '新增分類'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="category-name-zh" className={fieldLabelStyles}>
            中文名稱
          </label>
          <input
            id="category-name-zh"
            required
            value={nameZh}
            onChange={(e) => setNameZh(e.target.value)}
            className={inputStyles}
          />
        </div>
        <div>
          <label htmlFor="category-name-en" className={fieldLabelStyles}>
            英文名稱
          </label>
          <input
            id="category-name-en"
            required
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            className={inputStyles}
          />
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
