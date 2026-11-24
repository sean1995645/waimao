'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { pages } from '@/data/pages';
import { Container } from './LayoutPrimitives';

function SearchInner() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const term = q.trim().toLowerCase();
  const found = term
    ? pages.filter(
        (p) =>
          !['home', 'search', 'sitemap', 'text'].includes(p.kind) &&
          `${p.title} ${p.description}`.toLowerCase().includes(term),
      )
    : [];

  return (
    <section className="section-block">
      <Container>
        <form className="page-search" action="/search">
          <label htmlFor="search-query">Search Heatnexis products, solutions, services and articles</label>
          <div className="search-row">
            <input
              id="search-query"
              name="q"
              type="search"
              defaultValue={q}
              key={q}
              placeholder="Enter keywords such as boiler, underfloor, TRV, PCB..."
              required
            />
            <button className="btn-primary" type="submit">
              Search
            </button>
          </div>
        </form>
        <p role="status" style={{ fontWeight: 600 }}>
          {q ? `${found.length} ${found.length === 1 ? 'result' : 'results'} for “${q}”` : 'Enter a search term to begin.'}
        </p>
        <ul className="search-results">
          {found.map((item) => (
            <li key={item.path}>
              <h2>
                <Link href={item.path}>{item.title}</Link>
              </h2>
              <p style={{ margin: '6px 0 0', color: 'var(--color-text-muted)' }}>{item.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function SearchPageView() {
  return (
    <Suspense
      fallback={
        <section className="section-block">
          <Container>
            <p>Loading search...</p>
          </Container>
        </section>
      }
    >
      <SearchInner />
    </Suspense>
  );
}
