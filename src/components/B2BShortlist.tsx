'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import {
  ArrowRight,
  Check,
  ClipboardList,
  GitCompareArrows,
  Plus,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react';
import { categories, products } from '@/data/catalog';
import type { ProductRecord } from '@/types/content';

const SHORTLIST_KEY = 'heatnexis_rfq_shortlist_v1';
const COMPARE_KEY = 'heatnexis_compare_v1';
const STORE_EVENT = 'heatnexis-b2b-store-change';
const EMPTY_LIST: string[] = [];

let cachedShortlistRaw: string | null = null;
let cachedShortlistParsed: string[] = EMPTY_LIST;
let cachedCompareRaw: string | null = null;
let cachedCompareParsed: string[] = EMPTY_LIST;

function readStoredSlugs(key: string): string[] {
  if (typeof window === 'undefined') return EMPTY_LIST;
  try {
    const raw = window.localStorage.getItem(key);
    if (key === SHORTLIST_KEY) {
      if (raw === cachedShortlistRaw) return cachedShortlistParsed;
      cachedShortlistRaw = raw;
      const parsed = raw ? JSON.parse(raw) : EMPTY_LIST;
      cachedShortlistParsed = Array.isArray(parsed)
        ? parsed.filter((s): s is string => typeof s === 'string' && products.some((p) => p.slug === s))
        : EMPTY_LIST;
      return cachedShortlistParsed;
    }
    if (raw === cachedCompareRaw) return cachedCompareParsed;
    cachedCompareRaw = raw;
    const parsed = raw ? JSON.parse(raw) : EMPTY_LIST;
    cachedCompareParsed = Array.isArray(parsed)
      ? parsed.filter((s): s is string => typeof s === 'string' && products.some((p) => p.slug === s)).slice(0, 4)
      : EMPTY_LIST;
    return cachedCompareParsed;
  } catch {
    return EMPTY_LIST;
  }
}

function writeStoredSlugs(key: string, next: string[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(STORE_EVENT));
  } catch {
    // Ignore storage quota / private mode errors
  }
}

