# Automated Verification & Test Report — BEOK Controls

Date: **2026-11-24**
Target Server: Production build (`pnpm build` → `next start` on `http://127.0.0.1:3005`)

## 1. Static Analysis & Production Build

| Check | Command | Result |
|---|---|---|
| TypeScript | `pnpm typecheck` (`tsc --noEmit`) | **PASS** (0 errors) |
| ESLint | `pnpm lint` (`eslint .`) | **PASS** (0 errors, 0 warnings) |
| Production Build | `pnpm build` (`next build --webpack`) | **PASS** (86/86 static & dynamic outputs across 76 application routes) |

## 2. Playwright End-to-End & HTTP Verification Suite

Command: `BASE_URL=http://127.0.0.1:3005 pnpm test`
Browsers / Projects: `desktop` (`1440×900`), `tablet` (`768×1024`), `mobile` (`390×844`) — Chromium
Result: **30 / 30 PASSED (0 failed, 0 skipped)** covering all **76 application routes** (including `/odm` and all 12 `/odm/[slug]` routes) — raw JSON archived at `reference/comparison/test-results.json`.

### Covered Assertions (Executed across all 3 device projects)

1. **All 67+ application routes + `/sitemap.xml` + `/robots.txt`**: HTTP `200`, independent `<title>`, `rel="canonical"`, `og:title`, and `application/ld+json` structured data (`BreadcrumbList` + `Organization` / `Product` / `Article`).
2. **All rendered internal links & hash fragments**: Every internal `<a href>` resolves HTTP `200` and every `#fragment` target `id="..."` exists in the rendered HTML.
3. **All rendered CSS & JS assets**: Every stylesheet (`text/css`, contains `.header` and `--color-primary`) and script bundle returns HTTP `200`.
4. **404 & Inquiry API honesty**: Missing routes return HTTP `404`; `POST /api/inquiry` returns HTTP `503` `{ ok: false }` until a live backend is configured.
5. **Navigation, Mega Menu, Mobile Drawer & Search**: Desktop 3-column Products Mega Menu & 2-column submenus, `< 992px` mobile drawer, header search → `/search?q=boiler` returning live results.
6. **Homepage & Product Catalog Interactions**: Homepage 7-category tab switcher updating 2×2 dark-studio showcase, catalog sidebar category filtering (4 Gas Boiler products), search & no-result state, Product Detail `Overview`/`Specifications`/`Downloads` tab switching, gallery views (`Front`/`Back`/`Dimensions`/`Wiring`), and native `<dialog>` zoom lightbox.
7. **Accessibility & Keyboard Focus**: Escape closes open mega-menu / search and restores trigger focus; `<dialog>` traps Tab focus inside the modal and restores trigger focus on Escape.
8. **Support & Contact Interactions**: FAQ accordion expand/collapse, Downloads document-type filtering, Contact form HTML5 required validation and truthful local `.txt` draft preparation (`It has not been sent`).
9. **Full-Site Runtime & Layout Sweep**: Every single application route renders exactly 1 `<h1>`, zero horizontal overflow (`scrollWidth <= innerWidth + 1`), zero broken images, and zero unhandled JavaScript `pageerror` exceptions across desktop, tablet, and mobile.
