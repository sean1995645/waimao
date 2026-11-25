'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Award,
  Calendar,
  ChevronRight,
  Cpu,
  Factory,
  Flame,
  Gauge,
  Home,
  Layers,
  Network,
  Radio,
  Sliders,
  Smartphone,
  Thermometer,
  Users,
  Zap,
} from 'lucide-react';
import { articles, categories, products, services, solutions } from '@/data/catalog';
import type { VisualVariant } from '@/types/content';
import { B2BCollaborationMatrix, B2BCtaBand } from './B2BSections';
import { BackgroundVideo } from './BackgroundVideo';
import { HomeHeroBanner } from './HeroBanner';
import { Container, Reveal, SectionTitle } from './LayoutPrimitives';

function CategoryIcon({ icon }: { icon: VisualVariant }) {
  switch (icon) {
    case 'boiler':
      return <Flame size={22} aria-hidden="true" />;
    case 'electric':
      return <Zap size={22} aria-hidden="true" />;
    case 'water':
      return <Thermometer size={22} aria-hidden="true" />;
    case 'trv':
      return <Gauge size={22} aria-hidden="true" />;
    case 'actuator':
      return <Sliders size={22} aria-hidden="true" />;
    case 'wiring':
      return <Network size={22} aria-hidden="true" />;
    case 'controller':
      return <Radio size={22} aria-hidden="true" />;
  }
}

function ServiceIcon({ icon }: { icon: 'home' | 'cpu' | 'smartphone' | 'layers' }) {
  switch (icon) {
    case 'home':
      return <Home size={22} aria-hidden="true" />;
    case 'cpu':
      return <Cpu size={22} aria-hidden="true" />;
    case 'smartphone':
      return <Smartphone size={22} aria-hidden="true" />;
    case 'layers':
      return <Layers size={22} aria-hidden="true" />;
  }
}

