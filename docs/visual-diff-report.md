# Visual Difference Report — BEOK Controls vs. Reference Site (Rounds 1–3)

Status: **THREE COMPLETE COMPARISON & REPAIR ROUNDS VERIFIED IN REAL PLAYWRIGHT CHROMIUM** against `https://smartthermostatmanufacturer.com/` and `http://localhost:3000/` across all 6 required viewports (`1920×1080`, `1440×900`, `1280×800`, `1024×768`, `768×1024`, `390×844`) and interactive states.

- **Reference captures**: `reference/screenshots/{desktop,tablet,mobile,interactions}/` + `reference/computed-analysis.json` (98 captures across 23 templates)
- **Local Round 1**: `reference/comparison/local-round-1/`
- **Local Round 2**: `reference/comparison/local-round-2/` + `reference/comparison/geometry-round-2.json`
- **Local Round 3 (Final Accepted)**: `reference/comparison/local-round-3/` + `reference/comparison/geometry-round-3.json` (56 full-page captures + 4 interactive captures + 44 paired DOM geometry records)

---

## 1. Round 1 → Round 2 Findings & Fixes

| Priority | Defect Found in Round 1 | Root Cause | Code Fix Applied |
|---|---|---|---|
| **P0** | `390×844` mobile header pushed `.menu-toggle` outside viewport | Unconstrained `.language select` expanded to ~160px width | Constrained `.language select` to `width: 46px; max-width: 48px`; shortened disabled option labels (`DE (Pending)`). |
| **P0** | Lower homepage sections rendered blank white in full-page captures | `Reveal` held `[data-reveal='pending'] { opacity: 0 }` before observation | Changed `Reveal` to default `opacity: 1` with progressive `fadeInUp` entrance animation. |
| **P0** | `Skip to content` and fixed header leaked mid-page on full-page capture | Smooth scroll reset (`scrollTo(0, 0)`) still mid-scroll (`y ≈ 150px`) + `top: -100px` | Switched `.skip-link` to `clip-path: inset(50%)` (focus-visible) and `scrollTo({ top: 0, behavior: 'instant' })`. |
| **P1** | Corner watermark text clipped (`APPROV`) on narrow 4-column service cards | Fixed SVG corner `<text>` cropped by `xMidYMid slice` | Removed corner-clipped SVG watermark from `DarkSectionBackdrop`; kept centered non-clipped captions inside device/hero visuals. |
| **P1** | Native `<dialog>` Tab traversal exited modal on single-button cycle | Native `<dialog>` cycles to browser chrome when only one focusable element exists | Added explicit Tab / Shift+Tab focus containment inside `ProductGallery` `<dialog>`. |

---

## 2. Round 2 → Round 3 Strict UI Acceptance Findings & Fixes

