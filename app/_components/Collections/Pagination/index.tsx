import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) {
    return (
      <nav aria-label="分頁" className="mt-10 flex items-center justify-center">
        <span className="flex size-9 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
          1
        </span>
      </nav>
    );
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="分頁"
      className="mt-10 flex items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="上一頁"
        className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-border-subtle text-content-main transition-colors hover:bg-border-subtle/30 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeftIcon className="size-4" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? 'page' : undefined}
          className={`flex size-9 cursor-pointer items-center justify-center rounded-full text-sm font-semibold transition-colors ${
            page === currentPage
              ? 'bg-brand text-white'
              : 'text-content-main hover:bg-border-subtle/30'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="下一頁"
        className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-border-subtle text-content-main transition-colors hover:bg-border-subtle/30 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRightIcon className="size-4" />
      </button>
    </nav>
  );
}
