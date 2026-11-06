const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');

const root = path.resolve(__dirname, '..');
const pages = require('../src/reference/pages.json');
const dictionaries = require('../src/reference/locales.json');
const artwork = require('../src/reference/art.json');
const runtime = fs.readFileSync(path.join(root, 'src/reference/runtime.js'), 'utf8')
  .replace('export function initializeReference', 'window.initializeReference = function');

function mount(route, { locale = 'en-US', basket = [], mobile = false, reduced = false, query = '', clock } = {}) {
  const dom = new JSDOM(pages[route].html, {
    url: `http://localhost:8001${route}${query}`, runScripts: 'outside-only', pretendToBeVisual: true,
  });
  const w = dom.window;
  const d = w.document;
  w.matchMedia = query => ({ matches: query.includes('prefers-reduced-motion') ? reduced : mobile });
  if (clock) {
    w.setTimeout = clock.setTimeout.bind(clock);
    w.clearTimeout = clock.clearTimeout.bind(clock);
  }
  w.scrollBy = () => {};
  w.HTMLElement.prototype.scrollIntoView = () => {};
  w.localStorage.setItem('hn_inquiry', JSON.stringify(basket));
  d.documentElement.dataset.titleKey = pages[route].titleKey || '';
  w.eval(runtime);
  const cleanup = w.initializeReference(locale, dictionaries[locale] || {}, artwork);
  return { w, d, cleanup, close() { cleanup(); w.close(); } };
}
const cards = view => [...view.d.querySelectorAll('#product-grid .card:not([hidden])')];
const stored = view => JSON.parse(view.w.localStorage.getItem('hn_inquiry'));
const selected = [{ sku: 'hn-zb100', model: 'HN-ZB100', slug: 'zigbee-smart-thermostat', qty: 100 }];
const change = (view, element) => element.dispatchEvent(new view.w.Event('change', { bubbles: true }));
const input = (view, element, value) => {
  element.value = value;
  element.dispatchEvent(new view.w.Event('input', { bubbles: true }));
};
const tick = () => new Promise(resolve => setTimeout(resolve, 0));

function fillForm(view, kind) {
  const prefix = kind === 'contact' ? 'c' : 'q';
  view.d.querySelector(`#${prefix}-name`).value = 'Test buyer';
  view.d.querySelector(`#${prefix}-email`).value = 'test@example.com';
  view.d.querySelector(`#${prefix}-msg`).value = 'Please quote the selected heating controls.';
  if (kind === 'inquiry') view.d.querySelector('#q-market').value = 'Europe';
}

