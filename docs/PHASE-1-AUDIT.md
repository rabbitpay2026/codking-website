# Phase 1 — Project Foundation · Audit & Decisions

**Branch:** `feature/project-foundation` (from `develop`, cut from `main`)
**Source of truth:** COD King Website Architecture (approved)
**Scope:** architecture only — no UI, no styling, no marketing sections.

---

## 1 · Audit: KEEP / REMOVE / REFACTOR

### 1.1 KEEP — reused unchanged

| Asset                                         | Why                                                                                                              |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `src/components/shared/Container.tsx`         | Single owner of page width and gutter. Exactly the right primitive; only its folder changed                      |
| `src/components/shared/Section.tsx`           | Composes `Container` rather than reimplementing width rules                                                      |
| `src/constants/theme/*`                       | Token→class maps mirroring `globals.css`. The design-system phase retunes values in place                        |
| `src/app/globals.css`                         | Tailwind v4 CSS-first `@theme` layer. Correct pattern; brand values are a later phase                            |
| `src/lib/utils.ts` (`cn`)                     | Standard, and the path registries import from                                                                    |
| `src/utils/url.ts` (`absoluteUrl`)            | Pure helper, consumed by the metadata factory                                                                    |
| `src/types/common.ts`                         | `WithChildren` / `WithClassName` used across templates                                                           |
| `src/app/error.tsx`, `not-found.tsx`          | Correct boundaries; `error.tsx` is a Client Component because `reset` requires it                                |
| `tsconfig.json`, ESLint flat config, Prettier | Already production-grade: `strict`, `noUnusedLocals`, `verbatimModuleSyntax`, `typedRoutes`                      |
| `next.config.ts`                              | `reactStrictMode`, `poweredByHeader: false`, `typedRoutes`. No webpack config, which is required under Turbopack |

### 1.2 REMOVE

| Asset                                                                       | Why                                                                                                                                                                  |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Entire RabbitPay homepage layer (22 files, ~2,786 lines)                    | Abandoned direction. It existed only on `feature/homepage-redesign`, so it is excluded by branching from `main` and preserved at tag `archive/rabbitpay-homepage`    |
| `src/components/layout/Navbar.tsx`                                          | Five flat nav items; §4.1 fixes the primary bar at four with a mega-menu. Made "Book a Demo" the primary action; §4.2 makes Install Free primary                     |
| `src/components/layout/Footer.tsx`                                          | Two columns; §4.5 requires six as the full site index                                                                                                                |
| `src/data/navigation.ts`, `src/data/footer.ts` (old)                        | Same conflicts. Replaced with architecture-correct structures                                                                                                        |
| `src/components/ui/button.tsx`                                              | Zero consumers once the shell was removed. Its variant set does not express §4.2's three-tier action hierarchy, so the design-system phase defines it, not adapts it |
| `src/components/ui/blur-fade.tsx`                                           | Zero consumers. Motion grammar belongs to the design-system phase, where it gets a `prefers-reduced-motion` path                                                     |
| `src/components/home/.gitkeep`, `src/assets/.gitkeep`, `src/hooks/.gitkeep` | Placeholder folders holding nothing                                                                                                                                  |

Both removed UI components are recoverable from git history or one `shadcn add`
away. Nothing was deleted that cannot be reproduced in under a minute.

### 1.3 REFACTOR

| Change                                      | Why                                                                                                                                                                   |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `components/common/` → `components/shared/` | Matches the approved folder taxonomy; "shared" states the responsibility, "common" does not                                                                           |
| Flat `app/*` routes → `app/(site)/*`        | Separates the document shell from the marketing shell. Done now so the shell phase does not have to move fifteen route directories                                    |
| `constants/routes.ts` expanded              | Now mirrors the §3 sitemap exactly, plus builders for every dynamic segment                                                                                           |
| `lib/metadata.ts` gained `noIndex`          | Every placeholder route must stay out of the index. An empty page that ranks is worse than one that does not exist                                                    |
| Root `layout.tsx` reduced to the document   | Chrome moved to the `(site)` layout. Added `data-scroll-behavior="smooth"`, required from Next.js 16 so the router neutralises the global smooth scroll on navigation |
| `constants/site.ts` description             | Was "Site description pending." Now the product's own definition from §1                                                                                              |
| `globals.css` comment                       | Removed a stale reference to RabbitPay section widths                                                                                                                 |

---

## 2 · Decisions and their reasons

**Branch-based removal, not a deletion commit.** The RabbitPay layer never
touched `main`. Deleting 2,786 lines in a commit would have carried that work
into the new history for no benefit; branching from `main` leaves it isolated
and tagged.

**The Controls model is the spine.** §6 groups features by when they act in the
order, and §11 says one source feeds the mega-menu, homepage, feature pages and
footer. So `ControlSlug` is a closed ten-member union, and the mega-menu and
footer Features column are _derived_ from it rather than authored. Adding a
control changes four surfaces with one record.

**Relationships are declared once and traversed.** Control→calculator lives on
the calculator definitions (§8.4) and is read in reverse by control pages
(§6.3). Control→plan lives on the plan and is read in reverse by control pages.
Related controls are derived from the shared stage rather than hand-listed.
Nothing that could disagree is stored twice.

**§7.1 is enforced by the type system.** Every article must end at a specific
tool or control page, so `nextStep` is a required field on `ResourceArticle`
and the template renders it. A non-compliant article does not compile.

**`getProofMetrics()` is async before it needs to be.** §11 requires these
figures to sync from the App Store. Returning a promise now means that swap is
an edit to one function instead of a breaking change to every component that
renders a rating.

**Unconfigured external links resolve to `null`, not `"#"`.** The UI can then
render a disabled state. A primary Install button that silently goes nowhere is
worse than one that is visibly not ready.

**Values are absent rather than invented.** Pro's price, `countriesServed`, the
calculator assumption model, per-message rates, integrations, testimonials and
FAQ answers are all unpopulated. Their shapes are fixed; their contents are
business decisions.

**No test runner yet.** The thing worth testing is the calculator's money maths,
which does not exist. Adding a framework with nothing to test would be an unused
dependency. It arrives with the calculator, alongside content-integrity tests.

---

## 3 · Known deviations from the architecture document

| Item                    | Detail                                                                                                                                                                                                |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Careers link            | §4.5 lists Careers in the footer Company column, but §3 defines no `/careers` route. Omitted rather than invented                                                                                     |
| `/resources` hub        | §3 lists `/resources` as a branch and §4.1 makes it a dropdown, not a link. A page was created because a parent that 404s while its children resolve is a broken hierarchy for merchants and crawlers |
| Control `outcome` lines | Compressed from the architecture's own §6.2 descriptions to fit the mega-menu. Subject to copy review; not invented positioning                                                                       |
| Proof figures           | 10,000+ merchants, 4.9★, 850+ reviews are taken verbatim from §5.1 and must be verified before any page is indexed                                                                                    |

---

## 4 · Validation

All four gates pass on this branch:

```
npm run typecheck   ✓
npm run lint        ✓  (zero warnings)
npm run format:check ✓
npm run build       ✓  29 static routes
```

The build generated 10 control pages from `generateStaticParams()` and 4 legal
pages from the same mechanism, which exercises the content repository end to
end. The navigation derivations (`getFeaturesMegaMenu`, `getFooterColumns`) are
type-checked but have no runtime consumer until the site-shell phase.
