# BEOK Controls — Smart Thermostat OEM/ODM B2B Website

High-fidelity Next.js App Router reconstruction of a B2B smart thermostat manufacturer and OEM/ODM independent website for **BEOK Controls**, designed strictly from live Playwright browser captures and computed CSS measurements of `https://smartthermostatmanufacturer.com/`.

## Tech Stack
- **Framework**: Next.js 16 App Router (SSG + SSR, `generateStaticParams`, dynamic SEO & JSON-LD)
- **Language**: TypeScript + React 19
- **Styling**: Tailwind CSS v4 + measured CSS Custom Properties (`src/styles/tokens.css`, `typography.css`, `animations.css`, `globals.css`)
- **Icons**: Lucide React
- **Testing & Visual QA**: Playwright Test (`desktop`, `tablet`, `mobile`) + multi-viewport visual comparison scripts
- **Package Manager**: pnpm

## Quick Start

```bash
# Install dependencies
pnpm install

# Development server (Webpack + polling)
pnpm dev

# TypeScript & ESLint verification
pnpm typecheck
pnpm lint

# Production build (generates 73 static/dynamic routes)
pnpm build

# Start production server
pnpm start
```

## Automated Testing & Visual Comparison

```bash
# Run full Playwright E2E + HTTP verification across desktop (1440x900), tablet (768x1024), mobile (390x844)
BASE_URL=http://127.0.0.1:3005 pnpm test

# Run HTTP route/link/asset audit only
BASE_URL=http://127.0.0.1:3005 pnpm test:http

# Capture local 6-viewport screenshots & DOM geometry comparison against reference/computed-analysis.json
LOCAL_URL=http://127.0.0.1:3005 ROUND=2 node scripts/compare-visual.mjs
```

## Environment Variables & Deployment

Copy `.env.example` to `.env.local` and configure before production launch:

- `NEXT_PUBLIC_SITE_URL`: Canonical production domain (e.g. `https://www.beokcontrols.com`)
- `INDEX_SITE`: Set to `true` only when real commercial assets, legal notices and inquiry routing are ready for search indexing.

Recommended deployment: Vercel, Cloudflare Pages/Workers, or containerized Node.js (`pnpm build && pnpm start`).

## Key Documentation
- [AGENTS.md](AGENTS.md) — Engineering constraints and visual fidelity rules
- [docs/design-system.md](docs/design-system.md) — Browser-measured design tokens, typography, colors and breakpoints
- [docs/page-analysis.md](docs/page-analysis.md) — Complete 21-template classification
- [docs/component-inventory.md](docs/component-inventory.md) — Modular component registry
- [docs/interaction-analysis.md](docs/interaction-analysis.md) — Verified interactive behaviors
- [docs/visual-diff-report.md](docs/visual-diff-report.md) — Round 1 → Round 2 visual comparison and fixes
- [docs/test-report.md](docs/test-report.md) — Playwright 30/30 test verification report
- [docs/required-materials.md](docs/required-materials.md) — Checklist of pending commercial brand assets & credentials
