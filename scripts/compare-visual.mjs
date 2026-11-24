import { chromium } from '@playwright/test';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const BASE = process.env.LOCAL_URL || 'http://localhost:3000';
const ROUND = process.env.ROUND || '1';
const OUT_DIR = `reference/comparison/local-round-${ROUND}`;

const VIEWPORTS = [
  { w: 1920, h: 1080 },
  { w: 1440, h: 900 },
  { w: 1280, h: 800 },
  { w: 1024, h: 768 },
  { w: 768, h: 1024 },
  { w: 390, h: 844 },
];

const PAGES = [
  { slug: 'home', path: '/', allVp: true },
  { slug: 'tailor-made', path: '/tailor-made-solution', allVp: true },
  { slug: 'odm-index', path: '/odm', allVp: false },
  { slug: 'odm-detail', path: '/odm/rotary-multi-color-smart-thermostat-id', allVp: false },
  { slug: 'products', path: '/products', allVp: true },
  { slug: 'product-detail', path: '/products/gas-boiler-thermostats/gas-boiler-thermostats-concept', allVp: true },
  { slug: 'solutions', path: '/solutions', allVp: true },
  { slug: 'blog', path: '/blog', allVp: false },
  { slug: 'faqs', path: '/support/faqs', allVp: false },
  { slug: 'downloads', path: '/support/downloads', allVp: false },
  { slug: 'videos', path: '/support/videos', allVp: false },
  { slug: 'about', path: '/about', allVp: true },
  { slug: 'advantages', path: '/about/advantages', allVp: false },
  { slug: 'contact', path: '/contact', allVp: true },
];

async function preparePage(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    const step = Math.max(window.innerHeight * 0.85, 600);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    await new Promise((r) => setTimeout(r, 260));
  });
}

async function measureLocal(page) {
  return page.evaluate(() => {
    const pick = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return {
        h: Math.round(r.height),
        w: Math.round(r.width),
        bg: s.backgroundColor,
        color: s.color,
        fontSize: s.fontSize,
        lineHeight: s.lineHeight,
        fontWeight: s.fontWeight,
      };
    };

    const sections = Array.from(document.querySelectorAll('main > section')).map((el) => {
      const r = el.getBoundingClientRect();
      const h2 = el.querySelector('h2, h1');
      const hs = h2 ? getComputedStyle(h2) : null;
      return {
        className: el.className,
        h: Math.round(r.height),
        w: Math.round(r.width),
        headingText: h2?.textContent?.trim().slice(0, 50) || '',
        headingSize: hs?.fontSize || null,
        headingLineHeight: hs?.lineHeight || null,
      };
    });

    return {
      url: location.href,
      viewport: { w: window.innerWidth, h: window.innerHeight },
      scrollHeight: document.body.scrollHeight,
      overflowX: document.documentElement.scrollWidth > window.innerWidth + 1,
      header: pick('header.header'),
      h1: pick('h1'),
      h2: pick('h2'),
      footer: pick('footer.site-footer'),
      sections,
    };
  });
}

async function main() {
  await mkdir(`${OUT_DIR}/interactions`, { recursive: true });
  const refData = JSON.parse(await readFile('reference/computed-analysis.json', 'utf8'));
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const localMetrics = [];

  try {
    for (const vp of VIEWPORTS) {
      const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1 });
      const page = await ctx.newPage();
      const pageList = vp.w === 1440 || vp.w === 390 ? PAGES : PAGES.filter((p) => p.allVp);

      for (const item of pageList) {
        await page.goto(BASE + item.path, { waitUntil: 'networkidle', timeout: 30000 });
        await preparePage(page);
        const shotPath = `${OUT_DIR}/${item.slug}-${vp.w}x${vp.h}.png`;
        await page.screenshot({ path: shotPath, fullPage: true, animations: 'disabled' });
        const metrics = await measureLocal(page);
        localMetrics.push({ slug: item.slug, path: item.path, viewport: `${vp.w}x${vp.h}`, shotPath, metrics });
        console.log(`[Round ${ROUND}] ${vp.w}x${vp.h} ${item.slug.padEnd(16)} H=${metrics.scrollHeight} hdr=${metrics.header?.h}px overflow=${metrics.overflowX}`);
      }

      // Desktop interaction captures at 1440x900
      if (vp.w === 1440) {
        await page.goto(BASE + '/', { waitUntil: 'networkidle' });
        await page.getByRole('button', { name: 'Expand Products', exact: true }).click();
        await page.waitForTimeout(250);
        await page.screenshot({ path: `${OUT_DIR}/interactions/mega-menu-products-1440x900.png` });

        await page.getByRole('button', { name: 'Expand Tailor-Made Solution', exact: true }).click();
        await page.waitForTimeout(250);
        await page.screenshot({ path: `${OUT_DIR}/interactions/mega-menu-tailor-made-1440x900.png` });

        await page.keyboard.press('Escape');
        await page.evaluate(() => window.scrollTo(0, 750));
        await page.waitForTimeout(400);
        await page.screenshot({ path: `${OUT_DIR}/interactions/header-scrolled-1440x900.png` });
      }

      // Mobile menu interaction capture at 390x844
      if (vp.w === 390) {
        await page.goto(BASE + '/', { waitUntil: 'networkidle' });
        await page.getByRole('button', { name: 'Open menu', exact: true }).click();
        await page.waitForTimeout(300);
        await page.screenshot({ path: `${OUT_DIR}/interactions/mobile-menu-open-390x844.png` });
      }

      await ctx.close();
    }
  } finally {
    await browser.close();
  }

  // Pair local geometry against reference computed-analysis.json
  const deltas = [];
  for (const loc of localMetrics) {
    const ref = refData.results.find((r) => r.slug === loc.slug && r.viewport === loc.viewport && r.metrics);
    if (!ref) continue;
    const rm = ref.metrics;
    const lm = loc.metrics;
    deltas.push({
      slug: loc.slug,
      viewport: loc.viewport,
      refScrollH: rm.scrollHeight,
      locScrollH: lm.scrollHeight,
      refHeaderH: rm.header?.rect?.h,
      locHeaderH: lm.header?.h,
      refHeaderBg: rm.header?.backgroundColor,
      locHeaderBg: lm.header?.bg,
      locOverflowX: lm.overflowX,
      refFooterBg: rm.sections?.find((s) => s.className.includes('bottomBg'))?.backgroundColor || null,
      locFooterBg: lm.footer?.bg,
    });
  }

  await writeFile(
    `reference/comparison/geometry-round-${ROUND}.json`,
    JSON.stringify({ round: ROUND, generatedAt: new Date().toISOString(), deltas, localMetrics }, null, 2),
  );
  console.log(`Saved reference/comparison/geometry-round-${ROUND}.json with ${deltas.length} paired comparisons.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
