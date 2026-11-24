import { test, expect } from '@playwright/test';
import { pages } from '../src/data/pages';

const baseOrigin = process.env.BASE_URL || 'http://127.0.0.1:3005';

test('all page routes and SEO metadata respond', async ({ request }) => {
  for (const page of pages) {
    const response = await request.get(page.path);
    expect(response.status(), page.path).toBe(200);
    const html = await response.text();
    expect(html, page.path).toContain('<title>');
    expect(html, page.path).toContain('rel="canonical"');
    expect(html, page.path).toContain('property="og:title"');
    expect(html, page.path).toContain('application/ld+json');
  }
  expect((await request.get('/sitemap.xml')).status()).toBe(200);
  expect((await request.get('/robots.txt')).status()).toBe(200);
});

test('all rendered internal links and fragments resolve', async ({ request }) => {
  const documents = new Map<string, string>();
  const links = new Map<string, Set<string>>();
  for (const page of pages) {
    const response = await request.get(page.path);
    expect(response.status(), page.path).toBe(200);
    const html = await response.text();
    documents.set(page.path, html);
    for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
      const url = new URL(match[1].replaceAll('&amp;', '&'), `${baseOrigin}${page.path}`);
      if (url.origin !== new URL(baseOrigin).origin) continue;
      const key = url.pathname + url.search;
      if (!links.has(key)) links.set(key, new Set());
      if (url.hash) links.get(key)!.add(decodeURIComponent(url.hash.slice(1)));
    }
  }
  for (const [path, fragments] of links) {
    let html = documents.get(path);
    if (html === undefined) {
      const response = await request.get(path);
      expect(response.status(), `Link to ${path}`).toBe(200);
      html = await response.text();
    }
    for (const fragment of fragments) {
      expect(html, `Anchor ${path}#${fragment}`).toContain(`id="${fragment}"`);
    }
  }
});

test('all rendered stylesheets and scripts load', async ({ request }) => {
  const assets = new Set<string>();
  for (const page of pages) {
    const response = await request.get(page.path);
    const html = await response.text();
    const styles = [...html.matchAll(/<link\b[^>]*\bhref="([^"]+\.css(?:\?[^"]*)?)"/g)].map((m) => m[1]);
    expect(styles.length, `${page.path} must include a stylesheet`).toBeGreaterThan(0);
    styles.forEach((style) => assets.add(style));
    for (const match of html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)) assets.add(match[1]);
  }
  for (const asset of assets) {
    const response = await request.get(asset.replaceAll('&amp;', '&'));
    expect(response.status(), asset).toBe(200);
    if (asset.includes('.css')) {
      expect(response.headers()['content-type'], asset).toContain('text/css');
      const css = await response.text();
      expect(css, asset).toContain('.header');
      expect(css, asset).toContain('--color-primary');
    } else {
      expect(response.headers()['content-type'], asset).toMatch(/javascript/);
    }
  }
});

test('404 and inquiry endpoint do not imply success', async ({ request }) => {
  expect((await request.get('/missing-unpublished-page')).status()).toBe(404);
  const response = await request.post('/api/inquiry', { data: { email: 'qa@example.com' } });
  expect(response.status()).toBe(503);
  expect(await response.json()).toMatchObject({ ok: false });
});
