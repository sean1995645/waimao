'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronRight, Globe, Menu, MessageSquare, Search, X } from 'lucide-react';
import { site } from '@/config/site';
import { categories, navigation, odmCases, products, services, solutions } from '@/data/catalog';
import { HeaderShortlistBadge } from './B2BShortlist';

export function LanguageSwitcher() {
  return (
    <label className="language">
      <Globe size={16} aria-hidden="true" />
      <span className="sr-only">Language</span>
      <select aria-label="Language" defaultValue="en">
        <option value="en">EN</option>
        <option disabled>DE (Pending)</option>
        <option disabled>FR (Pending)</option>
        <option disabled>ES (Pending)</option>
        <option disabled>中文 (Pending)</option>
      </select>
    </label>
  );
}

export function Header() {
  const pathname = usePathname() || '/';
  const isHome = pathname === '/';

  const [mobile, setMobile] = useState(false);
  const [desktopDrawer, setDesktopDrawer] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Interactive mega-menu selection state
  const [activeProdCat, setActiveProdCat] = useState(categories[0].slug);
  const [activeProdSlug, setActiveProdSlug] = useState(products[0].slug);
  const [activeSubHref, setActiveSubHref] = useState<string | null>(null);

  const searchRef = useRef<HTMLInputElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const drawerButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtons = useRef(new Map<string, HTMLButtonElement>());
  const hoverOpened = useRef<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const closeNavigation = () => {
    setMobile(false);
    setDesktopDrawer(false);
    setOpen(null);
  };

  const closeSearch = () => {
    setSearch(false);
    searchButtonRef.current?.focus();
  };

  const supportsHover = () =>
    typeof window !== 'undefined' && window.matchMedia('(min-width: 992px) and (hover: hover)').matches;

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    if (search) searchRef.current?.focus();
  }, [search]);

  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setOpen(null);
        setSearch(false);
        setMobile(false);
      }
    };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, []);

  const catProducts = products.filter((p) => p.category === activeProdCat);
  const previewProduct = catProducts.find((p) => p.slug === activeProdSlug) || catProducts[0] || products[0];

  const trimmedQuery = searchQuery.trim().toLowerCase();
  const instantProducts = trimmedQuery
    ? products
        .filter((p) =>
          `${p.name} ${p.reference} ${p.application} ${p.highlights.join(' ')}`.toLowerCase().includes(trimmedQuery),
        )
        .slice(0, 4)
    : [];
  const instantOdm = trimmedQuery
    ? odmCases.filter((c) => `${c.title} ${c.subtitle} ${c.serviceName}`.toLowerCase().includes(trimmedQuery)).slice(0, 2)
    : [];

  const quickSearchKeywords = ['Gas Boiler', 'Underfloor', 'Radiator Valve', 'Wiring Centre', 'Modbus', 'OEM/ODM'];

  return (
    <>
      <header
        ref={headerRef}
        className={`header ${!isHome ? 'is-solid' : ''} ${scrolled ? 'scrolled' : ''} ${open || search ? 'has-menu-open' : ''}`}
        onKeyDown={(event) => {
          if (event.key !== 'Escape') return;
          event.preventDefault();
          if (search) {
            closeSearch();
            return;
          }
          if (open) {
            menuButtons.current.get(open)?.focus();
            setOpen(null);
            return;
          }
          if (desktopDrawer) {
            setDesktopDrawer(false);
            drawerButtonRef.current?.focus();
            return;
          }
          if (mobile) {
            setMobile(false);
            mobileButtonRef.current?.focus();
          }
        }}
      >
        <div className="header-inner">
          <Link className="brand" href="/" aria-label="Heatnexis home" onClick={closeNavigation}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/brand/heatnexis-logo.png"
              alt="Heatnexis"
              className="brand-logo-img"
              width={138}
              height={38}
            />
          </Link>

          <div className="header-right">
            <nav
              id="main-navigation"
              aria-label="Main navigation"
              className={mobile ? 'navigation is-open' : 'navigation'}
            >
              {navigation.map((item, index) => {
                const isActive =
                  item.href === '/' ? pathname === '/' : pathname === item.href || pathname.startsWith(`${item.href}/`);
                const isOpen = open === item.name;
                const isProductsMenu = item.name === 'Products';
                const selectedChild =
                  item.children?.find((c) => c.href === activeSubHref) || item.children?.[0];

                return (
                  <div
                    className={`nav-item ${isActive ? 'is-active' : ''} ${isOpen ? 'is-open' : ''}`}
                    key={item.href}
                    onMouseEnter={() => {
                      if (supportsHover()) {
                        hoverOpened.current = item.children ? item.name : null;
                        setOpen(hoverOpened.current);
                        if (item.children?.[0]) setActiveSubHref(item.children[0].href);
                      }
                    }}
                    onMouseLeave={(event) => {
                      hoverOpened.current = null;
                      if (supportsHover() && !event.currentTarget.contains(document.activeElement)) {
                        setOpen(null);
                      }
                    }}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget)) {
                        setOpen((current) => (current === item.name ? null : current));
                      }
                    }}
                  >
                    <div className="nav-label">
                      <Link href={item.href} onClick={closeNavigation}>
                        {item.name}
                      </Link>
                      {item.children && (
                        <button
                          type="button"
                          className="nav-expand-btn"
                          ref={(element) => {
                            if (element) menuButtons.current.set(item.name, element);
                            else menuButtons.current.delete(item.name);
                          }}
                          aria-label={`Expand ${item.name}`}
                          aria-expanded={isOpen}
                          aria-controls={`submenu-${index}`}
                          onClick={(event) => {
                            const retainHover = event.detail > 0 && hoverOpened.current === item.name;
                            hoverOpened.current = null;
                            setOpen((current) =>
                              retainHover ? item.name : current === item.name ? null : item.name,
                            );
                          }}
                        >
                          <ChevronDown size={13} aria-hidden="true" />
                        </button>
                      )}
                    </div>

                    {item.children && isProductsMenu && (
                      <div
                        id={`submenu-${index}`}
                        className={`mega-menu mega-three-col ${isOpen ? 'expanded' : ''}`}
                      >
                        <div>
                          <div className="mega-col-title">Products</div>
                          <ul className="mega-list">
                            {categories.map((cat) => (
                              <li
                                key={cat.slug}
                                className={`mega-list-item ${activeProdCat === cat.slug ? 'is-selected' : ''}`}
                              >
                                <Link
                                  href={`/products/${cat.slug}`}
                                  onMouseEnter={() => {
                                    setActiveProdCat(cat.slug);
                                    const first = products.find((p) => p.category === cat.slug);
                                    if (first) setActiveProdSlug(first.slug);
                                  }}
                                  onFocus={() => setActiveProdCat(cat.slug)}
                                  onClick={closeNavigation}
                                >
                                  <span>{cat.name}</span>
                                  <ChevronRight size={14} aria-hidden="true" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mega-col-divider">
                          <ul className="mega-list">
                            {catProducts.map((prod) => (
                              <li
                                key={prod.slug}
                                className={`mega-list-item ${previewProduct.slug === prod.slug ? 'is-selected' : ''}`}
                              >
                                <Link
                                  href={`/products/${prod.category}/${prod.slug}`}
                                  onMouseEnter={() => setActiveProdSlug(prod.slug)}
                                  onFocus={() => setActiveProdSlug(prod.slug)}
                                  onClick={closeNavigation}
                                >
                                  <span>{prod.name}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mega-col-divider mega-preview">
                          <span className="mono-label" style={{ color: 'var(--color-primary)' }}>
                            {previewProduct.reference}
                          </span>
                          <p className="mega-preview-title">{previewProduct.name}</p>
                          <p className="mega-preview-desc">{previewProduct.highlights.join(' · ')}</p>
                          <div className="mega-preview-visual" style={{ padding: 10 }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={previewProduct.image}
                              alt={previewProduct.name}
                              className="img-contain"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {item.children && !isProductsMenu && (
                      <div
                        id={`submenu-${index}`}
                        className={`mega-menu mega-two-col ${
                          item.name === 'Service & Support' || item.name === 'About Us' ? 'mega-align-right' : ''
                        } ${isOpen ? 'expanded' : ''}`}
                      >
                        <div>
                          <div className="mega-col-title">{item.name}</div>
                          <ul className="mega-list">
                            {item.children.map((child) => (
                              <li
                                key={child.href}
                                className={`mega-list-item ${selectedChild?.href === child.href ? 'is-selected' : ''}`}
                              >
                                <Link
                                  href={child.href}
                                  onMouseEnter={() => setActiveSubHref(child.href)}
                                  onFocus={() => setActiveSubHref(child.href)}
                                  onClick={closeNavigation}
                                >
                                  <span>{child.name}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mega-col-divider mega-preview">
                          <p className="mega-preview-title">{selectedChild?.name || item.name}</p>
                          <p className="mega-preview-desc">
                            {selectedChild?.summary || item.previewSummary}
                          </p>
                          <div className="mega-preview-visual">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={
                                item.name === 'Tailor-Made Solution'
                                  ? services.find((s) => s.slug === selectedChild?.slug)?.image || '/images/services/structural.jpg'
                                  : item.name === 'Solutions'
                                    ? solutions.find((s) => s.slug === selectedChild?.slug)?.image || '/images/solutions/boiler.jpg'
                                    : item.name === 'Blog'
                                      ? '/images/blog/art-1.jpg'
                                      : item.name === 'Service & Support'
                                        ? '/images/support/banner.jpg'
                                        : '/images/factory/about-building.jpg'
                              }
                              alt={selectedChild?.name || item.name}
                              className="img-cover"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="mobile-drawer-cta">
                <Link href="/contact#inquiry" className="btn-primary" style={{ width: '100%' }} onClick={closeNavigation}>
                  <span>Request B2B Quote</span>
                  <ChevronRight size={15} aria-hidden="true" />
                </Link>
                <a
                  href={site.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ width: '100%' }}
                  onClick={closeNavigation}
                >
                  <MessageSquare size={15} aria-hidden="true" />
                  <span>WhatsApp: {site.contact.whatsapp}</span>
                </a>
              </div>
            </nav>

            <div className="header-tools">
              <Link href="/contact#inquiry" className="header-cta-btn" onClick={closeNavigation}>
                <span>Get Quote</span>
                <ChevronRight size={14} aria-hidden="true" />
              </Link>

              <HeaderShortlistBadge onNavigate={closeNavigation} />

              <button
                type="button"
                className="header-tool-btn"
                ref={searchButtonRef}
                aria-label="Open search"
                aria-expanded={search}
                aria-controls="header-search-panel"
                onClick={() => {
                  if (search) closeSearch();
                  else {
                    closeNavigation();
                    setSearch(true);
                  }
                }}
              >
                <Search size={18} aria-hidden="true" />
              </button>

              <LanguageSwitcher />

              <button
                type="button"
                ref={drawerButtonRef}
                className="desktop-drawer-toggle"
                aria-label="Open site directory menu"
                aria-expanded={desktopDrawer}
                onClick={() => {
                  setOpen(null);
                  setSearch(false);
                  setDesktopDrawer((v) => !v);
                }}
              >
                <Menu size={18} aria-hidden="true" />
              </button>

              <button
                type="button"
                ref={mobileButtonRef}
                className="menu-toggle"
                aria-label={mobile ? 'Close menu' : 'Open menu'}
                aria-expanded={mobile}
                aria-controls="main-navigation"
                onClick={() => {
                  setMobile((v) => !v);
                  setOpen(null);
                  setSearch(false);
                }}
              >
                {mobile ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {search && (
          <div id="header-search-panel" className="search-panel">
            <form action="/search">
              <label htmlFor="header-search">Search Heatnexis</label>
              <div className="search-row">
                <input
                  ref={searchRef}
                  id="header-search"
                  name="q"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search thermostats, SKU codes (HN-GB), solutions, OEM services..."
                  required
                />
                <button className="search-submit-btn" type="submit" aria-label="Search">
                  <Search size={18} />
                </button>
                <button
                  type="button"
                  className="search-close-btn"
                  aria-label="Close search"
                  onClick={closeSearch}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="search-quick-bar">
                <span className="mono-label">POPULAR B2B:</span>
                {quickSearchKeywords.map((kw) => (
                  <Link
                    key={kw}
                    href={`/search?q=${encodeURIComponent(kw)}`}
                    className="search-quick-chip"
                    onClick={() => setSearch(false)}
                  >
                    {kw}
                  </Link>
                ))}
              </div>

              {trimmedQuery && (instantProducts.length > 0 || instantOdm.length > 0) && (
                <div className="search-live-results" aria-label="Instant search matches">
                  {instantProducts.map((prod) => (
                    <Link
                      key={prod.slug}
                      href={`/products/${prod.category}/${prod.slug}`}
                      className="search-live-item"
                      onClick={() => setSearch(false)}
                    >
                      <span className="search-live-thumb">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={prod.image} alt="" width={36} height={36} />
                      </span>
                      <div>
                        <strong>{prod.name}</strong>
                        <span>
                          {prod.reference} · {prod.application}
                        </span>
                      </div>
                      <ChevronRight size={14} aria-hidden="true" />
                    </Link>
                  ))}
                  {instantOdm.map((odm) => (
                    <Link
                      key={odm.slug}
                      href={`/odm/${odm.slug}`}
                      className="search-live-item"
                      onClick={() => setSearch(false)}
                    >
                      <span className="search-live-thumb">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={odm.image} alt="" width={36} height={36} />
                      </span>
                      <div>
                        <strong>{odm.title}</strong>
                        <span>ODM Case · {odm.serviceName}</span>
                      </div>
                      <ChevronRight size={14} aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              )}
            </form>
          </div>
        )}
      </header>

      {desktopDrawer && (
        <div className="full-nav-overlay" role="dialog" aria-modal="true" aria-label="Full site navigation">
          <button
            type="button"
            className="full-nav-close"
            aria-label="Close site directory menu"
            onClick={() => {
              setDesktopDrawer(false);
              drawerButtonRef.current?.focus();
            }}
          >
            <X size={20} />
          </button>
          <div className="full-nav-grid">
            {navigation
              .filter((n) => n.children)
              .map((group) => (
                <div className="full-nav-group" key={group.href}>
                  <h3>
                    <Link href={group.href} onClick={closeNavigation}>
                      {group.name}
                    </Link>
                  </h3>
                  <ul>
                    {group.children?.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} onClick={closeNavigation}>
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
