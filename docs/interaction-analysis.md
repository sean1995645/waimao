# Interaction Analysis — Browser-Observed Reference Behavior

Status: **Observed in live Chromium** (`reference/screenshots/interactions/` & `reference/computed-analysis.json`).

## 1. Header & Navigation States

- **Homepage Top → Scrolled Transition**: Starts transparent (`rgba(0,0,0,0)`) at `79px` (`1440px`) / `106px` (`1920px`). Scrolling past `30px` adds `.headerDownBg`: smooth `0.35s` transition to `#000000` background and compact `59px` (`1440px`) / `78px` (`1920px`) height. Inner pages start immediately in compact solid `#000000`.
- **Responsive Breakpoint (`< 992px`)**: Header becomes fixed `60px` solid `#ffffff` with dark BEOK logo, search button, `EN ▾`, and hamburger button opening a slide-over drawer with accordion sub-lists.
- **Desktop Mega Menu**:
  - Triggered by desktop hover (or keyboard/click toggle on trigger button) with active item highlighted in `#0067e7` + bottom blue bar.
  - **Products Mega Menu**: 3-column white floating panel (`Category List` → `Category Products` → `Product Preview`). Hovering a category dynamically updates the middle product column and right preview pane.
  - **Tailor-Made / Solutions / Blog / Support / About Mega Menus**: 2-column white floating panel (`Sub-pages` → `Summary & Visual Preview`).
  - **Full-Screen Desktop Menu**: Clicking the circular white hamburger button at the far right of the desktop header opens the full-viewport navigation matrix overlay.
  - **Keyboard & Focus**: Escape closes active search/mega-menu/drawer and restores trigger focus; outside pointerdown and focus exit collapse panels cleanly.

## 2. Carousels, Tabs & Accordions

- **Hero Banner Carousel**: 3 slides with `< PREV` / `NEXT >`, animated progress bar, numeric `01 / 03` pagination, and auto-advance (paused on hover/focus and disabled under `prefers-reduced-motion`).
- **Homepage Products Category Switcher**: Clicking any of the 7 icon-above-label category tabs highlights the tab in `#0067e7` and swaps the 2×2 dark-studio showcase grid smoothly.
- **Tailor-Made Solution Tabs & Service Advantages Tabs**: 4-tab switchers updating ODM case grids and capability galleries in place (`?service=0..3` query sync supported).
- **Product Detail Sticky Follow-Nav**: `52px` sticky anchor/tab bar (`Overview`, `Highlights`, `Specifications`, `Downloads`, `FAQ`, `Inquiry`) with blue underline indicator.
- **Product Gallery Lightbox**: Thumbnail view switching (`Front`, `Rear`, `Dimensions`, `Wiring`) + native `<dialog>` modal zoom preview with Escape & focus return.
- **FAQ Accordion**: Category tabs + dark-square `Q` badge rows expanding/collapsing with chevron rotation.
- **Mobile Footer Accordion**: Below `992px`, footer navigation columns become collapsible accordion headers.

## 3. Forms, Search, Floating Sidebar & Lazy Motion

- **Search**: Header search icon toggles clean full-width search bar; submitting navigates to `/search?q=...` filtering products, solutions, services, and articles.
- **Service Inquiry Form**: Centered white form panel on light `#f3f4f6` inputs; validates required fields, email format, message length, and privacy consent; calls `POST /api/inquiry` (which honestly returns `503` unconfigured) and generates a downloadable local inquiry draft without ever fabricating delivery success.
- **Floating Right Sidebar**: Fixed right-middle blue vertical `Contact Us` tab (toggles inquiry quick-access popover) + blue square `↑` Back-to-Top button with reduced-motion support.
- **Scroll Reveal Animations**: Subtle `fadeInUp` entrance animations using `IntersectionObserver` (`0.6s–0.8s` ease-out, immediately visible when `prefers-reduced-motion: reduce`).
