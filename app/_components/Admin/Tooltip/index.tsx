'use client';

import type { ReactNode } from 'react';

interface Props {
  label: string;
  children: ReactNode;
}

// Hover target wraps the trigger — disabled buttons don't reliably fire hover.
export default function Tooltip({ label, children }: Props) {
  return (
    <span className="group/tooltip relative inline-flex">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-content-main px-2 py-1 text-xs text-background opacity-0 transition-opacity duration-150 group-hover/tooltip:opacity-100"
      >
        {label}
      </span>
    </span>
  );
}