function subscribeStore(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const handler = () => callback();
  window.addEventListener(STORE_EVENT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(STORE_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}

function getServerSnapshot(): string[] {
  return EMPTY_LIST;
}

function formatVariantLabel(style: ProductRecord['variantStyle']): string {
  switch (style) {
    case 'white-square':
      return 'Flush Touch Panel (White)';
    case 'black-square':
      return 'Dark Tempered Glass Touch';
    case 'round-dial':
      return 'Tactile Rotary Encoder Dial';
    case 'valve':
      return 'Radiator TRV Actuator';
    case 'actuator':
      return 'Manifold Electro-Thermal';
    case 'hub':
      return 'Multi-Zone Wiring / Gateway Hub';
  }
}

interface B2BShortlistContextValue {
  shortlistSlugs: string[];
  compareSlugs: string[];
  shortlistProducts: ProductRecord[];
  compareProducts: ProductRecord[];
  isShortlisted: (slug: string) => boolean;
  isCompared: (slug: string) => boolean;
  toggleShortlist: (slug: string) => void;
  removeFromShortlist: (slug: string) => void;
  clearShortlist: () => void;
  toggleCompare: (slug: string) => void;
  clearCompare: () => void;
  openCompare: () => void;
}

const B2BShortlistContext = createContext<B2BShortlistContextValue | null>(null);

export function useB2BShortlist() {
  const ctx = useContext(B2BShortlistContext);
  if (!ctx) {
    return {
      shortlistSlugs: EMPTY_LIST,
      compareSlugs: EMPTY_LIST,
      shortlistProducts: [] as ProductRecord[],
      compareProducts: [] as ProductRecord[],
      isShortlisted: () => false,
      isCompared: () => false,
      toggleShortlist: () => {},
      removeFromShortlist: () => {},
      clearShortlist: () => {},
      toggleCompare: () => {},
      clearCompare: () => {},
      openCompare: () => {},
    };
  }
  return ctx;
}

export function B2BShortlistProvider({ children }: { children: ReactNode }) {
  const shortlistSlugs = useSyncExternalStore(
    subscribeStore,
    () => readStoredSlugs(SHORTLIST_KEY),
    getServerSnapshot,
  );
  const compareSlugs = useSyncExternalStore(
    subscribeStore,
    () => readStoredSlugs(COMPARE_KEY),
    getServerSnapshot,
  );

  const [compareOpen, setCompareOpen] = useState(false);
  const [diffOnly, setDiffOnly] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const pathname = usePathname() || '/';

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (compareOpen && !el.open) {
      el.showModal();
    } else if (!compareOpen && el.open) {
      el.close();
    }
  }, [compareOpen]);

  const toggleShortlist = useCallback((slug: string) => {
    const current = readStoredSlugs(SHORTLIST_KEY);
    const exists = current.includes(slug);
    const next = exists ? current.filter((s) => s !== slug) : [...current, slug].slice(-12);
    writeStoredSlugs(SHORTLIST_KEY, next);
  }, []);

  const removeFromShortlist = useCallback((slug: string) => {
    const current = readStoredSlugs(SHORTLIST_KEY);
    writeStoredSlugs(
      SHORTLIST_KEY,
      current.filter((s) => s !== slug),
    );
  }, []);

  const clearShortlist = useCallback(() => {
    writeStoredSlugs(SHORTLIST_KEY, []);
  }, []);

  const toggleCompare = useCallback((slug: string) => {
    const current = readStoredSlugs(COMPARE_KEY);
    const exists = current.includes(slug);
    const next = exists ? current.filter((s) => s !== slug) : [...current.slice(-3), slug];
    writeStoredSlugs(COMPARE_KEY, next);
  }, []);

  const clearCompare = useCallback(() => {
    writeStoredSlugs(COMPARE_KEY, []);
  }, []);

  const openCompare = useCallback(() => {
    const currentCompare = readStoredSlugs(COMPARE_KEY);
    if (currentCompare.length === 0) {
      const fromShortlist = readStoredSlugs(SHORTLIST_KEY).slice(0, 4);
      if (fromShortlist.length > 0) {
        writeStoredSlugs(COMPARE_KEY, fromShortlist);
      }
    }
    setCompareOpen(true);
  }, []);

  const shortlistProducts = shortlistSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is ProductRecord => Boolean(p));

  const activeCompareSlugs = compareSlugs.length > 0 ? compareSlugs : shortlistSlugs.slice(0, 4);
  const compareProducts = activeCompareSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is ProductRecord => Boolean(p));

  const proceedToRfq = () => {
    if (compareSlugs.length > 0) {
      const merged = Array.from(new Set([...shortlistSlugs, ...compareSlugs])).slice(-12);
      writeStoredSlugs(SHORTLIST_KEY, merged);
    }
    setCompareOpen(false);
    const inquiryEl = typeof document !== 'undefined' ? document.getElementById('inquiry') : null;
    if (inquiryEl && pathname === '/contact') {
      inquiryEl.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    router.push('/contact#inquiry');
  };

  const matrixRows: { label: string; values: string[] }[] =
    compareProducts.length > 0
      ? [
          {
            label: 'Reference Series',
            values: compareProducts.map((p) => p.reference),
          },
          {
            label: 'Product Category',
            values: compareProducts.map(
              (p) => categories.find((c) => c.slug === p.category)?.name || p.category,
            ),
          },
          {
            label: 'Heating Application',
            values: compareProducts.map((p) => p.application),
          },
          {
            label: 'Control Form Factor',
            values: compareProducts.map((p) => formatVariantLabel(p.variantStyle)),
          },
          {
            label: 'Key Engineering Highlights',
            values: compareProducts.map((p) => p.highlights.join(' · ')),
          },
          {
            label: 'Wireless / Smart Protocol',
            values: compareProducts.map(
              (p) =>
                p.specifications.find(([k]) => k.toLowerCase().includes('protocol'))?.[1] ||
                'Optional WiFi / RF / Zigbee / Modbus — per project brief',
            ),
          },
          {
            label: 'Regional Wall-Box Fitment',
            values: compareProducts.map(
              (p) =>
                p.specifications.find(([k]) => k.toLowerCase().includes('dimensions'))?.[1] ||
                'EU / UK / US regional options (CAD supplied on request)',
            ),
          },
          {
            label: 'OEM / ODM Availability',
            values: compareProducts.map(() => 'Logo, CMF, Packaging, Firmware & PCB Configurable'),
          },
        ]
      : [];

  const totalActive = shortlistSlugs.length + compareSlugs.length;

  return (
    <B2BShortlistContext.Provider
      value={{
        shortlistSlugs,
        compareSlugs,
        shortlistProducts,
        compareProducts,
        isShortlisted: (slug) => shortlistSlugs.includes(slug),
        isCompared: (slug) => compareSlugs.includes(slug),
        toggleShortlist,
        removeFromShortlist,
        clearShortlist,
        toggleCompare,
        clearCompare,
        openCompare,
      }}
    >
      {children}

      {totalActive > 0 && (
        <aside className="b2b-sourcing-bar" aria-label="B2B RFQ shortlist and model comparison">
          <div className="b2b-sourcing-thumbs" aria-hidden="true">
            {(shortlistProducts.length > 0 ? shortlistProducts : compareProducts).slice(0, 4).map((prod) => (
              <span className="b2b-sourcing-thumb" key={prod.slug} title={prod.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={prod.image} alt="" width={30} height={30} />
              </span>
            ))}
          </div>

          <div className="b2b-sourcing-summary">
            <strong>
              {shortlistSlugs.length > 0
                ? `${shortlistSlugs.length} ${shortlistSlugs.length === 1 ? 'Model' : 'Models'} in RFQ List`
                : `${compareSlugs.length} ${compareSlugs.length === 1 ? 'Model' : 'Models'} Selected`}
            </strong>
            <span>
              {compareProducts.length >= 2
                ? `Ready to compare ${compareProducts.length} models side-by-side`
                : 'Select 2–4 models to compare specs or bundle into one RFQ'}
            </span>
          </div>

          <div className="b2b-sourcing-actions">
            <button
              type="button"
              className="b2b-sourcing-compare-btn"
              onClick={openCompare}
            >
              <GitCompareArrows size={15} aria-hidden="true" />
              <span>Compare ({compareProducts.length})</span>
            </button>

            <button
              type="button"
              className="btn-primary b2b-sourcing-rfq-btn"
              onClick={proceedToRfq}
            >
              <ClipboardList size={15} aria-hidden="true" />
              <span>Bundle RFQ ({shortlistSlugs.length || compareSlugs.length})</span>
              <ArrowRight size={14} aria-hidden="true" />
            </button>

            <button
              type="button"
              className="b2b-sourcing-clear-btn"
              aria-label="Clear selected models"
              onClick={() => {
                clearShortlist();
                clearCompare();
              }}
            >
              <Trash2 size={15} aria-hidden="true" />
            </button>
          </div>
        </aside>
      )}

      {compareOpen && (
        <dialog
          ref={dialogRef}
          className="compare-dialog"
          aria-label="Side-by-side thermostat model comparison"
          onClose={() => setCompareOpen(false)}
        >
          <div className="compare-dialog-head">
            <div>
              <span className="mono-label" style={{ color: 'var(--color-primary)' }}>
                B2B SPECIFIER MATRIX · UP TO 4 MODELS
              </span>
              <h2>Side-by-Side Technical Comparison</h2>
            </div>

            <div className="compare-dialog-controls">
              {compareProducts.length >= 2 && (
                <button
                  type="button"
                  className={`compare-diff-toggle ${diffOnly ? 'is-active' : ''}`}
                  aria-pressed={diffOnly}
                  onClick={() => setDiffOnly((v) => !v)}
                >
                  <Sparkles size={14} aria-hidden="true" />
                  <span>Highlight Differences</span>
                </button>
              )}
              <button
                type="button"
                className="btn-primary"
                style={{ minHeight: 38, padding: '8px 16px', fontSize: 13 }}
                onClick={proceedToRfq}
              >
                <span>Inquire All ({compareProducts.length})</span>
                <ArrowRight size={14} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="image-dialog-close"
                aria-label="Close comparison dialog"
                onClick={() => setCompareOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {compareProducts.length === 0 ? (
            <p className="notice-box">
              No models selected yet. Click <strong>Compare</strong> or <strong>+ RFQ</strong> on any product card to
              evaluate models side-by-side.
            </p>
          ) : (
            <div className="compare-table-wrap">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th scope="col">Parameter</th>
                    {compareProducts.map((prod) => (
                      <th scope="col" key={prod.slug}>
                        <div className="compare-col-head">
                          <div className="compare-col-thumb">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={prod.image} alt={prod.name} className="img-contain" />
                          </div>
                          <Link
                            href={`/products/${prod.category}/${prod.slug}`}
                            className="compare-col-title"
                            onClick={() => setCompareOpen(false)}
                          >
                            {prod.name}
                          </Link>
                          <div className="compare-col-actions">
                            <button
                              type="button"
                              className={`card-chip-btn ${shortlistSlugs.includes(prod.slug) ? 'is-selected' : ''}`}
                              onClick={() => toggleShortlist(prod.slug)}
                            >
                              {shortlistSlugs.includes(prod.slug) ? <Check size={12} /> : <Plus size={12} />}
                              <span>{shortlistSlugs.includes(prod.slug) ? 'In RFQ' : '+ RFQ'}</span>
                            </button>
                            {compareSlugs.includes(prod.slug) && (
                              <button
                                type="button"
                                className="compare-remove-btn"
                                aria-label={`Remove ${prod.name} from comparison`}
                                onClick={() => toggleCompare(prod.slug)}
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrixRows.map((row) => {
                    const hasDiff = new Set(row.values).size > 1;
                    return (
                      <tr key={row.label} className={diffOnly && hasDiff ? 'is-diff-row' : ''}>
                        <th scope="row">{row.label}</th>
                        {row.values.map((val, idx) => (
                          <td key={`${row.label}-${compareProducts[idx].slug}`}>{val}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </dialog>
      )}
    </B2BShortlistContext.Provider>
  );
}

export function HeaderShortlistBadge({ onNavigate }: { onNavigate?: () => void }) {
  const { shortlistSlugs, compareSlugs, openCompare } = useB2BShortlist();
  const count = shortlistSlugs.length || compareSlugs.length;
  if (count === 0) return null;

  return (
    <button
      type="button"
      className="header-shortlist-btn"
      aria-label={`Open B2B RFQ shortlist and comparison (${count} selected)`}
      onClick={() => {
        onNavigate?.();
        openCompare();
      }}
    >
      <ClipboardList size={15} aria-hidden="true" />
      <span className="header-shortlist-count">{count}</span>
    </button>
  );
}
