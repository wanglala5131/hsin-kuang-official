'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

import CategoryModal from '@/app/_components/Admin/CategoryModal';
import CollectionsTable from '@/app/_components/Admin/CollectionsTable';
import ConfirmDialog from '@/app/_components/Admin/ConfirmDialog';
import LabelModal from '@/app/_components/Admin/LabelModal';
import LabelsPanel from '@/app/_components/Admin/LabelsPanel';
import type {
  AdminCollection,
  Label,
  LabelCategory,
} from '@/app/(admin)/admin/collections/_data';

type Tab = 'collections' | 'labels';

type PendingDelete =
  | { type: 'collection'; id: string; name: string }
  | { type: 'label'; id: string; name: string }
  | { type: 'category'; id: string; name: string };

interface Props {
  initialCollections: AdminCollection[];
  initialCategories: LabelCategory[];
  initialLabels: Label[];
}

const tabButtonStyles = (active: boolean) =>
  `rounded-t-xl px-5 py-2.5 text-sm font-medium transition-colors ${
    active
      ? 'border border-b-0 border-border-subtle bg-background text-brand'
      : 'text-content-muted hover:text-content-main cursor-pointer'
  }`;

export default function CollectionsManager({
  initialCollections,
  initialCategories,
  initialLabels,
}: Props) {
  const [tab, setTab] = useState<Tab>('collections');
  const [collections, setCollections] = useState(initialCollections);
  const [categories, setCategories] = useState(initialCategories);
  const [labels, setLabels] = useState(initialLabels);

  const [editingLabel, setEditingLabel] = useState<Label | 'new' | null>(null);
  const [editingCategory, setEditingCategory] = useState<
    LabelCategory | 'new' | null
  >(null);
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(
    null,
  );

  const confirmDelete = () => {
    if (!pendingDelete) return;
    // UI-only for now — swap these for API calls once the backend exists.
    if (pendingDelete.type === 'collection') {
      setCollections((prev) =>
        prev.filter((collection) => collection.slug !== pendingDelete.id),
      );
    } else if (pendingDelete.type === 'label') {
      setLabels((prev) =>
        prev.filter((label) => label.id !== pendingDelete.id),
      );
    } else {
      setCategories((prev) =>
        prev.filter((category) => category.id !== pendingDelete.id),
      );
    }
    setPendingDelete(null);
  };

  return (
    <div className="p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="inline-block rounded-full bg-brand/10 px-5 py-2 text-lg font-bold text-brand">
          產品管理
        </h1>

        <div className="flex items-center gap-3">
          {tab === 'collections' ? (
            <Link
              href="/admin/collections/new"
              className="flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-brand/90"
            >
              <PlusIcon className="size-4" /> 新增產品
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => setEditingLabel('new')}
              className="flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-brand/90"
            >
              <PlusIcon className="size-4" /> 新增標籤
            </button>
          )}
          <span className="rounded-full bg-warm-gray/30 px-4 py-1.5 text-sm text-content-muted">
            共 {tab === 'collections' ? collections.length : labels.length}{' '}
            筆資料
          </span>
        </div>
      </div>

      <div className="mt-6 flex gap-1">
        <button
          type="button"
          onClick={() => setTab('collections')}
          className={tabButtonStyles(tab === 'collections')}
        >
          產品列表
        </button>
        <button
          type="button"
          onClick={() => setTab('labels')}
          className={tabButtonStyles(tab === 'labels')}
        >
          標籤列表
        </button>
      </div>

      <div className="rounded-b-2xl rounded-tr-2xl border border-border-subtle bg-background p-6">
        {tab === 'collections' ? (
          <CollectionsTable
            collections={collections}
            labels={labels}
            onDelete={(slug, name) =>
              setPendingDelete({ type: 'collection', id: slug, name })
            }
          />
        ) : (
          <LabelsPanel
            collections={collections}
            categories={categories}
            labels={labels}
            onAddCategory={() => setEditingCategory('new')}
            onEditCategory={(category) => setEditingCategory(category)}
            onDeleteCategory={(category) =>
              setPendingDelete({
                type: 'category',
                id: category.id,
                name: category.name.zh,
              })
            }
            onEditLabel={(label) => setEditingLabel(label)}
            onDeleteLabel={(label) =>
              setPendingDelete({
                type: 'label',
                id: label.id,
                name: label.name.zh,
              })
            }
          />
        )}
      </div>

      {editingLabel && (
        <LabelModal
          categories={categories}
          initialLabel={editingLabel === 'new' ? null : editingLabel}
          onClose={() => setEditingLabel(null)}
          onSave={(label) => {
            setLabels((prev) =>
              editingLabel === 'new'
                ? [...prev, label]
                : prev.map((item) => (item.id === label.id ? label : item)),
            );
            setEditingLabel(null);
          }}
        />
      )}

      {editingCategory && (
        <CategoryModal
          initialCategory={editingCategory === 'new' ? null : editingCategory}
          onClose={() => setEditingCategory(null)}
          onSave={(category) => {
            setCategories((prev) =>
              editingCategory === 'new'
                ? [...prev, category]
                : prev.map((item) =>
                    item.id === category.id ? category : item,
                  ),
            );
            setEditingCategory(null);
          }}
        />
      )}

      {pendingDelete && (
        <ConfirmDialog
          message={`確定要刪除「${pendingDelete.name}」嗎？`}
          onCancel={() => setPendingDelete(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
