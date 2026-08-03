# COD King Website

Marketing website built with the Next.js App Router.

## Stack

| Concern    | Choice                                     |
| ---------- | ------------------------------------------ |
| Framework  | Next.js 16 (App Router, Turbopack)         |
| UI runtime | React 19                                   |
| Language   | TypeScript (strict)                        |
| Styling    | Tailwind CSS v4 (CSS-first configuration)  |
| Components | Shadcn UI (new-york) + Magic UI registries |
| Motion     | Motion (Framer Motion) v12                 |
| Icons      | Lucide React                               |
| Quality    | ESLint 9 (flat config) + Prettier 3        |

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

The app runs at http://localhost:3000.

## Scripts

| Script                 | Purpose                                   |
| ---------------------- | ----------------------------------------- |
| `npm run dev`          | Development server                        |
| `npm run build`        | Production build                          |
| `npm run start`        | Serve the production build                |
| `npm run lint`         | ESLint                                    |
| `npm run lint:fix`     | ESLint with autofix                       |
| `npm run format`       | Prettier write                            |
| `npm run format:check` | Prettier check (use in CI)                |
| `npm run typecheck`    | Generate route types, then `tsc --noEmit` |

## Project structure

```
src/
  app/            Routing only — pages, layouts, error boundaries
  components/
    layout/       Navbar, Footer — global chrome
    home/         Landing-page sections
    common/       Cross-cutting primitives (Container, Section)
    ui/           Shadcn UI / Magic UI generated components
  constants/
    theme/        Design system tokens
    routes.ts     Route registry
    site.ts       Site-wide config
  data/           Content datasets (navigation.ts, footer.ts)
  hooks/          Reusable React hooks
  lib/            Integrations and app-level helpers (cn, metadata)
  utils/          Pure, framework-agnostic functions
  types/          Shared TypeScript types
  assets/         Imported media
```

`constants/` holds configuration that rarely changes and is referenced by code
(routes, tokens). `data/` holds content that a CMS could later supply — it is
the seam where static arrays become fetched data.

`src/app/` contains **routing only**. Anything reusable lives outside it.

## Design system

Token values live in `src/app/globals.css`. Tailwind v4 has no
`tailwind.config.ts` — the `@theme` blocks in that file generate the utility
classes (`bg-primary`, `max-w-page`, `shadow-card`, `py-section`).

`src/constants/theme/` mirrors those tokens as typed TypeScript maps for code
that needs a class name or a raw value programmatically. It does **not**
duplicate the values; colours and radii resolve to `var(--...)` references.

To apply branding, override the custom properties under `:root` and `.dark` in
`globals.css`. No component markup should need to change.

## Conventions

- Components are `PascalCase.tsx`; everything else is `kebab-case.ts`.
- Import via the `@/*` alias, never with relative `../../` paths.
- Server Components by default. Add `"use client"` only where interactivity
  demands it.
- Never hardcode a URL string — import from `constants/routes.ts`. `href` is
  typed as `Route`, so a broken internal link fails the build.
- Never apply `max-w-*` or page padding outside `<Container>`.
- Page metadata is built with `createMetadata()` from `lib/metadata.ts`.

## Adding UI components

```bash
npx shadcn@latest add button
npx shadcn@latest add "https://magicui.design/r/shimmer-button.json"
```

Both write into `src/components/ui/` and import `cn` from `@/lib/utils`. Run
`npm run format` afterwards — generated files ship in the registry's own style,
not this project's.

Magic UI is compatible: its components import `motion/react`, which is the
package already installed.

> Lucide v1 no longer ships brand icons (`Github`, `Twitter`, `Linkedin` were
> removed). Use a dedicated brand-icon set if those are needed.

## Environment variables

| Variable               | Required   | Purpose                                           |
| ---------------------- | ---------- | ------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Production | Absolute origin for canonical and Open Graph URLs |

## Outstanding

- `public/favicon.ico` and app icons are not yet added.
- `siteConfig.name` and `siteConfig.description` in `src/constants/site.ts` are
  placeholders.
