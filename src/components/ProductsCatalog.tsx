'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Check, ChevronRight, GitCompareArrows, Plus, RotateCcw } from 'lucide-react';
import { categories, products } from '@/data/catalog';
import type { ProductRecord } from '@/types/content';
import { B2BCtaBand } from './B2BSections';
import { useB2BShortlist } from './B2BShortlist';
import { Container } from './LayoutPrimitives';

type InterfaceFilter = 'all' | 'touch' | 'rotary' | 'trv' | 'hydronic-hub';

function matchesInterface(product: ProductRecord, filter: InterfaceFilter): boolean {
  if (filter === 'all') return true;
  if (filter === 'touch') return product.variantStyle === 'white-square' || product.variantStyle === 'black-square';
  if (filter === 'rotary') return product.variantStyle === 'round-dial';
  if (filter === 'trv') return product.variantStyle === 'valve';
  return product.variantStyle === 'actuator' || product.variantStyle === 'hub';
}

export function ProductCard({ product: p }: { product: ProductRecord }) {
  const { isShortlisted, isCompared, toggleShortlist, toggleCompare } = useB2BShortlist();
  const inRfq = isShortlisted(p.slug);
  const inCompare = isCompared(p.slug);

  return (
    <article className="product-card">
      <div className="product-card-media-wrap">
        <span className="product-card-sku">{p.reference}</span>
        <Link href={`/products/${p.category}/${p.slug}`} className="product-card-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image} alt={p.name} className="img-contain" loading="lazy" />
        </Link>
      </div>

      <div className="product-card-body">
        <span className="product-card-app">{p.application}</span>
        <h3>
          <Link href={`/products/${p.category}/${p.slug}`}>{p.name}</Link>
        </h3>
        <div className="product-card-divider" />
        <ul className="product-card-bullets">
          {p.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <div className="product-card-footer">
          <div className="product-card-quick-btns">
            <button
              type="button"
              className={`card-chip-btn ${inRfq ? 'is-selected' : ''}`}
              aria-pressed={inRfq}
              aria-label={inRfq ? `Remove ${p.name} from RFQ shortlist` : `Add ${p.name} to RFQ shortlist`}
              onClick={() => toggleShortlist(p.slug)}
            >
              {inRfq ? <Check size={13} aria-hidden="true" /> : <Plus size={13} aria-hidden="true" />}
              <span>{inRfq ? 'In RFQ' : '+ RFQ'}</span>
            </button>

            <button
              type="button"
              className={`card-chip-btn ${inCompare ? 'is-selected-dark' : ''}`}
              aria-pressed={inCompare}
              aria-label={inCompare ? `Remove ${p.name} from comparison` : `Compare ${p.name}`}
              onClick={() => toggleCompare(p.slug)}
            >
              <GitCompareArrows size={13} aria-hidden="true" />
              <span>{inCompare ? 'Comparing' : 'Compare'}</span>
            </button>
          </div>

          <Link href={`/products/${p.category}/${p.slug}`} className="text-link" style={{ fontSize: 13 }}>
            <span>Specs &amp; Quote</span>
            <ChevronRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ category }: { category?: string }) {
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState(category || 'all');
  const [application, setApplication] = useState('all');
  const [interfaceFilter, setInterfaceFilter] = useState<InterfaceFilter>('all');

  const interfaceOptions: { id: InterfaceFilter; label: string }[] = [
    { id: 'all', label: 'All Interfaces' },
    { id: 'touch', label: 'Touch Panel' },
    { id: 'rotary', label: 'Rotary Dial' },
    { id: 'trv', label: 'Radiator TRV' },
    { id: 'hydronic-hub', label: 'Actuator & Hub' },
  ];

  const hasActiveFilter =
    query.trim() !== '' ||
    selectedCat !== (category || 'all') ||
    application !== 'all' ||
    interfaceFilter !== 'all';

  const filtered = products.filter(
    (p) =>
      (selectedCat === 'all' || p.category === selectedCat) &&
      (application === 'all' || p.application === application) &&
      matchesInterface(p, interfaceFilter) &&
      `${p.name} ${p.reference} ${p.eyebrow} ${p.application} ${p.highlights.join(' ')}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );

  const groupedCategories =
    selectedCat === 'all'
      ? categories.filter((c) => filtered.some((p) => p.category === c.slug))
      : categories.filter((c) => c.slug === selectedCat);

  return (
    <>
      <Container>
        <div className="catalog-layout">
          <aside className="catalog-sidebar" aria-label="Product category navigation">
            <h2>Product category</h2>
            <div className="catalog-sidebar-list" role="group" aria-label="Product categories">
              <button
                type="button"
                className="catalog-sidebar-btn"
                aria-pressed={selectedCat === 'all'}
                onClick={() => setSelectedCat('all')}
              >
                <span>All Products</span>
                <span className="catalog-sidebar-meta" aria-hidden="true">
                  <span className="catalog-sidebar-count">{products.length}</span>
                  <ChevronRight size={14} />
                </span>
              </button>
              {categories.map((cat) => {
                const count = products.filter((p) => p.category === cat.slug).length;
                return (
                  <button
                    type="button"
                    key={cat.slug}
                    className="catalog-sidebar-btn"
                    aria-pressed={selectedCat === cat.slug}
                    onClick={() => setSelectedCat(cat.slug)}
                  >
                    <span>{cat.name}</span>
                    <span className="catalog-sidebar-meta" aria-hidden="true">
                      <span className="catalog-sidebar-count">{count}</span>
                      <ChevronRight size={14} />
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="catalog-sidebar-note">
              <strong>Multi-Model B2B Tip</strong>
              <p>
                Click <strong>+ RFQ</strong> on multiple thermostats, TRVs or wiring centres to bundle a complete
                project BOM, or click <strong>Compare</strong> to inspect up to 4 models side-by-side.
              </p>
            </div>
          </aside>

          <div>
            <div className="catalog-controls">
              <label>
                Search products
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search models, SKU codes (e.g. HN-GB) or features"
                />
              </label>
              <label>
                Application
                <select value={application} onChange={(e) => setApplication(e.target.value)}>
                  <option value="all">All applications</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.application}>
                      {c.application}
                    </option>
                  ))}
                </select>
              </label>
              <span className="catalog-count" role="status">
                {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
              </span>

              <div className="catalog-parametric-row">
                <span className="mono-label catalog-parametric-label">FORM FACTOR:</span>
                <div className="catalog-chip-group" role="group" aria-label="Filter by control interface">
                  {interfaceOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt.id}
                      className={`catalog-filter-chip ${interfaceFilter === opt.id ? 'is-active' : ''}`}
                      aria-pressed={interfaceFilter === opt.id}
                      onClick={() => setInterfaceFilter(opt.id)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {hasActiveFilter && (
                  <button
                    type="button"
                    className="catalog-reset-btn"
                    onClick={() => {
                      setQuery('');
                      setSelectedCat(category || 'all');
                      setApplication('all');
                      setInterfaceFilter('all');
                    }}
                  >
                    <RotateCcw size={13} aria-hidden="true" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>

            {!filtered.length ? (
              <div className="notice-box">
                <p style={{ margin: '0 0 10px' }}>
                  No products match your search. Try another category, application or keyword.
                </p>
                <button
                  type="button"
                  className="text-link"
                  onClick={() => {
                    setQuery('');
                    setSelectedCat('all');
                    setApplication('all');
                    setInterfaceFilter('all');
                  }}
                >
                  <RotateCcw size={14} aria-hidden="true" />
                  <span>Show all 20 Heatnexis models</span>
                </button>
              </div>
            ) : (
              groupedCategories.map((group) => {
                const items = filtered.filter((p) => p.category === group.slug);
                if (!items.length) return null;
                return (
                  <section className="catalog-group" key={group.slug}>
                    <div className="catalog-group-head">
                      <div>
                        <span className="mono-label" style={{ color: 'var(--color-primary)', display: 'block', marginBottom: 4 }}>
                          {group.application}
                        </span>
                        <h3>{group.name}</h3>
                      </div>
                      <p>{group.summary}</p>
                    </div>
                    <div className="product-grid">
                      {items.map((prod) => (
                        <ProductCard key={prod.slug} product={prod} />
                      ))}
                    </div>
                  </section>
                );
              })
            )}
          </div>
        </div>
      </Container>

      <B2BCtaBand
        kicker="CUSTOM HARDWARE & PRIVATE LABEL"
        title="Need Custom Voltage, Protocol or Brand Packaging?"
        description="Every Heatnexis thermostat family supports private-label fascia branding, regional EU/UK/US back-box tooling and custom relay or wireless protocol configurations."
      />
    </>
  );
}
