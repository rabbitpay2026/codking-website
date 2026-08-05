# COD King Website — Implementation Roadmap

**Status:** Awaiting approval · **Version:** 1.0 · **Date:** 2026-08-05
**Source of truth:** _COD King · Notifik Technologies — Website Architecture_ (approved)
**Reference-only (patterns, never UI):** shopflo.com, easysellapp.com

---

## 0 · How to read this document

This roadmap turns the approved Website Architecture into an executable build plan. Nothing here changes the sitemap, navigation, information architecture, homepage flow, feature hierarchy, or dynamic-content strategy — those are fixed inputs.

Every phase is independently reviewable, independently shippable, and gated: **phase N+1 does not start until phase N is merged to `develop` and its acceptance criteria are signed off.**

Architecture-document phases map to build phases as follows:

| Architecture §14 phase | Build phases here                                                       |
| ---------------------- | ----------------------------------------------------------------------- |
| 0 · Foundations        | P0, P1, P2, P3                                                          |
| 1 · Core site          | P4 (homepage), P5 (calculator), P6 (controls), P7 (pricing)             |
| 2 · Resources          | P8 (customers), P9 (resources)                                          |
| 3 · Polish & scale     | P10 (company/legal), P11 (SEO), P12 (performance & a11y), P13 (release) |

---

## 1 · Assessment of the existing foundation

The repository already contains a competent architectural base built during the UI-foundation phase. The build **reuses** that base and **discards** the RabbitPay-derived surface layer built on top of it.

### 1.1 Keep — reuse without rewriting

| Asset                                                                                 | Why it stays                                                                |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Next.js 16.2.12 · React 19.2.4 · TypeScript strict                                    | Correct, current, no upgrade needed                                         |
| `src/app/globals.css` token layer (Tailwind v4 CSS-first `@theme`)                    | Correct pattern. Values get retuned for brand in P1; the structure is right |
| `src/components/common/Container.tsx`, `Section.tsx`                                  | Single owner of page width and vertical rhythm. Exactly the right primitive |
| `src/constants/routes.ts` + `typedRoutes: true`                                       | Compile-time protection against dead links. Expanded, not replaced, in P0   |
| `src/lib/metadata.ts` `createMetadata()`                                              | Correct SEO factory pattern. Extended in P11                                |
| `src/constants/theme/*`                                                               | Token→class maps. Retuned in P1                                             |
| `src/types/` + `src/data/` separation                                                 | This is the seed of the architecture's §11 dynamic-content layer            |
| ESLint flat config, Prettier + `prettier-plugin-tailwindcss`, `tsconfig` strict flags | Production-grade already                                                    |

### 1.2 Discard — RabbitPay-derived, contradicts the approved architecture

| Asset                                                                                                       | Conflict with the architecture                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `src/components/home/*` (Hero, Features, WhyCodKing, Metrics, TrustBar, CallToAction, Pricing, HeroCtaCard) | Layout and narrative derived from RabbitPay; homepage flow must follow §5.1's 12 sections                                      |
| `src/data/home.ts`                                                                                          | 3 generic features; §6 requires 10 named controls grouped into 4 order stages                                                  |
| `src/data/pricing.ts`                                                                                       | Growth/Enterprise; §5.1 #9 requires Free / Pro / Enterprise + per-message rates                                                |
| `src/data/navigation.ts`                                                                                    | 5 flat items; §4.1 requires exactly 4 (Features mega-menu · COD Calculator · Pricing · Resources) plus a §4.2 utility area     |
| `src/data/footer.ts`                                                                                        | 2 columns; §4.5 requires 6 columns as the full site index                                                                      |
| `src/components/ui/{aurora-text,retro-grid,magic-card,dot-pattern}.tsx`                                     | Decorative MagicUI effects that read as "startup landing page". Directly against the stated quality bar (Stripe/Linear/Vercel) |

### 1.3 Keep but re-home

`number-ticker.tsx`, `marquee.tsx`, `blur-fade.tsx`, `button.tsx` survive into the P1 design system after being re-tokenised and given a reduced-motion path.

### 1.4 Structural correction

Current `src/components/home/` implies homepage-owned sections. Architecture §12 defines these as **site-wide reusable components** (Hero band, Proof strip, CTA band, FAQ accordion, Pricing table, Testimonial card, Related-controls rail). They move to `src/components/sections/`, and the homepage becomes a thin composition file. This is what makes §12.1 true — "a new control is a content record dropped into an existing component, not a new custom page."

---

## 2 · Technical decisions (Next.js 16 specific)

These are grounded in `node_modules/next/dist/docs`, not in general Next.js knowledge.

| Decision                                   | Choice                                                                                                                                                      | Reason                                                                                                                                                                                    |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rendering                                  | Static generation for every marketing page                                                                                                                  | §13.1 requires SSR/SSG. Nothing on this site is per-user                                                                                                                                  |
| Cache Components (`cacheComponents: true`) | **Not** in P0. Re-evaluate at P11                                                                                                                           | It replaces the removed `experimental_ppr` flag and changes the whole dynamic model. Only the live App Store review feed needs it, and segment-level `revalidate` covers that more simply |
| Live App Store rating/reviews              | Cached fetch behind a repository adapter with segment `revalidate`; `revalidateTag(tag, 'max')` if promoted to on-demand                                    | Next 16 requires the second `cacheLife` argument on `revalidateTag` — single-argument form is a TS error                                                                                  |
| Calculator shareable URLs (§8.4)           | Page renders a **static** default result; the client widget syncs state to the query string via `history.replaceState`, and hydrates from `location.search` | Satisfies §13.1 "must render a crawlable default result" while keeping the page fully static. Reading `searchParams` on the server would force the page dynamic                           |
| Controls pages                             | One dynamic route `features/[control]` + `generateStaticParams()`                                                                                           | §6.3 — one template, ten content records                                                                                                                                                  |
| Edge middleware                            | None. If ever needed, the file is `proxy.ts` with an exported `proxy()` function                                                                            | `middleware` is deprecated in 16; `proxy` is Node-runtime only                                                                                                                            |
| Turbopack                                  | Default, no flags                                                                                                                                           | Stable and default in 16. Do not add a webpack config — it fails the build                                                                                                                |
| `data-scroll-behavior="smooth"`            | Keep on `<html>`                                                                                                                                            | Next 16 no longer overrides `scroll-behavior` during navigation without it                                                                                                                |
| Images                                     | `next/image`, local assets, AVIF/WebP                                                                                                                       | Note 16's changed `qualities`/`imageSizes`/`minimumCacheTTL` defaults when tuning                                                                                                         |
| Testing                                    | Vitest for calculator math + content-integrity tests only                                                                                                   | Marketing sites do not need broad unit tests. The calculator produces money numbers shown to merchants — that math gets tested                                                            |