| Priority | Defect Found in Round 2 | Reference Evidence | Code Fix Applied Before Round 3 |
|---|---|---|---|
| **P0** | Mobile (`390×844`) homepage height was `8887px` (+47% vs reference `6059px`); Tablet/Mobile stacked all Tailor-Made, Applications and News cards vertically | `reference/screenshots/mobile/home-390x844.png` & `tablet/home-768x1024.png` render 1-slide carousels with pagination dots | Implemented interactive responsive carousels + pagination dots in `HomeSections.tsx` & `globals.css` (`< 992px` for Tailor-Made & Applications; `< 768px` for Homepage News; 3-col News row preserved at `768px` tablet). Mobile home height converged to **`5999px` (-0.99% vs `6059px`)**! |
| **P0** | Homepage top header had visible dark tint (`rgba(0,0,0,0.28)`) instead of pure transparent | Reference `header` bg computed at `rgba(0, 0, 0, 0)` on hero top | Set desktop homepage top `.header` background to `rgba(0, 0, 0, 0)`, transitioning cleanly to `#000000` on scroll / inner pages. |
| **P0** | Product Detail `follow-nav-bar` clipped `Inquiry` (`Inqui`) on `390×844` mobile | `local-round-2/product-detail-390x844.png` | Tightened `.follow-nav-inner` gap (`14px`) and font size (`12.5px`) below `768px`; all 4 tabs render completely unclipped in Round 3. |
| **P0** | Local server listened on port `3005` instead of requested `http://localhost:3000/` | User acceptance specification | Built and deployed fresh production server directly on `http://localhost:3000/`. |
| **P1** | Desktop `Tailor-Made Solution` 4-strip cards always displayed body paragraphs + button, making resting state denser than reference | `reference/screenshots/desktop/home-1440x900.png` shows icon + title at rest and reveals copy on hover | Added `.iservice-card-hover` hover/focus reveal on desktop (`>= 992px`), while keeping copy visible on active mobile/tablet slide. |
| **P1** | `About Us` height lagged reference by `-34%` (`3195px` vs `4856px`), missing 3 corporate sections | `reference/screenshots/desktop/about-1440x900.png` has 7 bands | Added `Environment`, `Development History`, and `Target Global Partners` structural bands to `CompanySections.tsx` (without fabricated credentials/logos). `About Us` converged to **`4641px` (-4.4% at 1440)** and **`4331px` (+0.25% at 1280)**! |
| **P1** | `1024×768` compact desktop header height (`64px/56px`) slightly taller than reference (`57px/42px`) | `reference/computed-analysis.json` | Refined `@media (max-width: 1199px)` tokens to `58px` top / `48px` scrolled/inner. |
| **P1** | Floating blue sidebar (`top: 50%`) overlapped right edge of body text on `390×844` mobile | `local-round-2/products-390x844.png` | Positioned `.aside-module` cleanly at `bottom: 20px` below `768px`. |
| **P2** | `768×1024` 7-category product tabs wrapped 4+3 leaving an empty border cell | `local-round-2/home-768x1024.png` | Kept all 7 product tabs in 1 compact row at `768px–1199px` and balanced flex-wrap below `768px`. |
| **P2** | Contact inquiry card padding added excess height vs reference (`2756px` vs `2158px`) | `reference/screenshots/desktop/contact-1440x900.png` | Tightened `.inquiry-backdrop-band` and `.inquiry-card` vertical padding. |

---

## 3. Round 3 Final Measured Parity Summary (Reference vs. Local `http://localhost:3000/`)

| Page & Viewport | Ref Header | Local Header | Ref Height | Local Height | Delta | Overflow |
|---|---|---|---|---|---|---|
| Home `1920×1080` | `106px` transparent | `106px` transparent | `7409px` | `6652px` | `-10%` | `false` |
| Home `1440×900` | `79px` transparent | `79px` transparent | `5649px` | `5533px` | **`-2.0%`** | `false` |
| Home `1280×800` | `71px` transparent | `70px` transparent | `5026px` | `5117px` | **`+1.8%`** | `false` |
| Home `1024×768` | `57px` transparent | `58px` transparent | `4133px` | `4841px` | `+17%` | `false` |
| Home `768×1024` | `60px` `#ffffff` | `60px` `#ffffff` | `6922px` | `6109px` | `-12%` | `false` |
| Home `390×844` | `60px` `#ffffff` | `60px` `#ffffff` | `6059px` | `5999px` | **`-0.99%`** | `false` |
| About `1440×900` | `59px` `#000000` | `59px` `#000000` | `4856px` | `4641px` | **`-4.4%`** | `false` |
| About `1280×800` | `52px` `#000000` | `54px` `#000000` | `4320px` | `4331px` | **`+0.25%`** | `false` |
| Solutions `768×1024` | `60px` `#ffffff` | `60px` `#ffffff` | `5529px` | `5550px` | **`+0.38%`** | `false` |
| Inner Pages `1440×900` (14 templates) | `59px` `#000000` | `59px` `#000000` | — | 0px header delta | **Exact** | `false` |

## 4. Intentional Brand & Asset Exclusions

Zero third-party reference logos, commercial photos, factory area/patent numbers, or contact details were copied. All BEOK Controls concept visuals and pending-asset markers strictly follow `AGENTS.md` and `docs/required-materials.md`.
