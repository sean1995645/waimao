# Page Analysis — Browser-Verified Template Classification

Status: **Browser-verified via Playwright Chromium** on 2026-11-24 across 23 distinct template URLs and 6 viewports (`1920×1080`, `1440×900`, `1280×800`, `1024×768`, `768×1024`, `390×844`).

## 1. Homepage Section Sequence (Measured at 1440×900, total height 5649px)

1. **Fixed Header (`.header`)**: `79px` transparent over hero; shrinks to `59px` solid `#000000` on scroll (`.headerDownBg`). Left white brand logo, 7 white nav links with blue bottom active indicator, search icon, globe `EN ▾`, and circular white full-nav toggle button. Below `992px`, switches to `60px` solid `#ffffff` bar with dark logo/icons and mobile drawer.
2. **Hero Banner (`.banner`, 900px / 100vh)**: 3-slide full-bleed dark industrial showcase with left eyebrow, large bold white H1, crisp white `Read More >` button, centered bottom `< PREV ———— NEXT >` progress bar, and right vertical `01 — 03` pagination.
3. **Tailor-Made Solution (`.iservice`, 601px)**: Centered H2 + subtitle, followed by edge-to-edge 100vw 4-column tall interactive strips (`Smart Home Integration`, `PCB Development`, `APP Development`, `Structural Design`) with `1px` dividers, bottom circular icons, and hover description reveal. Converts to single-card carousel with pagination dots below `992px`.
4. **Products (`.iproducts`, 1417px)**: Centered H2 + subtitle, `content1600` horizontal icon-above-label category tabs (solid `#0067e7` active fill; 3-col grid on mobile), followed by full-bleed **2×2 dark-studio product showcase grid** (eyebrow + bold white title + `Learn More >` centered above dark-plinth hardware showcase; 1-col stack below `992px`), and centered blue `More Product >` CTA button.
5. **Applications (`.iapply.content1600`, 704px)**: Centered H2 + subtitle + `content1600` 3×2 visual card grid with dark bottom gradient overlays carrying bold white title and 2-line summary (single-card carousel on mobile).
6. **Company Introduction (`.iaboutus`, 698px)**: Centered H2 + subtitle + full-bleed dark-blue architectural band with left-aligned title, intro copy, and crisp white `Read More >` CTA, paired with an overlapping bottom-right crisp white 3-column metrics strip (full-width strip below image on mobile/tablet).
7. **News and Information (`.inews.content1600`, 457px)**: Centered H2 + subtitle + 3-column article cards (top image, bold 1-line truncated title, calendar icon + date) + centered pagination dots.
8. **Footer (`.bottomBg`, 384px, `#272727`)**: Left company contact & QR block + 6 vertical navigation columns (`Tailor-Made Solution`, `Products`, `Solutions`, `Blog`, `Service & Support`, `About Us`), bottom divider with legal links & social icons. Below `992px`, nav columns collapse into expandable accordion rows.
9. **Floating Right Sidebar (`.aside-module`)**: Vertically centered on right edge: blue vertical `Contact Us` tab (headset icon + popover drawer) stacked above a blue `↑` Back-to-Top square button.

## 2. Inner Page Template Inventory (21 Verified Templates)