---

## 3 · Git strategy

### 3.1 Branch model

```
main                       protected · production · tagged releases only
 └── develop               protected · integration · always green
      ├── feature/*        one per phase · squash-merged into develop
      └── release/v1       cut from develop · merge commit into main + tag
hotfix/*                   from main · merged to main and develop
```

**Rules**

- `main` never receives a `feature/*` branch directly.
- `develop` is cut from `main` at the start of P0 and must always build.
- One phase = one `feature/*` branch = one pull request.
- Feature branches rebase onto `develop` before review; no merge commits inside a feature branch.
- A feature branch lives no longer than its phase. Long-lived branches are a defect.

### 3.2 Disposition of existing branches

| Branch                                       | Action                                                                                                        |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `main`                                       | Base for `develop`. Retains the good UI foundation (commit `4bf6c26`)                                         |
| `feature/homepage-redesign` (RabbitPay work) | Tag as `archive/rabbitpay-homepage` and stop using it. Not merged, not deleted — kept as a reference tag only |
| `feature/ui-foundation`                      | Already merged. Delete local and remote after `develop` exists                                                |

### 3.3 Commit convention

Conventional Commits, enforced by review:

```
<type>(<scope>): <imperative subject ≤ 72 chars>

<body — what changed and why, wrapped at 72>
<footer — Refs: architecture §N>
```

`type` ∈ `feat` `fix` `refactor` `style` `perf` `a11y` `seo` `chore` `docs` `test` `build`
`scope` = the phase area (`foundation`, `ds`, `content`, `shell`, `home-hero`, `calculator`, `controls`, …)

Examples:

```
feat(shell): add features mega-menu grouped by order stage

Four columns driven by the controls repository, so a new control
appears in the menu without a code change.

Refs: architecture §4.1, §11
```

### 3.4 Merge strategy

| Merge                             | Method                                        | Requirement                                                  |
| --------------------------------- | --------------------------------------------- | ------------------------------------------------------------ |
| `feature/*` → `develop`           | **Squash merge**, PR title becomes the commit | Green CI + review checklist signed + acceptance criteria met |
| `develop` → `release/v1`          | Branch cut, no merge                          | Feature freeze                                               |
| `release/v1` → `main`             | **Merge commit**, tagged `v1.0.0`             | Full regression + Lighthouse + a11y sign-off                 |
| `hotfix/*` → `main` and `develop` | Merge commit both                             | Post-release only                                            |

### 3.5 Universal Definition of Done

Applies to **every** phase. Phase-specific checklists in §5 are additional, not a replacement.

- [ ] `npm run typecheck` passes (`next typegen && tsc --noEmit`)
- [ ] `npm run lint` passes with zero warnings
- [ ] `npm run format:check` passes
- [ ] `npm run build` succeeds with no new warnings
- [ ] No `any`, no `@ts-expect-error`, no `eslint-disable` without an inline justification comment
- [ ] No hard-coded copy inside components — all content flows from `src/data` via typed contracts
- [ ] No hard-coded internal URLs — all links go through `routes`
- [ ] No hard-coded colour, radius, shadow, or font value — tokens only
- [ ] Verified at 360 / 768 / 1024 / 1440 / 1920 px
- [ ] Keyboard-only pass: every interactive element reachable, visible focus ring, logical order
- [ ] axe DevTools: zero serious or critical violations
- [ ] All animation respects `prefers-reduced-motion: reduce`
- [ ] No layout shift on load (CLS contribution ≈ 0)
- [ ] Server Components by default; `"use client"` only where interaction demands it, pushed to the smallest possible leaf
- [ ] Every new component has a header comment stating its purpose and its architecture-document reference

---

## 4 · Folder ownership

Each directory has exactly one owning phase. Later phases add records; they do not restructure.

| Path                           | Owner                         | Contents                                                                                                                  |
| ------------------------------ | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `src/app/(site)/**`            | P0 (routes) → per-page phases | Route segments and page compositions                                                                                      |
| `src/app/globals.css`          | P1                            | Token definitions — the only place raw values exist                                                                       |
| `src/constants/theme/**`       | P1                            | Token→utility maps                                                                                                        |
| `src/components/ui/**`         | P1                            | Headless/styled primitives: Button, Badge, Card, Accordion, Tabs, NumberField, Sheet, Tooltip, Breadcrumb, Reveal         |
| `src/components/layout/**`     | P3                            | AnnouncementBar, Header, MegaMenu, MobileDrawer, MobileActionBar, Footer                                                  |
| `src/components/sections/**`   | P4                            | Site-wide reusable bands: HeroBand, ProofStrip, CTABand, FaqAccordion, PricingTable, TestimonialCard, RelatedControlsRail |
| `src/components/controls/**`   | P4 → P6                       | ControlCard, StageGrid, ControlPageTemplate                                                                               |
| `src/components/calculator/**` | P5                            | Calculator shell, tabs, inputs, result panels                                                                             |
| `src/lib/calculator/**`        | P5                            | Pure, unit-tested math. Zero React                                                                                        |
| `src/lib/content/**`           | P2                            | Repository interfaces + adapters (local now, CMS later)                                                                   |
| `src/lib/seo/**`               | P11                           | JSON-LD builders                                                                                                          |
| `src/data/**`                  | P2                            | Typed content records — controls, pricing, faqs, stories, metrics, integrations                                           |
| `src/types/**`                 | P2                            | Domain contracts                                                                                                          |
| `src/content/**`               | P9                            | MDX for guides, blog, docs, help                                                                                          |
| `public/**`                    | as needed                     | Static assets, logos, OG images                                                                                           |
| `docs/**`                      | P0                            | This roadmap, decision log, content briefs                                                                                |

