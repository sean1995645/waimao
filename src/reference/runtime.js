// Adapted from the supplied HeatNexis reference. DOM listeners are scoped to each mounted page.
export function initializeReference(locale, dictionary, artwork) {
  const controller = new AbortController();
  const listen = (target, type, handler) => target?.addEventListener?.(type, handler, { signal: controller.signal });

  const FORM_ENDPOINT = 'https://formspree.io/f/mlgoeokj';
  const SALES_EMAIL = 'sales@heatnexis.com';
  const EN = {"nav.home":"Home","nav.products":"Products","nav.about":"About","nav.contact":"Contact","nav.language":"English","nav.toggle":"Toggle navigation menu","nav.selectLanguage":"Select language","common.backToTop":"Back to top","home.hero.eyebrow":"Underfloor Heating Controls","home.hero.title":"HeatNexis Thermostats","home.hero.subtitle":"Built for OEM Growth","home.hero.description":"We design floor heating thermostats, wiring centers, gateways and accessories for distributors, private-label brands and HVAC projects.","home.hero.viewProducts":"View Products","home.hero.getInTouch":"Get in Touch","stats.yearsExperience":"Years Experience","stats.controlSKUs":"Control SKUs","stats.oemMarkets":"OEM Markets","stats.qualityCompliance":"Quality Compliance","home.featured.eyebrow":"Featured Products","home.featured.title":"Our Best-Selling Solutions","home.featured.description":"Discover our most popular thermostat models trusted by distributors worldwide","home.featured.viewAll":"View All Products →","home.why.eyebrow":"Why HeatNexis","home.why.title":"Focused on Heating Control Projects","home.why.description":"We build programmable thermostats, smart thermostats, manifold control centers and accessories around real underfloor heating use cases for OEM and project supply.","home.why.learnMore":"Learn More →","home.why.stableControl.title":"Stable Control","home.why.stableControl.description":"Core models deliver +/-0.5°C control accuracy and full aging tests.","home.why.oemFlexibility.title":"OEM Flexibility","home.why.oemFlexibility.description":"Customize panel finish, UI language, packaging, logo and firmware packages.","home.why.hvacExpertise.title":"HVAC Expertise","home.why.hvacExpertise.description":"Practical experience across hydronic heating, electric heating, actuators and contractor workflows.","home.why.efficientDelivery.title":"Efficient Delivery","home.why.efficientDelivery.description":"Clear lead times for distributor stock planning and phased project supply.","home.cta.title":"Ready to Build Your Thermostat Line?","home.cta.description":"Send your target market, control type and certification needs. HeatNexis will match the right model and quote path.","home.cta.button":"Request a Quote →","home.shipping.eyebrow":"Global Delivery","home.shipping.title":"Shipping From Shanghai","home.shipping.description":"HeatNexis supports export supply for underfloor heating thermostats, controllers and accessories from Shanghai to distributors, OEM brands and HVAC project buyers.","home.shipping.locationLabel":"Location","home.shipping.locationValue":"Shanghai, China","home.shipping.emailLabel":"Email","home.shipping.phoneLabel":"Phone","home.shipping.map.shanghai":"Shanghai","region.europe":"Europe","region.middleEast":"Middle East","region.southeastAsia":"Southeast Asia","region.northAmerica":"North America","region.oceania":"Oceania","about.hero.eyebrow":"About","about.hero.title":"About HeatNexis","about.hero.description":"Your trusted partner in floor heating control solutions","about.hero.panelTitle":"Our Mission","about.hero.panelText":"We build programmable thermostats, smart thermostats, manifold control centers and accessories around real underfloor heating use cases.","about.story.eyebrow":"Our Story","about.story.title":"Focused on Heating Control Projects","about.story.paragraph1":"We build programmable thermostats, smart thermostats, manifold control centers and accessories around real underfloor heating use cases for OEM and project supply. With over 10 years of experience in the HVAC industry, we understand the unique challenges faced by distributors, private-label brands, and project contractors.","about.story.paragraph2":"Our commitment to quality, flexibility, and efficient delivery has made us a trusted partner for heating control solutions across 40+ markets worldwide.","about.stats.certified":"Certified","contact.hero.eyebrow":"Contact","contact.hero.title":"Contact Us","contact.hero.description":"Get in touch with our team for inquiries and support","contact.hero.panelTitle":"Quick Response","contact.hero.panelText":"Send your target market, control type and certification needs. HeatNexis will match the right model and quote path.","contact.hero.responseTime":"Response Time","contact.hero.languages":"Languages","contact.hero.support":"Support","contact.hero.supportValue":"Global","contact.form.title":"Get in Touch","contact.form.description":"Send your target market, control type and certification needs. HeatNexis will match the right model and quote path.","contact.form.email":"Email","contact.form.phone":"Phone","contact.form.name":"Name","contact.form.company":"Company","contact.form.message":"Message","contact.form.submit":"Send Message","contact.form.submitting":"Sending...","contact.form.nameError":"Name is required","contact.form.emailError":"Please enter a valid email address","contact.form.messageError":"Message is required","contact.form.emailDescription":"This will help us respond to your inquiry by email.","contact.form.messageDescription":"Tell us what you would like to discuss.","contact.form.successTitle":"Thanks for reaching out","contact.form.successDescription":"Your message has been sent. We will get back to you shortly.","contact.form.sendAnother":"Send another message","contact.form.selectedProductsTitle":"Selected products","contact.form.selectedProductsDescription":"These product details and image links will be included with your inquiry.","products.hero.eyebrow":"Products","products.hero.title":"Product Catalog","products.hero.description":"Browse programmable thermostats, WiFi and Zigbee models, actuators, sensors and control modules in one catalog.","products.hero.panelTitle":"Catalog Snapshot","products.hero.panelText":"Filter by category or send an inquiry and we can map the right model for your application.","products.hero.browsableModels":"Browsable models","products.hero.categories":"Categories","products.hero.privateLabelReady":"Private-label ready","products.categories":"Categories","products.allProducts":"All Products","products.showing":"Showing","products.productsCount":"products","footer.description":"We design floor heating thermostats, wiring centers, gateways and accessories for distributors, private-label brands and HVAC projects.","footer.contactInfo":"Contact Info","footer.followUs":"Follow Us","footer.facebook":"Facebook","footer.linkedin":"LinkedIn","footer.cookieSettings":"Cookie Settings","footer.rights":"All rights reserved.","inquiry.add":"Add to Inquiry","inquiry.added":"Added","inquiry.remove":"Remove from inquiry","inquiry.removeItem":"Remove item","inquiry.viewAll":"View All","inquiry.clear":"Clear","inquiry.whatsapp":"WhatsApp","inquiry.inquiryNow":"Inquiry Now","inquiry.close":"Close","inquiry.whatsappIntro":"Hi, I am interested in these products:","inquiry.whatsappOutro":"Please send me more information.","product.detail.notFoundTag":"Catalog","product.detail.notFoundTitle":"Product not found","product.detail.notFoundDescription":"The product you requested is not available in the current catalog. Return to the product list to continue browsing available heating control models.","product.detail.backToCatalog":"Back to catalog","product.detail.contactTeam":"Contact team","product.detail.category":"Category","product.detail.voltage":"Voltage","product.detail.control":"Control","product.detail.display":"Display","product.detail.useCaseTitle":"Use-case ready","product.detail.useCaseText":"Configured for OEM, distributor and project-driven heating control requirements.","product.detail.integrationTitle":"Fast integration","product.detail.integrationText":"Share target market, control logic and compliance scope to match the correct variant faster.","product.detail.brandingTitle":"Flexible branding","product.detail.brandingText":"Core models can be adapted for panel finish, packaging, language set and project documentation.","product.detail.defaultDescription":"Heating control model built for stable performance, clear specification matching and efficient project quoting.","product.detail.featured":"Featured","product.detail.inInquiry":"In inquiry list","product.detail.removeInquiry":"Remove from inquiry","product.detail.addInquiry":"Add to inquiry","product.detail.requestQuote":"Request quote for this model","product.detail.sku":"SKU","product.detail.modelType":"Model type","product.detail.specTag":"Specification snapshot","product.detail.specTitle":"Technical details","product.detail.needVariant":"Need another variant? Contact us","product.detail.valueTag":"Project value","product.detail.valueTitle":"Why this model fits heating control projects","product.detail.quoteTag":"Quick action","product.detail.quoteTitle":"Build your inquiry pack","product.detail.quoteText":"Add this product to your inquiry list and continue building a shortlist before sending the request.","product.detail.addedState":"Added to inquiry","product.detail.sidebarAdd":"Add this model","product.detail.sidebarContact":"Send inquiry now","product.detail.supportTag":"Support scope","product.detail.supportMarket":"Target market","product.detail.supportMarketText":"Share region, voltage standard and control preference to match the correct variant.","product.detail.supportOEM":"OEM options","product.detail.supportOEMText":"Panel branding, packaging, multilingual UI and project documentation can be aligned with your order plan.","product.detail.relatedTag":"Same category","product.detail.relatedTitle":"Related models","product.detail.viewAll":"View all products","product.spec.na":"N/A","product.spec.control.zigbee3":"Zigbee 3.0","product.spec.control.wifi24":"WiFi 2.4GHz","product.spec.control.programmable":"Programmable","product.spec.control.sevenDayProgram":"7-Day Program","product.spec.control.heatPumpMode":"Heat Pump Mode","product.spec.control.manualKnob":"Manual Knob","product.spec.control.ntcSensor":"NTC Sensor","product.spec.control.eightZones":"8 Zones","product.spec.control.twelveZones":"12 Zones","product.spec.display.lcdTouchscreen":"LCD Touchscreen","product.spec.display.tftTouchscreen":"TFT Touchscreen","product.spec.display.colorTouchscreen":"Color Touchscreen","product.spec.display.lcdDisplay":"LCD Display","product.spec.display.analogScale":"Analog Scale","product.spec.display.ledIndicators":"LED Indicators","product.spec.display.ledIndicator":"LED Indicator","product.spec.display.webInterface":"Web Interface","product.spec.display.glassTouchPanel":"Glass Touch Panel","product.category.smartControls":"Smart Controls","product.category.programmable":"Programmable","product.category.mechanical":"Mechanical","product.category.actuators":"Actuators","product.category.sensors":"Sensors","product.category.controlCenters":"Control Centers","product.category.gateways":"Gateways","product.category.specialized":"Specialized","product.category.receivers":"Receivers","product.category.wireless":"Wireless","product.hn-zb100.title":"HN-ZB100 Zigbee Smart Thermostat","product.hn-zb100.description":"Smart Zigbee-enabled thermostat with touchscreen display.","product.hn-wf200.title":"HN-WF200 WiFi Touch Thermostat","product.hn-wf200.description":"WiFi-connected smart thermostat with mobile app control.","product.hn-ts500.title":"HN-TS500 Touchscreen Room Thermostat","product.hn-ts500.description":"Premium touchscreen thermostat with weekly programming.","product.hn-lcd300.title":"HN-LCD300 LCD Room Thermostat","product.hn-lcd300.description":"Digital LCD thermostat with 7-day programming.","product.hn-hp600.title":"HN-HP600 Heat Pump Thermostat","product.hn-hp600.description":"Specialized thermostat for heat pump systems.","product.hn-knb400.title":"HN-KNB400 Knob Room Thermostat","product.hn-knb400.description":"Simple mechanical thermostat with rotary control.","product.hn-act230.title":"HN-ACT230 Thermal Actuator","product.hn-act230.description":"Normally closed thermal actuator for manifold control.","product.hn-act24.title":"HN-ACT24 Thermal Actuator 24V","product.hn-act24.description":"24V thermal actuator for low voltage systems.","product.hn-fs100.title":"HN-FS100 Floor Sensor Kit","product.hn-fs100.description":"Floor temperature sensor with 3m cable.","product.hn-mcc800.title":"HN-MCC800 Manifold Control Center","product.hn-mcc800.description":"8-zone manifold control center with mixing valve.","product.hn-wc1200.title":"HN-WC1200 Twelve Zone Wiring Center","product.hn-wc1200.description":"12-zone wiring center for multi-room control.","product.hn-gw300.title":"HN-GW300 Heating Control Gateway","product.hn-gw300.description":"Smart gateway for centralized heating control.","product.hn-mb400.title":"HN-MB400 Modbus Fan Coil Thermostat","product.hn-mb400.description":"Modbus-enabled thermostat for fan coil units.","product.hn-oem500.title":"HN-OEM500 OEM Glass Panel Thermostat","product.hn-oem500.description":"Customizable glass panel thermostat for OEM branding.","product.hn-br200.title":"HN-BR200 Boiler Receiver Module","product.hn-br200.description":"Wireless receiver module for boiler control.","product.hn-wt300.title":"HN-WT300 Wireless Thermostat Kit","product.hn-wt300.description":"Complete wireless thermostat kit with receiver.","x.filter":"Filter","x.filters":"Filters","x.reset":"Reset filter","x.sort":"Sort by","x.sortDefault":"Default","x.sortModel":"Model A–Z","x.search":"Search","x.searchPh":"Model or keyword","x.noneTitle":"No models match these filters","x.noneText":"Remove a filter, or tell us what you need and we will check whether a variant fits.","x.clear":"Clear filters","x.inquiryTitle":"Your inquiry list","x.inquiryLead":"Review models and quantities, then tell us where the order is going.","x.emptyTitle":"Your inquiry list is empty","x.emptyText":"Add models from the catalog to request one combined quote.","x.more":"Add more models","x.details":"View details","x.marketError":"Enter your target market so we can match the right variant.","x.mailTitle":"Your email is ready to send","x.mailText":"We opened your email app with the details filled in. Press send to deliver it to our team.","x.mailFallback":"Email app did not open? Copy the text below and send it to","x.startNew":"Start a new inquiry","x.backHome":"Back to home","banner.previous":"Previous banner","banner.next":"Next banner","banner.pause":"Pause slideshow","banner.play":"Play slideshow","banner.choose":"Choose banner"};
  const NAMES = {"en-US": "English", "zh-CN": "中文", "es-ES": "Español", "fr-FR": "Français", "ar-SA": "العربية", "de-DE": "Deutsch", "ja-JP": "日本語", "ko-KR": "한국어", "tr-TR": "Türkçe", "it-IT": "Italiano", "ru-RU": "Русский", "pt-PT": "Português", "vi-VN": "Tiếng Việt", "cs-CZ": "Čeština", "pl-PL": "Polski", "nl-NL": "Nederlands", "th-TH": "ไทย", "sv-SE": "Svenska", "no-NO": "Norsk", "fi-FI": "Suomi", "hu-HU": "Magyar", "da-DK": "Dansk", "el-GR": "Ελληνικά", "ro-RO": "Română", "he-IL": "עברית", "uk-UA": "Українська", "id-ID": "Bahasa Indonesia", "hi-IN": "हिन्दी", "sk-SK": "Slovenčina", "hr-HR": "Hrvatski"};
  const LOCALE = locale;
  const DICT = dictionary;
  const RTL = ['ar-SA', 'he-IL'];

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clean = (v) => String(v).replace(/\s*[→←]\s*$/, '');
  const t = (k) => clean(DICT[k] || EN[k] || k);
  const icon = (n) => `<svg class="od-icon" aria-hidden="true"><use href="#i-${n}"/></svg>`;
  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- Language ---------- */
  function applyLanguage() {
    const html = document.documentElement;
    html.lang = LOCALE.split('-')[0];
    html.dir = RTL.includes(LOCALE) ? 'rtl' : 'ltr';
    $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-ph]').forEach((el) => { el.setAttribute('placeholder', t(el.dataset.i18nPh)); });
    $$('[data-i18n-label]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.i18nLabel)); });
  }
  function initLanguage() {
    $$('[data-lang]').forEach((sel) => {
      sel.innerHTML = Object.keys(NAMES).map((c) => `<option value="${c}">${esc(NAMES[c])}</option>`).join('');
      sel.value = LOCALE;
      listen(sel, 'change', () => {
        try { localStorage.setItem('umi_locale', sel.value); } catch (e) { /* preview without storage */ }
        location.reload();
      });
    });
  }

  /* ---------- Inquiry list ---------- */
  const KEY = 'hn_inquiry';
  let memory = [];
  const store = {
    read() {
      try {
        const stored = JSON.parse(localStorage.getItem(KEY) || '[]');
        if (!Array.isArray(stored)) return [];
        const seen = new Set();
        return stored.filter(item => {
          if (!item || !Object.hasOwn(artwork, item.sku) || seen.has(item.sku) ||
              typeof item.slug !== 'string' || !/^[a-z0-9-]+$/.test(item.slug)) return false;
          seen.add(item.sku);
          return true;
        }).map(item => ({
          sku: item.sku, model: item.sku.toUpperCase(), slug: item.slug,
          qty: Number.isSafeInteger(item.qty) && item.qty > 0 ? item.qty : 100,
        }));
      } catch { return memory; }
    },
    write(v) { memory = v; try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* in-memory only */ } }
  };
  let basket = store.read();
  const inList = (sku) => basket.some((l) => l.sku === sku);

  function syncButtons() {
    const n = basket.length;
    $$('[data-count]').forEach((c) => { c.textContent = String(n); c.hidden = n === 0; });
    $$('[data-add]').forEach((btn) => {
      const added = inList(btn.dataset.add);
      const title = btn.dataset.titleKey ? t(btn.dataset.titleKey) : btn.dataset.add;
      if (btn.classList.contains('round')) {
        btn.innerHTML = icon(added ? 'check' : 'plus');
        btn.classList.toggle('is-added', added);
        btn.setAttribute('aria-label', added ? `${title}: ${t('inquiry.added')}` : `${t('inquiry.add')}: ${title}`);
      } else {
        btn.innerHTML = `${icon(added ? 'check' : 'plus')} ${esc(t(added ? 'product.detail.addedState' : 'product.detail.addInquiry'))}`;
      }
      btn.setAttribute('aria-pressed', String(added));
    });
  }
  function toggleItem(btn) {
    const sku = btn.dataset.add;
    if (inList(sku)) {
      basket = basket.filter((l) => l.sku !== sku);
      toast(`${btn.dataset.model}: ${t('inquiry.remove')}`);
    } else {
      basket.push({ sku, model: btn.dataset.model, slug: btn.dataset.slug, qty: 100 });
      toast(`${btn.dataset.model}: ${t('inquiry.added')}`);
    }
    store.write(basket);
    syncButtons();
  }

  let toastTimer = 0;
  function toast(text) {
    const el = $('#toast');
    if (!el) return;
    el.textContent = text;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.hidden = true; }, 3000);
  }

  /* ---------- Catalogue ---------- */
  function initCatalog() {
    const grid = $('#product-grid');
    if (!grid) return;
    const PAGE = 9;
    const cards = $$('.card', grid);
    cards.forEach((c, i) => { c.dataset.order = String(i); c.dataset.text = c.textContent.toLowerCase(); });
    const GROUPS = ['cat', 'voltage', 'control', 'display'];
    const f = { q: '', cat: [], voltage: [], control: [], display: [] };
    let sort = 'default';
    let page = 1;
    const fromUrl = new URLSearchParams(location.search).get('cat');
    if (fromUrl) f.cat.push(fromUrl);

    const match = (c, skip) => {
      for (const g of GROUPS) {
        if (g !== skip && f[g].length && !f[g].includes(c.dataset[g])) return false;
      }
      return f.q.trim().toLowerCase().split(/\s+/).filter(Boolean).every((w) => c.dataset.text.includes(w));
    };
    function render(scroll) {
      $$('[data-group]').forEach((box) => {
        const g = box.dataset.group;
        box.checked = f[g].includes(box.value);
        const n = cards.filter((c) => c.dataset[g] === box.value && match(c, g)).length;
        const el = box.closest('.check').querySelector('.check-count');
        if (el) el.textContent = String(n);
      });
      let list = cards.filter((c) => match(c));
      if (sort === 'model') list = list.slice().sort((a, b) => a.dataset.model.localeCompare(b.dataset.model));
      else list = list.slice().sort((a, b) => a.dataset.order - b.dataset.order);
      const pages = Math.max(1, Math.ceil(list.length / PAGE));
      page = Math.min(page, pages);
      const shown = new Set(list.slice((page - 1) * PAGE, page * PAGE));
      list.forEach((c) => grid.appendChild(c));
      cards.forEach((c) => { c.hidden = !shown.has(c); });
      grid.hidden = list.length === 0;
      $('#product-empty').hidden = list.length !== 0;
      $('#results-count').textContent = `${t('products.showing')} ${list.length} ${t('products.productsCount')}`;
      const active = f.q.trim() || GROUPS.some((g) => f[g].length);
      $('#clear-filters').hidden = !active;
      const pager = $('#pager');
      pager.hidden = pages < 2;
      if (pages >= 2) {
        const nums = Array.from({ length: pages }, (_, i) => i + 1);
        pager.innerHTML = `<div class="pager-nums">${nums.map((n) => `<button type="button" data-page="${n}" aria-label="${n}" ${n === page ? 'aria-current="page"' : ''}>${n}</button>`).join('')}</div>
          <div class="pager-arrows"><button type="button" data-page="${page - 1}" aria-label="Previous page" ${page === 1 ? 'disabled' : ''}><span class="flip" style="display:grid">${icon('left')}</span></button><button type="button" data-page="${page + 1}" aria-label="Next page" ${page === pages ? 'disabled' : ''}><span class="flip" style="display:grid">${icon('right')}</span></button></div>`;
      } else {
        pager.innerHTML = '';
      }
      if (scroll) {
        $('#results').scrollIntoView({ block: 'start' });
        window.scrollBy(0, -96);
        const cur = $('#pager [aria-current="page"]');
        if (cur) cur.focus({ preventScroll: true });
      }
    }
    listen(document, 'change', (e) => {
      const el = e.target;
      if (el.dataset && el.dataset.group) {
        const list = f[el.dataset.group];
        const i = list.indexOf(el.value);
        if (el.checked && i < 0) list.push(el.value);
        if (!el.checked && i >= 0) list.splice(i, 1);
        page = 1;
        render();
      }
      if (el.id === 'sort') { sort = el.value; page = 1; render(); }
    });
    listen($('#catalog-search'), 'input', (e) => { f.q = e.target.value; page = 1; render(); });
    listen(document, 'click', (e) => {
      const clear = e.target.closest('[data-clear]');
      if (clear) {
        GROUPS.forEach((g) => { f[g] = []; });
        f.q = '';
        $('#catalog-search').value = '';
        page = 1;
        render();
        $('#catalog-search').focus();
        return;
      }
      const pg = e.target.closest('[data-page]');
      if (pg && !pg.disabled) { page = Number(pg.dataset.page); render(true); return; }
      const tog = e.target.closest('#filter-toggle');
      if (tog) {
        const closed = $('#catalog').classList.toggle('filters-closed');
        tog.setAttribute('aria-expanded', String(!closed));
      }
    });
    if (window.matchMedia('(max-width: 1023px)').matches) {
      $('#catalog').classList.add('filters-closed');
      $('#filter-toggle').setAttribute('aria-expanded', 'false');
    }
    if (location.hash === '#search') $('#catalog-search').focus();
    render();
  }

  /* ---------- Homepage banner ---------- */
  let disposeBanner = () => {};
  function initBanner() {
    const root = $('[data-banner]');
    if (!root) return;
    const track = $('[data-banner-track]', root);
    const slides = $$('[data-banner-slide]', track);
    const count = slides.length;
    if (count < 2) return;
    const dots = $$('[data-banner-go]', root);
    const toggle = $('[data-banner-toggle]', root);
    const status = $('[data-banner-status]', root);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pauses = new Set();
    let index = 0;
    let timer;
    let settleTimer;
    let moving = false;
    let pointer;
    let observer;
    const labels = {
      previous: t('banner.previous'), next: t('banner.next'),
      pause: t('banner.pause'), play: t('banner.play'),
      slide: 'Banner', choose: t('banner.choose'), region: t('home.hero.eyebrow'),
    };
    root.setAttribute('aria-label', labels.region);
    $('[data-banner-prev]', root).setAttribute('aria-label', labels.previous);
    $('[data-banner-next]', root).setAttribute('aria-label', labels.next);
    $('.banner-dots', root).setAttribute('aria-label', labels.choose);
    const clones = [slides[count - 1].cloneNode(true), slides[0].cloneNode(true)];
    clones.forEach(clone => {
      clone.removeAttribute('data-banner-slide');
      clone.setAttribute('data-banner-clone', '');
      clone.setAttribute('aria-hidden', 'true');
      clone.setAttribute('inert', '');
    });
    track.prepend(clones[0]);
    track.append(clones[1]);

    function snap(position) {
      track.classList.add('is-resetting');
      track.style.transform = `translate3d(${-position * 100}%, 0, 0)`;
      track.getBoundingClientRect();
      track.classList.remove('is-resetting');
    }
    function settle() {
      clearTimeout(settleTimer);
      if (!moving) return;
      moving = false;
      snap(index + 1);
    }
    function schedule() {
      clearTimeout(timer);
      if (pauses.size || reduced.matches || document.hidden) return;
      timer = setTimeout(() => go(index + 1, true), 5500);
    }
    function pause(reason, active) {
      if (active) pauses.add(reason); else pauses.delete(reason);
      const stopped = pauses.has('manual') || reduced.matches;
      toggle.hidden = reduced.matches;
      toggle.setAttribute('aria-pressed', String(stopped));
      toggle.setAttribute('aria-label', stopped ? labels.play : labels.pause);
      $('[data-banner-toggle-icon]', root).setAttribute('d', stopped ? 'M9 5l10 7-10 7V5Z' : 'M8 5v14M16 5v14');
      schedule();
    }
    function render(automatic) {
      root.dataset.bannerIndex = String(index);
      slides.forEach((slide, i) => {
        slide.setAttribute('aria-hidden', String(i !== index));
        if (i === index) slide.removeAttribute('inert'); else slide.setAttribute('inert', '');
      });
      dots.forEach((dot, i) => {
        dot.setAttribute('aria-label', `${labels.slide} ${i + 1}`);
        if (i === index) dot.setAttribute('aria-current', 'true'); else dot.removeAttribute('aria-current');
      });
      $('[data-banner-caption]', root).textContent = t(slides[index].dataset.bannerTitle);
      status.setAttribute('aria-live', automatic ? 'off' : 'polite');
      status.textContent = `${index + 1} / ${count}`;
    }
    function go(target, automatic = false) {
      settle();
      const next = (target + count) % count;
      if (next === index) { schedule(); return; }
      if (slides[index].contains(document.activeElement)) root.focus({ preventScroll: true });
      index = next;
      render(automatic);
      if (reduced.matches) snap(index + 1);
      else {
        const position = target === count ? count + 1 : target < 0 ? 0 : index + 1;
        moving = true;
        track.style.transform = `translate3d(${-position * 100}%, 0, 0)`;
        settleTimer = setTimeout(settle, 620);
      }
      schedule();
    }
    listen(track, 'transitionend', event => { if (event.target === track && event.propertyName === 'transform') settle(); });
    listen(root, 'click', event => {
      if (event.target.closest('[data-banner-prev]')) go(index - 1);
      if (event.target.closest('[data-banner-next]')) go(index + 1);
      const dot = event.target.closest('[data-banner-go]');
      if (dot) go(Number(dot.dataset.bannerGo));
      if (event.target.closest('[data-banner-toggle]')) {
        if (reduced.matches) { go(index + 1); return; }
        pause('manual', !pauses.has('manual'));
      }
    });
    listen(root, 'keydown', event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      const direction = document.documentElement.dir === 'rtl' ? -1 : 1;
      go(index + (event.key === 'ArrowRight' ? direction : -direction));
    });
    listen(root, 'mouseenter', () => pause('hover', true));
    listen(root, 'mouseleave', () => pause('hover', false));
    listen(root, 'focusin', () => pause('focus', true));
    listen(root, 'focusout', event => { if (!root.contains(event.relatedTarget)) pause('focus', false); });
    const viewport = $('.banner-viewport', root);
    listen(viewport, 'pointerdown', event => {
      if (event.pointerType === 'mouse' || event.isPrimary === false) return;
      pointer = { x: event.clientX, y: event.clientY };
      pause('touch', true);
    });
    listen(viewport, 'pointerup', event => {
      if (!pointer) return;
      const dx = event.clientX - pointer.x;
      const dy = event.clientY - pointer.y;
      pointer = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) {
        go(index + (dx < 0 ? 1 : -1));
        // A swipe should change the banner, not follow its product link.
        const cancelClick = click => { click.preventDefault(); click.stopPropagation(); };
        viewport.addEventListener('click', cancelClick, { once: true, capture: true, signal: controller.signal });
        setTimeout(() => viewport.removeEventListener('click', cancelClick, true), 0);
      }
      pause('touch', false);
    });
    listen(viewport, 'pointercancel', () => { pointer = null; pause('touch', false); });
    listen(document, 'visibilitychange', () => pause('hidden', document.hidden));
    listen(reduced, 'change', () => { settle(); pause('reduced', reduced.matches); });
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(entries => pause('offscreen', !entries[0].isIntersecting), { threshold: 0.1 });
      observer.observe(root);
    }
    snap(1);
    render(true);
    pause('reduced', reduced.matches);
    disposeBanner = () => {
      clearTimeout(timer);
      clearTimeout(settleTimer);
      observer?.disconnect();
      clones.forEach(clone => clone.remove());
      track.style.transform = '';
      track.classList.remove('is-resetting');
    };
  }

  /* ---------- Forms ---------- */
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function fieldMessage(input) {
    const v = input.value.trim();
    if (input.required && !v) return t(input.dataset.errorKey || 'contact.form.messageError');
    if (input.type === 'email' && v && !EMAIL_RE.test(v)) return t('contact.form.emailError');
    return '';
  }
  function showField(input, msg) {
    const err = document.getElementById(`${input.id}-err`);
    if (err) { err.textContent = msg; err.hidden = !msg; }
    if (msg) { input.setAttribute('aria-invalid', 'true'); if (err) input.setAttribute('aria-describedby', err.id); }
    else { input.removeAttribute('aria-invalid'); input.removeAttribute('aria-describedby'); }
  }
  function validate(form) {
    const bad = [];
    $$('.input', form).forEach((input) => {
      const msg = fieldMessage(input);
      showField(input, msg);
      if (msg) bad.push({ input, msg });
    });
    const summary = $('[data-summary]', form);
    summary.hidden = bad.length === 0;
    if (bad.length) {
      summary.innerHTML = `<ul>${bad.map((b) => `<li><button type="button" data-focus="${b.input.id}">${esc(b.msg)}</button></li>`).join('')}</ul>`;
      summary.focus();
    }
    return bad.length === 0;
  }
  function buildMessage(form) {
    const lines = [];
    $$('.input', form).forEach((i) => {
      const v = i.value.trim();
      if (!v) return;
      const label = form.querySelector(`label[for="${i.id}"] [data-i18n]`);
      lines.push(`${(label ? label.textContent : i.id).trim()}: ${v}`);
    });
    if (form.dataset.form === 'inquiry' && basket.length) {
      lines.push('', `${t('contact.form.selectedProductsTitle')}:`);
      basket.forEach((l) => lines.push(`- ${l.model} x ${l.qty} pcs (https://heatnexis.com/products/${l.slug})`));
    }
    return lines.join('\n');
  }
  async function submit(form) {
    if (form.dataset.busy === 'true' || !validate(form)) return;
    const btn = $('[data-submit]', form);
    const label = btn.textContent;
    const fail = $('[data-fail]', form);
    fail.hidden = true;
    form.dataset.busy = 'true';
    btn.disabled = true;
    btn.setAttribute('aria-busy', 'true');
    btn.textContent = t('contact.form.submitting');
    const kind = form.dataset.form;
    const name = $('[data-name]', form).value.trim();
    const body = buildMessage(form);
    let viaMail = false;
    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email: form.querySelector('input[type=email]').value.trim(), company: form.querySelector('input[autocomplete=organization]')?.value || '', kind, message: body, items: kind === 'inquiry' ? basket : [] })
        });
        if (!res.ok) throw new Error(String(res.status));
      } else {
        viaMail = true;
        const subject = `HeatNexis ${kind === 'inquiry' ? 'inquiry' : 'message'} from ${name}`;
        window.location.href = `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }
      const box = $(`#${kind}-success`);
      $('[data-success-title]', box).textContent = viaMail ? t('x.mailTitle') : t('contact.form.successTitle');
      $('[data-success-text]', box).textContent = viaMail ? t('x.mailText') : t('contact.form.successDescription');
      const fb = $('[data-mail-fallback]', box);
      if (fb) fb.hidden = !viaMail;
      const copy = $('[data-success-copy]', box);
      if (copy) { copy.textContent = body; copy.hidden = !viaMail; }
      form.hidden = true;
      box.hidden = false;
      $('[data-success-title]', box).focus();
    } catch (err) {
      fail.hidden = false;
    } finally {
      form.dataset.busy = 'false';
      btn.disabled = false;
      btn.removeAttribute('aria-busy');
      btn.textContent = label;
    }
  }

  /* ---------- Inquiry page ---------- */
  function renderInquiry() {
    const main = $('#inq-main');
    if (!main) return;
    const empty = basket.length === 0;
    const success = $('#inquiry-success');
    if (!success.hidden) return;
    $('#inq-empty').hidden = !empty;
    main.hidden = empty;
    if (empty) return;
    const art = artwork;
    $('#inq-lines').innerHTML = basket.map((l) => `<li class="line">
      <div class="line-thumb">${art[l.sku] || ''}</div>
      <div><a class="line-name" href="/products/${esc(l.slug)}">${esc(t(`product.${l.sku}.title`))}</a><p class="small">${esc(l.sku.toUpperCase())}</p></div>
      <div class="line-controls">
        <div class="stepper">
          <button type="button" data-step="-10" data-sku="${esc(l.sku)}" aria-label="- 10 ${esc(l.model)}">${icon('minus')}</button>
          <input type="number" inputmode="numeric" min="1" step="1" value="${l.qty}" data-qty="${esc(l.sku)}" aria-label="${esc(l.model)} pcs">
          <button type="button" data-step="10" data-sku="${esc(l.sku)}" aria-label="+ 10 ${esc(l.model)}">${icon('plus')}</button>
        </div>
        <button type="button" class="icon-btn" data-remove="${esc(l.sku)}" aria-label="${esc(t('inquiry.removeItem'))}: ${esc(l.model)}">${icon('close')}</button>
      </div>
    </li>`).join('');
    renderTotal();
  }
  function renderTotal() {
    const el = $('#inq-total');
    if (!el) return;
    const units = basket.reduce((s, l) => s + l.qty, 0);
    el.innerHTML = `<span>${basket.length} ${esc(t('products.productsCount'))}</span><span class="od-nowrap">${units.toLocaleString('en-US')} pcs</span>`;
  }
  function setQty(sku, qty) {
    const line = basket.find((l) => l.sku === sku);
    if (!line || !Number.isFinite(qty)) return;
    line.qty = Math.max(1, Math.round(qty) || line.qty);
    const input = $(`[data-qty="${sku}"]`);
    if (input) input.value = line.qty;
    store.write(basket);
    renderTotal();
  }

  /* ---------- Events ---------- */
  listen(document, 'click', (e) => {
    const el = e.target;
    const add = el.closest('[data-add]');
    if (add) { toggleItem(add); return; }
    const now = el.closest('[data-inquire-now]');
    if (now) {
      const d = now.dataset;
      if (!inList(d.inquireNow)) {
        basket.push({ sku: d.inquireNow, model: d.model, slug: d.slug, qty: 100 });
        store.write(basket);
      }
      return;
    }
    const sub = el.closest('[data-submit]');
    if (sub) { submit(sub.closest('form')); return; }
    const foc = el.closest('[data-focus]');
    if (foc) { const f = document.getElementById(foc.dataset.focus); if (f) f.focus(); return; }
    const step = el.closest('[data-step]');
    if (step) {
      const line = basket.find((l) => l.sku === step.dataset.sku);
      if (line) setQty(line.sku, line.qty + Number(step.dataset.step));
      return;
    }
    const rem = el.closest('[data-remove]');
    if (rem) {
      const i = basket.findIndex((l) => l.sku === rem.dataset.remove);
      basket.splice(i, 1);
      store.write(basket);
      syncButtons();
      renderInquiry();
      const next = basket[Math.min(i, basket.length - 1)];
      const target = next ? $(`[data-remove="${next.sku}"]`) : $('#inq-browse');
      if (target) target.focus();
      return;
    }
    const again = el.closest('[data-again]');
    if (again) {
      const kind = again.dataset.again;
      const form = $(`[data-form="${kind}"]`);
      form.reset();
      $$('.input', form).forEach((i) => { showField(i, ''); delete i.dataset.dirty; });
      $('[data-summary]', form).hidden = true;
      form.hidden = false;
      $(`#${kind}-success`).hidden = true;
      if (kind === 'inquiry') { basket = []; store.write(basket); syncButtons(); renderInquiry(); }
      return;
    }
    const menu = el.closest('#menu-btn');
    if (menu) {
      const open = $('#nav').classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
      menu.innerHTML = icon(open ? 'close' : 'menu');
    }
  });
  listen(document, 'input', (e) => {
    const el = e.target;
    if (el.classList && el.classList.contains('input') && el.id !== 'catalog-search') {
      el.dataset.dirty = 'true';
      if (el.getAttribute('aria-invalid') === 'true') showField(el, fieldMessage(el));
    }
  });
  listen(document, 'change', (e) => {
    const sku = e.target.dataset && e.target.dataset.qty;
    if (sku) setQty(sku, Number(e.target.value));
  });
  listen(document, 'focusout', (e) => {
    const el = e.target;
    if (!el.classList || !el.classList.contains('input') || el.id === 'catalog-search' || el.id === 'sort') return;
    if (el.dataset.dirty === 'true' || el.getAttribute('aria-invalid') === 'true') showField(el, fieldMessage(el));
  });
  listen(document, 'submit', (e) => { e.preventDefault(); submit(e.target); });
  listen(document, 'keydown', (e) => {
    if (e.key === 'Escape' && $('#nav')?.classList.contains('open')) {
      $('#nav').classList.remove('open');
      const m = $('#menu-btn');
      m.setAttribute('aria-expanded', 'false');
      m.innerHTML = icon('menu');
      m.focus();
      return;
    }
    if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.closest('form[data-form]')) {
      e.preventDefault();
      submit(e.target.closest('form'));
    }
  });

  /* ---------- Start ---------- */
  applyLanguage();
  initLanguage();
  const y = $('#year');
  if (y) y.textContent = String(new Date().getFullYear());
  listen(window, 'storage', event => {
    if (event.key !== KEY && event.key !== null) return;
    basket = store.read();
    syncButtons();
    renderInquiry();
  });
  syncButtons();
  initCatalog();
  initBanner();
  renderInquiry();

  return () => { controller.abort(); disposeBanner(); clearTimeout(toastTimer); };
}
