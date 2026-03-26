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
    <section className="relative isolate overflow-hidden bg-[#0c192d] text-white">
      <style>
        {`
          .page-hero-bg {
            background-image: url('${bgImage}');
            background-position: ${bgPosition};
          }
          @media (max-width: 767px) {
            .page-hero-bg {
              background-image: url('${bgImageMobile || bgImage}');
              background-position: center center !important;
              background-size: cover;
            }
          }
        `}
      </style>
      <div className="page-hero-bg absolute inset-0 bg-cover bg-no-repeat"></div>
      <div className="absolute inset-0 bg-[rgba(12,25,45,0.55)]"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(7,17,30,0.92)] via-[rgba(7,17,30,0.8)_48%] to-[rgba(7,17,30,0.5)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_38%)] opacity-60"></div>
      <div className="absolute -right-28 -top-24 h-72 w-72 rounded-full blur-[48px] opacity-35" style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 72%)` }}></div>
      <div className="absolute -left-24 -bottom-36 h-64 w-64 rounded-full bg-white/10 blur-[48px] opacity-25"></div>
      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'url(/pattern.svg)' }}></div>

      <div className="relative z-10 max-w-[1200px] mx-auto grid gap-5 sm:gap-0 px-4 sm:px-6 py-8 sm:py-20 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end lg:gap-10 lg:px-5 lg:py-24">
        <div className="max-w-[42rem]">
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-[0.7rem] sm:text-[0.78rem] font-semibold uppercase tracking-[0.15em] text-[#c0d6e8] backdrop-blur-sm mb-2.5 sm:mb-4 sm:px-3 sm:py-1">{eyebrow}</span>
          <h1 className="max-w-[13ch] text-[1.7rem] sm:text-[2.8rem] lg:text-[3.4rem] font-bold leading-[1.1]">{title}</h1>
          {description && <p className="mt-2.5 sm:mt-5 max-w-[40rem] text-[0.85rem] sm:text-[1.05rem] leading-[1.5] sm:leading-[1.75] text-white/80">{description}</p>}
        </div>

        {(panelTitle || panelText || stats) && (
          <div className="rounded-xl sm:rounded-3xl border border-white/12 bg-white/10 px-3.5 sm:px-6 py-3.5 sm:py-6 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            {panelTitle && <p className="text-[0.7rem] sm:text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-[#c0d6e8]">{panelTitle}</p>}
            {panelText && <p className="mt-2 sm:mt-3 text-[0.82rem] sm:text-[0.95rem] leading-[1.5] sm:leading-[1.75] text-white/[0.78]">{panelText}</p>}
            {stats && stats.length > 0 && (
              <div className="mt-3 sm:mt-5 lg:mt-5 grid grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-2 lg:gap-3">
                {stats.map((stat, index) => (
                  <div key={index} className="rounded-lg sm:rounded-[1.1rem] border border-white/10 bg-[rgba(13,29,52,0.55)] px-2.5 sm:px-4 py-2.5 sm:py-4">
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
