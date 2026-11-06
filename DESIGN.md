# HeatNexis visual system

## Overview

The user-supplied HeatNexis project in Open Design (`brand-dribbble-a11127/heatnexis`) is the visual authority for all routes. Preserve its page compositions, original thermostat SVG illustrations and monochrome photography. The user-authorized homepage exception is a sliding banner using the original hero illustration followed by the reference room and PCB-engineer photos; retain the existing hero heading and statistics. Home/about persuade; catalog, detail, contact and inquiry support tasks.

## Colors

White surfaces (`#ffffff`), cool gray product stages (`#f4f5f7`), charcoal text and primary buttons (`#16181d`), muted copy (`#5b616b`) and pale borders (`#e3e5e9`). Burgundy (`#b3202f`) marks eyebrows, action dots, selected inquiry controls and focus outlines; primary buttons use charcoal with white text.

## Typography

Self-hosted Mona Sans supports weights 200–900. Body copy uses 16px with 1.6 line height; display headings use `clamp(40px, 5vw, 72px)`, weight 500, tight tracking and 1.08 line height. Preserve the reference's responsive type scale and language/RTL behavior.

## Layout

The centered container caps at 1360px with fluid gutters (`clamp(20px, 4vw, 48px)`). Section spacing is generous (`clamp(64px, 8vw, 112px)`) on an 8px spacing rhythm. Retain the reference's grids, stacking breakpoints and mobile navigation/filter behavior, together with each page's original section order.

## Shapes

Rounded product tiles use 24px corners, inset surfaces 16px and controls 12px. Buttons are pills; add controls and button action dots are circular.

## Components

Shared header, language selector, inquiry count, footer and mobile navigation recur across routes. Catalog includes search, filters, sort, pagination and empty states. Detail pages retain specifications and inquiry actions; inquiry retains quantity controls and form states.

The homepage banner advances every 5.5 seconds and wraps continuously. It provides previous/next buttons, position dots, a pause/play button, arrow-key navigation and horizontal touch swipes. Hover, focus, manual pause, hidden-page and offscreen states suspend autoplay. Reduced motion disables autoplay and sliding transitions while preserving manual navigation. Inactive slides and seamless-loop clones remain outside keyboard and accessibility navigation; cleanup removes timers, clones and observers.

## Do's and Don'ts

- Do treat `src/global.css` as the reference token/layout source and `src/reference/pages.json` as trusted, versioned markup. Preserve SVG content and original asset credits in `public/reference/`.
- Do maintain translations and interactions through `src/reference/runtime.js`, including validated inquiry storage, cross-tab synchronization and listener/request cleanup; `ReferencePage.tsx` owns route content and localized SEO. Preserve existing locale storage, shortlist migration and Formspree destination.
- Do keep all 16 detail paths explicit in `.umirc.ts` for static export. `wrangler.toml` serves `dist` with `404-page` fallback; unknown paths must retain the reference 404 rather than render the home page.
- Don't introduce a new visual direction or replace the reference's illustrations with generic assets.
- Do verify interactions with `npm run test:reference` after installing dependencies, and run the production build and TypeScript check separately. The 14 passing DOM tests cover 22 pages, 30 locales, catalog controls, inquiry storage/quantities, mocked form submission, remount cleanup and banner controls/autoplay/reduced motion/swipes. Code review found reference body/CSS fidelity apart from URL relocation and the authorized homepage banner addition. Browser rendering was unavailable, so these checks do not establish visual sign-off or real Formspree delivery.
