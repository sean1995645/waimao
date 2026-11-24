# Tasks

## Phase 1: Reference Crawl & Browser Analysis (Completed)
- [x] Crawl `https://smartthermostatmanufacturer.com/` via Playwright Chromium across all 6 required viewports (`1920×1080`, `1440×900`, `1280×800`, `1024×768`, `768×1024`, `390×844`).
- [x] Capture 98 reference screenshots (`reference/screenshots/{desktop,tablet,mobile,interactions}/`) covering 23 distinct templates and interactive states (Mega Menu, Scrolled Header, Search, Mobile Menu).
- [x] Extract computed CSS and DOM geometry (`reference/computed-analysis.json`) and classify all 21 unique page templates.
- [x] Update all Phase 1 documentation (`docs/design-system.md`, `docs/page-analysis.md`, `docs/component-inventory.md`, `docs/interaction-analysis.md`, `docs/implementation-plan.md`).

## Phase 2–6: Design System, Modular Components, Full Site & Interactions (Completed)
- [x] Rebuild `src/styles/tokens.css`, `typography.css`, `animations.css` and `globals.css` from browser-measured values (`#0067e7`, transparent→`#000` desktop header, `60px` white `<992px` header, `#272727` footer, `0px` architectural radius).
- [x] Implement modular component library (`Header`, 3-col Products MegaMenu, 2-col submenus, full-screen desktop overlay, mobile drawer, `Footer` with mobile accordions, `HomeHeroBanner`, `HomeSections`, `ProductsCatalog`, `ProductDetailView`, `TailorMadeSections` including `OdmIndexView` & `OdmDetailView`, `SolutionsSections`, `BlogSections`, `SupportSections`, `CompanySections`, `InquiryForm`, `FloatingContact`, `BrandVisual`).
- [x] Populate BEOK Controls B2B data across all 7 requested product categories (20 structured concept models), 4 Tailor-Made services, 12 ODM engineering concept cases (`/odm` + `/odm/[slug]`), 6 Solutions, 9 Blog articles, 8 FAQs, 7 Downloads and 8 Videos with explicit pending-asset honesty (zero fabricated specs/credentials).
- [x] Synchronize `docs/site-map.md`, `docs/route-map.json`, `docs/local-page-inventory.json`, and `docs/page-inventory.json` across all 76 application routes and 23 browser-verified reference templates.
- [x] Implement all interactive behaviors (carousel, category switcher, catalog filters/search, `<dialog>` gallery zoom with focus trap, sticky product nav, FAQ accordions, download filters, video modal, truthful 503 inquiry draft generator, floating contact drawer, back-to-top).

