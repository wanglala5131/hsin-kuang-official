'use client';

import Modal from '@/app/_components/Admin/Modal';

interface Props {
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({ message, onCancel, onConfirm }: Props) {
  return (
    <Modal onClose={onCancel}>
      <p className="text-sm text-content-main">{message}</p>
      <div className="mt-5 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-border-subtle px-4 py-2 text-sm font-medium text-content-main transition-colors hover:bg-warm-gray/20"
        >
          取消
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-xl bg-brand px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-brand/90"
        >
          刪除
        </button>
      </div>
    </Modal>
  );
}
