'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

import type {
  AdminCollection,
  Label,
} from '@/app/(admin)/admin/collections/_data';

interface Props {
  collections: AdminCollection[];
  labels: Label[];
  onDelete: (slug: string, name: string) => void;
}

export default function CollectionsTable({
  collections,
  labels,
  onDelete,
}: Props) {
  const labelName = (id: string) =>
    labels.find((label) => label.id === id)?.name.zh ?? id;

  if (collections.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-content-muted">
        尚無產品資料
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-border-subtle text-content-muted">
            <th className="py-3 pr-4 font-medium">圖片</th>
            <th className="py-3 pr-4 font-medium">標題</th>
            <th className="py-3 pr-4 font-medium">標籤</th>
            <th className="py-3 pr-4 font-medium">網址代稱</th>
            <th className="py-3 pr-4 text-right font-medium">操作</th>
          </tr>
        </thead>
        <tbody>
          {collections.map((collection) => (
            <tr
              key={collection.slug}
              className="border-b border-border-subtle/60 last:border-0"
            >
              <td className="py-3 pr-4">
                <div className="relative size-12 overflow-hidden rounded-lg bg-warm-gray/30">
                  {collection.images[0] && (
                    <Image
                      src={collection.images[0]}
                      alt={collection.title.zh}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  )}
                </div>
              </td>
              <td className="py-3 pr-4 font-medium text-content-main">
                {collection.title.zh}
              </td>
              <td className="py-3 pr-4">
                <div className="flex flex-wrap gap-1.5">
                  {collection.labelIds.map((id) => (
                    <span
                      key={id}
                      className="rounded-full bg-warm-gray/30 px-2.5 py-0.5 text-xs text-content-muted"
                    >
                      {labelName(id)}
                    </span>
                  ))}
                </div>
              </td>
              <td className="py-3 pr-4 text-content-muted">
                /collections/{collection.slug}
              </td>
              <td className="py-3 pr-4">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/collections/${collection.slug}/edit`}
                    className="rounded-lg p-2 text-content-muted transition-colors hover:bg-warm-gray/30 hover:text-brand"
                    aria-label="編輯"
                  >
                    <PencilSquareIcon className="size-4.5" />
                  </Link>
                  <button
                    type="button"
                    onClick={() =>
                      onDelete(collection.slug, collection.title.zh)
                    }
                    className="rounded-lg p-2 text-content-muted transition-colors hover:bg-brand/10 hover:text-brand"
                    aria-label="刪除"
                  >
                    <TrashIcon className="size-4.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