export function HomePageView() {
  const [activeCat, setActiveCat] = useState(categories[0].slug);
  const [serviceSlide, setServiceSlide] = useState(0);
  const [appSlide, setAppSlide] = useState(0);
  const [newsPage, setNewsPage] = useState(0);
  const [mobileNewsSlide, setMobileNewsSlide] = useState(0);

  const visibleProducts = products.filter((p) => p.category === activeCat).slice(0, 4);
  const totalNewsSlides = Math.max(1, Math.ceil(articles.length / 3));
  const shownArticles = articles.slice(newsPage * 3, newsPage * 3 + 3);

  return (
    <>
      <HomeHeroBanner />

      {/* Section 1: Tailor-Made Solution (Full-width 4-strip grid on desktop / 1-slide carousel <992px) */}
      <section className="iservice" aria-labelledby="home-tailor-heading">
        <Reveal>
          <div className="section-header">
            <span className="section-eyebrow">OEM / ODM ENGINEERING</span>
            <h2 id="home-tailor-heading">Tailor-Made Solution</h2>
            <p>
              Specialized in the smart thermostat industry, Heatnexis structures end-to-end OEM/ODM workflows
              covering R&amp;D design, hardware customization, software integration and verification.
            </p>
          </div>
          <div className="iservice-grid">
            {services.map((svc, idx) => (
              <Link
                href={`/tailor-made-solution/${svc.slug}`}
                key={svc.slug}
                className={`iservice-card ${serviceSlide === idx ? 'is-slide-active' : ''}`}
              >
                <div className="iservice-card-bg" aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={svc.image} alt="" className="img-cover" loading="lazy" />
                </div>
                <div className="iservice-photo-scrim" aria-hidden="true" />
                <div className="iservice-card-rest">
                  <span className="iservice-icon-ring">
                    <ServiceIcon icon={svc.icon} />
                  </span>
                  <h3>{svc.name}</h3>
                </div>
                <div className="iservice-card-hover">
                  <span className="iservice-hover-icon" aria-hidden="true">
                    <ServiceIcon icon={svc.icon} />
                  </span>
                  <div className="iservice-hover-title">{svc.name}</div>
                  <p>{svc.shortDesc}</p>
                  <span className="iservice-more">
                    <span>Read More</span>
                    <ChevronRight size={13} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mobile-carousel-dots" role="group" aria-label="Tailor-Made Solution slides">
            {services.map((svc, idx) => (
              <button
                type="button"
                key={svc.slug}
                className={`mobile-carousel-dot ${serviceSlide === idx ? 'is-active' : ''}`}
                aria-label={`Show ${svc.name}`}
                aria-pressed={serviceSlide === idx}
                onClick={() => setServiceSlide(idx)}
              />
            ))}
          </div>
        </Reveal>
      </section>

      {/* Section 2: Products (7 Icon-Above-Label Tabs + 2x2 Dark Studio Showcase) */}
      <section className="iproducts" aria-labelledby="home-products-heading">
        <Reveal>
          <div className="section-header">
            <span className="section-eyebrow">HARDWARE LINEUP</span>
            <h2 id="home-products-heading">Products</h2>
            <p>
              Full-range smart thermostat and heating control categories — built for wholesale distribution, private-label
              OEM and custom ODM projects worldwide.
            </p>
          </div>

          <Container>
            <div className="iproducts-tabs" role="group" aria-label="Product categories">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat.slug}
                  className="iproducts-tab"
                  aria-pressed={activeCat === cat.slug}
                  onClick={() => setActiveCat(cat.slug)}
                >
                  <CategoryIcon icon={cat.icon} />
                  <span>{cat.shortName}</span>
                </button>
              ))}
            </div>
          </Container>

          <div className="iproducts-showcase-grid">
            {visibleProducts.map((prod) => (
              <Link
                href={`/products/${prod.category}/${prod.slug}`}
                key={prod.slug}
                className="iproducts-showcase-card"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={prod.darkImage}
                  alt={prod.name}
                  className="iproducts-showcase-photo"
                  loading="lazy"
                />
                <div className="iproducts-showcase-scrim" aria-hidden="true" />
                <div className="iproducts-showcase-head">
                  <span className="iproducts-showcase-eyebrow">
                    {prod.reference} · {prod.eyebrow}
                  </span>
                  <h3>{prod.name}</h3>
                  <span className="iproducts-showcase-link">
                    <span>Learn More</span>
                    <ChevronRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="iproducts-more-wrap">
            <Link href={`/products/${activeCat}`} className="btn-primary">
              <span>Explore Category</span>
              <ChevronRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Section 2B: 3-Tier B2B Collaboration Matrix (Wholesale / OEM / ODM) */}
      <B2BCollaborationMatrix />

      {/* Section 3: Applications (content1600 3x2 Visual Overlay Grid) */}
      <section className="section-block" aria-labelledby="home-applications-heading">
        <Reveal>
          <Container>
            <div className="section-header">
              <span className="section-eyebrow">HEATING SCENARIOS</span>
              <h2 id="home-applications-heading">Applications</h2>
              <p>
                Structured heating control solutions tailored for residential, commercial, underfloor and OEM/ODM
                project scenarios.
              </p>
            </div>

            <div className="iapply-grid">
              {solutions.map((sol, idx) => (
                <Link
                  href={`/solutions/${sol.slug}`}
                  key={sol.slug}
                  className={`iapply-card ${appSlide === idx ? 'is-slide-active' : ''}`}
                >
                  <div className="iapply-card-bg" aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={sol.image} alt="" className="img-cover" loading="lazy" />
                  </div>
                  <div className="iapply-card-overlay">
                    <h3>{sol.name}</h3>
                    <p>{sol.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mobile-carousel-dots" role="group" aria-label="Application slides">
              {solutions.map((sol, idx) => (
                <button
                  type="button"
                  key={sol.slug}
                  className={`mobile-carousel-dot ${appSlide === idx ? 'is-active' : ''}`}
                  aria-label={`Show ${sol.name}`}
                  aria-pressed={appSlide === idx}
                  onClick={() => setAppSlide(idx)}
                />
              ))}
            </div>
          </Container>
        </Reveal>
      </section>

      {/* Section 4: Company Introduction (Full-bleed Banner + Overlapping 3-Col White Strip) */}
      <section className="section-block" style={{ paddingBottom: 0 }} aria-labelledby="home-about-heading">
        <Reveal>
          <SectionTitle
            eyebrow="GLOBAL MANUFACTURING PARTNER"
            title="Company Introduction"
            subtitle="One-stop Smart Thermostat & Heating Control Solution Partner"
          />

          <div className="iaboutus-band">
            <div className="iaboutus-bg" aria-hidden="true">
              <BackgroundVideo videoSrc="/videos/bg/factory-smt.mp4" posterSrc="/images/factory/home-about.jpg" />
            </div>
            <div className="iaboutus-photo-scrim" aria-hidden="true" />

            <div className="iaboutus-inner">
              <div className="iaboutus-copy">
                <h3 id="home-about-heading">Why Choose Heatnexis</h3>
                <p>
                  Heatnexis supplies B2B smart thermostats, radiator valves, thermal actuators, wiring centres and
                  connected HVAC controllers for international distributors, wholesalers, contractors and brand partners—
                  supporting sample evaluation, private-label OEM and full-cycle ODM engineering.
                </p>
                <Link href="/about" className="btn-white">
                  <span>About Heatnexis</span>
                  <ChevronRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="iaboutus-stats-bar" aria-label="Heatnexis capability highlights">
              <div className="iaboutus-stat">
                <Factory size={26} className="iaboutus-stat-icon" aria-hidden="true" />
                <div>
                  <strong>7 Categories</strong>
                  <span>Heating Control Lines</span>
                </div>
              </div>
              <div className="iaboutus-stat">
                <Award size={26} className="iaboutus-stat-icon" aria-hidden="true" />
                <div>
                  <strong>OEM / ODM</strong>
                  <span>4 Engineering Pillars</span>
                </div>
              </div>
              <div className="iaboutus-stat">
                <Users size={26} className="iaboutus-stat-icon" aria-hidden="true" />
                <div>
                  <strong>Global B2B</strong>
                  <span>Wholesale &amp; Brand Supply</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Section 5: News and Information (3-col Cards + Dots) */}
      <section className="section-block" aria-labelledby="home-news-heading">
        <Reveal>
          <Container>
            <div className="section-header">
              <span className="section-eyebrow">TECHNICAL INSIGHTS</span>
              <h2 id="home-news-heading">News and Information</h2>
              <p>Technical buying guides, HVAC heating control knowledge and OEM/ODM insights from Heatnexis.</p>
            </div>

            <div className="inews-grid home-news-grid">
              {shownArticles.map((art, idx) => (
                <article
                  className={`article-card ${mobileNewsSlide % shownArticles.length === idx ? 'is-slide-active' : ''}`}
                  key={art.slug}
                >
                  <Link href={`/blog/${art.slug}`} className="article-card-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={art.image} alt={art.title} className="img-cover" loading="lazy" />
                  </Link>
                  <div className="article-card-body">
                    <span className="article-tag">{art.category}</span>
                    <h3>
                      <Link href={`/blog/${art.slug}`}>{art.title}</Link>
                    </h3>
                    <div className="article-meta">
                      <Calendar size={14} aria-hidden="true" />
                      <span>{art.date}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="inews-dots" role="group" aria-label="News pages">
              {Array.from({ length: totalNewsSlides }, (_, idx) => (
                <button
                  type="button"
                  key={idx}
                  className={`inews-dot ${newsPage === idx ? 'is-active' : ''}`}
                  aria-label={`Show news group ${idx + 1}`}
                  aria-pressed={newsPage === idx}
                  onClick={() => {
                    setNewsPage(idx);
                    setMobileNewsSlide(idx);
                  }}
                />
              ))}
            </div>
          </Container>
        </Reveal>
      </section>

      {/* Section 6: Pre-Footer B2B Conversion Callout Band */}
      <B2BCtaBand />
    </>
  );
}
