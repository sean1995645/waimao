'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { categories, products } from '@/data/catalog';
import type { ProductRecord } from '@/types/content';
import { Container } from './LayoutPrimitives';

export function ProductCard({ product: p }: { product: ProductRecord }) {
  return (
    <article className="product-card">
      <Link href={`/products/${p.category}/${p.slug}`} className="product-card-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.name} className="img-contain" loading="lazy" />
      </Link>
      <div className="product-card-body">
        <h3>
          <Link href={`/products/${p.category}/${p.slug}`}>{p.name}</Link>
        </h3>
        <div className="product-card-divider" />
        <ul className="product-card-bullets">
          {p.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function ProductGrid({ category }: { category?: string }) {
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState(category || 'all');
  const [application, setApplication] = useState('all');

  const filtered = products.filter(
    (p) =>
      (selectedCat === 'all' || p.category === selectedCat) &&
      (application === 'all' || p.application === application) &&
      `${p.name} ${p.eyebrow} ${p.application} ${p.highlights.join(' ')}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );

  const groupedCategories =
    selectedCat === 'all'
      ? categories.filter((c) => filtered.some((p) => p.category === c.slug))
      : categories.filter((c) => c.slug === selectedCat);

  return (
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
              <ChevronRight size={14} aria-hidden="true" />
            </button>
            {categories.map((cat) => (
              <button
                type="button"
                key={cat.slug}
                className="catalog-sidebar-btn"
                aria-pressed={selectedCat === cat.slug}
                onClick={() => setSelectedCat(cat.slug)}
              >
                <span>{cat.name}</span>
                <ChevronRight size={14} aria-hidden="true" />
              </button>
            ))}
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
                placeholder="Search thermostat models or features"
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
          </div>

          {!filtered.length ? (
            <div className="notice-box" role="status">
              No products match your search. Try another category, application or keyword.
            </div>
          ) : (
            groupedCategories.map((group) => {
              const items = filtered.filter((p) => p.category === group.slug);
              if (!items.length) return null;
              return (
                <section className="catalog-group" key={group.slug}>
                  <div className="catalog-group-head">
                    <h3>{group.name}</h3>
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
  );
}
