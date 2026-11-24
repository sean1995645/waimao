# Component Inventory — Browser-Verified Architecture

All reusable components are modularized under `src/components/` and styled directly from measured design tokens in `src/styles/`.

| Component | File | Reference Counterpart & Verified Behavior |
|---|---|---|
| `Header` | `src/components/Header.tsx` | Fixed header: transparent `79–106px` on homepage top → shrinks to `59–78px` solid `#000` on scroll & inner pages; `60px` solid `#fff` below `992px`. |
| `DesktopNavigation` & `MegaMenu` | `src/components/Header.tsx` | 7 top-level nav items with blue bottom active indicator; floating white dropdown panel (3-column interactive Category→Product→Preview mega-menu for Products; 2-column Sub-page→Preview panel for other menus); full-screen desktop nav drawer triggered by circular white menu button. |
| `MobileNavigation` | `src/components/Header.tsx` | Right slide-over drawer (`< 992px`) with accordion expandable sub-menus, Escape/outside-click close, and focus restoration. |
| `LanguageSwitcher` | `src/components/Header.tsx` | Globe icon + `EN ▾` dropdown with explicit translation-pending slots for additional locales. |
| `SearchPanel` | `src/components/Header.tsx` | Drop-down header search overlay (`GET /search?q=...`) with autofocus and Escape close. |
| `Footer` | `src/components/Footer.tsx` | `#272727` dark footer: desktop 7-column grid (contact/QR + 6 nav columns), mobile/tablet expandable accordion columns, legal bar & social icons. |
| `HeroBanner` | `src/components/HeroBanner.tsx` | Homepage 3-slide `100vh` carousel with prev/next arrows, progress bar, numeric `01/03` pagination; inner `detailBanner` (`488px` @ 1440) dark editorial banner. |
| `SectionTitle` | `src/components/LayoutPrimitives.tsx` | Centered bold H2 (`34.5px` @ 1440 / `46px` @ 1920 / `26px` @ 390) + centered `#666` subtitle. |
| `Container` | `src/components/LayoutPrimitives.tsx` | `.content1600` (`83.33333vw` desktop, `calc(100% - 40px)` mobile). |
| `Breadcrumb` | `src/components/LayoutPrimitives.tsx` | `60px` height subtle border-bottom navigation strip (`Home > Section > Current Page`). |
| `ProductCard`, `ProductGrid`, `ProductCategoryTabs` | `src/components/ProductsSection.tsx` | Homepage icon-above-label tabs + 2×2 dark-studio showcase grid; Catalog left sticky sidebar + 3-col `#f5f6f8` cards (horizontal cards on mobile) + search & application filters. |
| `ProductGallery` | `src/components/ProductDetailView.tsx` | Multi-view gallery (`Front`, `Rear`, `Dimensions`, `Wiring`), zoom modal via native `<dialog>`, thumbnail strip. |
| `SpecificationsTable` & `ProductDownload` | `src/components/ProductDetailView.tsx` | Striped parameter table (explicitly marking pending verified specs) + filtered datasheet download rows. |
| `SolutionCard` | `src/components/SolutionsSection.tsx` | Homepage 3×2 dark-overlay visual cards; Solutions index alternating 50/50 split rows with icon + title + summary + `View More >`. |
| `ArticleCard` & `Pagination` | `src/components/BlogSection.tsx` | 3-col editorial cards with 16:10 header visual, `#f5f7fa` body, bold title, calendar icon + date; server/query-driven pagination. |
| `FAQAccordion` | `src/components/SupportSections.tsx` | Category tabs + bordered `Q`-badge expandable rows with smooth chevron rotation. |
| `InquiryForm` | `src/components/InquiryForm.tsx` | Contact/Product floating white inquiry card with `#f3f4f6` fields, red required asterisks, validation, and honest local draft download (API returns `503` until live backend configured). |
| `FloatingContact` & `BackToTop` | `src/components/FloatingContact.tsx` | Right-edge vertically centered blue `Contact Us` vertical tab with popover drawer + blue `↑` Back-to-Top square button. |
| `BrandVisual` | `src/components/BrandVisual.tsx` | Original BEOK Controls technical/studio SVG visuals tone-matched to reference dark/light surfaces with explicit pending-photography labeling. |
