import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const BASE = 'https://smartthermostatmanufacturer.com';

const ALL_SIX_VIEWPORTS = [
  { w: 1920, h: 1080, dir: 'desktop' },
  { w: 1440, h: 900, dir: 'desktop' },
  { w: 1280, h: 800, dir: 'desktop' },
  { w: 1024, h: 768, dir: 'tablet' },
  { w: 768, h: 1024, dir: 'tablet' },
  { w: 390, h: 844, dir: 'mobile' },
];

const CORE_PAGES = [
  { slug: 'home', path: '/', allViewports: true },
  { slug: 'tailor-made', path: '/custom-thermostat-development-services/', allViewports: true },
  { slug: 'products', path: '/products/', allViewports: true },
  { slug: 'product-category', path: '/products/furnace-thermostats/', allViewports: true },
  { slug: 'product-detail', path: '/products/furnace-thermostats/Smart-WiFi-Thermostat-for-Underfloor-Heating', allViewports: true },
  { slug: 'solutions', path: '/Solutions/', allViewports: true },
  { slug: 'solution-detail', path: '/Solutions/boiler-heating-solutions', allViewports: true },
  { slug: 'blog', path: '/News/', allViewports: true },
  { slug: 'blog-detail', path: '/Blogs/smart-home-hvac-trends/WiFi_vs_Programmable_Furnace_Thermostat', allViewports: true },
  { slug: 'faqs', path: '/Support/Thermostat-FAQs/', allViewports: true },
  { slug: 'about', path: '/About_us/about-chsgd/', allViewports: true },
  { slug: 'advantages', path: '/About_us/our-advantages', allViewports: true },
  { slug: 'contact', path: '/About_us/Contact_Us/', allViewports: true },
  { slug: 'odm-index', path: '/odm/', allViewports: false },
  { slug: 'odm-detail', path: '/odm/Wireless-Water-Heating-Wall-Hung-Boiler-Thermostat', allViewports: false },
  { slug: 'blog-category', path: '/Blogs/oem-odm-thermostat-insights', allViewports: false },
  { slug: 'support', path: '/Support/support', allViewports: false },
  { slug: 'videos', path: '/Support/Video/', allViewports: false },
  { slug: 'downloads', path: '/Support/downloads', allViewports: false },
  { slug: 'join-us', path: '/About_us/join-us', allViewports: false },
  { slug: 'privacy', path: '/privacy/', allViewports: false },
  { slug: 'legal', path: '/Legal_Notice/', allViewports: false },
  { slug: 'sitemap', path: '/sitemap/', allViewports: false },
];

async function preparePage(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    const step = Math.max(window.innerHeight * 0.8, 500);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 200));
    await Promise.all(
      Array.from(document.images).map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((r) => {
              img.addEventListener('load', r, { once: true });
              img.addEventListener('error', r, { once: true });
              setTimeout(r, 4000);
            }),
      ),
    );
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 250));
  });
}