---

## 5 · Phases

### Phase 0 — Project reset & foundation

**Branch:** `feature/project-foundation` (off a newly created `develop`)

**Purpose**
Establish a clean, architecture-aligned skeleton. Remove the RabbitPay surface layer, create every route in the approved sitemap so typed links compile from day one, and set up the quality gates the remaining phases are measured against.

**Deliverables**

1. `develop` branched from `main`; `archive/rabbitpay-homepage` tag created.
2. Deletion of `src/components/home/**`, RabbitPay-derived `src/data/*`, and the four decorative UI effects listed in §1.2.
3. `src/constants/routes.ts` expanded to the complete §3 sitemap, including `/cod-calculator`, `/customers`, `/resources/{guides,blog,docs,help}`, `/legal/{privacy,terms,refund,cookies}`, and the `/features/[control]` pattern.
4. `(site)` route group with a placeholder page for every route — server-rendered, `robots: { index: false }`, one line of copy. This makes typed navigation compile before the pages exist.
5. External destinations (Shopify App Store install URL, login URL, demo booking URL, WhatsApp) centralised in `src/constants/external.ts`.
6. Vitest wired for `src/lib/**` only.
7. CI workflow: typecheck → lint → format:check → build → test.
8. `docs/IMPLEMENTATION-ROADMAP.md`, `docs/DECISIONS.md`.
9. `README.md` rewritten: architecture summary, folder ownership, branch model, commands.

**Dependencies** — approval of this roadmap; the §6 decisions answered.

**Expected outcome** — A repository that builds clean, has zero RabbitPay residue, and where every internal link in the approved sitemap already resolves.

**Commit strategy** — Ordered atomic commits: `chore(foundation): branch develop and archive rabbitpay work` → `refactor(foundation): remove rabbitpay-derived homepage layer` → `feat(foundation): expand route registry to approved sitemap` → `feat(foundation): scaffold placeholder routes` → `build(foundation): add CI quality gates` → `docs(foundation): add roadmap and decision log`.

**Merge strategy** — Squash into `develop`. This is the only phase permitted to delete files wholesale.

**Review checklist** — Universal DoD, plus:

- [ ] Every §3 sitemap path exists and returns 200
- [ ] Every placeholder page is `noindex`
- [ ] Zero imports remain pointing at deleted modules
- [ ] `routes` object matches the sitemap exactly — no extra, no missing
- [ ] No external URL is written as a literal anywhere outside `external.ts`
- [ ] CI fails the build on a deliberately introduced type error (verified once)

**Acceptance criteria**

- `npm run build` succeeds; build output lists every sitemap route as static.
- `grep -r "rabbitpay\|RabbitPay"` over `src/` returns nothing.
- A `<Link href={routes.codCalculator}>` compiles; a link to a non-existent route fails typecheck.
- CI is green on the PR.

---

### Phase 1 — Design system & brand foundation

**Branch:** `feature/design-system`

**Purpose**
Define the visual language once, in tokens, so no later phase invents a value. This phase is what separates "mature SaaS product website" from "landing page": consistent scale, restrained palette, deliberate motion.

**Deliverables**

1. **Brand token set** in `globals.css`: primary/accent ramp, ink scale, surface scale, semantic states, dark-mode values. COD King's own identity — not the placeholder blue currently in the file.
2. **Type system**: display/heading/body scale with fluid `clamp()` sizes, measure limits, tabular-numeric utility for money figures.
3. **Spacing & rhythm**: section spacing scale, grid gutters, card padding scale.
4. **Elevation & border**: two-shadow system (card, overlay) plus hairline borders. No decorative glows.
5. **Motion system**: duration and easing tokens; a `<Reveal>` server-safe wrapper with `prefers-reduced-motion` short-circuit; the single site-wide scroll-reveal grammar (one pattern, applied consistently — not per-section improvisation).
6. **Primitives** (Radix-backed where behaviour is non-trivial): `Button` (primary = Install Free, secondary = Book a Demo, ghost, link), `Badge`, `Card`, `Accordion`, `Tabs`, `NumberField`, `Sheet`, `Tooltip`, `Breadcrumb`, `Separator`, `Skeleton`.
7. **`/dev/kitchen-sink`** — a development-only route rendering every token and primitive in both themes, excluded from sitemap and `noindex`. This is how every subsequent phase gets visually reviewed.
8. Icon policy: one library (`lucide-react`), one stroke width, one size scale.

**Dependencies** — P0. Brand direction decision (§6.2).

**Expected outcome** — Any later phase can build a section without making a single visual decision from scratch.

**Commit strategy** — One commit per token group, then one per primitive. `feat(ds): add brand colour ramp and semantic tokens`, `feat(ds): add button primitive with install/demo variants`, …

**Merge strategy** — Squash into `develop`. Blocks all UI phases.

**Review checklist** — Universal DoD, plus:

- [ ] Kitchen sink renders every token and every primitive variant/state (default, hover, focus-visible, active, disabled, loading)
- [ ] Light and dark themes both reviewed
- [ ] Every text/background pair meets WCAG AA (4.5:1 body, 3:1 large); primary button meets AA
- [ ] Focus ring visible on every interactive primitive against every surface it can sit on
- [ ] Type scale is fluid — no fixed `px` font sizes
- [ ] Motion tokens used; no inline durations
- [ ] Reduced-motion produces a static but complete page (content never hidden)
- [ ] Zero raw hex/rgb values outside `globals.css`

**Acceptance criteria**

