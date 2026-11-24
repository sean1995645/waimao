'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '@/data/catalog';
import type { PageRecord } from '@/data/pages';
import { DarkSectionBackdrop, HeroShowcaseVisual, ProductDeviceVisual } from './BrandVisual';
import { Container } from './LayoutPrimitives';

export function HomeHeroBanner() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const slide = heroSlides[index];
  const prev = () => setIndex((i) => (i - 1 + heroSlides.length) % heroSlides.length);
  const next = () => setIndex((i) => (i + 1) % heroSlides.length);

  return (
    <section
      className="home-banner"
      aria-label="Featured BEOK Controls OEM/ODM showcase"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="home-banner-bg" aria-hidden="true">
        <DarkSectionBackdrop theme="tech" label="BEOK Controls hero background" />
      </div>

      <div className="home-banner-inner">
        <div className="home-banner-copy">
          <p className="home-banner-eyebrow">{slide.eyebrow}</p>
          <h1>{slide.headline}</h1>
          <div className="home-banner-actions">
            <Link href={slide.ctaHref} className="btn-white">
              <span>{slide.ctaLabel}</span>
              <ChevronRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="home-banner-visual">
          <HeroShowcaseVisual slideType={slide.visualType} />
        </div>
      </div>

      <div className="banner-controls">
        <button type="button" className="banner-nav-btn" onClick={prev} aria-label="Previous slide">
          <ChevronLeft size={14} aria-hidden="true" />
          <span>PREV</span>
        </button>
        <div className="banner-progress-track" aria-hidden="true">
          <div
            className="banner-progress-fill"
            style={{
              width: `${100 / heroSlides.length}%`,
              left: `${(index * 100) / heroSlides.length}%`,
            }}
          />
        </div>
        <button type="button" className="banner-nav-btn" onClick={next} aria-label="Next slide">
          <span>NEXT</span>
          <ChevronRight size={14} aria-hidden="true" />
        </button>
      </div>

      <div className="banner-pagination-vertical" aria-hidden="true">
        <span>{String(index + 1).padStart(2, '0')}</span>
        <span className="banner-pagination-line" />
        <span>{String(heroSlides.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
}

export function HeroBanner({ page }: { page: PageRecord }) {
  if (page.kind === 'catalog') {
    return (
      <section className="pro-banner">
        <Container>
          <div className="pro-banner-inner">
            <div className="pro-banner-visual">
              <ProductDeviceVisual variant="round-dial" theme="light" label={page.title} />
            </div>
            <div className="pro-banner-copy">
              <h1>{page.title === 'Products' ? 'Professional Smart Thermostat Product Solutions' : page.title}</h1>
              <p>{page.description}</p>
              <Link href="/tailor-made-solution" className="text-link">
                <span>Explore OEM/ODM Customization</span>
                <ChevronRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="detail-banner">
      <div className="detail-banner-bg" aria-hidden="true">
        <DarkSectionBackdrop theme={page.kind === 'solutions' || page.kind === 'solution' ? 'application' : 'tech'} />
      </div>
      <div className="detail-banner-inner">
        <h1>{page.title}</h1>
        <p>{page.description}</p>
      </div>
    </section>
  );
}
