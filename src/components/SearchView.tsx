'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { ChevronRight } from 'lucide-react';
import { downloads, faqs, odmCases, products } from '@/data/catalog';
import { pages } from '@/data/pages';
import { Container } from './LayoutPrimitives';

interface SearchResultEntry {
  path: string;
  badge: string;
  title: string;
  description: string;
  sku?: string;
}

function buildSearchIndex(): SearchResultEntry[] {
  const entries: SearchResultEntry[] = [];
  const seen = new Set<string>();

  for (const prod of products) {
    const path = `/products/${prod.category}/${prod.slug}`;
    seen.add(path);
    entries.push({
      path,
      badge: 'PRODUCT',
      sku: prod.reference,
      title: prod.name,
      description: `${prod.application} · ${prod.highlights.join(' · ')} — ${prod.description}`,
    });
  }

  for (const odm of odmCases) {
    const path = `/odm/${odm.slug}`;
    seen.add(path);
    entries.push({
      path,
      badge: 'ODM ARCHITECTURE',
      title: odm.title,
      description: `${odm.serviceName} · ${odm.subtitle} — ${odm.summary}`,
    });
  }

  for (const p of pages) {
    if (['home', 'search', 'sitemap', 'text'].includes(p.kind) || seen.has(p.path)) continue;
    const badgeMap: Record<string, string> = {
      catalog: 'CATEGORY',
      services: 'OEM / ODM',
      service: 'OEM / ODM',
      'odm-index': 'ODM HUB',
      solutions: 'SOLUTIONS',
      solution: 'SOLUTION',
      blog: 'INSIGHTS',
      article: 'ARTICLE',
      support: 'SUPPORT',
      faq: 'FAQ',
      downloads: 'DOWNLOADS',
      videos: 'VIDEOS',
      about: 'COMPANY',
      advantages: 'STRENGTH',
      join: 'PARTNERS',
      contact: 'B2B DESK',
    };
    entries.push({
      path: p.path,
      badge: badgeMap[p.kind] || 'PAGE',
      title: p.title,
      description: p.description,
    });
  }

  for (const dl of downloads) {
    entries.push({
      path: `/support/downloads#doc-${dl.id}`,
      badge: dl.type.toUpperCase(),
      title: dl.title,
      description: `${dl.category} · ${dl.languages}`,
    });
  }

  for (const [idx, fq] of faqs.entries()) {
    entries.push({
      path: `/support/faqs#faq-${idx + 1}`,
      badge: 'FAQ',
      title: fq.question,
      description: fq.answer,
    });
  }

  return entries;
}

const SEARCH_INDEX = buildSearchIndex();
const SUGGESTED_TERMS = ['Boiler', 'Underfloor', 'TRV', 'Wiring Centre', 'Modbus', 'HN-GB', 'Datasheet', 'ODM'];

function SearchInner() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const term = q.trim().toLowerCase();
  const found = term
    ? SEARCH_INDEX.filter((entry) =>
        `${entry.title} ${entry.sku || ''} ${entry.badge} ${entry.description}`.toLowerCase().includes(term),
      )
    : [];

  return (
    <section className="section-block">
      <Container>
        <form className="page-search" action="/search">
          <label htmlFor="search-query">Search Heatnexis products, SKU codes, solutions, services and FAQs</label>
          <div className="search-row">
            <input
              id="search-query"
              name="q"
              type="search"
              defaultValue={q}
              key={q}
              placeholder="Enter keywords such as boiler, underfloor, TRV, HN-GB, PCB..."
              required
            />
            <button className="btn-primary" type="submit">
              Search
            </button>
          </div>
          <div className="search-quick-bar" style={{ marginTop: 12 }}>
            <span className="mono-label">QUICK KEYWORDS:</span>
            {SUGGESTED_TERMS.map((kw) => (
              <Link key={kw} href={`/search?q=${encodeURIComponent(kw)}`} className="search-quick-chip">
                {kw}
              </Link>
            ))}
          </div>
        </form>

        <p role="status" style={{ fontWeight: 600 }}>
          {q ? `${found.length} ${found.length === 1 ? 'result' : 'results'} for “${q}”` : 'Enter a search term to begin.'}
        </p>

        <ul className="search-results">
          {found.map((item) => (
            <li key={`${item.path}-${item.title}`}>
              <div className="search-result-meta">
                <span className="article-tag">{item.badge}</span>
                {item.sku && <span className="mono-label">{item.sku}</span>}
              </div>
              <h2>
                <Link href={item.path}>{item.title}</Link>
              </h2>
              <p style={{ margin: '6px 0 10px', color: 'var(--color-text-muted)' }}>{item.description}</p>
              <Link href={item.path} className="text-link" style={{ fontSize: 13 }}>
                <span>Open Resource</span>
                <ChevronRight size={14} aria-hidden="true" />
              </Link>
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