- `/dev/kitchen-sink` renders complete in both themes with no console warnings.
- A colour-contrast audit of the kitchen sink returns zero AA failures.
- Toggling OS reduced-motion produces no animation anywhere on the kitchen sink.
- `grep -rE "#[0-9a-fA-F]{3,8}" src/components src/app --include=*.tsx` returns nothing.

---

### Phase 2 — Content & data layer

**Branch:** `feature/content-layer`

**Purpose**
Implement architecture §11 literally: content that appears in more than one place is stored once and read through an interface. This is the phase that makes the mega-menu, homepage system section, feature pages, and footer impossible to disagree with each other.

**Deliverables**

1. **Controls domain model** — `OrderStage` (`before` | `at` | `after` | `across`) and `Control` (slug, name, stage, one-line outcome, problem, how it works, setup notes, plan, related slugs, linked calculator). All ten records per §6.2, in stage order.
2. **Pricing model** — Free / Pro / Enterprise plans plus per-message rates, per §5.1 #9.
3. **Proof model** — merchant count, rating, review count, countries. Single source, consumed everywhere (§11.1).
4. **Testimonials / customer stories** — named merchant, one metric, quote, control tags.
5. **FAQ pool** — question, answer, tags (`home`, `pricing`, `control:<slug>`, `calculator`) so the same pool surfaces contextually (§11).
6. **Integrations** — gateway/platform records.
7. **Calculator constants** — default RTO %, shipping cost, fee assumptions, editable in one file (§11).
8. **Repository layer** `src/lib/content/` — `getControls()`, `getControlBySlug()`, `getControlsByStage()`, `getFaqsByTag()`, `getProof()`, `getPricing()`, `getStories()`. Components call these, never the raw data files, so a CMS can be substituted in one place.
9. **App Store review adapter** — typed interface plus a local fixture implementation and a cached remote implementation behind a feature flag.
10. **Content-integrity tests** — every control has a unique slug, belongs to a valid stage, its `related` slugs resolve, and every stage has at least one control.

**Dependencies** — P0. Content-source decision (§6.1). Real proof numbers (§6.3).

**Expected outcome** — Adding an eleventh control is a single record; it appears in the mega-menu, footer, homepage system section, overview page, and gets its own page automatically.

**Commit strategy** — `feat(content): add order-stage and control domain types` → one commit per content set → `feat(content): add repository layer` → `test(content): add content-integrity tests`.

**Merge strategy** — Squash into `develop`. Blocks P3 onward.

**Review checklist** — Universal DoD, plus:

- [ ] All ten controls present, correctly staged, matching §6.1/§6.2 wording intent
- [ ] Every field is `readonly`; every collection is `readonly T[]`
- [ ] No component imports from `src/data` directly — repository only
- [ ] No proof number (rating, review count, merchant count) exists in more than one place
- [ ] Slugs match the §3 sitemap URLs exactly
- [ ] Placeholder/unverified figures explicitly marked with a `TODO(content)` comment and listed in the PR

**Acceptance criteria**

- `getControlsByStage()` returns 3 / 3 / 2 / 2 controls across the four stages.
- Content-integrity tests pass.
- Changing the review count in one file changes it everywhere it renders (verified after P3/P4).
- `getFaqsByTag("home")` returns 5–6 questions per §5.1 #10.

---

### Phase 3 — Site shell: announcement, header, navigation, footer

**Branch:** `feature/site-shell`

**Purpose**
Build the frame every page lives inside. It comes before homepage sections because sections can only be judged inside their real shell, and because §4 navigation is a fixed architectural requirement.

**Deliverables**

