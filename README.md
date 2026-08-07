# COD King Website

Marketing website built with the Next.js App Router.

## Stack

| Concern    | Choice                                    |
| ---------- | ----------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack)        |
| UI runtime | React 19                                  |
| Language   | TypeScript (strict)                       |
| Styling    | Tailwind CSS v4 (CSS-first configuration) |
| Components | Shadcn UI (new-york) registry             |
| Motion     | Motion (Framer Motion) v12                |
| Icons      | Lucide React                              |
| Quality    | ESLint 9 (flat config) + Prettier 3       |

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
  app/
    (site)/       Marketing route group — every page in the sitemap
    layout.tsx    Document shell only (html, fonts, metadata base)
  components/
    layout/       The global shell (header, nav, drawer, footer, action bar)
    shared/       Cross-cutting primitives (Container, Section, PagePlaceholder)
    templates/    Page templates shared by many routes (control, article, legal)
    ui/           Unstyled-behaviour primitives (button, accordion)
  constants/
    theme/        Design token maps
    routes.ts     Route registry and dynamic-path builders
    site.ts       Site-wide config
    external.ts   Destinations outside this site (App Store, login, demo)
    storage.ts    Browser storage keys
  data/           Typed content records — the CMS-replaceable layer
  hooks/          Reusable client hooks
  lib/
    content/      Content repository — the only way components read content
    metadata.ts   Page metadata factory
    utils.ts      cn()
  utils/          Pure, framework-agnostic functions
  types/          Domain contracts
```

Folders arrive when they have something to hold. `components/sections/` is
created by the phase that owns the reusable marketing bands.

`constants/` holds configuration that rarely changes and is referenced by code
(routes, tokens). `data/` holds content a CMS could later supply. **Components
never import from `data/`** — they call `lib/content`, which is the seam where
static arrays become fetched records without touching a single component.

`src/app/` contains **routing only**. Anything reusable lives outside it.

## Design system

Token values live in `src/app/globals.css`. Tailwind v4 has no
`tailwind.config.ts` — the `@theme` blocks in that file generate the utility
classes (`bg-primary`, `max-w-page`, `shadow-card`, `py-section`).

`src/constants/theme/` mirrors those tokens as typed TypeScript maps for code
that needs a class name or a raw value programmatically. It does **not**
duplicate the values; colours and radii resolve to `var(--...)` references.

Brand values are sampled from the logo (`public/logos/cod-king-wordmark.png`):
violet `#734dff` and green `#7cd548`. The green fails contrast as text on a
light surface — it is for icons and fills only, which is why `--brand-check`
is named for its use rather than its hue.

To re-brand, override the custom properties under `:root` and `.dark` in
`globals.css`. No component markup should need to change.

## Conventions

- Components are `PascalCase.tsx`; everything else is `kebab-case.ts`.
  `components/ui/` is the exception and stays kebab-case, so files generated
  by the shadcn registry drop in without being renamed.
- Import via the `@/*` alias, never with relative `../../` paths.
- Server Components by default. Add `"use client"` only where interactivity
  demands it.
- Never hardcode a URL string — import from `constants/routes.ts`. `href` is
  typed as `Route`, so a broken internal link fails the build. External
  destinations come from `constants/external.ts`.
- Never apply `max-w-*` or page padding outside `<Container>`.
- Page metadata is built with `createMetadata()` from `lib/metadata.ts`.
  Placeholder routes pass `noIndex: true`; removing it is part of the
  definition of done for the phase that gives the page real content.
- Read content through `@/lib/content`, never from `@/data` directly.
- A new control, story, or article is a content record dropped into an existing
  component — not a new custom page.

## Adding UI components

```bash
npx shadcn@latest add button
```

Generated files land in `src/components/ui/` and import `cn` from
`@/lib/utils`. Run `npm run format` afterwards — registries ship in their own
style, not this project's.

A generated component is a starting point, not the finished primitive: it must
be re-tokenised against `globals.css` and given the variants this product
actually needs before it is used.

> Lucide v1 no longer ships brand icons (`Github`, `Twitter`, `Linkedin` were
> removed). Use a dedicated brand-icon set if those are needed.

## Environment variables

| Variable                      | Required   | Purpose                                           |
| ----------------------------- | ---------- | ------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`        | Production | Absolute origin for canonical and Open Graph URLs |
| `NEXT_PUBLIC_SHOPIFY_APP_URL` | Production | Install Free — the primary action on every page   |
| `NEXT_PUBLIC_BOOK_DEMO_URL`   | Production | Book a Demo, the secondary action                 |
| `NEXT_PUBLIC_APP_LOGIN_URL`   | Production | Log in, for existing merchants                    |
| `NEXT_PUBLIC_WHATSAPP_URL`    | Production | Secondary action on the mobile bar                |

An unset external URL resolves to `null`, so the UI can render a disabled
action rather than a link that goes nowhere.

## Outstanding

- Every page body is still a placeholder and is `noIndex`; the shell around
  them is real.
- External destinations are unset, so Install Free, Book a Demo, Log in and
  WhatsApp render disabled until the env vars are supplied.
- Pricing, FAQ, testimonials and integrations are empty typed collections
  awaiting content.
- Proof figures (rating, review count) are static and unverified; §11 calls
  for syncing them from the Shopify App Store.
