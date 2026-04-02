import React, { startTransition, useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import ProductCard from '@/components/ProductCard';
import Seo, { SITE_URL, toAbsoluteUrl } from '@/components/Seo';
import TransitionLink from '@/components/TransitionLink';
import { featuredProducts } from '@/data/products';

const HomePage: React.FC = () => {
  const intl = useIntl();
  const heroSlides = [
    {
      id: 'home',
      desktopImage: '/home-hero-thermostat.jpg',
      mobileImage: '/home-hero-thermostat-mobile.jpg',
      position: '70% center',
      label: intl.formatMessage({ id: 'nav.home' }),
      eyebrow: intl.formatMessage({ id: 'home.hero.eyebrow' }),
      title: intl.formatMessage({ id: 'home.hero.title' }),
      subtitle: intl.formatMessage({ id: 'home.hero.subtitle' }),
      description: intl.formatMessage({ id: 'home.hero.description' }),
      primaryTo: '/products',
      primaryLabel: intl.formatMessage({ id: 'home.hero.viewProducts' }),
      secondaryTo: '/contact',
      secondaryLabel: intl.formatMessage({ id: 'home.hero.getInTouch' }),
      accentClass: 'from-[rgba(0,0,0,0.8)] via-[rgba(0,0,0,0.5)] to-transparent',
    },
    {
      id: 'products',
      desktopImage: '/page-hero-products-photo.jpg',
      mobileImage: '/page-hero-products-photo-mobile.jpg',
      position: 'center center',
      label: intl.formatMessage({ id: 'nav.products' }),
      eyebrow: intl.formatMessage({ id: 'products.hero.eyebrow' }),
      title: intl.formatMessage({ id: 'products.hero.title' }),
      subtitle: intl.formatMessage({ id: 'products.hero.panelTitle' }),
      description: intl.formatMessage({ id: 'products.hero.description' }),
      primaryTo: '/products',
      primaryLabel: intl.formatMessage({ id: 'home.hero.viewProducts' }),
      secondaryTo: '/contact',
      secondaryLabel: intl.formatMessage({ id: 'product.detail.requestQuote', defaultMessage: 'Request quote for this model' }),
      accentClass: 'from-[rgba(0,0,0,0.8)] via-[rgba(0,0,0,0.5)] to-transparent',
    },
    {
      id: 'about',
      desktopImage: '/page-hero-about-photo.jpg',
      mobileImage: '/page-hero-about-photo-mobile.jpg',
      position: 'center center',
      label: intl.formatMessage({ id: 'nav.about' }),
      eyebrow: intl.formatMessage({ id: 'about.hero.eyebrow' }),
      title: intl.formatMessage({ id: 'about.hero.title' }),
      subtitle: intl.formatMessage({ id: 'about.hero.panelTitle' }),
      description: intl.formatMessage({ id: 'about.hero.description' }),
      primaryTo: '/about',
      primaryLabel: intl.formatMessage({ id: 'home.why.learnMore' }),
      secondaryTo: '/contact',
      secondaryLabel: intl.formatMessage({ id: 'home.hero.getInTouch' }),
      accentClass: 'from-[rgba(0,0,0,0.8)] via-[rgba(0,0,0,0.5)] to-transparent',
    },
    {
      id: 'contact',
      desktopImage: '/page-hero-contact-photo.jpg',
      mobileImage: '/page-hero-contact-photo-mobile.jpg',
      position: 'center center',
      label: intl.formatMessage({ id: 'nav.contact' }),
      eyebrow: intl.formatMessage({ id: 'contact.hero.eyebrow' }),
      title: intl.formatMessage({ id: 'contact.hero.title' }),
      subtitle: intl.formatMessage({ id: 'contact.hero.panelTitle' }),
      description: intl.formatMessage({ id: 'contact.hero.description' }),
      primaryTo: '/contact',
      primaryLabel: intl.formatMessage({ id: 'home.cta.button' }),
      secondaryTo: '/products',
      secondaryLabel: intl.formatMessage({ id: 'home.hero.viewProducts' }),
      accentClass: 'from-[rgba(0,0,0,0.8)] via-[rgba(0,0,0,0.5)] to-transparent',
    },
  ];
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const currentHeroSlide = heroSlides[activeHeroSlide];
  const heroDragStartXRef = useRef<number | null>(null);
  const heroDragDeltaXRef = useRef(0);
  const heroPointerIdRef = useRef<number | null>(null);
  const isHeroDraggingRef = useRef(false);
  const homeTitle = `${intl.formatMessage({ id: 'home.hero.title' })} ${intl.formatMessage({ id: 'home.hero.subtitle' })} | HeatNexis`;
  const homeDescription = intl.formatMessage({ id: 'home.hero.description' });
  const globalMarkets = [
    intl.formatMessage({ id: 'region.europe' }),
    intl.formatMessage({ id: 'region.middleEast' }),
    intl.formatMessage({ id: 'region.southeastAsia' }),
    intl.formatMessage({ id: 'region.northAmerica' }),
  ];
  const homeStructuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'HeatNexis',
      url: SITE_URL,
      logo: toAbsoluteUrl('/heatnexis-logo.png'),
      email: 'sales@heatnexis.com',
      telephone: '+86 138 0010 2400',
      description: homeDescription,
      areaServed: 'Worldwide',
      knowsAbout: [
        'Underfloor heating thermostats',
        'WiFi thermostats',
        'Zigbee thermostats',
        'Heating control centers',
        'OEM thermostat manufacturing',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'HeatNexis',
      url: SITE_URL,
      description: homeDescription,
      inLanguage: intl.locale,
    },
  ];

  const setHeroSlide = (index: number) => {
    startTransition(() => {
      setActiveHeroSlide((index + heroSlides.length) % heroSlides.length);
    });
  };

  const goToPreviousHeroSlide = () => {
    setHeroSlide(activeHeroSlide - 1);
  };

  const goToNextHeroSlide = () => {
    setHeroSlide(activeHeroSlide + 1);
  };

  const resetHeroDrag = () => {
    heroDragStartXRef.current = null;
    heroDragDeltaXRef.current = 0;
    heroPointerIdRef.current = null;
    isHeroDraggingRef.current = false;
    setDragOffset(0);
  };

  const handleHeroPointerDown = (event: React.PointerEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('a, button')) {
      return;
    }

    heroDragStartXRef.current = event.clientX;
    heroDragDeltaXRef.current = 0;
    heroPointerIdRef.current = event.pointerId;
    isHeroDraggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleHeroPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!isHeroDraggingRef.current || heroPointerIdRef.current !== event.pointerId || heroDragStartXRef.current === null) {
      return;
    }

    const deltaX = event.clientX - heroDragStartXRef.current;
    heroDragDeltaXRef.current = deltaX;
    setDragOffset(deltaX);
  };

  const handleHeroPointerEnd = (event: React.PointerEvent<HTMLElement>) => {
    if (heroPointerIdRef.current !== event.pointerId || heroDragStartXRef.current === null) {
      return;
    }

    const dragThreshold = 70;
    const deltaX = heroDragDeltaXRef.current;

    if (deltaX <= -dragThreshold) {
      goToNextHeroSlide();
    } else if (deltaX >= dragThreshold) {
      goToPreviousHeroSlide();
    } else if (Math.abs(deltaX) < 10) {
      const rect = event.currentTarget.getBoundingClientRect();
      const clickX = event.clientX - rect.left;

      if (clickX >= rect.width / 2) {
        goToNextHeroSlide();
      } else {
        goToPreviousHeroSlide();
      }
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    resetHeroDrag();
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveHeroSlide((currentIndex) => (currentIndex + 1) % heroSlides.length);
    }, 6000);

    return () => {
      window.clearInterval(interval);
      resetHeroDrag();
    };
  }, [heroSlides.length]);

  return (
    <div className="w-full">
      <Seo
        title={homeTitle}
        description={homeDescription}
        path="/"
        image="/home-hero-thermostat.jpg"
        keywords={['OEM underfloor heating thermostats', 'HVAC thermostat supplier', 'floor heating controls']}
        structuredData={homeStructuredData}
      />
      {/* Hero Section */}
      <section
        className="relative h-screen min-h-[650px] max-md:min-h-[600px] flex items-center overflow-hidden text-white touch-pan-y select-none"
        onPointerDown={handleHeroPointerDown}
        onPointerMove={handleHeroPointerMove}
        onPointerUp={handleHeroPointerEnd}
        onPointerCancel={handleHeroPointerEnd}
        onPointerLeave={handleHeroPointerEnd}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="flex h-full w-full transition-transform"
            style={{
              transform: `translateX(calc(-${activeHeroSlide * 100}% + ${dragOffset}px))`,
              transitionDuration: isHeroDraggingRef.current ? '0ms' : '1200ms',
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              willChange: 'transform',
            }}
          >
            {heroSlides.map((slide, index) => (
              <div key={slide.id} className="relative h-full w-full flex-shrink-0">
                <div
                  className="absolute inset-0 hidden bg-cover bg-no-repeat motion-safe:animate-kenburns md:block"
                  style={{ backgroundImage: `url('${slide.desktopImage}')`, backgroundPosition: slide.position }}
                ></div>
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat motion-safe:animate-kenburns md:hidden"
                  style={{ backgroundImage: `url('${slide.mobileImage}')` }}
                ></div>
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.accentClass}`}></div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-y-0 right-0 z-[2] hidden w-[132px] items-center justify-center pr-6 lg:flex">
          <div className="flex w-full flex-col items-center gap-3 rounded-[1.8rem] border border-white/12 bg-[rgba(8,17,30,0.34)] px-3 py-4 backdrop-blur-xl shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
            <div className="flex w-full flex-col gap-2">
              {heroSlides.map((slide, index) => {
                const isActive = index === activeHeroSlide;

                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setHeroSlide(index)}
                    className={`overflow-hidden rounded-2xl border text-left transition-all duration-300 ${
                      isActive
                        ? 'border-white/18 bg-white/14 text-white shadow-[0_10px_24px_rgba(0,0,0,0.16)]'
                        : 'border-transparent bg-white/[0.05] text-white/58 hover:border-white/10 hover:text-white/88'
                    }`}
                  >
                    <div className="relative h-16 w-full overflow-hidden">
                      <img
                        src={slide.desktopImage}
                        alt={slide.label}
                        className={`h-full w-full object-cover transition-transform duration-500 ${isActive ? 'scale-105' : 'scale-100'}`}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,13,24,0.08),rgba(5,13,24,0.46))]"></div>
                      <div className="absolute left-2 top-2 inline-flex rounded-full bg-[rgba(8,17,30,0.62)] px-2 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-white/86 backdrop-blur-sm">
                        {`${String(index + 1).padStart(2, '0')}`}
                      </div>
                    </div>
                    <div className="px-3 py-2.5">
                      <p className="text-[0.76rem] font-semibold leading-tight">{slide.label}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 max-md:px-5 relative z-[2] pt-20 max-md:pt-16 w-full lg:pr-28">
          <div className="max-w-[720px]">
            <div className="motion-pop mb-6 flex flex-wrap items-center gap-3 max-md:mb-4">
              <p className="inline-block text-[0.8rem] max-md:text-[0.7rem] font-bold tracking-[0.18em] max-md:tracking-[0.15em] uppercase text-white/90 px-5 max-md:px-4 py-2 max-md:py-1.5 border border-white/30 rounded-full backdrop-blur-md bg-white/5 shadow-lg motion-safe:animate-pulseGlow">{currentHeroSlide.eyebrow}</p>
              <div className="hidden items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/72 backdrop-blur-md md:inline-flex">
                <span>{currentHeroSlide.label}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-white/50"></span>
                <span>{`${String(activeHeroSlide + 1).padStart(2, '0')}/${String(heroSlides.length).padStart(2, '0')}`}</span>
              </div>
            </div>
            <h1 className="motion-fade-up animation-delay-100 text-[clamp(2.8rem,5.5vw,4.5rem)] max-md:text-[2rem] font-bold leading-[1.12] max-md:leading-[1.15] mb-7 max-md:mb-5 tracking-[-0.025em] drop-shadow-2xl">
              {currentHeroSlide.title}
              {currentHeroSlide.subtitle && (
                <>
                  <br />
                  {currentHeroSlide.subtitle}
                </>
              )}
            </h1>
            <p className="motion-fade-up animation-delay-200 text-[1.15rem] max-md:text-[0.95rem] leading-[1.75] max-md:leading-[1.65] text-white/85 mb-12 max-md:mb-8 max-w-[560px] drop-shadow-lg">
              {currentHeroSlide.description}
            </p>
            <div className="motion-fade-up animation-delay-300 flex max-md:flex-col gap-4 max-md:gap-3 flex-wrap">
              <TransitionLink to={currentHeroSlide.primaryTo} className="inline-flex items-center px-9 max-md:px-6 py-4 max-md:py-3.5 bg-white text-hn-primary font-bold text-[0.95rem] max-md:text-[0.88rem] rounded-lg no-underline transition-all duration-300 max-md:justify-center hover:bg-[#f0f4f8] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)] shadow-xl">{currentHeroSlide.primaryLabel}</TransitionLink>
              <TransitionLink to={currentHeroSlide.secondaryTo} className="inline-flex items-center px-9 max-md:px-6 py-4 max-md:py-3.5 bg-white/10 text-white font-bold text-[0.95rem] max-md:text-[0.88rem] rounded-lg border-2 border-white/40 no-underline transition-all duration-300 backdrop-blur-md max-md:justify-center hover:bg-white/20 hover:border-white/60 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(255,255,255,0.15)]">{currentHeroSlide.secondaryLabel}</TransitionLink>
            </div>

            <div className="motion-fade-up animation-delay-300 mt-6 flex items-center justify-between gap-3 rounded-[1.2rem] border border-white/12 bg-[rgba(8,18,32,0.26)] px-4 py-3 backdrop-blur-md lg:hidden">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/62">
                  {currentHeroSlide.label}
                </p>
                <p className="mt-1 text-[0.9rem] font-semibold text-white/92">{currentHeroSlide.title}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToPreviousHeroSlide}
                  aria-label="Previous hero background"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-white/8 text-white"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={goToNextHeroSlide}
                  aria-label="Next hero background"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-white/8 text-white"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[2] max-md:hidden hero-scroll-hint">
          <span className="block w-6 h-[38px] border-2 border-white/50 rounded-xl relative"></span>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-hn-primary py-10 max-md:py-4">
        <div className="max-w-[1200px] mx-auto px-5 max-md:px-4">
          <div className="grid grid-cols-4 max-md:grid-cols-2 gap-0">
            <div className="motion-fade-up flex flex-col items-center border-r max-md:border-r max-md:border-b border-white/10 py-4 max-md:py-3 px-3 max-md:px-2 last:border-r-0 max-md:last:border-r max-md:[&:nth-child(2)]:border-r-0 max-md:[&:nth-child(n+3)]:border-b-0">
              <span className="mb-1.5 text-2xl max-md:text-xl font-bold leading-none tracking-[-0.02em] text-white">10+</span>
              <span className="text-center text-[0.85rem] max-md:text-[0.7rem] tracking-[0.03em] text-white/55 leading-[1.45]">{intl.formatMessage({ id: 'stats.yearsExperience' })}</span>
            </div>
            <div className="motion-fade-up animation-delay-100 flex flex-col items-center border-r max-md:border-r-0 max-md:border-b border-white/10 py-4 max-md:py-3 px-3 max-md:px-2 last:border-r-0 max-md:[&:nth-child(n+3)]:border-b-0">
              <span className="mb-1.5 text-2xl max-md:text-xl font-bold leading-none tracking-[-0.02em] text-white">30+</span>
              <span className="text-center text-[0.85rem] max-md:text-[0.7rem] tracking-[0.03em] text-white/55 leading-[1.45]">{intl.formatMessage({ id: 'stats.controlSKUs' })}</span>
            </div>
            <div className="motion-fade-up animation-delay-200 flex flex-col items-center border-r max-md:border-r border-white/10 py-4 max-md:py-3 px-3 max-md:px-2 last:border-r-0 max-md:last:border-r max-md:[&:nth-child(n+3)]:border-b-0">
              <span className="mb-1.5 text-2xl max-md:text-xl font-bold leading-none tracking-[-0.02em] text-white">40+</span>
              <span className="text-center text-[0.85rem] max-md:text-[0.7rem] tracking-[0.03em] text-white/55 leading-[1.45]">{intl.formatMessage({ id: 'stats.oemMarkets' })}</span>
            </div>
            <div className="motion-fade-up animation-delay-300 flex flex-col items-center py-4 max-md:py-3 px-3 max-md:px-2">
              <span className="mb-1.5 text-2xl max-md:text-xl font-bold leading-none tracking-[-0.02em] text-white">ISO / CE</span>
              <span className="text-center text-[0.85rem] max-md:text-[0.7rem] tracking-[0.03em] text-white/55 leading-[1.45]">{intl.formatMessage({ id: 'stats.qualityCompliance' })}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-8 max-md:py-5 bg-gradient-to-b from-hn-surface to-white">
        <div className="max-w-[1200px] mx-auto px-6 max-md:px-4">
          <div className="motion-fade-up text-center mb-14 max-md:mb-6">
            <p className="inline-block text-[0.75rem] max-md:text-[0.68rem] font-bold tracking-[0.2em] max-md:tracking-[0.18em] uppercase text-hn-accent mb-4 max-md:mb-2 px-4 max-md:px-3.5 py-1.5 max-md:py-1 bg-hn-accent/10 rounded-full">{intl.formatMessage({ id: 'home.featured.eyebrow' })}</p>
            <h2 className="text-[clamp(2rem,3.5vw,2.8rem)] max-md:text-[1.6rem] font-bold text-hn-primary tracking-[-0.025em] leading-tight">{intl.formatMessage({ id: 'home.featured.title' })}</h2>
            <p className="text-gray-600 text-[1.05rem] max-md:text-[0.9rem] mt-4 max-md:mt-2 max-w-[600px] mx-auto px-4 max-md:px-0">{intl.formatMessage({ id: 'home.featured.description' })}</p>
          </div>
          <div className="grid grid-cols-4 max-md:grid-cols-2 gap-4 max-md:gap-2.5 mb-14 max-md:mb-6" id="productGrid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          <div className="motion-fade-up animation-delay-200 text-center">
            <TransitionLink to="/products" className="inline-flex items-center px-10 max-md:px-6 py-4 max-md:py-3.5 border-2 border-hn-primary text-hn-primary font-bold text-[0.95rem] max-md:text-[0.88rem] rounded-lg no-underline transition-all duration-300 tracking-[0.01em] max-md:w-full max-md:justify-center hover:bg-hn-primary hover:text-white hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(16,35,63,0.2)]">{intl.formatMessage({ id: 'home.featured.viewAll' })}</TransitionLink>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="relative overflow-hidden bg-hn-surface py-20 max-md:py-12">
        <div className="max-w-[1200px] mx-auto px-6 max-md:px-4 relative">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-10">
            <div className="motion-fade-right">
              <div className="rounded-[1.75rem] border border-[#d9e4ef] bg-white p-8 shadow-[0_16px_46px_rgba(16,35,63,0.05)] max-md:rounded-[1.25rem] max-md:p-5 max-md:text-center">
                <p className="inline-flex items-center rounded-full bg-hn-accent/10 px-3.5 py-1.5 text-[0.62rem] max-md:text-[0.58rem] font-bold uppercase tracking-[0.16em] max-md:tracking-[0.14em] text-hn-accent">
                  {intl.formatMessage({ id: 'home.why.eyebrow' })}
                </p>
                <h2 className="mt-4 text-[clamp(1.48rem,2.35vw,2.05rem)] max-md:text-[1.28rem] font-bold tracking-[-0.03em] leading-[1.14] text-hn-primary">
                  {intl.formatMessage({ id: 'home.why.title' })}
                </h2>
                <p className="mt-3.5 text-[0.86rem] max-md:text-[0.8rem] leading-[1.7] max-md:leading-[1.6] text-[#5a6c7e]">
                  {intl.formatMessage({ id: 'home.why.description' })}
                </p>
                <TransitionLink to="/about" className="mt-6 inline-flex items-center justify-center px-7 max-md:px-5 py-3 max-md:py-2.5 rounded-xl bg-hn-primary text-white font-bold text-[0.82rem] max-md:text-[0.78rem] no-underline transition-all duration-300 tracking-[0.01em] max-md:w-full hover:bg-[#0a2138] hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(16,35,63,0.16)]">
                  {intl.formatMessage({ id: 'home.why.learnMore' })}
                </TransitionLink>
              </div>
            </div>
            <div className="motion-fade-left grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="interactive-lift motion-card relative overflow-hidden rounded-[1.5rem] border border-[#dbe6f0] bg-white p-6 max-md:rounded-[1.15rem] max-md:p-4 transition-all duration-300 hover:border-hn-accent/30 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(16,35,63,0.08)]">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-hn-accent via-hn-secondary to-transparent"></div>
                <div className="flex items-center justify-between gap-3">
                  <div className="w-14 h-14 max-md:w-12 max-md:h-12 rounded-xl max-md:rounded-lg bg-gradient-to-br from-hn-primary to-hn-secondary text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-hn-primary/20">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="max-md:w-5 max-md:h-5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <span className="text-[0.72rem] font-bold tracking-[0.16em] text-[#9aa9b9]">01</span>
                </div>
                <div className="mt-6">
                  <h4 className="text-[1.04rem] max-md:text-[0.9rem] font-bold text-hn-primary mb-2">{intl.formatMessage({ id: 'home.why.stableControl.title' })}</h4>
                  <p className="text-[0.92rem] max-md:text-[0.82rem] text-gray-600 leading-[1.7] max-md:leading-[1.55]">
                    {intl.formatMessage({ id: 'home.why.stableControl.description' })}
                  </p>
                </div>
              </div>
              <div className="interactive-lift motion-card animation-delay-100 relative overflow-hidden rounded-[1.5rem] border border-[#dbe6f0] bg-white p-6 max-md:rounded-[1.15rem] max-md:p-4 transition-all duration-300 hover:border-hn-accent/30 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(16,35,63,0.08)]">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-hn-secondary via-hn-accent to-transparent"></div>
                <div className="flex items-center justify-between gap-3">
                  <div className="w-14 h-14 max-md:w-12 max-md:h-12 rounded-xl max-md:rounded-lg bg-gradient-to-br from-hn-primary to-hn-secondary text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-hn-primary/20">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="max-md:w-5 max-md:h-5">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <span className="text-[0.72rem] font-bold tracking-[0.16em] text-[#9aa9b9]">02</span>
                </div>
                <div className="mt-6">
                  <h4 className="text-[1.04rem] max-md:text-[0.9rem] font-bold text-hn-primary mb-2">{intl.formatMessage({ id: 'home.why.oemFlexibility.title' })}</h4>
                  <p className="text-[0.92rem] max-md:text-[0.82rem] text-gray-600 leading-[1.7] max-md:leading-[1.55]">
                    {intl.formatMessage({ id: 'home.why.oemFlexibility.description' })}
                  </p>
                </div>
              </div>
              <div className="interactive-lift motion-card animation-delay-200 relative overflow-hidden rounded-[1.5rem] border border-[#dbe6f0] bg-white p-6 max-md:rounded-[1.15rem] max-md:p-4 transition-all duration-300 hover:border-hn-accent/30 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(16,35,63,0.08)]">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-hn-accent via-[#7fb4d7] to-transparent"></div>
                <div className="flex items-center justify-between gap-3">
                  <div className="w-14 h-14 max-md:w-12 max-md:h-12 rounded-xl max-md:rounded-lg bg-gradient-to-br from-hn-primary to-hn-secondary text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-hn-primary/20">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="max-md:w-5 max-md:h-5">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <span className="text-[0.72rem] font-bold tracking-[0.16em] text-[#9aa9b9]">03</span>
                </div>
                <div className="mt-6">
                  <h4 className="text-[1.04rem] max-md:text-[0.9rem] font-bold text-hn-primary mb-2">{intl.formatMessage({ id: 'home.why.hvacExpertise.title' })}</h4>
                  <p className="text-[0.92rem] max-md:text-[0.82rem] text-gray-600 leading-[1.7] max-md:leading-[1.55]">
                    {intl.formatMessage({ id: 'home.why.hvacExpertise.description' })}
                  </p>
                </div>
              </div>
              <div className="interactive-lift motion-card animation-delay-300 relative overflow-hidden rounded-[1.5rem] border border-[#dbe6f0] bg-white p-6 max-md:rounded-[1.15rem] max-md:p-4 transition-all duration-300 hover:border-hn-accent/30 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(16,35,63,0.08)]">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-hn-secondary via-hn-accent to-transparent"></div>
                <div className="flex items-center justify-between gap-3">
                  <div className="w-14 h-14 max-md:w-12 max-md:h-12 rounded-xl max-md:rounded-lg bg-gradient-to-br from-hn-primary to-hn-secondary text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-hn-primary/20">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="max-md:w-5 max-md:h-5">
                      <line x1="12" y1="1" x2="12" y2="23"/>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                  </div>
                  <span className="text-[0.72rem] font-bold tracking-[0.16em] text-[#9aa9b9]">04</span>
                </div>
                <div className="mt-6">
                  <h4 className="text-[1.04rem] max-md:text-[0.9rem] font-bold text-hn-primary mb-2">{intl.formatMessage({ id: 'home.why.efficientDelivery.title' })}</h4>
                  <p className="text-[0.92rem] max-md:text-[0.82rem] text-gray-600 leading-[1.7] max-md:leading-[1.55]">
                    {intl.formatMessage({ id: 'home.why.efficientDelivery.description' })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-hn-primary py-24 max-md:py-16 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 max-md:px-4 relative z-10">
          <div className="text-center max-w-[700px] mx-auto">
            <h2 className="motion-fade-up text-[clamp(2rem,3.5vw,3rem)] max-md:text-[1.65rem] font-bold text-white mb-6 max-md:mb-3 tracking-[-0.025em] leading-tight drop-shadow-lg">{intl.formatMessage({ id: 'home.cta.title' })}</h2>
            <p className="motion-fade-up animation-delay-150 text-white/85 text-[1.1rem] max-md:text-[0.95rem] mb-12 max-md:mb-6 leading-[1.75] max-md:leading-[1.7] drop-shadow-md px-4 max-md:px-0">
              {intl.formatMessage({ id: 'home.cta.description' })}
            </p>
            <TransitionLink to="/contact" className="motion-fade-up animation-delay-300 inline-flex items-center px-10 max-md:px-8 py-4 max-md:py-3.5 bg-hn-accent text-white font-bold text-[1rem] max-md:text-[0.92rem] rounded-md no-underline transition-all duration-300 tracking-[0.01em] max-md:w-full max-md:justify-center hover:bg-hn-accent-strong hover:-translate-y-0.5 hover:shadow-lg">{intl.formatMessage({ id: 'home.cta.button' })}</TransitionLink>
          </div>
        </div>
      </section>

      {/* Global Shipping Map Section */}
      <section className="border-t border-[#e8eef5] bg-white py-14 max-md:py-10">
        <div className="mx-auto grid max-w-[1200px] items-start gap-8 px-6 lg:grid-cols-[340px_minmax(0,1fr)] max-md:px-4">
          <div className="motion-fade-right">
            <p className="inline-flex rounded-full bg-hn-accent/8 px-3.5 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hn-accent">
              {intl.formatMessage({ id: 'home.shipping.eyebrow' })}
            </p>
            <h2 className="mt-4 text-[clamp(1.8rem,3vw,2.4rem)] font-bold tracking-[-0.03em] text-hn-primary">
              {intl.formatMessage({ id: 'home.shipping.title' })}
            </h2>
            <p className="mt-4 text-[0.98rem] leading-8 text-[#5d7186] max-md:text-[0.9rem] max-md:leading-7">
              {intl.formatMessage({ id: 'home.shipping.description' })}
            </p>

            <div className="mt-6 space-y-4 text-[0.92rem] text-[#5d7186]">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#6d8298]">{intl.formatMessage({ id: 'home.shipping.locationLabel' })}</p>
                <p className="mt-1 font-semibold text-hn-primary">{intl.formatMessage({ id: 'home.shipping.locationValue' })}</p>
              </div>
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#6d8298]">{intl.formatMessage({ id: 'home.shipping.emailLabel' })}</p>
                <p className="mt-1 font-semibold text-hn-primary">sales@heatnexis.com</p>
              </div>
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#6d8298]">{intl.formatMessage({ id: 'home.shipping.phoneLabel' })}</p>
                <p className="mt-1 font-semibold text-hn-primary">+86 138 0010 2400</p>
              </div>
            </div>
          </div>

          <div className="motion-fade-left rounded-[1.75rem] border border-[#dce7f0] bg-[#f8fbfe] p-5 max-md:rounded-[1.35rem] max-md:p-4">
            <svg viewBox="0 0 760 420" className="h-auto w-full">
              <defs>
                <linearGradient id="routeLineSimple" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0d6fb8" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#5fa7d4" stopOpacity="0.45" />
                </linearGradient>
              </defs>

              <rect x="0" y="0" width="760" height="420" rx="28" fill="#f8fbfe" />

              <g fill="#dfe8f1">
                <ellipse cx="118" cy="154" rx="82" ry="50" />
                <ellipse cx="206" cy="128" rx="42" ry="26" />
                <ellipse cx="294" cy="194" rx="56" ry="34" />
                <ellipse cx="372" cy="150" rx="104" ry="60" />
                <ellipse cx="520" cy="152" rx="88" ry="52" />
                <ellipse cx="620" cy="176" rx="72" ry="42" />
                <ellipse cx="664" cy="282" rx="48" ry="28" />
              </g>

              <g stroke="url(#routeLineSimple)" strokeWidth="3" fill="none" strokeLinecap="round">
                <path d="M452 178 C402 142, 318 122, 188 120" />
                <path d="M452 178 C500 140, 572 118, 662 122" />
                <path d="M452 178 C520 172, 610 208, 674 278" />
                <path d="M452 178 C420 198, 356 230, 278 250" />
              </g>

              <g fill="#0d6fb8">
                <circle cx="452" cy="178" r="9" />
                <circle cx="188" cy="120" r="5" />
                <circle cx="662" cy="122" r="5" />
                <circle cx="674" cy="278" r="5" />
                <circle cx="278" cy="250" r="5" />
              </g>

              <g fill="#10233f" fontWeight="700">
                <text x="468" y="172" fontSize="18">{intl.formatMessage({ id: 'home.shipping.map.shanghai' })}</text>
              </g>

              <g fill="#60758e" fontSize="14" fontWeight="600">
                <text x="118" y="104">{intl.formatMessage({ id: 'region.europe' })}</text>
                <text x="610" y="106">{intl.formatMessage({ id: 'region.northAmerica' })}</text>
                <text x="634" y="302">{intl.formatMessage({ id: 'region.oceania' })}</text>
                <text x="214" y="274">{intl.formatMessage({ id: 'region.middleEast' })}</text>
              </g>
            </svg>

            <div className="mt-4 flex flex-wrap gap-2">
              {globalMarkets.map((market) => (
                <span key={market} className="rounded-full border border-[#d6e1eb] bg-white px-3 py-1.5 text-[0.78rem] font-medium text-[#4d657c]">
                  {market}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
