'use client';

import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

import Tooltip from '@/app/_components/Admin/Tooltip';
import type {
  AdminCollection,
  Label,
  LabelCategory,
} from '@/app/(admin)/admin/collections/_data';

interface Props {
  collections: AdminCollection[];
  categories: LabelCategory[];
  labels: Label[];
  onAddCategory: () => void;
  onEditCategory: (category: LabelCategory) => void;
  onDeleteCategory: (category: LabelCategory) => void;
  onEditLabel: (label: Label) => void;
  onDeleteLabel: (label: Label) => void;
}

export default function LabelsPanel({
  collections,
  categories,
  labels,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  onEditLabel,
  onDeleteLabel,
}: Props) {
  const categoryName = (id: string) =>
    categories.find((category) => category.id === id)?.name.zh ?? id;

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium text-content-muted">分類</p>
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((category) => {
            // Still-referenced categories can't be deleted — would orphan the label.
            const inUse = labels.some(
              (label) => label.categoryId === category.id,
            );
            return (
              <div
                key={category.id}
                className="flex items-center gap-1 rounded-full bg-warm-gray/30 py-1 pl-3.5 pr-1.5 text-sm text-content-main"
              >
                {category.name.zh}
                <button
                  type="button"
                  onClick={() => onEditCategory(category)}
                  className="rounded-full p-1 text-content-muted transition-colors hover:text-brand"
                  aria-label={`編輯${category.name.zh}`}
                >
                  <PencilSquareIcon className="size-3.5" />
                </button>
                {inUse ? (
                  <Tooltip label="請先刪除或轉移底下的標籤">
                    <button
                      type="button"
                      disabled
                      className="rounded-full p-1 text-content-muted opacity-30 disabled:cursor-not-allowed"
                      aria-label={`刪除${category.name.zh}`}
                    >
                      <TrashIcon className="size-3.5" />
                    </button>
                  </Tooltip>
                ) : (
                  <button
                    type="button"
                    onClick={() => onDeleteCategory(category)}
                    className="rounded-full p-1 text-content-muted transition-colors hover:text-brand"
                    aria-label={`刪除${category.name.zh}`}
                  >
                    <TrashIcon className="size-3.5" />
                  </button>
                )}
              </div>
            );
          })}
          <button
            type="button"
            onClick={onAddCategory}
            className="flex items-center gap-1 rounded-full border border-dashed border-border-subtle px-3.5 py-1.5 text-sm text-content-muted transition-colors hover:border-brand hover:text-brand"
          >
            <PlusIcon className="size-3.5" /> 新增分類
          </button>
        </div>
      </div>

      {labels.length === 0 ? (
        <p className="py-16 text-center text-sm text-content-muted">
          尚無標籤資料
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-border-subtle text-content-muted">
                <th className="py-3 pr-4 font-medium">中文名稱</th>
                <th className="py-3 pr-4 font-medium">英文名稱</th>
                <th className="py-3 pr-4 font-medium">分類</th>
                <th className="py-3 pr-4 text-right font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {labels.map((label) => {
                // Still-referenced labels can't be deleted — would orphan the collection's tag.
                const inUse = collections.some((collection) =>
                  collection.labelIds.includes(label.id),
                );
                return (
                  <tr
                    key={label.id}
                    className="border-b border-border-subtle/60 last:border-0"
                  >
                    <td className="py-3 pr-4 font-medium text-content-main">
                      {label.name.zh}
                    </td>
                    <td className="py-3 pr-4 text-content-muted">
                      {label.name.en}
                    </td>
                    <td className="py-3 pr-4 text-content-muted">
                      {categoryName(label.categoryId)}
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onEditLabel(label)}
                          className="rounded-lg p-2 text-content-muted transition-colors hover:bg-warm-gray/30 hover:text-brand"
                          aria-label="編輯"
                        >
                          <PencilSquareIcon className="size-4.5" />
                        </button>
                        {inUse ? (
                          <Tooltip label="請先從產品移除這個標籤">
                            <button
                              type="button"
                              disabled
                              className="rounded-lg p-2 text-content-muted opacity-30 disabled:cursor-not-allowed"
                              aria-label="刪除"
                            >
                              <TrashIcon className="size-4.5" />
                            </button>
                          </Tooltip>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onDeleteLabel(label)}
                            className="rounded-lg p-2 text-content-muted transition-colors hover:bg-brand/10 hover:text-brand"
                            aria-label="刪除"
                          >
                            <TrashIcon className="size-4.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
