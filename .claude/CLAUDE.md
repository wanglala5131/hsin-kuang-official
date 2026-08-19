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

- Brand Primary (`#5A1E1E`): Dark Brick Red for brand logo, highlights, and primary headings.
- Body Text (`#2C2C2C`): Carbon Gray for main copy, descriptions, and specifications.
- Secondary Text (`#5A524C`): Warm Gray for tags, captions, and secondary English text.
- Border / Dividers (`#D8D5CF`): Subtle Gray for layout borders, outlines, and dividers.
- Background (`#FCFBFA`): Clean off-white for the main layout background.

# Architecture & Directory Structure

- `/app/`: Next.js App Router (layout, pages, route handlers).
- `/app/_components/`: Modular UI section components (e.g., Navbar, HeroSection, CustomizationGrid, Footer).
- `/app/_lib/`: Shared utility functions.
- `public/`: Static assets (images, icons).

# Coding Standards

- Default to React Server Components (`RSC`); use `'use client'` only when client-side interactivity, state, or browser APIs are required.
- Use TypeScript interfaces/types for all component props.
- Keep page files (`page.tsx`) lightweight by composing modular components.
- Styling: Use Tailwind CSS v4 utility classes and adhere strictly to the project color tokens.
- Icons:
  - Exclusively use `@heroicons/react` (v2) for UI icons.
  - Choose the appropriate variant by path: `@heroicons/react/24/outline` (standard UI/navigation) or `@heroicons/react/24/solid` (active/selected states, emphasis).
  - Style icon size and color directly with Tailwind utility classes (e.g., `className="size-5 text-[#5A1E1E]"`).
- Responsive Design: Mobile-first approach using standard Tailwind CSS responsive prefixes (`sm:`, `md:`, `lg:`).
