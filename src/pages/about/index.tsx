import React from 'react';
import { useIntl } from 'react-intl';
import PageHero from '@/components/PageHero';
import Seo, { SITE_URL } from '@/components/Seo';

const AboutPage: React.FC = () => {
  const intl = useIntl();
  const aboutTitle = `${intl.formatMessage({ id: 'about.hero.title' })} | HeatNexis`;
  const aboutDescription = intl.formatMessage({ id: 'about.hero.description' });
  const aboutStructuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: aboutTitle,
      description: aboutDescription,
      url: `${SITE_URL}/about`,
      about: {
        '@type': 'Organization',
        name: 'HeatNexis',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: intl.formatMessage({ id: 'nav.home' }),
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: intl.formatMessage({ id: 'about.hero.title' }),
          item: `${SITE_URL}/about`,
        },
      ],
    },
  ];

  return (
    <div className="w-full">
      <Seo
        title={aboutTitle}
        description={aboutDescription}
        path="/about"
        image="/page-hero-about-photo.jpg"
        keywords={['underfloor heating thermostat manufacturer', 'OEM thermostat company', 'HVAC controls supplier']}
        structuredData={aboutStructuredData}
      />
      <PageHero
        bgImage="/page-hero-about-photo.jpg"
        bgImageMobile="/page-hero-about-photo-mobile.jpg"
        bgPosition="center center"
        accentColor="#5fa7d4"
        eyebrow={intl.formatMessage({ id: 'about.hero.eyebrow' })}
        title={intl.formatMessage({ id: 'about.hero.title' })}
        description={intl.formatMessage({ id: 'about.hero.description' })}
        panelTitle={intl.formatMessage({ id: 'about.hero.panelTitle' })}
        panelText={intl.formatMessage({ id: 'about.hero.panelText' })}
        stats={[
          { value: '10+', label: intl.formatMessage({ id: 'stats.yearsExperience' }) },
          { value: '30+', label: intl.formatMessage({ id: 'stats.controlSKUs' }) },
          { value: '40+', label: intl.formatMessage({ id: 'stats.oemMarkets' }) },
        ]}
      />

      <section className="py-8 max-md:py-5 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 max-md:px-4">
          <div className="motion-fade-up max-w-[800px] mx-auto mb-16 max-md:mb-6 text-center">
            <p className="inline-block text-[0.8rem] max-md:text-[0.7rem] font-semibold tracking-[0.15em] max-md:tracking-[0.12em] uppercase text-hn-accent mb-3 max-md:mb-2 px-4 max-md:px-3 py-1.5 max-md:py-1 bg-hn-accent/10 rounded-full">{intl.formatMessage({ id: 'about.story.eyebrow' })}</p>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] max-md:text-[1.5rem] font-bold text-hn-primary mb-6 max-md:mb-3 tracking-[-0.02em]">{intl.formatMessage({ id: 'about.story.title' })}</h2>
            <p className="text-[1.125rem] max-md:text-[0.95rem] text-gray-600 leading-[1.8] max-md:leading-[1.7] mb-6 max-md:mb-3">
              {intl.formatMessage({ id: 'about.story.paragraph1' })}
            </p>
            <p className="text-[1.125rem] max-md:text-[0.95rem] text-gray-600 leading-[1.8] max-md:leading-[1.7] mb-6 max-md:mb-3">
              {intl.formatMessage({ id: 'about.story.paragraph2' })}
            </p>
          </div>

          <div className="grid grid-cols-4 max-md:grid-cols-2 gap-6 max-md:gap-3">
            <div className="interactive-lift motion-card flex flex-col items-center px-6 max-md:px-3 py-8 max-md:py-5 bg-hn-surface rounded-xl max-md:rounded-lg border border-gray-100 transition-all duration-300 hover:border-hn-accent/20">
              <span className="text-[2.5rem] max-md:text-[2rem] font-bold text-hn-primary mb-2 max-md:mb-1 tracking-[-0.02em]">10+</span>
              <span className="text-sm max-md:text-[0.75rem] text-slate-600 text-center leading-tight">{intl.formatMessage({ id: 'stats.yearsExperience' })}</span>
            </div>
            <div className="interactive-lift motion-card animation-delay-100 flex flex-col items-center px-6 max-md:px-3 py-8 max-md:py-5 bg-hn-surface rounded-xl max-md:rounded-lg border border-gray-100 transition-all duration-300 hover:border-hn-accent/20">
              <span className="text-[2.5rem] max-md:text-[2rem] font-bold text-hn-primary mb-2 max-md:mb-1 tracking-[-0.02em]">30+</span>
              <span className="text-sm max-md:text-[0.75rem] text-slate-600 text-center leading-tight">{intl.formatMessage({ id: 'stats.controlSKUs' })}</span>
            </div>
            <div className="interactive-lift motion-card animation-delay-200 flex flex-col items-center px-6 max-md:px-3 py-8 max-md:py-5 bg-hn-surface rounded-xl max-md:rounded-lg border border-gray-100 transition-all duration-300 hover:border-hn-accent/20">
              <span className="text-[2.5rem] max-md:text-[2rem] font-bold text-hn-primary mb-2 max-md:mb-1 tracking-[-0.02em]">40+</span>
              <span className="text-sm max-md:text-[0.75rem] text-slate-600 text-center leading-tight">{intl.formatMessage({ id: 'stats.oemMarkets' })}</span>
            </div>
            <div className="interactive-lift motion-card animation-delay-300 flex flex-col items-center px-6 max-md:px-3 py-8 max-md:py-5 bg-hn-surface rounded-xl max-md:rounded-lg border border-gray-100 transition-all duration-300 hover:border-hn-accent/20">
              <span className="text-[2.5rem] max-md:text-[2rem] font-bold text-hn-primary mb-2 max-md:mb-1 tracking-[-0.02em]">ISO/CE</span>
              <span className="text-sm max-md:text-[0.75rem] text-slate-600 text-center leading-tight">{intl.formatMessage({ id: 'about.stats.certified' })}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
