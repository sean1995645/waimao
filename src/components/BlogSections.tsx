'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Calendar, ChevronRight, Clock } from 'lucide-react';
import { articleCategories, articles } from '@/data/catalog';
import type { ArticleRecord } from '@/types/content';
import { B2BCtaBand } from './B2BSections';
import { Container, Pagination, SectionTitle } from './LayoutPrimitives';

export function ArticleCard({ article }: { article: ArticleRecord }) {
  return (
    <article className="article-card">
      <Link href={`/blog/${article.slug}`} className="article-card-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={article.image} alt={article.title} className="img-cover" loading="lazy" />
      </Link>
      <div className="article-card-body">
        <span className="article-tag">{article.category}</span>
        <h3>
          <Link href={`/blog/${article.slug}`}>{article.title}</Link>
        </h3>
        <p className="article-card-excerpt">{article.excerpt}</p>
        <div className="article-meta">
          <Calendar size={14} aria-hidden="true" />
          <span>{article.date}</span>
        </div>
      </div>
    </article>
  );
}

function BlogIndexInner({
  activeCategory,
  currentPath,
}: {
  activeCategory?: string;
  currentPath: string;
}) {
  const searchParams = useSearchParams();
  const requestedPage = Number(searchParams.get('page')) || 1;
  const list = activeCategory ? articles.filter((a) => a.category === activeCategory) : articles;
  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(list.length / pageSize));
  const current = Math.min(Math.max(1, requestedPage), totalPages);
  const shown = list.slice((current - 1) * pageSize, current * pageSize);

  return (
    <section className="section-block">
      <Container>
        <nav className="pill-tab-bar" aria-label="Article categories">
          <Link href="/blog" className="pill-tab-btn" aria-current={!activeCategory ? 'page' : undefined}>
            All Articles
          </Link>
          {articleCategories.map((cat, idx) => {
            const href = `/blog/category/${idx + 1}`;
            return (
              <Link
                key={cat}
                href={href}
                className="pill-tab-btn"
                aria-current={activeCategory === cat ? 'page' : undefined}
              >
                {cat}
              </Link>
            );
          })}
        </nav>

        <div className="inews-grid" style={{ marginTop: 28 }}>
          {shown.map((art) => (
            <ArticleCard key={art.slug} article={art} />
          ))}
        </div>

        <Pagination current={current} total={totalPages} base={currentPath} />
      </Container>
    </section>
  );
}

export function BlogIndexView({
  activeCategory,
  currentPath,
}: {
  activeCategory?: string;
  currentPath: string;
}) {
  return (
    <>
      <Suspense
        fallback={
          <section className="section-block">
            <Container>
              <div className="inews-grid" style={{ marginTop: 28 }}>
                {(activeCategory ? articles.filter((a) => a.category === activeCategory) : articles)
                  .slice(0, 6)
                  .map((art) => (
                    <ArticleCard key={art.slug} article={art} />
                  ))}
              </div>
            </Container>
          </section>
        }
      >
        <BlogIndexInner activeCategory={activeCategory} currentPath={currentPath} />
      </Suspense>

      <B2BCtaBand
        kicker="HVAC TECHNICAL SOURCING"
        title="Have Specific Heating Interface or OEM Questions?"
        description="Speak directly with our applications engineering team to align thermostat specifications with your regional boiler or underfloor systems."
      />
    </>
  );
}

export function BlogDetailView({ article }: { article: ArticleRecord }) {
  const idx = articles.findIndex((a) => a.slug === article.slug);
  const nextArticle = articles[(idx + 1) % articles.length];
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);
  const wordCount = article.body.join(' ').split(/\s+/).length;
  const readMins = Math.max(2, Math.ceil(wordCount / 160));

  return (
    <>
      <section className="section-block">
        <Container>
          <article className="prose">
            <span className="article-tag" style={{ marginBottom: 12 }}>
              {article.category}
            </span>
            <h2 style={{ marginTop: 0 }}>{article.title}</h2>
            <div className="article-detail-meta">
              <span>
                <Calendar size={14} aria-hidden="true" /> {article.date}
              </span>
              <span>Heatnexis Engineering Editorial</span>
              <span>
                <Clock size={14} aria-hidden="true" /> {readMins} min technical read
              </span>
            </div>

            <div className="article-detail-hero-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.image} alt={article.title} className="img-cover" />
            </div>

            {article.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}

            <div className="article-inline-cta-box">
              <span className="mono-label" style={{ color: 'var(--color-primary)' }}>
                B2B PROJECT BRIEF CHECKLIST
              </span>
              <h3 style={{ marginTop: 6 }}>Prepare a Clear B2B Project Brief</h3>
              <p>
                Document the heating system type, power supply, installation back-box standard, wireless protocol needs
                and required regional compliance documentation before finalizing samples or tooling.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 14 }}>
                <Link href="/contact#inquiry" className="btn-primary">
                  <span>Request a B2B Quote</span>
                  <ChevronRight size={15} aria-hidden="true" />
                </Link>
                <Link href="/products" className="btn-outline">
                  <span>Browse Thermostat Lineup</span>
                </Link>
              </div>
            </div>

            <div className="article-tags-row">
              <strong>Tags:</strong>
              {article.tags.map((tag) => (
                <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`} className="article-tag-pill">
                  {tag}
                </Link>
              ))}
            </div>

            <div className="article-detail-nav">
              <Link href={`/blog/${nextArticle.slug}`} className="text-link">
                <span>Next: {nextArticle.title}</span>
                <ChevronRight size={15} aria-hidden="true" />
              </Link>
              <Link href="/blog" className="btn-dark">
                Back to List
              </Link>
            </div>
          </article>
        </Container>
      </section>

      <section className="section-block is-surface">
        <Container>
          <SectionTitle title="Related Articles" subtitle="Continue reading Heatnexis technical resources." />
          <div className="inews-grid">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
