import { test, expect } from '@playwright/test';
import { pages } from '../src/data/pages';
import { products } from '../src/data/catalog';

test('navigation, mega menu, mobile drawer and search work cleanly', async ({ page, isMobile, viewport }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');

  if (isMobile || (viewport?.width || 0) <= 991) {
    await page.getByRole('button', { name: 'Open menu', exact: true }).click();
  }
  await page.getByRole('button', { name: 'Expand Products', exact: true }).click();
  await expect(
    page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Gas Boiler Thermostats', exact: true }),
  ).toBeVisible();

  await page.goto('/');
  await page.getByRole('button', { name: 'Open search', exact: true }).click();
  await page.getByLabel('Search Heatnexis').fill('boiler');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await expect(page).toHaveURL(/search\?q=boiler/);
  await expect(page.locator('.search-results li').first()).toBeVisible();
  expect(errors).toEqual([]);
});

test('homepage category tabs, catalog filters and product detail gallery/tabs work', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Electric Floor', exact: true }).click();
  await expect(page.locator('.iproducts-showcase-card').first()).toContainText('Electric');

  await page.goto('/products');
  await page.getByRole('button', { name: 'Gas Boiler Thermostats', exact: true }).click();
  await expect(page.locator('.product-card')).toHaveCount(4);
  await page.getByLabel('Search products', { exact: true }).fill('no-such-product');
  await expect(page.getByText('No products match your search.', { exact: false })).toBeVisible();

  await page.goto(`/products/${products[0].category}/${products[0].slug}`);
  await page.getByRole('tab', { name: 'Specifications', exact: true }).click();
  await expect(page.getByRole('table')).toBeVisible();
  await page.getByRole('button', { name: 'Back', exact: true }).click();
  await expect(page.locator('.gallery-main')).toContainText('REAR VIEW');
  await page.getByRole('button', { name: 'Enlarge product image' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
});

test('FAQ accordion, downloads filter and truthful inquiry validation', async ({ page }) => {
  await page.goto('/support/faqs');
  const faq = page.locator('details').first();
  await faq.locator('summary').click();
  await expect(faq).toHaveAttribute('open', '');

  await page.goto('/support/downloads');
  await page.locator('#dl-type').selectOption('Datasheet');
  await expect(page.locator('.download-row')).toHaveCount(2);

  await page.goto('/contact');
  await page.getByRole('button', { name: 'Prepare Inquiry' }).click();
  expect(await page.locator('input[name=company]').evaluate((e: HTMLInputElement) => e.validity.valueMissing)).toBe(true);

  await page.getByLabel('Company *', { exact: true }).fill('Test HVAC GmbH');
  await page.getByLabel('Name *', { exact: true }).fill('QA Contact');
  await page.getByLabel('Business email *').fill('qa@example.com');
  await page.getByLabel('Country / Market *').fill('Germany');
  await page.getByLabel('Project requirements *').fill('Testing a gas boiler OEM thermostat project inquiry.');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Prepare Inquiry' }).click();
  await expect(page.getByRole('status')).toContainText('It has not been sent');
  await expect(page.getByRole('link', { name: 'Send Draft via WhatsApp' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Open in Email Client' })).toBeVisible();
});

test('B2B multi-model RFQ shortlist, side-by-side comparison matrix and parametric filters work', async ({ page }) => {
  await page.goto('/products');
  await page.getByRole('button', { name: 'Rotary Dial', exact: true }).click();
  await expect(page.locator('.product-card').first()).toContainText('HN-GB-CONCEPT-02');
  await page.getByRole('button', { name: 'All Interfaces', exact: true }).click();

  const cards = page.locator('.product-card');
  await cards.nth(0).getByRole('button', { name: /Compare / }).click();
  await cards.nth(1).getByRole('button', { name: /Compare / }).click();
  await cards.nth(0).getByRole('button', { name: /RFQ shortlist/ }).click();

  const bar = page.getByRole('complementary', { name: 'B2B RFQ shortlist and model comparison' });
  await expect(bar).toBeVisible();
  await bar.getByRole('button', { name: /Compare \(2\)/ }).click();

  const dialog = page.getByRole('dialog', { name: 'Side-by-side thermostat model comparison' });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Highlight Differences' }).click();
  await dialog.getByRole('button', { name: /Inquire All/ }).click();

  await expect(page).toHaveURL(/\/contact#inquiry/);
  await expect(page.locator('.inquiry-shortlist-chip')).toHaveCount(2);
});

test('background videos render across home hero, factory band and inner banners with pause toggle', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.home-banner .bg-video-el')).toHaveAttribute('src', /\/videos\/bg\/.*\.mp4/);
  await expect(page.locator('.iaboutus-bg .bg-video-el')).toHaveAttribute('src', '/videos/bg/factory-smt.mp4');

  const pauseBtn = page.getByRole('button', { name: 'Pause background video', exact: true });
  await pauseBtn.click();
  await expect(page.getByRole('button', { name: 'Play background video', exact: true })).toHaveAttribute('aria-pressed', 'true');
  expect(
    await page.locator('.home-banner .bg-video-el').evaluate((v: HTMLVideoElement) => v.paused),
  ).toBe(true);

  await page.goto('/tailor-made-solution');
  await expect(page.locator('.detail-banner .bg-video-el')).toHaveAttribute('src', '/videos/bg/engineering-pcb.mp4');
});

test('keyboard menu closes while its trigger remains focused', async ({ page, viewport }) => {
  await page.goto('/');
  if ((viewport?.width || 0) <= 991) {
    await page.getByRole('button', { name: 'Open menu', exact: true }).click();
  }
  const trigger = page.getByRole('button', { name: 'Expand Products', exact: true });
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  const submenu = page.locator(`#${await trigger.getAttribute('aria-controls')}`);
  await expect(submenu).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(submenu).toBeHidden();

  await page.getByRole('button', { name: 'Open search', exact: true }).click();
  await expect(page.getByLabel('Search Heatnexis')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open search', exact: true })).toBeFocused();
});

test('product preview traps focus and restores trigger on close', async ({ page }) => {
  const product = products[0];
  await page.goto(`/products/${product.category}/${product.slug}`);
  const trigger = page.getByRole('button', { name: 'Enlarge product image' });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  expect(await dialog.evaluate((el) => el.matches(':modal'))).toBe(true);
  for (let i = 0; i < 3; i++) {
    await page.keyboard.press('Tab');
    expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('all routes have zero horizontal overflow, zero broken images and zero runtime errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  for (const p of pages) {
    await page.goto(p.path);
    await expect(page.locator('h1'), p.path).toHaveCount(1);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
      `Horizontal overflow on ${p.path}`,
    ).toBeTruthy();
    expect(
      await page.locator('img').evaluateAll((imgs) =>
        imgs
          .filter((i): i is HTMLImageElement => {
            if (!(i instanceof HTMLImageElement)) return false;
            const rect = i.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0 && rect.top < window.innerHeight * 1.2;
          })
          .every((i) => i.complete && i.naturalWidth > 0),
      ),
      `Broken visible image on ${p.path}`,
    ).toBeTruthy();
  }
  expect(errors).toEqual([]);
});
