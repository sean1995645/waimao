'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Cpu, Factory, Globe2, Pause, Play, ShieldCheck } from 'lucide-react';
import { heroSlides } from '@/data/catalog';
import type { PageRecord } from '@/data/pages';
import { BackgroundVideo } from './BackgroundVideo';
import { Container } from './LayoutPrimitives';

export function HomeHeroBanner() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);

  useEffect(() => {
    if (paused || videoPaused) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, 8000);
    return () => window.clearInterval(timer);
  }, [paused, videoPaused]);

  const slide = heroSlides[index];
  const prev = () => setIndex((i) => (i - 1 + heroSlides.length) % heroSlides.length);
  const next = () => setIndex((i) => (i + 1) % heroSlides.length);

  return (
    <section
      className="home-banner"
      aria-label="Featured Heatnexis OEM/ODM showcase"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="home-banner-bg" aria-hidden="true">
        <BackgroundVideo
          videoSrc={slide.video}
          posterSrc={slide.image}
          mobilePosterSrc={slide.mobileImage}
          paused={videoPaused}
        />
      </div>
      <div className="banner-photo-scrim" aria-hidden="true" />

      <div className="home-banner-inner">
        <div className="home-banner-copy">
          <p className="home-banner-eyebrow">{slide.eyebrow}</p>
          <h1>{slide.headline}</h1>
          <div className="home-banner-actions">
            <Link href={slide.ctaHref} className="btn-primary">
              <span>{slide.ctaLabel}</span>
              <ChevronRight size={15} aria-hidden="true" />
            </Link>
            <Link href="/contact" className="btn-ghost-white">
              <span>Request B2B Quote</span>
              <ChevronRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div aria-hidden="true" />
      </div>

      <div className="hero-controls-row">
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
          <button
            type="button"
            className="banner-nav-btn"
            onClick={() => setVideoPaused((v) => !v)}
            aria-label={videoPaused ? 'Play background video' : 'Pause background video'}
            aria-pressed={videoPaused}
          >
            {videoPaused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
          </button>
        </div>

        <div className="banner-pagination-vertical" aria-hidden="true">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span className="banner-pagination-line" />
          <span>{String(heroSlides.length).padStart(2, '0')}</span>
        </div>
      </div>

      <div className="hero-trust-bar" aria-label="Heatnexis B2B capabilities">
        <Container>
          <div className="hero-trust-grid">
            <div className="hero-trust-item">
              <span className="hero-trust-icon" aria-hidden="true">
                <Factory size={18} />
              </span>
              <div>
                <strong>7 Heating Control Lines</strong>
                <span>Boiler, Underfloor, TRV &amp; Hubs</span>
              </div>
            </div>
            <div className="hero-trust-item">
              <span className="hero-trust-icon" aria-hidden="true">
                <Cpu size={18} />
              </span>
              <div>
                <strong>Full-Stack OEM / ODM</strong>
                <span>PCB, Firmware, ID &amp; Mobile App</span>
              </div>
            </div>
            <div className="hero-trust-item">
              <span className="hero-trust-icon" aria-hidden="true">
                <ShieldCheck size={18} />
              </span>
              <div>
                <strong>Regional Wall-Box Ready</strong>
                <span>EU 86mm, UK &amp; North America</span>
              </div>
            </div>
            <div className="hero-trust-item">
              <span className="hero-trust-icon" aria-hidden="true">
                <Globe2 size={18} />
              </span>
              <div>
                <strong>Global B2B Export</strong>
                <span>Distributors, HVAC &amp; Brand OEM</span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

function resolveInnerBannerMedia(kind: PageRecord['kind']): { poster: string; video: string } {
  switch (kind) {
    case 'services':
    case 'service':
      return { poster: '/images/services/banner.jpg', video: '/videos/bg/engineering-pcb.mp4' };
    case 'odm-index':
    case 'odm-detail':
      return { poster: '/images/services/odm-banner.jpg', video: '/videos/bg/engineering-pcb.mp4' };
    case 'solutions':
    case 'solution':
    case 'blog':
    case 'article':
      return { poster: '/images/solutions/smart-home.jpg', video: '/videos/bg/hero-smart-home.mp4' };
    case 'support':
    case 'faq':
    case 'downloads':
    case 'videos':
      return { poster: '/images/hero/slide-2.jpg', video: '/videos/bg/hero-rd-lab.mp4' };
    default:
      return { poster: '/images/factory/home-about.jpg', video: '/videos/bg/factory-smt.mp4' };
  }
}

export function HeroBanner({ page }: { page: PageRecord }) {
  if (page.kind === 'catalog') {
    return (
      <section className="pro-banner">
        <Container>
          <div className="pro-banner-inner">
            <div className="pro-banner-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/products/pro-banner.png"
                alt="Heatnexis Smart Thermostat Lineup"
                className="img-cover"
              />
            </div>
            <div className="pro-banner-copy">
              <span className="section-eyebrow">HEATNEXIS · PRODUCT PORTFOLIO</span>
              <h1>{page.title === 'Products' ? 'Professional Smart Thermostat Product Solutions' : page.title}</h1>
              <p>{page.description}</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn-primary">
                  <span>Request Price List &amp; Samples</span>
                  <ChevronRight size={15} aria-hidden="true" />
                </Link>
                <Link href="/tailor-made-solution" className="btn-outline">
                  <span>OEM/ODM Customization</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  const media = resolveInnerBannerMedia(page.kind);

  return (
    <section className="detail-banner">
      <div className="detail-banner-bg" aria-hidden="true">
        <BackgroundVideo videoSrc={media.video} posterSrc={media.poster} />
      </div>
      <div className="banner-photo-scrim" aria-hidden="true" />
      <div className="detail-banner-inner">
        <span className="detail-banner-kicker">HEATNEXIS · THERMAL CONTROL ENGINEERING</span>
        <h1>{page.title}</h1>
        <p>{page.description}</p>
      </div>
    </section>
  );
}
