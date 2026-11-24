# BEOK Controls implementation rules

Read AGENTS.md, TASKS.md, PROGRESS.md, docs/design-system.md and docs/implementation-plan.md before continuing.

- The user authorized a new implementation, explicitly forbade restoring the deleted Git version. Do not restore deleted files or reuse its brand/assets.
- Reference: https://smartthermostatmanufacturer.com/. Browser screenshots and computed CSS are the visual authority. Source HTML/CSS alone cannot establish visual acceptance.
- Use Next.js App Router, TypeScript, React, Tailwind v4, CSS variables, Lucide, pnpm and Playwright.
- No redesign, gradients, glass effects, decorative SaaS cards, invented company credentials, product specifications or fake inquiry success.
- Browser-measured design system and multi-viewport visual comparison (Rounds 1–2 across all 6 viewports + interactions) are complete. Do not drift from the verified design tokens in `src/styles/` without new browser evidence.
- Only approved BEOK commercial assets may ship. Current imagery is clearly labeled missing-asset UI. No reference-site logos/photos/contact data in public/.
- English only currently; translation slots must remain explicitly unavailable until genuine translations exist.
- Inquiry endpoint returns 503; form generates a local draft. Never claim a draft was sent.
- Keep CMS-ready content separate from presentation in src/data and src/types. Shared tokens live in src/styles.
- Every completed task updates TASKS.md and PROGRESS.md. Commit only explicitly scoped new implementation files, preserving unrelated deletions. Never use git add -A here.
- Acceptance requires real reference/local captures at all six requested viewports, desktop/mobile menu interactions, repeated comparison/fixes, route/link checks, no overflow/runtime/image errors, lint, typecheck, Playwright and production build.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
