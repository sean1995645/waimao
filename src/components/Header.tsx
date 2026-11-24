'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronRight, Globe, Menu, Search, X } from 'lucide-react';
import { categories, navigation, products } from '@/data/catalog';
import { DarkSectionBackdrop, ProductDeviceVisual, variantStyleFromIcon } from './BrandVisual';

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

  return (
    <>
      <header
        ref={headerRef}
        className={`header ${!isHome ? 'is-solid' : ''} ${scrolled ? 'scrolled' : ''}`}
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
          <Link className="brand" href="/" aria-label="BEOK Controls home" onClick={closeNavigation}>
            <span className="brand-mark">
              <svg width="26" height="26" viewBox="0 0 28 28" aria-hidden="true">
                <rect x="2" y="2" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.4" />
                <circle cx="14" cy="14" r="6" fill="none" stroke="#0067e7" strokeWidth="2.4" />
                <circle cx="14" cy="14" r="2.2" fill="#0067e7" />
              </svg>
              <span>
                <span className="brand-word">BEOK</span>
                <span className="brand-sub">CONTROLS</span>
              </span>
            </span>
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
                          <p className="mega-preview-title">{previewProduct.name}</p>
                          <p className="mega-preview-desc">{previewProduct.highlights.join(' · ')}</p>
                          <div className="mega-preview-visual">
                            <ProductDeviceVisual
                              variant={previewProduct.variantStyle}
                              theme="light"
                              label={previewProduct.name}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {item.children && !isProductsMenu && (
                      <div
                        id={`submenu-${index}`}
                        className={`mega-menu mega-two-col ${isOpen ? 'expanded' : ''}`}
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
                            {item.name === 'Tailor-Made Solution' ? (
                              <ProductDeviceVisual
                                variant={variantStyleFromIcon('boiler')}
                                theme="light"
                                label={selectedChild?.name || item.name}
                              />
                            ) : (
                              <DarkSectionBackdrop theme="tech" label={selectedChild?.name || item.name} />
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="header-tools">
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
              <label htmlFor="header-search">Search BEOK Controls</label>
              <div className="search-row">
                <input
                  ref={searchRef}
                  id="header-search"
                  name="q"
                  type="search"
                  placeholder="Search thermostats, solutions, OEM services..."
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
