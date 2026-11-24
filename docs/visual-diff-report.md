# Visual Difference Report — BEOK Controls vs. Reference Site

Status: **TWO COMPLETE COMPARISON ROUNDS EXECUTED & VERIFIED IN REAL PLAYWRIGHT CHROMIUM** across all 6 required viewports (`1920×1080`, `1440×900`, `1280×800`, `1024×768`, `768×1024`, `390×844`) and interactive states.

- **Reference captures**: `reference/screenshots/{desktop,tablet,mobile,interactions}/` + `reference/computed-analysis.json` (98 screenshots across 23 templates)
- **Local Round 1 captures**: `reference/comparison/local-round-1/`
- **Local Round 2 captures**: `reference/comparison/local-round-2/` + `reference/comparison/geometry-round-2.json` (52 full-page captures + 4 interactive captures + 42 paired DOM geometry records)

## 1. Round 1 Findings & Code Fixes Applied

Side-by-side inspection of Round 1 local screenshots against reference captures surfaced 5 genuine defects:

| Severity | Finding in Round 1 | Root Cause | Fix Applied Before Round 2 |
|---|---|---|---|
| **P0** | `390×844` mobile header pushed `.menu-toggle` outside viewport (`Open menu` click blocked by `<html>`) | `.language select` expanded to ~160px width due to long disabled option text (`DE · Translation pending`) | Constrained `.language select` to `width: 46px; max-width: 48px` and shortened disabled labels (`DE (Pending)`). Verified clickable & visible in Round 2 `mobile-menu-open-390x844.png`. |
| **P0** | Lower homepage sections (`Products`, `Applications`, `Company Introduction`, `News`) rendered blank white in full-page captures | `Reveal` wrapper held `[data-reveal='pending'] { opacity: 0 }` while fast scroll left sections unobserved | Changed `Reveal` to default `opacity: 1` with progressive `fadeInUp` entrance animation on entry; zero blank sections in Round 2. |
| **P0** | `Skip to content` button and fixed header leaked downward during full-page capture (`home-1440` header stuck at `59px` solid instead of `79px` top) | `html { scroll-behavior: smooth }` caused `scrollTo(0, 0)` to remain mid-scroll (`y ≈ 150px`), shifting fixed elements (`top: -100px`) into frame | Replaced `.skip-link` hiding with `clip-path: inset(50%); width: 1px; height: 1px` (expanding cleanly on `:focus`) and updated capture scroll reset to `behavior: 'instant'`. |
| **P1** | Corner watermark text in `DarkSectionBackdrop` clipped to `APPROV` on narrow 4-column `.iservice-card` panels | Fixed SVG corner `<text>` cropped by `preserveAspectRatio="xMidYMid slice"` | Removed corner-clipped SVG text from `DarkSectionBackdrop`; kept centered non-clipped captions inside `HeroShowcaseVisual` and `ProductDeviceVisual`. |
| **P1** | Native `<dialog>` Tab traversal exited modal on single-button focus cycle (caught during Playwright E2E) | Native `<dialog>` cycles to browser chrome when only one focusable button exists | Added explicit Tab/Shift+Tab focus containment inside `ProductGallery` `<dialog>`. |

## 2. Round 2 Measured Geometry Parity (Reference vs. Local BEOK Controls)

| Page & Viewport | Reference Header | Local Header | Ref Scroll Height | Local Scroll Height | Local Horizontal Overflow |
|---|---|---|---|---|---|
| Home `1920×1080` | `106px` transparent | `106px` transparent | `7409px` | `6652px` | `false` |
| Home `1440×900` | `79px` transparent | `79px` transparent | `5649px` | `5533px` | `false` |
| Home `1280×800` | `71px` transparent | `70px` transparent | `5026px` | `5117px` | `false` |
| Home `1024×768` | `57px` transparent | `64px` transparent | `4133px` | `4985px` | `false` |
| Home `768×1024` | `60px` `#ffffff` | `60px` `#ffffff` | `6922px` | `7138px` | `false` |
| Home `390×844` | `60px` `#ffffff` | `60px` `#ffffff` | `6059px` | `8887px` (all 4 service & 6 solution cards stacked cleanly) | `false` |
| Inner Pages `1440×900` | `59px` `#000000` | `59px` `#000000` | — | `59px` `#000000` across all 14 inner templates (incl. `/odm` & `/odm/[slug]`) | `false` |
| ODM Index / Detail `390×844` | `60px` `#ffffff` | `60px` `#ffffff` | — | `6297px` / `5992px` | `false` |
| Footer (`1440×900`) | `rgb(39, 39, 39)` | `rgb(39, 39, 39)` | `384px` | 7-col desktop / accordion `< 992px` | `false` |

## 3. Intentional Brand & Honest-Asset Differences (Excluded from Visual Defects)

- Third-party reference logos, commercial photographs, factory stats (`1020㎡`, `2+`, `16+`), WhatsApp QR code, email and telephone numbers are intentionally NOT copied.
- BEOK Controls uses original industrial SVG visual placeholders tone-matched to the reference site's dark-studio plinths and light product surfaces, explicitly labeled as pending approved commercial photography.
- Product categories reflect BEOK Controls' 7 official heating-control categories (`Gas Boiler Thermostats`, `Electric Underfloor Heating Thermostats`, `Water Heating Thermostats`, `Smart Radiator Valves`, `Thermal Actuators`, `Wiring Centres`, `Smart Heating Controllers`).