1. **Announcement bar** — dismissible (persisted), optional, content-driven (§5.1 #1).
2. **Header** — exactly four primary items: Features, COD Calculator, Pricing, Resources (§4.1).
3. **Features mega-menu** — four columns by order stage, each control with its one-line outcome, footer row linking "All features" and "Open COD Calculator". Driven entirely by the controls repository. Full keyboard support, escape-to-close, focus trap-free (menu, not modal).
4. **Resources dropdown** — Guides, Blog, Documentation, Help Center.
5. **Utility area** — Log in (text link), Book a Demo (secondary button), Install Free (primary button) (§4.2).
6. **Mobile navigation** (§4.4) — top bar with logo + menu button; full-screen drawer with Features as a stage-grouped accordion; **persistent bottom bar** with Install Free + WhatsApp, visible on every page.
7. **Footer** (§4.5) — six columns: Features (all ten, grouped by stage), Tools, Resources, Company, Trust, Badges (Built-for-Shopify, live rating + review count).
8. Skip-to-content link; landmark regions; scroll-state header behaviour.

**Dependencies** — P1, P2.

**Expected outcome** — Every placeholder route already looks like a real site.

**Commit strategy** — `feat(shell): add announcement bar` → `feat(shell): add header with primary navigation` → `feat(shell): add features mega-menu driven by controls repository` → `feat(shell): add mobile drawer and persistent action bar` → `feat(shell): add six-column footer index`.

**Merge strategy** — Squash into `develop`. Blocks P4.

**Review checklist** — Universal DoD, plus:

- [ ] Exactly four primary nav items — no drift
- [ ] Mega-menu opens on hover **and** keyboard focus; Escape closes and returns focus to the trigger
- [ ] Mega-menu content comes from the repository (verified by adding a temporary control and seeing it appear)
- [ ] Mobile drawer traps focus, locks background scroll, and closes on route change
- [ ] Persistent bottom bar never covers page content (body padding compensates) and is present on every route
- [ ] Footer lists every §3 route — no orphan pages
- [ ] Install Free reachable within one interaction from any viewport width
- [ ] Announcement-bar dismissal persists across navigation and reload
- [ ] Header has no CLS on load and no hydration flash

**Acceptance criteria**

- Every page in the sitemap is reachable from the footer.
- Full keyboard traversal of header → mega-menu → utility → content works in Chrome, Safari, Firefox.
- Mobile bottom bar present at 360 px on all routes; content bottom padding verified.
- Lighthouse a11y ≥ 95 on a placeholder page (shell only).

---

### Phase 4 — Homepage

The highest-priority surface. Built strictly in the §5.1 order, one section per branch, each an independently reviewable feature. Section components live in `src/components/sections/` and are reusable; `page.tsx` is a composition file only.

**Narrative rule (§5.2), enforced at review:** problem → system → proof → price → doubt → close. Each section asks for slightly more commitment than the one before.

| Sub-phase | Branch                             | Architecture ref | Section                                      |
| --------- | ---------------------------------- | ---------------- | -------------------------------------------- |
| 4A        | `feature/homepage-hero`            | §5.1 #2          | Hero + trust line                            |
| 4B        | `feature/homepage-proof-strip`     | §5.1 #3          | Live proof strip                             |
| 4C        | `feature/homepage-cod-loss`        | §5.1 #4          | The COD loss, made visible                   |
| 4D        | `feature/homepage-controls-system` | §5.1 #5          | The Controls system (4 stages)               |
| 4E        | `feature/homepage-key-controls`    | §5.1 #6          | Key controls in focus                        |
| 4F        | `feature/homepage-how-it-works`    | §5.1 #7          | How it works (3 steps)                       |
| 4G        | `feature/homepage-proof-stories`   | §5.1 #8          | Merchant stories + live reviews              |
| 4H        | `feature/homepage-pricing-preview` | §5.1 #9          | Pricing preview                              |
| 4I        | `feature/homepage-faq`             | §5.1 #10         | Common questions                             |
| 4J        | `feature/homepage-final-cta`       | §5.1 #11         | Final call to action                         |
| 4K        | `feature/homepage-polish`          | §5.2             | Rhythm, choreography, responsive, a11y, perf |

**Shared per-sub-phase contract**

- **Dependencies:** P1, P2, P3, and the preceding sub-phase.
- **Commit strategy:** `feat(home-<section>): add <section> section` plus follow-up commits for responsive and motion work. One section per branch — never two.
- **Merge strategy:** Squash into `develop`. The homepage is re-reviewed as a whole at 4K.
- **Universal DoD** applies to every sub-phase.

#### 4A — Hero

- **Purpose:** State the value in one line — fewer fake orders, lower RTO, profitable COD — with the trust line beneath.
- **Deliverables:** `HeroBand` section component (reusable by feature pages), primary CTA Install Free + secondary "See how it works", trust line rendered from the proof repository, a product-truthful visual (not a stock illustration).
- **Checklist additions:** exactly one `<h1>`; value line legible at 360 px without truncation; trust numbers come from the repository; hero image/visual has explicit dimensions and `priority`; LCP element identified and measured.
- **Acceptance:** hero LCP < 2.0 s on simulated mobile; no CLS; Install Free is the visually dominant action.

#### 4B — Proof strip

- **Purpose:** Merchant count, rating, review count, countries — pulled live where possible (§5.1 #3).
- **Deliverables:** `ProofStrip` component; number-ticker animation with reduced-motion fallback to final value; links to `/customers`.
- **Checklist additions:** static SSR value present in HTML before JS (crawlable); ticker never renders a wrong final number; no CLS while counting.
- **Acceptance:** view-source shows the real figures; disabling JS still shows correct numbers.

#### 4C — The COD loss, made visible

- **Purpose:** The emotional and strategic core of the page — make the invisible loss visible (§2, §5.1 #4).
- **Deliverables:** the four loss line items (return freight, fake orders, blocked cash, wasted ad spend); an inline "see your own number" entry point into the COD Calculator; visual treatment that communicates accumulation, not decoration.
- **Checklist additions:** no fabricated statistics — every number is either the merchant's own input or a sourced figure; the CTA leads to `/cod-calculator`, not to install.
- **Acceptance:** the section is comprehensible with images disabled; the calculator link is the only primary action.

#### 4D — The Controls system

- **Purpose:** Show the four order stages and the controls in each; make clear this is a system (§5.1 #5, §6.4).
- **Deliverables:** `StageGrid` rendering all four stages from the repository, each control a `ControlCard` with its one-line outcome, linking to its page; "All features" exit.
- **Checklist additions:** all ten controls render; stage order is Before → At → After → Across; adding a control record changes this section with no code edit.
- **Acceptance:** a temporary eleventh record appears here, in the mega-menu, and in the footer simultaneously.

#### 4E — Key controls in focus

- **Purpose:** Three or four highlighted controls with a one-line outcome each (§5.1 #6).
- **Deliverables:** `FeatureSpotlight` component — alternating media/copy rhythm, driven by a `featured` flag on control records.
- **Checklist additions:** which controls are featured is data, not markup; each spotlight links to its control page.
- **Acceptance:** changing the featured flag reorders the section with no code change.

#### 4F — How it works

- **Purpose:** Three steps with the effort stated honestly — no code, under 10 minutes (§5.1 #7).
- **Deliverables:** `HowItWorks` three-step component; Install Free CTA.
- **Checklist additions:** effort claims match reality; steps readable as a numbered list by a screen reader.
- **Acceptance:** section conveys the full flow without animation.

#### 4G — Proof: stories + live reviews

- **Purpose:** Two or three named merchant stories with one metric each, plus live App Store reviews (§5.1 #8).
- **Deliverables:** `TestimonialCard`, `ReviewFeed` (via the review adapter), link to `/customers`.
- **Checklist additions:** every claim attributable to a named merchant (§10.1); review feed degrades to cached fixtures on fetch failure and never shows an empty or broken state.
- **Acceptance:** simulated adapter failure still renders a complete, sensible section.

#### 4H — Pricing preview

- **Purpose:** Free / Pro / Enterprise plus the per-message note, so cost is not a surprise later (§5.1 #9).
- **Deliverables:** `PricingTable` in compact variant (reused full-size in P7), driven by the pricing repository.
- **Checklist additions:** three plans, correct names; per-message note present; links to `/pricing`.
- **Acceptance:** editing a price in one file updates both the homepage preview and the pricing page (verified in P7).

#### 4I — Common questions

- **Purpose:** Five or six real objections — theme safety, no-code, country coverage, cancel anytime, data handling (§5.1 #10).
- **Deliverables:** `FaqAccordion` fed by `getFaqsByTag("home")`; native disclosure semantics.
- **Checklist additions:** answers present in the DOM when collapsed (crawlable); correct `aria-expanded`/`aria-controls`; keyboard operable.
- **Acceptance:** FAQ content is visible in view-source; JSON-LD deferred to P11 but the data shape supports it.

#### 4J — Final call to action

- **Purpose:** Restate the offer and close — Install Free · Book a Demo (§5.1 #11).
- **Deliverables:** `CTABand` (reused on every page type).
- **Checklist additions:** Install Free visually dominant; Book a Demo clearly secondary.
- **Acceptance:** component renders correctly in all three contexts it will be reused in.

#### 4K — Homepage polish

- **Purpose:** Make the twelve sections read as one page.
- **Deliverables:** vertical rhythm normalisation; alternating surface treatment for scroll legibility; unified scroll-reveal choreography; full responsive sweep; image optimisation; a11y sweep; performance budget enforcement.
- **Checklist additions:** section spacing uses only the spacing scale; no two adjacent sections share the same background treatment unintentionally; heading hierarchy across the full page is `h1 → h2` with no skips; total client JS on `/` measured and recorded.
- **Acceptance:**
  - Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
  - LCP < 2.0 s, CLS < 0.05, INP < 200 ms on simulated mid-tier mobile.
  - Full keyboard traversal of the homepage top to bottom.
  - Reduced-motion pass shows the complete page with no animation.
  - Reviewed at all five breakpoints with screenshots attached to the PR.

---

### Phase 5 — COD Calculator

**Branch:** `feature/calculator`

**Purpose**
Build the site's main lead magnet (§8) — one page, three tools, no signup, crawlable default result.

**Deliverables**

1. `src/lib/calculator/` — pure functions for the Savings, COD Fee, and Partial Payment models, fully unit-tested, with constants read from the content layer.
2. `CalculatorShell` with three tabs/stacked sections; deep-linkable tab state.
3. **Savings Calculator** — monthly orders, COD %, AOV, current RTO %, avg shipping → monthly and annual loss + estimated savings.
4. **COD Fee Calculator** — AOV, current COD share, target prepaid share, cost per RTO → suggested fee + expected effect.
5. **Partial Payment Calculator** — AOV, current RTO %, cost per RTO → suggested deposit %, expected RTO drop, net profit effect.
6. Mobile-first inputs: `inputMode="numeric"`, sensible pre-filled defaults, first result after ≤ 3 inputs.
7. Result → control links: Savings → OTP Verification + COD Rules; Fee → COD Fees; Partial → Partial COD Payment (§8.4).
8. Shareable URL via `history.replaceState`, hydrating from `location.search`.
9. Optional email capture for a downloadable report only — the number itself is never gated (§8.4).
10. Compact embeddable variant for control pages (§6.3).

**Dependencies** — P1, P2, P3. Calculator formula sign-off (§6.4).

**Expected outcome** — A merchant reaches a credible personal number in under 60 seconds on a phone, and lands on the control that fixes it.

**Commit strategy** — `feat(calculator): add savings model with unit tests` → one commit per model → `feat(calculator): add shell with deep-linkable tabs` → one per UI → `feat(calculator): add shareable result urls`.

**Merge strategy** — Squash into `develop`. Math commits reviewed separately from UI commits.

**Review checklist** — Universal DoD, plus:

- [ ] Server-rendered default result present in HTML with JS disabled (§13.1)
- [ ] Page remains statically generated — no server `searchParams` read
- [ ] Every formula has a test, including zero, boundary, and implausible inputs
- [ ] No division-by-zero, `NaN`, or `Infinity` reachable from any input combination
- [ ] Currency and percentage formatting via `Intl`, correct locale, tabular numerals
- [ ] Numeric keypad appears on iOS and Android
- [ ] Every result links to the acting control
- [ ] Shared URL reproduces the exact result
- [ ] Result never hidden behind an email field
- [ ] Inputs labelled, described, and error-announced to screen readers

**Acceptance criteria**

- 100 % branch coverage of `src/lib/calculator/`.
- With JS disabled, `/cod-calculator` shows three tools with credible default results.
- A pasted shared URL reproduces the same numbers on a cold load.
- Complete first result in ≤ 3 taps and < 60 s on a 360 px device.
- Lighthouse mobile Performance ≥ 90.

---

### Phase 6 — Controls: overview + ten control pages

**Branches:** `feature/features-overview`, then `feature/control-template`

**Purpose**
Build the core of the site (§6) — the overview grouped by order stage, and one template that renders all ten controls.

**Deliverables**

1. `/features` overview — four stages, each with its problem statement and its controls (§6.1).
2. `features/[control]` template with `generateStaticParams()` covering all ten, implementing §6.3 exactly: order-stage breadcrumb, name, the one problem it removes, Install button; the problem in plain words; how it works (buyer view / merchant setting / success & failure); an inline calculator where relevant; setup requirements (no-code, plan, markets/gateways); proof (one named merchant + review excerpts); 3–5 control-specific questions; related-controls rail + calculator link.
3. `RelatedControlsRail` component (§12).
4. Per-control metadata and canonical URLs.

**Dependencies** — P2, P3, P4 (section components), P5 (embedded calculators).

**Expected outcome** — Ten distinct, individually rankable pages generated from ten content records and one layout.

**Commit strategy** — `feat(controls): add features overview grouped by order stage` → `feat(controls): add control page template` → `feat(controls): add related-controls rail` → `content(controls): complete copy for all ten controls`.

**Merge strategy** — Two sequential PRs squashed into `develop`; overview first.

**Review checklist** — Universal DoD, plus:

- [ ] All ten pages build statically and are listed in the build output
- [ ] Breadcrumb reflects the correct stage on every page
- [ ] No page has empty template sections — a control with no linked calculator omits that block cleanly
- [ ] Related controls are adjacent within stage, never self-referential
- [ ] Each page targets a distinct search term (§13, §10.1 one page per topic)
- [ ] Zero layout code specific to a single control

**Acceptance criteria**

- 10 static routes generated from `generateStaticParams()`.
- Adding an eleventh record produces a complete eleventh page with no code change.
- Every control page reachable in ≤ 2 clicks from the homepage.
- Each page has a unique `<title>`, description, and canonical URL.

---

### Phase 7 — Pricing page

**Branch:** `feature/pricing-page`

**Purpose**
State plans and per-message costs plainly (§3.1), and give free-plan merchants a money-based upgrade reason (§2.1, §9.3).

**Deliverables** — Full `PricingTable` (Free / Pro / Enterprise), per-message rate table by gateway, plan-to-control mapping ("which controls each plan unlocks"), pricing-tagged FAQ, CTA band, upgrade-oriented framing rather than a locked-feature list.

**Dependencies** — P2, P4H.

**Expected outcome** — Cost is fully answerable without contacting sales.

**Commit strategy** — `feat(pricing): add full plan comparison` → `feat(pricing): add per-message rate table` → `feat(pricing): add pricing faq`.

**Merge strategy** — Squash into `develop`.

**Review checklist** — Universal DoD, plus:

- [ ] Every figure comes from the pricing repository; homepage preview and this page cannot disagree
- [ ] Comparison table is a real `<table>` with proper headers and a mobile card fallback
- [ ] Plan → control mapping derived from control records, not duplicated
- [ ] Enterprise path routes to Book a Demo; Free/Pro route to Install Free

**Acceptance criteria**

- Changing one price file updates homepage preview, pricing page, and control-page plan badges.
- Table is navigable by screen reader with correct row/column association.
- No pricing figure is hard-coded in any component.

---

### Phase 8 — Customers & Integrations

**Branches:** `feature/customers`, `feature/integrations`

**Purpose** — Proof (§3.1) and compatibility answers (§13 long-tail).

**Deliverables** — `/customers`: named merchant stories with one metric each, filterable by control, plus the live App Store review feed. `/integrations`: gateway and platform records from one template, each answering "does it work with X?", linked from the relevant control pages.

**Dependencies** — P2, P6.

**Commit strategy** — `feat(customers): add stories grid`, `feat(customers): add live review feed`, `feat(integrations): add integration template`.

**Merge strategy** — Two PRs squashed into `develop`.

**Review checklist** — Universal DoD, plus:

- [ ] Every story attributed to a named merchant with permission recorded
- [ ] Review feed handles empty, partial, and failed states
- [ ] Integration pages generated from records, one template
- [ ] Control pages link to the integrations they depend on

**Acceptance criteria**

- Review feed renders from live data and survives an induced upstream failure.
- Adding an integration record produces a complete page with no code change.

---

### Phase 9 — Resources: Guides, Blog, Documentation, Help

**Branch:** `feature/resources`

**Purpose** — §7. Four resource types, each with a distinct job, each maintainable.

**Deliverables** — MDX pipeline with typed frontmatter; `/resources/guides` (evergreen, index + article); `/resources/blog` (reverse-chronological); `/resources/docs` (own nav + search); `/resources/help` (troubleshooting); a shared article layout with TOC and reading progress; **the §7.1 content-to-action rule implemented as a required frontmatter field** — every article declares its next step (a control page or the calculator), and the build fails if it is missing.

**Dependencies** — P2, P3, P5, P6.

**Commit strategy** — `feat(resources): add mdx pipeline with typed frontmatter` → one commit per resource type → `feat(resources): enforce content-to-action frontmatter`.

**Merge strategy** — Squash into `develop`.

**Review checklist** — Universal DoD, plus:

- [ ] Frontmatter is schema-validated at build time
- [ ] Every article ends at a specific tool or control, never a generic sign-up band (§7.1)
- [ ] Docs and Help are visibly distinct in purpose
- [ ] Article typography respects the prose measure
- [ ] Code blocks, tables, and images all styled and responsive

**Acceptance criteria**

- An article missing its next-step field fails the build.
- Article pages score ≥ 95 Lighthouse SEO.
- Docs navigation works at 360 px.

---

### Phase 10 — Company & legal

**Branch:** `feature/company-pages`

**Purpose** — Standard trust, contact, and compliance surfaces (§3.1). Deliberately out of the primary nav (§4.3).

**Deliverables** — `/about`, `/contact` (form with validation, spam protection, and a WhatsApp path), `/legal/{privacy,terms,refund,cookies}` on a shared prose template.

**Dependencies** — P3. Legal copy supplied by the business.

**Commit strategy** — `feat(company): add about page`, `feat(company): add contact page with validated form`, `feat(company): add legal template and pages`.

**Merge strategy** — Squash into `develop`.

**Review checklist** — Universal DoD, plus:

- [ ] Contact form has server-side validation and accessible error messaging
- [ ] No dark patterns; no unnecessary required fields
- [ ] Legal pages render supplied copy verbatim
- [ ] These pages appear in the footer only

**Acceptance criteria**

- Contact form submits, validates, and confirms; failure state is recoverable.
- All four legal routes render and are indexed.

---

### Phase 11 — SEO & structured data

**Branch:** `feature/seo`

**Purpose** — §13. Make each page type own a distinct intent and make the site machine-readable.

**Deliverables** — per-page-type metadata via an extended `createMetadata()`; `app/sitemap.ts` covering every route with sensible priorities; `app/robots.ts`; dynamic OG images per page type; `src/lib/seo/` JSON-LD builders for **Organization, SoftwareApplication (with aggregateRating), FAQPage, BreadcrumbList, Article, Review**; canonical URL audit; internal-linking audit against §13's no-two-pages-same-term rule.

**Dependencies** — P4 through P10.

**Commit strategy** — `feat(seo): add sitemap and robots` → one commit per schema type → `feat(seo): add dynamic og images` → `seo: canonical and internal-link audit`.

**Merge strategy** — Squash into `develop`.

**Review checklist** — Universal DoD, plus:

- [ ] Every route has a unique title, description, and canonical
- [ ] Rich Results Test passes for each schema type on a representative page
- [ ] `aggregateRating` sourced from the live review adapter, not typed copy (§11.1)
- [ ] Calculator page exposes a crawlable default result
- [ ] Sitemap contains no `noindex` route; all P0 placeholders now removed or promoted
- [ ] No two pages target the same primary term — documented in a keyword map

**Acceptance criteria**

- `/sitemap.xml` and `/robots.txt` valid and complete.
- Google Rich Results Test passes for all six schema types.
- OG image renders correctly for home, a control page, the calculator, and an article.
- Keyword map committed to `docs/`, one page per term.

---

### Phase 12 — Performance, accessibility & resilience hardening

**Branch:** `feature/performance`

**Purpose** — Convert "looks premium" into "measurably premium".

**Deliverables** — bundle analysis and client-JS reduction; font strategy audit (subsetting, `size-adjust`, preload of the single critical face); image audit (format, sizing, priority, lazy); third-party script audit; route-level prefetch tuning; Cache Components / `revalidate` decision executed for the review feed; full WCAG 2.2 AA audit with screen-reader passes (NVDA + VoiceOver); error and not-found pages finished; performance budget committed to CI.

**Dependencies** — P4 through P11.

**Commit strategy** — `perf(build): reduce client bundle on marketing routes` → `perf(fonts): subset and preload primary face` → `a11y: resolve wcag 2.2 aa findings` → `build(ci): enforce performance budget`.

**Merge strategy** — Squash into `develop`.

**Review checklist** — Universal DoD, plus:

- [ ] Every route measured, not just the homepage
- [ ] Client JS per marketing route recorded and under budget
- [ ] No render-blocking third-party resource
- [ ] Screen-reader pass completed on home, a control page, the calculator, and pricing
- [ ] Reduced-motion, forced-colors, and 200 % zoom all verified
- [ ] Offline/failed-fetch states verified for every remote data source

**Acceptance criteria**

- Lighthouse mobile ≥ 90 / 95 / 95 / 95 on home, a control page, calculator, pricing, and an article.
- Core Web Vitals within budget on simulated mid-tier mobile across those five routes.
- Zero axe serious/critical violations site-wide.
- CI fails on a deliberate budget regression (verified once).

---

### Phase 13 — Release v1

**Branch:** `release/v1` → `main`

**Purpose** — Ship.

**Deliverables** — feature freeze; full regression across the sitemap; content proofread; analytics and conversion events wired to the §1.1 measures (calculator completion rate, install click-through by entry page, plan-upgrade path); production environment variables; redirects from any legacy URLs; deploy; post-deploy verification.

**Dependencies** — P0 through P12 complete.

**Commit strategy** — Release-branch commits limited to `fix`, `content`, and `chore`. No new features.

**Merge strategy** — Merge commit into `main`, tag `v1.0.0`, then back-merge `main` into `develop`.

**Review checklist**

- [ ] Every §3 route live and correct in production
- [ ] Every CTA points at the real Shopify App Store listing
- [ ] Analytics fires for all three §1.1 measures
- [ ] Search Console and sitemap submitted
- [ ] 404 and 500 pages verified in production
- [ ] Live proof numbers match the App Store listing
- [ ] Rollback procedure documented and tested

**Acceptance criteria**

- Production Lighthouse meets P12 thresholds.
- Zero broken internal links (crawl verified).
- All three §1.1 measures reporting data within 24 hours.
- `v1.0.0` tagged on `main`.

---

## 6 · Decisions required before Phase 0 starts

These materially change the work and cannot be assumed.

**6.1 Content source.** Architecture §11 says "managed as data in the CMS". Recommendation: build P2 as a typed local data layer **behind a repository interface**, so a CMS (Sanity or Payload) can be added in Phase 2-of-the-architecture without touching a single component. Alternative: introduce the CMS now, which adds roughly a week to P2 and a hosting dependency before anything is visible.

**6.2 Brand identity.** The current tokens are placeholder blue with Poppins — inherited, not chosen. Needed: logo assets, primary/accent colours, and typeface direction. Without this, P1 produces a design system we will re-theme later.

**6.3 Real numbers.** §5.1 cites 10,000+ merchants, 4.9★, 850+ reviews. Are these current and publishable? §11.1 forbids typing them into copy, so they must come from either the live App Store listing or a verified constant.

**6.4 Calculator formulas.** §8 specifies inputs and outputs but not the models — particularly the RTO-reduction and prepaid-shift assumptions COD King is willing to claim. These numbers appear in a merchant's business case and need sign-off before P5.

**6.5 External destinations.** Production Shopify App Store listing URL, login URL, demo-booking URL, WhatsApp number, and the production domain (`codking.tech`).

**6.6 RabbitPay branch.** Confirm `feature/homepage-redesign` is archived as a tag and `develop` is cut clean from `main`.

---

## 7 · What "premium" means here, concretely

The stated bar is Stripe / Linear / Vercel / Shopify. In practice that is five habits, enforced in every review:

1. **Restraint.** One accent colour used sparingly, two shadows, one motion grammar. Decorative gradients, glow cards, and grid overlays are what make a site read as a template.
2. **Typographic authority.** A real scale with fluid sizing, controlled measure, and tabular numerals wherever money appears.
3. **Density with air.** Generous section rhythm, tight component interiors. The reference sites both do this; it is the single most visible quality signal.
4. **Motion that explains.** Reveal on entry, state transitions on interaction, nothing that loops for its own sake. Every animation removable without losing meaning.
5. **Honest product visuals.** Show the actual product surface — a rules table, an OTP screen, an order-verification queue. Abstract 3D shapes signal that there is nothing to show.

---

_End of roadmap. No implementation begins until this document is approved and §6 is answered._