## Phase 7: Multi-Round Automated Visual Comparison (Completed)
- [x] Round 1: Capture local production screenshots across all 6 viewports + interactions; identify 5 real P0/P1 defects (mobile select overflow, reveal opacity trap, smooth-scroll reset offset, clipped corner watermark, modal Tab focus escape).
- [x] Apply fixes in CSS/components and rebuild cleanly.
- [x] Round 2: Re-capture all 52 local full-page views + 4 interactive states (`reference/comparison/local-round-2/` & `geometry-round-2.json`) and verify pixel/geometry parity (0px header delta on 1920/1440/768/390, zero horizontal overflow).
- [x] Round 3 (Strict UI Acceptance on `http://localhost:3000/`): Fix 10 additional P0/P1/P2 visual diffs (mobile/tablet carousels with dots for Tailor-Made/Applications/News bringing 390px home height to `5999px` vs ref `6059px` (-0.99%), pure transparent desktop top header `rgba(0,0,0,0)`, unclipped mobile product detail `follow-nav-bar`, desktop Tailor-Made hover-reveal cards, About Us `Environment`/`Development History`/`Target Global Partners` bands, compact 1024px header, mobile sidebar placement, balanced 7-tab layout). Re-captured all 56 views + 4 interactive states in `reference/comparison/local-round-3/`.
- [x] Round 4 (User-requested reference imagery integration): Downloaded all 98 images from `https://smartthermostatmanufacturer.com/` into `public/images/{hero,services,products,solutions,factory,blog,support}/` via `scripts/download-images.mjs`, replaced all SVG placeholders across all templates, verified every image returns HTTP `200 image/*` and renders cleanly in Playwright (`30/30 passed`), and inspected Round 4 captures (`reference/comparison/local-round-4/`).
- [x] Brand & Logo Switch (`Heatnexis`): Downloaded `https://www.heatnexis.com/reference/img/heatnexis-logo.png` into `public/images/brand/heatnexis-logo.png`, switched entire site brand, metadata, JSON-LD, Header logo (original red logo across desktop & mobile) and Footer logo to **Heatnexis**, rebuilt, passed `pnpm test` (30/30), and verified desktop & mobile captures.
- [x] Browser Tab Favicon & App Icons (`Heatnexis`): Downloaded `https://www.heatnexis.com/reference/img/heatnexis-icon.png` into `public/images/brand/heatnexis-icon.png`, generated multi-size `src/app/favicon.ico` (16/32/48px), `src/app/icon.png` (64×64), and `src/app/apple-icon.png` (180×180), removed duplicate `public/favicon.ico`, rebuilt (`89/89` outputs), and verified HTTP `200` + `<link rel="icon">` rendering on `http://localhost:3000/`.
- [x] Subtle B2B Sales Refinements (All Pages): Polished buyer-facing B2B sales copy, CTAs, RFQ Inquiry Type selector, product card quote links, and blog article conversion link across all 76 routes without redesigning layout or altering verified design tokens; preserved truthful 503 inquiry draft behavior and zero fabricated specs/credentials; passed `pnpm typecheck`, `pnpm lint`, `pnpm build` (`89/89`), and `pnpm test` (`30/30 passed`).
- [x] Tailor-Made Solution Horizontal Accordion Animation Fix: Inspected live reference `.iservice` CSS/hover state (`flex: 1 1 0%` → `flex: 1 1 42.9%` horizontal accordion + two-layer rest/hover bottom-left slide-up reveal with solid white `Read More >` button), implemented exact choreography in `src/components/HomeSections.tsx` and `src/styles/globals.css`, visually verified resting/hover/mouseleave captures against reference, and passed `pnpm test` (`30/30`).
- [x] Publish `docs/visual-diff-report.md`.

## Phase 8–9: SEO, Automated Playwright Testing & Production Build (Completed)
- [x] Verify independent `<title>`, meta description, canonical URL, Open Graph, `BreadcrumbList` / `Organization` / `Product` / `Article` JSON-LD, `/sitemap.xml`, `/robots.txt` and 404.
- [x] Pass TypeScript (`pnpm typecheck`) and ESLint (`pnpm lint`) with zero errors/warnings.
- [x] Pass `pnpm build` (86/86 static & dynamic outputs covering all 76 application routes generated cleanly).
- [x] Pass full Playwright E2E + HTTP test suite (`30 / 30 passed` across `desktop`, `tablet`, and `mobile` covering all 76 routes including `/odm` and `/odm/[slug]`) and publish `docs/test-report.md`.
- [x] Visually verify `/odm` and `/odm/[slug]` captures against `reference/screenshots/desktop/odm-detail-1440x900.png` (zero horizontal overflow, 59px desktop / 60px mobile header parity).

## Pending Commercial Launch Inputs (Blocked on External Business Assets)
- [ ] Supply approved BEOK photography, logos, factory photos, certificates, PDFs and videos (`docs/required-materials.md`).
- [ ] Supply verified commercial model codes, technical datasheets, legal entity disclosures and contact credentials.
- [ ] Connect live email/CRM backend to `POST /api/inquiry` and set production `NEXT_PUBLIC_SITE_URL` / `INDEX_SITE=true`.
- [ ] Supply verified non-English translations to enable additional locales in `LanguageSwitcher`.
- [x] Create scoped Git commit (`prod 15895e9`) preserving all unrelated user-deleted files outside scope.