async function extractComputedMetrics(page) {
  return page.evaluate(() => {
    const cs = (el) => {
      if (!el) return null;
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        className: typeof el.className === 'string' ? el.className : '',
        text: el.textContent?.trim().replace(/\s+/g, ' ').slice(0, 120) || '',
        rect: {
          x: Math.round(r.x),
          y: Math.round(r.y + window.scrollY),
          w: Math.round(r.width),
          h: Math.round(r.height),
        },
        fontFamily: s.fontFamily,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        lineHeight: s.lineHeight,
        letterSpacing: s.letterSpacing,
        color: s.color,
        backgroundColor: s.backgroundColor,
        backgroundImage: s.backgroundImage !== 'none' ? s.backgroundImage.slice(0, 120) : 'none',
        borderColor: s.borderColor,
        borderRadius: s.borderRadius,
        boxShadow: s.boxShadow,
        padding: s.padding,
        margin: s.margin,
        gap: s.gap,
        display: s.display,
        gridTemplateColumns: s.gridTemplateColumns,
        maxWidth: s.maxWidth,
        width: s.width,
        transitionDuration: s.transitionDuration,
      };
    };

    const bodyStyle = cs(document.body);
    const header = cs(document.querySelector('.header, header'));
    const headerContainer = cs(document.querySelector('.header .commonMain, .header .content1600, header > div'));
    const logo = cs(document.querySelector('.header .logo, .header .logo img, header .logo'));
    const navItems = Array.from(document.querySelectorAll('.header .navList > .list, .header nav a')).slice(0, 10).map(cs);
    const footer = cs(document.querySelector('.footer, footer'));

    // Top-level layout sections (direct children of body or main wrapper)
    const sectionCandidates = Array.from(
      document.querySelectorAll(
        'body > div, body > section, body > main > section, body > main > div, .indexMain > div, .indexMain > section',
      ),
    ).filter((el) => {
      const r = el.getBoundingClientRect();
      return r.height > 40 && r.width > 100;
    });

    const sections = sectionCandidates.slice(0, 30).map((el) => {
      const info = cs(el);
      const headings = Array.from(el.querySelectorAll('h1, h2, h3, .title, .publicTitle')).slice(0, 6).map(cs);
      const imgs = Array.from(el.querySelectorAll('img')).slice(0, 8).map((img) => {
        const r = img.getBoundingClientRect();
        return {
          alt: img.alt?.slice(0, 60) || '',
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          renderedW: Math.round(r.width),
          renderedH: Math.round(r.height),
          aspectRatio: r.height > 0 ? +(r.width / r.height).toFixed(2) : null,
        };
      });
      return { ...info, headings, imgs };
    });

    const rootVars = {};
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        for (const rule of Array.from(sheet.cssRules || [])) {
          if (rule.selectorText === ':root') {
            for (const prop of Array.from(rule.style)) {
              if (prop.startsWith('--')) rootVars[prop] = rule.style.getPropertyValue(prop).trim();
            }
          }
        }
      } catch {
        // cross-origin stylesheet
      }
    }

    const loadedFonts = Array.from(document.fonts)
      .filter((f) => f.status === 'loaded')
      .map((f) => ({ family: f.family, weight: f.weight, style: f.style }));

    return {
      url: location.href,
      title: document.title,
      viewport: { w: window.innerWidth, h: window.innerHeight },
      scrollHeight: document.body.scrollHeight,
      scrollWidth: document.documentElement.scrollWidth,
      overflowX: document.documentElement.scrollWidth > window.innerWidth,
      loadedFonts,
      rootVars,
      body: bodyStyle,
      header,
      headerContainer,
      logo,
      navItems,
      sections,
      footer,
    };
  });
}

