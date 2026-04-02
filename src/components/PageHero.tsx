import React from 'react';

interface PageHeroProps {
  bgImage: string;
  bgImageMobile?: string;
  bgPosition?: string;
  accentColor?: string;
  eyebrow: string;
  title: string;
  description?: string;
  panelTitle?: string;
  panelText?: string;
  stats?: Array<{
    value: string;
    label: string;
  }>;
}

const PageHero: React.FC<PageHeroProps> = ({
  bgImage,
  bgImageMobile,
  bgPosition = 'center center',
  accentColor = '#5fa7d4',
  eyebrow,
  title,
  description,
  panelTitle,
  panelText,
  stats,
}) => {
  return (
    <section className="relative isolate overflow-hidden bg-hn-primary text-white">
      <div
        className="absolute inset-0 hidden bg-cover bg-no-repeat md:block"
        style={{ backgroundImage: `url(${bgImage})`, backgroundPosition: bgPosition }}
      ></div>
      <div
        className="absolute inset-0 bg-cover bg-no-repeat md:hidden"
        style={{ backgroundImage: `url(${bgImageMobile || bgImage})`, backgroundPosition: 'center center' }}
      ></div>
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)]"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.8)] to-transparent"></div>

      <div className="relative z-10 max-w-[1200px] mx-auto grid gap-5 sm:gap-0 px-4 sm:px-6 py-8 sm:py-20 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end lg:gap-10 lg:px-5 lg:py-24">
        <div className="max-w-[42rem] motion-fade-right">
          <span className="inline-flex items-center rounded-full bg-hn-accent/20 px-2.5 py-0.5 text-[0.7rem] sm:text-[0.78rem] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm mb-2.5 sm:mb-4 sm:px-3 sm:py-1">{eyebrow}</span>
          <h1 className="max-w-[13ch] text-[1.7rem] sm:text-[2.8rem] lg:text-[3.4rem] font-bold leading-[1.1]">{title}</h1>
          {description && <p className="mt-2.5 sm:mt-5 max-w-[40rem] text-[0.85rem] sm:text-[1.05rem] leading-[1.5] sm:leading-[1.75] text-white/80">{description}</p>}
        </div>

        {(panelTitle || panelText || stats) && (
          <div className="motion-fade-left rounded-xl sm:rounded-3xl border border-white/10 bg-white/5 px-3.5 sm:px-6 py-3.5 sm:py-6 shadow-xl backdrop-blur-md">
            {panelTitle && <p className="text-[0.7rem] sm:text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-gray-300">{panelTitle}</p>}
            {panelText && <p className="mt-2 sm:mt-3 text-[0.82rem] sm:text-[0.95rem] leading-[1.5] sm:leading-[1.75] text-gray-200">{panelText}</p>}
            {stats && stats.length > 0 && (
              <div className="mt-3 sm:mt-5 lg:mt-5 grid grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-2 lg:gap-3">
                {stats.map((stat, index) => (
                  <div key={index} className="rounded-lg sm:rounded-[1.1rem] border border-white/5 bg-white/5 px-2.5 sm:px-4 py-2.5 sm:py-4 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-700" style={{ animationDelay: `${index * 90}ms` }}>
                    <div className="text-base sm:text-[1.4rem] font-bold leading-none text-white">{stat.value}</div>
                    <div className="mt-1 sm:mt-2 text-[0.65rem] sm:text-[0.82rem] leading-none sm:leading-[1.5] text-white/[0.72]">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PageHero;