test('all 22 routes have headings, valid assets, local links and unique element IDs', () => {
  assert.equal(Object.keys(pages).length, 22);
  for (const route of Object.keys(pages)) {
    const view = mount(route);
    try {
      assert.equal(view.d.querySelectorAll('h1').length, 1, route);
      assert.ok(view.d.querySelector('.site-header'), route);
      assert.ok(view.d.querySelector('.site-footer'), route);
      const ids = [...view.d.querySelectorAll('[id]')].map(element => element.id);
      assert.equal(new Set(ids).size, ids.length, `${route}: duplicate IDs`);
      for (const element of view.d.querySelectorAll('[src],a[href]')) {
        const url = element.getAttribute('src') || element.getAttribute('href');
        if (url.startsWith('/reference/')) assert.ok(fs.existsSync(path.join(root, 'public', url)), url);
        else if (url.startsWith('/')) assert.ok(pages[url.split(/[?#]/)[0]], `${route} → ${url}`);
        else if (url.startsWith('#')) assert.ok(view.d.getElementById(url.slice(1)), `${route}: ${url}`);
      }
    } finally { view.close(); }
  }
});

test('catalog search, combined filters, reset, sorting, pagination and empty recovery', () => {
  const view = mount('/products');
  try {
    assert.equal(cards(view).length, 9);
    view.d.querySelector('[data-page="2"]').click();
    assert.equal(cards(view).length, 7);
    assert.equal(view.d.querySelector('#pager [aria-current="page"]').dataset.page, '2');
    const sort = view.d.querySelector('#sort');
    sort.value = 'model'; change(view, sort);
    const models = cards(view).map(card => card.dataset.model);
    assert.deepEqual(models, [...models].sort((a, b) => a.localeCompare(b)));
    const search = view.d.querySelector('#catalog-search');
    input(view, search, 'HN-ZB100'); assert.equal(cards(view).length, 1);
    input(view, search, 'not-a-heating-product');
    assert.equal(cards(view).length, 0);
    assert.equal(view.d.querySelector('#product-empty').hidden, false);
    view.d.querySelector('[data-clear]').click(); assert.equal(cards(view).length, 9);
    const category = view.d.querySelector('[data-group="cat"]');
    category.checked = true; change(view, category);
    assert.ok(cards(view).every(card => card.dataset.cat === category.value));
    const voltage = [...view.d.querySelectorAll('[data-group="voltage"]')]
      .find(element => element.value === cards(view)[0].dataset.voltage);
    voltage.checked = true; change(view, voltage);
    assert.ok(cards(view).every(card => card.dataset.cat === category.value && card.dataset.voltage === voltage.value));
  } finally { view.close(); }
});

test('category deep links initialize catalog filters', () => {
  const category = 'product.category.smartControls';
  const view = mount('/products', { query: `?cat=${category}` });
  try {
    assert.ok(cards(view).length > 0);
    assert.ok(cards(view).every(card => card.dataset.cat === category));
  } finally { view.close(); }
});

test('mobile navigation, Escape dismissal and collapsed filters', () => {
  const view = mount('/products', { mobile: true });
  try {
    assert.ok(view.d.querySelector('#catalog').classList.contains('filters-closed'));
    view.d.querySelector('#filter-toggle').click();
    assert.equal(view.d.querySelector('#filter-toggle').getAttribute('aria-expanded'), 'true');
    const toggle = view.d.querySelector('#menu-btn');
    toggle.click(); assert.equal(toggle.getAttribute('aria-expanded'), 'true');
    view.d.dispatchEvent(new view.w.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    assert.equal(toggle.getAttribute('aria-expanded'), 'false');
  } finally { view.close(); }
});

test('all 30 locales initialize, including RTL and translated labels', () => {
  for (const locale of ['en-US', ...Object.keys(dictionaries)]) {
    const view = mount('/', { locale });
    try {
      assert.equal(view.d.documentElement.lang, locale.split('-')[0]);
      assert.equal(view.d.documentElement.dir, ['ar-SA', 'he-IL'].includes(locale) ? 'rtl' : 'ltr');
      assert.equal(view.d.querySelector('[data-lang]').value, locale);
      if (locale === 'zh-CN') assert.equal(view.d.querySelector('[data-i18n="nav.products"]').textContent, '产品');
    } finally { view.close(); }
  }
});

test('inquiry selection toggles once, syncs counts and cleans up listeners', () => {
  const view = mount('/products');
  try {
    const add = view.d.querySelector('[data-add="hn-zb100"]');
    add.click(); assert.equal(stored(view).length, 1);
    assert.equal(add.getAttribute('aria-pressed'), 'true');
    assert.equal(view.d.querySelector('[data-count]').textContent, '1');
    add.click(); assert.equal(stored(view).length, 0);
    view.cleanup();
    const cleanup = view.w.initializeReference('en-US', {}, artwork);
    add.click(); assert.equal(stored(view).length, 1, 'remount must not duplicate event handlers');
    cleanup();
  } finally { view.close(); }
});

test('inquiry quantities, invalid values, removal, empty state and cross-tab updates', () => {
  const view = mount('/inquiry', { basket: selected });
  try {
    view.d.querySelector('[data-step="10"]').click(); assert.equal(stored(view)[0].qty, 110);
    const quantity = view.d.querySelector('[data-qty]');
    quantity.value = '-5'; change(view, quantity); assert.equal(stored(view)[0].qty, 1);
    view.d.querySelector('[data-remove]').click(); assert.equal(stored(view).length, 0);
    assert.equal(view.d.querySelector('#inq-empty').hidden, false);
    view.w.localStorage.setItem('hn_inquiry', JSON.stringify(selected));
    view.w.dispatchEvent(new view.w.StorageEvent('storage', { key: 'hn_inquiry' }));
    assert.equal(view.d.querySelectorAll('#inq-lines .line').length, 1);
    assert.equal(view.d.querySelector('#inq-empty').hidden, true);
  } finally { view.close(); }
});

test('invalid stored inquiry values recover without crashing', () => {
  for (const basket of [null, {}, [null, {}, { sku: 'unknown' }], [...selected, ...selected]]) {
    const view = mount('/inquiry', { basket });
    try { assert.ok(view.d.querySelectorAll('#inq-lines .line').length <= 1); }
    finally { view.close(); }
  }
});

for (const kind of ['contact', 'inquiry']) {
  test(`${kind} validation, failed submission recovery, successful payload and restart`, async () => {
    const view = mount(`/${kind}`, { basket: selected });
    try {
      const submit = view.d.querySelector('[data-submit]');
      submit.click(); assert.ok(view.d.querySelector('[aria-invalid="true"]'));
      fillForm(view, kind);
      view.w.fetch = async () => ({ ok: false, status: 503 });
      submit.click(); await tick();
      assert.equal(view.d.querySelector('[data-fail]').hidden, false);
      assert.equal(submit.disabled, false);
      let request;
      view.w.fetch = async (url, options) => { request = { url, body: JSON.parse(options.body) }; return { ok: true }; };
      submit.click(); assert.equal(submit.disabled, true); await tick();
      assert.equal(request.url, 'https://formspree.io/f/mlgoeokj');
      assert.equal(request.body.email, 'test@example.com');
      if (kind === 'inquiry') {
        assert.equal(request.body.items.length, 1);
        assert.match(request.body.message, /HN-ZB100 x 100 pcs/);
      }
      assert.equal(view.d.querySelector(`#${kind}-success`).hidden, false);
      view.d.querySelector(`[data-again="${kind}"]`).click();
      assert.equal(view.d.querySelector(`#${kind}-success`).hidden, true);
      if (kind === 'inquiry') assert.equal(stored(view).length, 0);
    } finally { view.close(); }
  });
}

function fakeClock() {
  let next = 0;
  const tasks = new Map();
  return {
    tasks,
    setTimeout(callback, delay) { const id = ++next; tasks.set(id, { callback, delay }); return id; },
    clearTimeout(id) { tasks.delete(id); },
    run(delay) {
      const task = [...tasks].find(([, task]) => task.delay === delay);
      assert.ok(task, `expected a timer at ${delay}ms`);
      tasks.delete(task[0]); task[1].callback();
    },
    has(delay) { return [...tasks.values()].some(task => task.delay === delay); },
  };
}

test('homepage banner wraps continuously, supports dots/keyboard, hides inactive links and cleans up', () => {
  const view = mount('/');
  try {
    const banner = view.d.querySelector('[data-banner]');
    const index = () => Number(banner.dataset.bannerIndex);
    assert.equal(index(), 0);
    assert.equal(view.d.querySelectorAll('[data-banner-clone]').length, 2);
    view.d.querySelector('[data-banner-prev]').click(); assert.equal(index(), 2);
    view.d.querySelector('[data-banner-next]').click(); assert.equal(index(), 0);
    view.d.querySelector('[data-banner-go="1"]').click(); assert.equal(index(), 1);
    const active = view.d.querySelector('[data-banner-slide]:not([inert])');
    assert.equal(active.dataset.bannerTitle, 'product.category.smartControls');
    assert.equal(view.d.querySelectorAll('[data-banner-slide][inert]').length, 2);
    banner.dispatchEvent(new view.w.KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    assert.equal(index(), 2);
    view.cleanup();
    assert.equal(view.d.querySelectorAll('[data-banner-clone]').length, 0);
  } finally { view.close(); }
});

test('banner auto-advances every 5.5 seconds and pauses for hover, focus, explicit stop and hidden page', () => {
  const clock = fakeClock();
  const view = mount('/', { clock });
  try {
    const banner = view.d.querySelector('[data-banner]');
    const toggle = view.d.querySelector('[data-banner-toggle]');
    assert.ok(clock.has(5500));
    clock.run(5500); assert.equal(banner.dataset.bannerIndex, '1');
    banner.dispatchEvent(new view.w.MouseEvent('mouseenter'));
    assert.equal(clock.has(5500), false);
    banner.dispatchEvent(new view.w.MouseEvent('mouseleave'));
    assert.ok(clock.has(5500));
    toggle.click(); assert.equal(toggle.getAttribute('aria-pressed'), 'true');
    assert.equal(clock.has(5500), false);
    toggle.click(); assert.ok(clock.has(5500));
    toggle.dispatchEvent(new view.w.FocusEvent('focusin', { bubbles: true }));
    assert.equal(clock.has(5500), false);
    toggle.dispatchEvent(new view.w.FocusEvent('focusout', { bubbles: true, relatedTarget: view.d.body }));
    assert.ok(clock.has(5500));
    Object.defineProperty(view.d, 'hidden', { configurable: true, value: true });
    view.d.dispatchEvent(new view.w.Event('visibilitychange'));
    assert.equal(clock.has(5500), false);
    view.cleanup(); assert.equal(clock.tasks.size, 0);
  } finally { view.close(); }
});

test('reduced motion disables autoplay while keeping manual banner controls usable', () => {
  const clock = fakeClock();
  const view = mount('/', { reduced: true, clock });
  try {
    assert.equal(clock.has(5500), false);
    assert.equal(view.d.querySelector('[data-banner-toggle]').hidden, true);
    view.d.querySelector('[data-banner-next]').click();
    assert.equal(view.d.querySelector('[data-banner]').dataset.bannerIndex, '1');
    assert.equal(clock.has(620), false);
  } finally { view.close(); }
});

test('mobile swipes advance slides; vertical scrolling does not', () => {
  const view = mount('/', { mobile: true });
  const viewport = view.d.querySelector('.banner-viewport');
  const pointer = (type, x, y) => {
    const event = new view.w.Event(type, { bubbles: true });
    Object.assign(event, { clientX: x, clientY: y, pointerType: 'touch', isPrimary: true });
    viewport.dispatchEvent(event);
  };
  try {
    pointer('pointerdown', 200, 100); pointer('pointerup', 70, 110);
    assert.equal(view.d.querySelector('[data-banner]').dataset.bannerIndex, '1');
    pointer('pointerdown', 200, 100); pointer('pointerup', 190, 250);
    assert.equal(view.d.querySelector('[data-banner]').dataset.bannerIndex, '1');
  } finally { view.close(); }
});