async function main() {
  for (const dir of ['desktop', 'tablet', 'mobile', 'interactions']) {
    await mkdir(`reference/screenshots/${dir}`, { recursive: true });
  }

  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = [];
  const interactions = [];

  try {
    // 1. Capture pages at 1440x900 first (with full computed CSS extraction for all 23 templates)
    console.log('--- Phase 1A: 1440x900 full template survey (23 pages) ---');
    const ctx1440 = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const page1440 = await ctx1440.newPage();

    for (const item of CORE_PAGES) {
      const url = BASE + item.path;
      try {
        const res = await page1440.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
        await page1440.waitForTimeout(800);
        await preparePage(page1440);
        const shotPath = `reference/screenshots/desktop/${item.slug}-1440x900.png`;
        await page1440.screenshot({ path: shotPath, fullPage: true, animations: 'disabled' });
        const metrics = await extractComputedMetrics(page1440);
        results.push({ slug: item.slug, path: item.path, viewport: '1440x900', status: res?.status(), shotPath, metrics });
        console.log(`[1440] ${item.slug} => ${res?.status()} h=${metrics.scrollHeight} sections=${metrics.sections.length}`);
      } catch (err) {
        results.push({ slug: item.slug, path: item.path, viewport: '1440x900', error: String(err) });
        console.error(`[1440] ${item.slug} ERROR:`, err.message);
      }
      await page1440.waitForTimeout(300);
    }

    // 2. Capture interactive states on desktop 1440x900
    console.log('--- Phase 1B: Desktop interactive states ---');
    try {
      await page1440.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page1440.waitForTimeout(1000);

      // Hover Tailor-Made Solution mega menu (2nd nav item)
      const navListItems = page1440.locator('.header .navList > .list');
      const navCount = await navListItems.count();
      console.log('Header nav list count:', navCount);

      if (navCount >= 2) {
        await navListItems.nth(1).hover();
        await page1440.waitForTimeout(500);
        await page1440.screenshot({ path: 'reference/screenshots/interactions/mega-menu-tailor-made-1440x900.png' });
        const mega1 = await page1440.evaluate(() => {
          const el = document.querySelectorAll('.header .navList > .list')[1]?.querySelector('.menus, .subNavMain');
          if (!el) return null;
          const r = el.getBoundingClientRect();
          const s = getComputedStyle(el);
          return { className: el.className, rect: { x: r.x, y: r.y, w: r.width, h: r.height }, bg: s.backgroundColor, display: s.display, opacity: s.opacity };
        });
        interactions.push({ name: 'mega-menu-tailor-made', data: mega1 });
      }

      // Hover Products mega menu (3rd nav item)
      if (navCount >= 3) {
        await navListItems.nth(2).hover();
        await page1440.waitForTimeout(500);
        await page1440.screenshot({ path: 'reference/screenshots/interactions/mega-menu-products-1440x900.png' });
        const mega2 = await page1440.evaluate(() => {
          const el = document.querySelectorAll('.header .navList > .list')[2]?.querySelector('.menus, .subNavMain');
          if (!el) return null;
          const r = el.getBoundingClientRect();
          const s = getComputedStyle(el);
          return { className: el.className, rect: { x: r.x, y: r.y, w: r.width, h: r.height }, bg: s.backgroundColor, display: s.display, opacity: s.opacity };
        });
        interactions.push({ name: 'mega-menu-products', data: mega2 });
      }

      // Hover Solutions mega menu (4th nav item)
      if (navCount >= 4) {
        await navListItems.nth(3).hover();
        await page1440.waitForTimeout(500);
        await page1440.screenshot({ path: 'reference/screenshots/interactions/mega-menu-solutions-1440x900.png' });
      }

      // Move mouse away & scroll down to capture scrolled header
      await page1440.mouse.move(10, 500);
      await page1440.waitForTimeout(300);
      await page1440.evaluate(() => window.scrollTo(0, 700));
      await page1440.waitForTimeout(500);
      await page1440.screenshot({ path: 'reference/screenshots/interactions/header-scrolled-1440x900.png' });
      const scrolledHeader = await page1440.evaluate(() => {
        const el = document.querySelector('.header, header');
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const s = getComputedStyle(el);
        return { className: el.className, rect: { x: r.x, y: r.y, w: r.width, h: r.height }, bg: s.backgroundColor, boxShadow: s.boxShadow, borderBottom: s.borderBottom };
      });
      interactions.push({ name: 'header-scrolled', data: scrolledHeader });

      // Search button click
      await page1440.evaluate(() => window.scrollTo(0, 0));
      await page1440.waitForTimeout(300);
      const searchBtn = page1440.locator('.header .searchBtn, .header .icon-sousuo, .header .search').first();
      if (await searchBtn.count()) {
        await searchBtn.click({ force: true });
        await page1440.waitForTimeout(500);
        await page1440.screenshot({ path: 'reference/screenshots/interactions/search-open-1440x900.png' });
        interactions.push({ name: 'search-open', captured: true });
      }
    } catch (err) {
      console.error('Interaction capture error:', err.message);
    }

    await ctx1440.close();

    // 3. Remaining 5 viewports for core pages (1920, 1280, 1024, 768, 390)
    for (const vp of ALL_SIX_VIEWPORTS) {
      if (vp.w === 1440 && vp.h === 900) continue;
      console.log(`--- Phase 1C: ${vp.w}x${vp.h} (${vp.dir}) ---`);
      const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1 });
      const page = await ctx.newPage();

      const pagesForVp = vp.w === 390 ? CORE_PAGES : CORE_PAGES.filter((p) => p.allViewports);
      for (const item of pagesForVp) {
        const url = BASE + item.path;
        try {
          const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
          await page.waitForTimeout(600);
          await preparePage(page);
          const shotPath = `reference/screenshots/${vp.dir}/${item.slug}-${vp.w}x${vp.h}.png`;
          await page.screenshot({ path: shotPath, fullPage: true, animations: 'disabled' });
          // Extract compact viewport geometry for home & key pages
          if (['home', 'products', 'product-detail', 'solutions', 'about', 'contact'].includes(item.slug)) {
            const metrics = await extractComputedMetrics(page);
            results.push({ slug: item.slug, path: item.path, viewport: `${vp.w}x${vp.h}`, status: res?.status(), shotPath, metrics });
          }
          console.log(`[${vp.w}] ${item.slug} => ${res?.status()}`);
        } catch (err) {
          console.error(`[${vp.w}] ${item.slug} ERROR:`, err.message);
        }
        await page.waitForTimeout(200);
      }

      // Mobile menu interaction capture on 390x844
      if (vp.w === 390) {
        try {
          await page.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 45000 });
          await page.waitForTimeout(700);
          const menuBtn = page.locator('.header .menuBtn, .header .mNavBtn, .header .navBtn, .mHeader .menu').first();
          if (await menuBtn.count()) {
            await menuBtn.click({ force: true });
            await page.waitForTimeout(500);
            await page.screenshot({ path: 'reference/screenshots/interactions/mobile-menu-open-390x844.png' });
            interactions.push({ name: 'mobile-menu-open', captured: true });
          }
        } catch (err) {
          console.error('Mobile menu capture error:', err.message);
        }
      }

      await ctx.close();
    }
  } finally {
    await browser.close();
  }

  await writeFile('reference/computed-analysis.json', JSON.stringify({ generatedAt: new Date().toISOString(), interactions, results }, null, 2));
  console.log('Done! Saved reference/computed-analysis.json with', results.length, 'entries.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
