'use client';

import { useMemo, useState } from 'react';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

import Pagination from '@/app/_components/Pagination';
import ProductCard from '@/app/_components/ProductCard';
import type { FilterGroup, Product } from '@/app/(public)/collections/_data';

const PAGE_SIZE = 12;

interface Props {
  products: Product[];
  filterGroups: FilterGroup[];
}

interface FilterPanelProps {
  filterGroups: FilterGroup[];
  selectedTags: string[];
  onToggle: (tag: string) => void;
  className?: string;
}

function FilterPanel({
  filterGroups,
  selectedTags,
  onToggle,
  className = '',
}: FilterPanelProps) {
  return (
    <div
      className={`flex flex-col gap-5 lg:rounded-md lg:border lg:border-warm-gray lg:bg-brand/10 p-4 ${className}`}
    >
      {filterGroups.map((group, index) => (
        <div key={group.id}>
          <h3 className="mb-3 text-lg font-bold tracking-wide text-brand">
            {group.label}
          </h3>
          <ul className="flex flex-col gap-2.5">
            {group.tags.map((tag) => {
              const checked = selectedTags.includes(tag);
              return (
                <li key={tag}>
                  <label className="flex cursor-pointer items-center gap-2 text-md text-content-muted transition-colors hover:text-content-main">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggle(tag)}
                      className="size-4 rounded border-border-subtle accent-brand"
                    />
                    {tag}
                  </label>
                </li>
              );
            })}
          </ul>
          {filterGroups.length - 1 !== index && (
            <div className="mt-4 h-[1px] w-full bg-warm-gray" />
          )}
        </div>
      ))}
    </div>
  );
}

export default function CollectionsGrid({ products, filterGroups }: Props) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
    setCurrentPage(1);
  };

  const clearTags = () => {
    setSelectedTags([]);
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    if (selectedTags.length === 0) return products;

    return products.filter((product) =>
      filterGroups.every((group) => {
        const groupSelected = group.tags.filter((tag) =>
          selectedTags.includes(tag),
        );
        return (
          groupSelected.length === 0 ||
          groupSelected.some((tag) => product.tags.includes(tag))
        );
      }),
    );
  }, [products, filterGroups, selectedTags]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE),
  );

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, currentPage]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="lg:grid lg:grid-cols-[240px_1fr] lg:items-start lg:gap-10">
        <aside className="hidden lg:sticky lg:top-[96px] lg:block">
          <FilterPanel
            filterGroups={filterGroups}
            selectedTags={selectedTags}
            onToggle={toggleTag}
            className="lg:max-h-[calc(100vh-116px)] lg:overflow-y-auto lg:pr-5"
          />
        </aside>

        <div className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-4">
          <p className="text-md text-content-muted">
            共
            <span className="font-bold text-content-main px-1">
              {filteredProducts.length}
            </span>
            個
          </p>

          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="sticky top-[76px] z-40 justify-self-end inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border-subtle bg-background px-3 py-1.5 text-sm font-medium text-content-main shadow-sm hover:bg-border-subtle/30 lg:hidden"
          >
            <FunnelIcon className="size-4" />
            篩選{selectedTags.length > 0 ? ` (${selectedTags.length})` : ''}
          </button>

          {selectedTags.length > 0 && (
            <div className="col-span-2 flex flex-wrap items-center gap-2">
              {selectedTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-brand/10 px-3 py-1 text-sm font-semibold text-brand transition-colors hover:bg-brand/20"
                >
                  {tag}
                  <XMarkIcon className="size-4" />
                </button>
              ))}
              <button
                type="button"
                onClick={clearTags}
                className="cursor-pointer text-sm text-content-muted underline underline-offset-4 hover:text-brand"
              >
                清除全部
              </button>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="col-span-2 py-20 text-center text-sm text-content-muted">
              目前沒有符合篩選條件的產品，請試著調整篩選項目。
            </div>
          ) : (
            <div className="col-span-2">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <div
        onClick={() => setIsFilterOpen(false)}
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${
          isFilterOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
      />

      <div
        className={`fixed inset-y-0 right-0 z-50 flex h-dvh w-full max-w-xs flex-col bg-background px-4 py-5 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          isFilterOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-border-subtle/60 pb-4">
          <h2 className="text-lg font-bold text-content-main">篩選條件</h2>
          <button
            type="button"
            onClick={() => setIsFilterOpen(false)}
            className="cursor-pointer rounded-md p-2 text-content-main hover:bg-border-subtle/40"
            aria-label="關閉篩選"
          >
            <XMarkIcon className="size-6" />
          </button>
        </div>

        <div className="mt-4 flex-1 overflow-y-auto">
          <FilterPanel
            filterGroups={filterGroups}
            selectedTags={selectedTags}
            onToggle={toggleTag}
          />
        </div>

        <div className="flex flex-col gap-2 border-t border-border-subtle/60 pt-4">
          {selectedTags.length > 0 && (
            <button
              type="button"
              onClick={clearTags}
              className="cursor-pointer text-center text-sm text-content-muted underline underline-offset-4 hover:text-brand"
            >
              清除全部篩選
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsFilterOpen(false)}
            className="w-full cursor-pointer rounded-full bg-brand py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            查看 {filteredProducts.length} 個結果
          </button>
        </div>
      </div>
    </div>
  );
}
