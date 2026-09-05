# Project Overview

- Factory official website (hsin-kuang / 新光織帶) built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4.
- Icons: `@heroicons/react` (MIT Licensed, commercial-friendly, tree-shakeable).
- Package Manager: `yarn` (v1.22.22).

# Commands

- Dev server: `yarn dev`
- Build: `yarn build`
- Start production: `yarn start`
- Lint: `yarn lint`
- Type check: `yarn tsc --noEmit`

# Color System & Tokens

Source of truth is `app/globals.css`'s `@theme` block — if this list and the CSS ever disagree, the CSS wins; update this list to match.

- Brand Primary (`brand` / `#B32B2B`): Brand logo, highlights, primary headings, and CTAs.
- Body Text (`content-main` / `#2C2C2C`): Carbon Gray for main copy, descriptions, and specifications.
- Secondary Text (`content-muted` / `#756D67`): Muted Gray for tags, captions, and secondary text.
- Border / Dividers (`border-subtle` / `#D8D5CF`): Subtle Gray for layout borders, outlines, and dividers.
- Background (`background` / `#FCFCFC`): Clean off-white for the main layout background.
- Warm Gray (`warm-gray` / `#DFD3D4`): Warm neutral for image placeholders, panel backgrounds, and decorative dividers.

Use them as Tailwind utilities via the token name, e.g. `text-brand`, `bg-warm-gray`, `border-border-subtle`.

# Architecture & Directory Structure

- `/app/`: Next.js App Router (layout, pages, route handlers).
- `/app/_components/`: Modular UI section components (e.g., Navbar, HeroSection, CustomizationGrid, Footer).
- `/app/_lib/`: Shared utility functions.
- `public/`: Static assets (images, icons).

# Modal Pattern (Parallel + Intercepting Routes)

To open a detail route as a modal over its own listing page — e.g. clicking a card on `/collections` overlays `/collections/[slug]` without leaving the grid, while a direct link/refresh still renders the full standalone page — use Next.js Parallel + Intercepting Routes, scoped to that route only (reference implementation: `/collections`):

- `app/[lang]/(public)/<route>/layout.tsx`: a nested layout (not the shared `(public)/layout.tsx`) rendering `{children}` and `{modal}` together.
- `app/[lang]/(public)/<route>/@modal/default.tsx`: returns `null` — required fallback for hard navigation/refresh, when Next.js can't recover the slot's active state.
- `app/[lang]/(public)/<route>/@modal/(.)[slug]/page.tsx`: the intercepted route; wraps the shared content component in a `<Modal>`-style client component that closes via `router.back()`.
- Extract the actual content (gallery, details, etc.) into one shared presentational component used by both the modal and the standalone `[slug]/page.tsx`, so they can't drift apart.
- Keep `@modal` nested inside the specific route's own folder, not the shared `(public)/layout.tsx` — this keeps the slot's blast radius limited to that one route instead of every page under `(public)`.

# Coding Standards

- Default to React Server Components (`RSC`); use `'use client'` only when client-side interactivity, state, or browser APIs are required.
- Use TypeScript interfaces/types for all component props.
- Keep page files (`page.tsx`) lightweight by composing modular components.
- Styling: Use Tailwind CSS v4 utility classes and adhere strictly to the project color tokens.
- Icons:
  - Exclusively use `@heroicons/react` (v2) for UI icons.
  - Choose the appropriate variant by path: `@heroicons/react/24/outline` (standard UI/navigation) or `@heroicons/react/24/solid` (active/selected states, emphasis).
  - Style icon size and color directly with Tailwind utility classes (e.g., `className="size-5 text-brand"`).
- Responsive Design: Mobile-first approach using standard Tailwind CSS responsive prefixes (`sm:`, `md:`, `lg:`).
- Images: Always use `next/image` instead of raw `<img>`. Add `unoptimized` when rendering dynamic Blob/Object URLs (`URL.createObjectURL`).
- Comments: Only write one when it explains non-obvious logic, reasoning, or an assumption — never to restate what the code already makes clear (e.g. narrating a function's scope or what a block does step by step). Keep it to one line where possible, two at most — if it needs more than that, the code likely needs a clearer name or structure instead. Never transcribe the user's own chat instruction into a comment (e.g. "user said X is static so we skip the null check"); phrase the underlying reasoning in normal engineering language instead, standing on its own without referencing that an instruction was given.
- Resetting state when a prop changes (e.g. `src`): don't use `useEffect` to call `setState` — ESLint's `react-hooks/set-state-in-effect` flags it. Instead compare the previous value during render and call `setState` conditionally in the render body (React's "adjust state during render" pattern).
