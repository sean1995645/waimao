import React from 'react';
import { Link } from 'umi';
import { useIntl } from 'react-intl';
import ProductCard from '@/components/ProductCard';
import { featuredProducts } from '@/data/products';

const HomePage: React.FC = () => {
  const intl = useIntl();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[650px] max-md:min-h-[600px] flex items-center overflow-hidden text-white">
        <div className="absolute inset-0 bg-[url('/home-hero-thermostat.jpg')] max-md:bg-[url('/home-hero-thermostat-mobile.jpg')] bg-cover bg-[70%_center] max-md:bg-center animate-kenburns"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(10,20,40,0.82)] via-[rgba(10,20,40,0.65)] to-[rgba(10,20,40,0.45)]"></div>
        <div className="max-w-[1200px] mx-auto px-6 max-md:px-5 relative z-[2] pt-20 max-md:pt-16 w-full">
          <div className="max-w-[720px]">
            <p className="inline-block text-[0.8rem] max-md:text-[0.7rem] font-bold tracking-[0.18em] max-md:tracking-[0.15em] uppercase text-white/90 mb-6 max-md:mb-4 px-5 max-md:px-4 py-2 max-md:py-1.5 border border-white/30 rounded-full backdrop-blur-md bg-white/5 shadow-lg">{intl.formatMessage({ id: 'home.hero.eyebrow' })}</p>
            <h1 className="text-[clamp(2.8rem,5.5vw,4.5rem)] max-md:text-[2rem] font-bold leading-[1.12] max-md:leading-[1.15] mb-7 max-md:mb-5 tracking-[-0.025em] drop-shadow-2xl">
              {intl.formatMessage({ id: 'home.hero.title' })}<br />{intl.formatMessage({ id: 'home.hero.subtitle' })}
            </h1>
            <p className="text-[1.15rem] max-md:text-[0.95rem] leading-[1.75] max-md:leading-[1.65] text-white/85 mb-12 max-md:mb-8 max-w-[560px] drop-shadow-lg">
              {intl.formatMessage({ id: 'home.hero.description' })}
            </p>
            <div className="flex max-md:flex-col gap-4 max-md:gap-3 flex-wrap">
              <Link to="/products" className="inline-flex items-center px-9 max-md:px-6 py-4 max-md:py-3.5 bg-white text-hn-primary font-bold text-[0.95rem] max-md:text-[0.88rem] rounded-lg no-underline transition-all duration-300 max-md:justify-center hover:bg-[#f0f4f8] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)] shadow-xl">{intl.formatMessage({ id: 'home.hero.viewProducts' })}</Link>
              <Link to="/contact" className="inline-flex items-center px-9 max-md:px-6 py-4 max-md:py-3.5 bg-white/10 text-white font-bold text-[0.95rem] max-md:text-[0.88rem] rounded-lg border-2 border-white/40 no-underline transition-all duration-300 backdrop-blur-md max-md:justify-center hover:bg-white/20 hover:border-white/60 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(255,255,255,0.15)]">{intl.formatMessage({ id: 'home.hero.getInTouch' })}</Link>
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
            <div className="flex flex-col items-center border-r max-md:border-r max-md:border-b border-white/10 py-4 max-md:py-3 px-3 max-md:px-2 last:border-r-0 max-md:last:border-r max-md:[&:nth-child(2)]:border-r-0 max-md:[&:nth-child(n+3)]:border-b-0">
              <span className="mb-1.5 text-2xl max-md:text-xl font-bold leading-none tracking-[-0.02em] text-white">10+</span>
              <span className="text-center text-[0.85rem] max-md:text-[0.7rem] tracking-[0.03em] text-white/55 leading-[1.45]">{intl.formatMessage({ id: 'stats.yearsExperience' })}</span>
            </div>
            <div className="flex flex-col items-center border-r max-md:border-r-0 max-md:border-b border-white/10 py-4 max-md:py-3 px-3 max-md:px-2 last:border-r-0 max-md:[&:nth-child(n+3)]:border-b-0">
              <span className="mb-1.5 text-2xl max-md:text-xl font-bold leading-none tracking-[-0.02em] text-white">30+</span>
              <span className="text-center text-[0.85rem] max-md:text-[0.7rem] tracking-[0.03em] text-white/55 leading-[1.45]">{intl.formatMessage({ id: 'stats.controlSKUs' })}</span>
            </div>
            <div className="flex flex-col items-center border-r max-md:border-r border-white/10 py-4 max-md:py-3 px-3 max-md:px-2 last:border-r-0 max-md:last:border-r max-md:[&:nth-child(n+3)]:border-b-0">
              <span className="mb-1.5 text-2xl max-md:text-xl font-bold leading-none tracking-[-0.02em] text-white">40+</span>
              <span className="text-center text-[0.85rem] max-md:text-[0.7rem] tracking-[0.03em] text-white/55 leading-[1.45]">{intl.formatMessage({ id: 'stats.oemMarkets' })}</span>
            </div>
            <div className="flex flex-col items-center py-4 max-md:py-3 px-3 max-md:px-2">
              <span className="mb-1.5 text-2xl max-md:text-xl font-bold leading-none tracking-[-0.02em] text-white">ISO / CE</span>
              <span className="text-center text-[0.85rem] max-md:text-[0.7rem] tracking-[0.03em] text-white/55 leading-[1.45]">{intl.formatMessage({ id: 'stats.qualityCompliance' })}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-8 max-md:py-5 bg-gradient-to-b from-hn-surface to-white">
        <div className="max-w-[1200px] mx-auto px-6 max-md:px-4">
          <div className="text-center mb-14 max-md:mb-6">
            <p className="inline-block text-[0.75rem] max-md:text-[0.68rem] font-bold tracking-[0.2em] max-md:tracking-[0.18em] uppercase text-hn-accent mb-4 max-md:mb-2 px-4 max-md:px-3.5 py-1.5 max-md:py-1 bg-hn-accent/10 rounded-full">{intl.formatMessage({ id: 'home.featured.eyebrow' })}</p>
            <h2 className="text-[clamp(2rem,3.5vw,2.8rem)] max-md:text-[1.6rem] font-bold text-hn-primary tracking-[-0.025em] leading-tight">{intl.formatMessage({ id: 'home.featured.title' })}</h2>
            <p className="text-gray-600 text-[1.05rem] max-md:text-[0.9rem] mt-4 max-md:mt-2 max-w-[600px] mx-auto px-4 max-md:px-0">{intl.formatMessage({ id: 'home.featured.description' })}</p>
          </div>
          <div className="grid grid-cols-4 max-md:grid-cols-2 gap-4 max-md:gap-2.5 mb-14 max-md:mb-6" id="productGrid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/products" className="inline-flex items-center px-10 max-md:px-6 py-4 max-md:py-3.5 border-2 border-hn-primary text-hn-primary font-bold text-[0.95rem] max-md:text-[0.88rem] rounded-lg no-underline transition-all duration-300 tracking-[0.01em] max-md:w-full max-md:justify-center hover:bg-hn-primary hover:text-white hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(16,35,63,0.2)]">{intl.formatMessage({ id: 'home.featured.viewAll' })}</Link>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-8 max-md:py-5 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 max-md:px-4">
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-24 max-md:gap-6 items-center">
            <div className="max-md:text-center">
              <p className="inline-block text-[0.75rem] max-md:text-[0.68rem] font-bold tracking-[0.2em] max-md:tracking-[0.18em] uppercase text-hn-accent mb-4 max-md:mb-2 px-4 max-md:px-3.5 py-1.5 max-md:py-1 bg-hn-accent/10 rounded-full">{intl.formatMessage({ id: 'home.why.eyebrow' })}</p>
              <h2 className="text-[clamp(2rem,3.5vw,2.8rem)] max-md:text-[1.6rem] font-bold text-hn-primary mb-7 max-md:mb-3 tracking-[-0.025em] leading-tight">
                {intl.formatMessage({ id: 'home.why.title' })}
              </h2>
              <p className="text-gray-600 text-[1.05rem] max-md:text-[0.9rem] leading-[1.8] max-md:leading-[1.7] mb-10 max-md:mb-5">
                {intl.formatMessage({ id: 'home.why.description' })}
              </p>
              <Link to="/about" className="inline-flex items-center px-10 max-md:px-6 py-4 max-md:py-3.5 border-2 border-hn-primary text-hn-primary font-bold text-[0.95rem] max-md:text-[0.88rem] rounded-lg no-underline transition-all duration-300 tracking-[0.01em] max-md:w-full max-md:justify-center hover:bg-hn-primary hover:text-white hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(16,35,63,0.2)]">{intl.formatMessage({ id: 'home.why.learnMore' })}</Link>
            </div>
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-5 max-md:gap-3">
              <div className="flex max-md:flex-row gap-5 max-md:gap-3 items-start p-6 max-md:p-3 rounded-2xl max-md:rounded-xl bg-gradient-to-br from-hn-surface to-white border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-hn-accent/20">
                <div className="w-14 h-14 max-md:w-12 max-md:h-12 rounded-xl max-md:rounded-lg bg-gradient-to-br from-hn-primary to-hn-secondary text-white flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="max-md:w-5 max-md:h-5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-[1rem] max-md:text-[0.9rem] font-bold text-hn-primary mb-2 max-md:mb-1.5">{intl.formatMessage({ id: 'home.why.stableControl.title' })}</h4>
                  <p className="text-[0.9rem] max-md:text-[0.82rem] text-gray-600 leading-[1.6] max-md:leading-[1.55]">
                    {intl.formatMessage({ id: 'home.why.stableControl.description' })}
                  </p>
                </div>
              </div>
              <div className="flex max-md:flex-row gap-5 max-md:gap-3.5 items-start p-6 max-md:p-4 rounded-2xl max-md:rounded-xl bg-gradient-to-br from-hn-surface to-white border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-hn-accent/20">
                <div className="w-14 h-14 max-md:w-12 max-md:h-12 rounded-xl max-md:rounded-lg bg-gradient-to-br from-hn-primary to-hn-secondary text-white flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="max-md:w-5 max-md:h-5">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-[1rem] max-md:text-[0.9rem] font-bold text-hn-primary mb-2 max-md:mb-1.5">{intl.formatMessage({ id: 'home.why.oemFlexibility.title' })}</h4>
                  <p className="text-[0.9rem] max-md:text-[0.82rem] text-gray-600 leading-[1.6] max-md:leading-[1.55]">
                    {intl.formatMessage({ id: 'home.why.oemFlexibility.description' })}
                  </p>
                </div>
              </div>
              <div className="flex max-md:flex-row gap-5 max-md:gap-3.5 items-start p-6 max-md:p-4 rounded-2xl max-md:rounded-xl bg-gradient-to-br from-hn-surface to-white border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-hn-accent/20">
                <div className="w-14 h-14 max-md:w-12 max-md:h-12 rounded-xl max-md:rounded-lg bg-gradient-to-br from-hn-primary to-hn-secondary text-white flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="max-md:w-5 max-md:h-5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-[1rem] max-md:text-[0.9rem] font-bold text-hn-primary mb-2 max-md:mb-1.5">{intl.formatMessage({ id: 'home.why.hvacExpertise.title' })}</h4>
                  <p className="text-[0.9rem] max-md:text-[0.82rem] text-gray-600 leading-[1.6] max-md:leading-[1.55]">
                    {intl.formatMessage({ id: 'home.why.hvacExpertise.description' })}
                  </p>
                </div>
              </div>
              <div className="flex max-md:flex-row gap-5 max-md:gap-3.5 items-start p-6 max-md:p-4 rounded-2xl max-md:rounded-xl bg-gradient-to-br from-hn-surface to-white border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-hn-accent/20">
                <div className="w-14 h-14 max-md:w-12 max-md:h-12 rounded-xl max-md:rounded-lg bg-gradient-to-br from-hn-primary to-hn-secondary text-white flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="max-md:w-5 max-md:h-5">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-[1rem] max-md:text-[0.9rem] font-bold text-hn-primary mb-2 max-md:mb-1.5">{intl.formatMessage({ id: 'home.why.efficientDelivery.title' })}</h4>
                  <p className="text-[0.9rem] max-md:text-[0.82rem] text-gray-600 leading-[1.6] max-md:leading-[1.55]">
                    {intl.formatMessage({ id: 'home.why.efficientDelivery.description' })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-hn-primary via-hn-secondary to-hn-primary py-32 max-md:py-10 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-[1200px] mx-auto px-6 max-md:px-4 relative z-10">
          <div className="text-center max-w-[700px] mx-auto">
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] max-md:text-[1.65rem] font-bold text-white mb-6 max-md:mb-3 tracking-[-0.025em] leading-tight drop-shadow-lg">{intl.formatMessage({ id: 'home.cta.title' })}</h2>
            <p className="text-white/85 text-[1.1rem] max-md:text-[0.95rem] mb-12 max-md:mb-6 leading-[1.75] max-md:leading-[1.7] drop-shadow-md px-4 max-md:px-0">
              {intl.formatMessage({ id: 'home.cta.description' })}
            </p>
            <Link to="/contact" className="inline-flex items-center px-12 max-md:px-8 py-5 max-md:py-4 bg-white text-hn-primary font-bold text-[1.05rem] max-md:text-[0.92rem] rounded-xl no-underline transition-all duration-300 tracking-[0.01em] max-md:w-full max-md:justify-center hover:bg-[#f0f4f8] hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)] shadow-2xl">{intl.formatMessage({ id: 'home.cta.button' })}</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