| # | Reference Template | 1440px Measured Structure | BEOK Controls Local Route(s) |
|---|---|---|---|
| 1 | Home | Hero (100vh) + 5 core sections + Footer | `/` |
| 2 | Tailor-Made Solution | `detailBanner` (488px) + breadcrumb + intro split + 4-tab ODM showcase grid (3×2) + 3-col Service Process flowchart + 4-tab Service Advantages bento grid | `/tailor-made-solution`, `/tailor-made-solution/[slug]` |
| 3 | Products Index | `proBanner` slider (285px) + breadcrumb + left sticky category sidebar + right grouped 3-col product cards (horizontal cards on mobile) | `/products` |
| 4 | Product Category | `proBanner` + breadcrumb + left category sidebar + search/application filter + 3-col product grid | `/products/[category]` |
| 5 | Product Detail | `productsDetailBanner` (412px, 2-col intro + gallery) + breadcrumb + sticky `followNavBg` (52px: Features/Specifications/Downloads/Inquiry) + Highlights & 8-icon grid + Specs table + FAQ + Inquiry + Related | `/products/[category]/[slug]` |
| 6 | ODM Showcase Index / Detail | `detailBanner` + terminal/case showcase gallery + specs + Service Process + more projects | `/odm`, `/odm/[slug]` (integrated with Tailor-Made Solution) |
| 7 | Solutions Index | `detailBanner` (488px) + breadcrumb + alternating 50/50 split rows across all 6 solutions | `/solutions` |
| 8 | Solution Detail | `detailBanner` (488px) + breadcrumb + application overview, control requirements, recommended products & inquiry CTA | `/solutions/[slug]` |
| 9 | Blog Index & Category | `detailBanner` (488px) + breadcrumb + category tabs + 3-col `#f5f7fa` article cards + pagination | `/blog`, `/blog/category/[id]` |
| 10 | Blog Detail | `detailBanner` + breadcrumb + centered editorial article (`newsDetailHeader`, prose, tags, prev/next, Back to List, related) | `/blog/[slug]` |
| 11 | Service & Support Overview | `detailBanner` + breadcrumb + support capability, service purpose, service formats & content bands | `/support`, `/support/terms` |
| 12 | Thermostat FAQs | `detailBanner` + breadcrumb + category tabs + bordered Q-badge expandable accordion rows | `/support/faqs` |
| 13 | Videos | `detailBanner` + breadcrumb + category filter tabs (`ALL`, `Product`, `Guide`, `Technical`) + 4-col video cards with play modal | `/support/videos` |
| 14 | Downloads | `detailBanner` + breadcrumb + dual dropdown filter (`Category`, `Model`) + striped download list rows with dark `Download Now` button | `/support/downloads` |
| 15 | About Us | `detailBanner` + breadcrumb + 2-col company intro & 3-stat strip + 2-col R&D Center + Environment gallery + Corporate Culture 4-card backdrop + Development History + Honors + Partners | `/about` |
| 16 | Our Advantages | `detailBanner` + breadcrumb + 3-col R&D Strength + dark Innovation Capability banner with overlapping 3-col white card strip + 2×2 Quality Assurance grid + 2-col Manufacturing Capability | `/about/advantages` |
| 17 | Join Us | `detailBanner` + breadcrumb + team activities showcase + open positions list with detail modal | `/about/join-us` |
| 18 | Contact Us | `detailBanner` + breadcrumb + 2-col contact details & map + location cards + full-bleed backdrop with centered white `Service Inquiry` form box | `/contact` |
| 19 | Privacy Policy & Legal Notice | `detailBanner` + breadcrumb + clean structured policy document | `/privacy`, `/legal-notice` |
| 20 | Sitemap | `detailBanner` + breadcrumb + multi-column structured link directory | `/sitemap` |
| 21 | Search & 404 | `detailBanner` + interactive site search results / clean 404 recovery | `/search`, `not-found.tsx` |

## 3. Unreachable / Source-Only Notes

- `https://smartthermostatmanufacturer.com/products/Infrared-Thermometer/` returned HTTP `404` during crawl (recorded, not fabricated).
- Reference ancillary non-heating categories (`Smart Dimmer Switch`, `Smart Gateway Hub`, `Smart Outlet`) are intentionally replaced by BEOK Controls' 7 official heating-control product categories as requested (`Gas Boiler Thermostats`, `Electric Underfloor Heating Thermostats`, `Water Heating Thermostats`, `Smart Radiator Valves`, `Thermal Actuators`, `Wiring Centres`, `Smart Heating Controllers`).
