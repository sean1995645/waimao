# Required Real Commercial Materials & Pending Launch Checklist

All structural templates, design tokens, interactive features, SEO metadata, visual parity and automated tests are complete. Before public commercial launch, BEOK Controls must supply the following genuine brand assets and operational configurations (no fabricated data has been shipped):

## 1. Visual & Media Assets (Reserved Directories in `public/`)
- `public/images/brand/` — Official BEOK Controls vector logo (light & dark variants) and favicon/OG brand card.
- `public/images/products/` — Approved studio product photography (front, rear terminal block, dimension drawings, wiring schematics) for all 7 heating-control categories.
- `public/images/solutions/` — Authorized residential, underfloor, boiler and commercial HVAC installation photography.
- `public/images/factory/` — Genuine factory exterior, SMT/assembly lines, R&D laboratory and reliability testing photography.
- `public/images/certificates/` — Authorized high-resolution certificates (CE, RoHS, UKCA, UL, ISO, patents) if applicable.
- `public/videos/` — Approved MP4/WebM product overview, wiring and app setup videos (currently shown in an honest pending-media modal).
- `public/downloads/` — Approved PDF datasheets, user manuals and wiring diagrams (currently linked to request flow).

## 2. Commercial Product & Company Data
- Verified BEOK model codes, electrical ratings (voltage, relay amperage, sensor beta, IP rating, physical dimensions) to replace `"Pending verified..."` rows in `src/data/catalog.ts`.
- Verified corporate profile: legal entity name, registered office & factory addresses, founding year, approved capability figures, commercial email, telephone and WhatsApp/WeChat QR code.
- Approved Privacy Policy, Legal Disclaimer and Terms of Service reviewed by legal counsel.

## 3. External Services & Deployment Configuration
- Live inquiry backend / SMTP / CRM integration in `src/app/api/inquiry/route.ts` (currently returns HTTP `503` truthfully and generates a downloadable `.txt` inquiry draft).
- Production domain (`NEXT_PUBLIC_SITE_URL`) and search-engine indexing toggle (`INDEX_SITE=true`) in `.env.local` / hosting environment.
- Genuine human-verified translations for DE / FR / ES / 中文 routes before activating disabled options in `LanguageSwitcher`.
