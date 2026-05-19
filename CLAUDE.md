# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

This is a web design agency system. The workflow is: clone the design and layout of an existing website, then customize the content and branding for a client. Projects are full-stack Next.js applications.

## Tech Stack

- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS
- **Runtime:** Node.js

## Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Type check
npx tsc --noEmit
```

## Project Workflow

1. **Clone phase** — Recreate the target site's layout, component structure, and visual design as closely as possible using Next.js + Tailwind.
2. **Customize phase** — Replace content (text, images, colors, fonts, branding) with the client's own material.
3. **Deploy phase** — Build and ship the final site.

## Architecture Conventions

- Use the **App Router** (`app/` directory) with `layout.tsx` + `page.tsx` per route.
- Keep reusable UI in `components/`. Use `'use client'` only when a component needs browser APIs or state.
- Store static data (copy, blog posts, team members, etc.) in `lib/` as typed TypeScript arrays/objects — no CMS needed for simple sites.
- Use `dynamic()` from `next/dynamic` with `{ ssr: false }` for components that rely on browser-only libraries (maps, canvas, etc.).
- Path alias `@/*` maps to the project root — use it for all internal imports.

## Styling

- Dark or light theme is set via CSS custom properties in `globals.css` (e.g. `--bg`, `--accent`).
- Tailwind utility classes are preferred; add custom animations and component classes (`.card`, `.btn-primary`, etc.) in `globals.css` only when Tailwind alone is insufficient.
- Fluid typography via `clamp()` for hero headings; standard Tailwind breakpoints (`sm:`, `md:`, `lg:`) for layout.
