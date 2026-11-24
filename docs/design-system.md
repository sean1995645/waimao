# Reference Design System — Browser-Measured Specification

Status: **Browser-measured via Playwright Chromium** against `https://smartthermostatmanufacturer.com/` across all 6 required viewports (`1920×1080`, `1440×900`, `1280×800`, `1024×768`, `768×1024`, `390×844`) and interactive states. Raw measurements archived in `reference/computed-analysis.json` and screenshots in `reference/screenshots/{desktop,tablet,mobile,interactions}/`.

## 1. Color Palette (Computed CSS)

| Token | Value | Measured Usage |
|---|---|---|
| `--color-primary` | `#0067e7` | Brand accent, active mega-menu items, active category tab fill, primary CTAs, floating sidebar, hover underlines & arrows |
| `--color-primary-hover` | `#0055c4` | Button & tab hover state |
| `--color-header-bg` | `#000000` | Desktop scrolled header (`.headerDownBg`) & inner-page fixed header |
| `--color-header-mobile-bg` | `#ffffff` | Tablet/Mobile (`< 992px`) fixed header (`60px`) |
| `--color-title` | `#000000` / `#272727` | Centered section H2 titles (`#000000`), card/body titles (`#272727`, `#2e3742`) |
| `--color-text` | `#4c505f` | Primary body copy |
| `--color-text-muted` | `#666666` | Section subtitles, dates, secondary captions |
| `--color-white` | `#ffffff` | Primary page canvas, mega-menu panels, hero text, buttons on dark |
| `--color-surface` | `#f5f6f8` / `#f7f8fa` | Product cards, blog card footers, form inputs (`#f3f4f6`), alternating bands |
| `--color-dark-showcase` | `#1c2127` / `#343b42` | Homepage 2×2 dark studio product showcase background |
| `--color-border` | `#e8ecf0` / `#e5e7eb` | Tab borders, breadcrumb bottom border, FAQ dividers, table cells |
| `--color-footer-bg` | `#272727` | Measured `rgb(39, 39, 39)` footer background |
| `--color-footer-text` | `#b8bcc4` | Footer navigation links & legal bar |

## 2. Typography Scale (Computed CSS)

- **Authored Font Family**: `思源黑体` (Source Han Sans). Implemented with `'Noto Sans', 'Helvetica Neue', Arial, sans-serif` for deterministic offline/CI builds and crisp zero-FOUT rendering matching the authored Source Han Sans intent.
- **Scale by Viewport**:

| Role | 1920×1080 | 1440×900 | 390×844 | Weight | Notes |
|---|---|---|---|---|---|
| Section H2 (`indexTitle`) | `46px` / `56px` | `34.5px` / `42px` | `26px` / `30px` | `700` | Centered, `#000000` |
| Hero H1 (`banner`) | `54px` / `66px` | `40px` / `50px` | `28px` / `36px` | `700` | Left-aligned on desktop, centered on mobile, `#fff` |
| Inner Banner H1 (`detailBanner`) | `46px` / `56px` | `36px` / `44px` | `28px` / `34px` | `700` | Left-aligned white over dark editorial banner |
| Eyebrow / Subtitle | `18px–20px` | `14px–15px` | `13px–14px` | `400` | `rgba(255,255,255,0.65)` on dark / `#666666` on light |
| Card Title | `22px` / `28px` | `16.5px` / `23px` | `16px–18px` / `24px` | `700` | `#2e3742` or `#ffffff` on dark overlays |
| Body Text | `16px` / `26px` | `14px` / `22px` | `14px` / `22px` | `400` | `#4c505f` |
| Desktop Nav Link | `16px` | `14px` | `16px` (drawer) | `500` | White on desktop black/transparent header |

## 3. Layout Containers & Section Geometry (Computed CSS)

| Element | 1920×1080 | 1440×900 | 1280×800 | 1024×768 | 768×1024 | 390×844 |
|---|---|---|---|---|---|---|
| `.content1600` width | `1600px` (`83.33vw`) | `1200px` (`83.33vw`) | `1066px` | `853px` | `calc(100% - 48px)` | `350px` (`calc(100% - 40px)`) |
| Header (Home top) | `106px` transparent | `79px` transparent | `71px` transparent | `57px` transparent | `60px` `#fff` | `60px` `#fff` |
| Header (Scrolled / Inner) | `78px` `#000` | `59px` `#000` | `54px` `#000` | `52px` `#000` | `60px` `#fff` | `60px` `#fff` |
| Home Hero (`.banner`) | `1080px` (`100vh`) | `900px` (`100vh`) | `800px` (`100vh`) | `768px` (`100vh`) | `760px` | `660px–844px` |
| Inner Banner (`.detailBanner`) | `650px` (`33.9vw`) | `488px` | `434px` | `360px` | `320px` | `260px` |
| Products Banner (`.proBanner`) | `380px` (`19.8vw`) | `285px` | `254px` | `240px` | `260px` | `340px` |
| Product Detail Banner | `548px` (`28.6vw`) | `412px` | `380px` | `360px` | auto | auto |
| Breadcrumb Bar | `60px` | `60px` | `54px` | `52px` | `48px` | `44px` |
| Footer (`.bottomBg`) | `512px` (`#272727`) | `384px` (`#272727`) | `360px` | `350px` | accordion | accordion (`559px`) |

## 4. Breakpoints, Radius, Shadows & Motion

- **Breakpoints**: `< 768px` (mobile), `768px–991px` (tablet / mobile header), `992px–1199px` (compact desktop), `>= 1200px` (full desktop).
- **Border Radius**: `0px` (sharp architectural rectangles for all cards, tabs, mega-menu, banners, buttons, inputs — NO SaaS rounded cards). Exception: desktop hamburger trigger (`50%` circular white button) and service card icon badge (`50%` white ring).
- **Shadows**: Minimal/flat industrial aesthetic; subtle `0 12px 32px rgba(0,0,0,0.12)` only on floating mega-menu dropdown and centered contact inquiry box.
- **Transitions**: `0.3s–0.4s cubic-bezier(0.4, 0.01, 0.165, 0.99)` for header height/background transition, mega-menu reveal, card image zoom (`scale(1.04)`), and service panel hover expansion. Respects `prefers-reduced-motion`.

## 5. Brand & Asset Integrity Rules

- Zero reference-site brand logos, commercial photographs, or contact data in `public/`.
- All BEOK Controls visual frames use original technical/architectural vector placeholder compositions tone-matched to the measured reference surfaces, explicitly labeled with pending-asset notes where approved commercial photography/datasheets/videos are not yet supplied.
- No fabricated product specifications, certifications, factory area figures, or fake inquiry submission success.
