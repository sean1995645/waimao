import React from 'react';
import { useIntl } from 'react-intl';

const Footer: React.FC = () => {
  const intl = useIntl();

  return (
    <footer className="bg-hn-primary text-white py-12 md:py-8 mt-16 md:mt-10">
      <div className="max-w-[1200px] mx-auto px-5 md:px-4">
        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 md:gap-6 mb-8 md:mb-6">
          <div className="motion-fade-up">
            <h3 className="mb-4 md:mb-3 text-lg md:text-base font-semibold">HeatNexis</h3>
            <p className="mb-2 text-gray-300 text-base md:text-sm">
              {intl.formatMessage({ id: 'footer.description' })}
            </p>
          </div>
          <div className="motion-fade-up animation-delay-100">
            <h3 className="mb-4 md:mb-3 text-lg md:text-base font-semibold">{intl.formatMessage({ id: 'footer.contactInfo' })}</h3>
            <p className="mb-2 text-gray-300 text-base md:text-sm">sales@heatnexis.com</p>
            <p className="mb-2 text-gray-300 text-base md:text-sm">+86 138 0010 2400</p>
          </div>
          <div className="motion-fade-up animation-delay-200">
            <h3 className="mb-4 md:mb-3 text-lg md:text-base font-semibold">{intl.formatMessage({ id: 'footer.followUs' })}</h3>
            <div className="flex gap-4 md:gap-3">
              <a href="#" aria-label={intl.formatMessage({ id: 'footer.facebook' })} className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-hn-accent hover:text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>
              <a href="#" aria-label={intl.formatMessage({ id: 'footer.linkedin' })} className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-hn-accent hover:text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.16-3.66c-1.16 0-1.69.64-1.98 1.09V9.65h-2.2v8.85h2.2v-4.9c0-.26.05-.52.12-.7a1.44 1.44 0 0 1 1.35-.96c.95 0 1.33.72 1.33 1.78v4.83h2.34M6.88 8.65a1.28 1.28 0 0 0 1.3-1.28A1.28 1.28 0 0 0 6.88 6.1 1.28 1.28 0 0 0 5.58 7.37 1.28 1.28 0 0 0 6.88 8.65M5.78 18.5h2.2V9.65H5.78v8.85z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="motion-fade-up animation-delay-300 text-center pt-8 md:pt-6 border-t border-white/10">
          <p className="text-gray-400 text-base md:text-sm">
            &copy; HeatNexis. {intl.formatMessage({ id: 'footer.rights' })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
