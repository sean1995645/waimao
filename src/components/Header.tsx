import React, { startTransition, useState } from 'react';
import { useIntl } from 'react-intl';
import TransitionLink from '@/components/TransitionLink';
import { useLocale } from '../i18n';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const intl = useIntl();
  const { locale: currentLocale, setLocale } = useLocale();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleLangMenu = () => {
    setLangMenuOpen(!langMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const changeLanguage = (locale: string) => {
    startTransition(() => {
      setLocale(locale);
      setLangMenuOpen(false);
    });
  };

  const languages = [
    { code: 'en-US', name: 'English', flag: '🇺🇸' },
    { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
    { code: 'es-ES', name: 'Español', flag: '🇪🇸' },
    { code: 'fr-FR', name: 'Français', flag: '🇫🇷' },
    { code: 'ar-SA', name: 'العربية', flag: '🇸🇦' },
    { code: 'de-DE', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja-JP', name: '日本語', flag: '🇯🇵' },
    { code: 'ko-KR', name: '한국어', flag: '🇰🇷' },
    { code: 'tr-TR', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'it-IT', name: 'Italiano', flag: '🇮🇹' },
    { code: 'ru-RU', name: 'Русский', flag: '🇷🇺' },
    { code: 'pt-PT', name: 'Português', flag: '🇵🇹' },
    { code: 'vi-VN', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'cs-CZ', name: 'Čeština', flag: '🇨🇿' },
    { code: 'pl-PL', name: 'Polski', flag: '🇵🇱' },
    { code: 'nl-NL', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'th-TH', name: 'ไทย', flag: '🇹🇭' },
    { code: 'sv-SE', name: 'Svenska', flag: '🇸🇪' },
    { code: 'no-NO', name: 'Norsk', flag: '🇳🇴' },
    { code: 'fi-FI', name: 'Suomi', flag: '🇫🇮' },
    { code: 'hu-HU', name: 'Magyar', flag: '🇭🇺' },
    { code: 'da-DK', name: 'Dansk', flag: '🇩🇰' },
    { code: 'el-GR', name: 'Ελληνικά', flag: '🇬🇷' },
    { code: 'ro-RO', name: 'Română', flag: '🇷🇴' },
    { code: 'he-IL', name: 'עברית', flag: '🇮🇱' },
    { code: 'uk-UA', name: 'Українська', flag: '🇺🇦' },
    { code: 'id-ID', name: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'hi-IN', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'sk-SK', name: 'Slovenčina', flag: '🇸🇰' },
    { code: 'hr-HR', name: 'Hrvatski', flag: '🇭🇷' },
  ];

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f7f5f0]/95 backdrop-blur-xl">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        <div className="motion-fade-down flex items-center justify-between flex-wrap gap-3 max-md:gap-2 py-4 max-md:py-3">
          {/* Logo */}
          <div className="flex-1 min-w-0">
            <TransitionLink to="/" className="inline-flex transition-transform duration-300 hover:translate-y-[-1px] hover:scale-[1.01]">
              <img src="/heatnexis-logo.png" alt="HeatNexis" className="h-10 max-md:h-7 w-auto" />
            </TransitionLink>
          </div>

          {/* Mobile Nav Toggle & Language Selector */}
          <div className="flex items-center gap-3 max-md:gap-2 order-2 md:order-3 md:ml-0">
            {/* Mobile Menu Toggle Button */}
            <button
              id="navToggle"
              className={`md:hidden flex flex-col justify-center gap-[5px] max-md:gap-[4px] w-11 h-11 max-md:w-9 max-md:h-9 bg-transparent border border-gray-200 rounded-xl max-md:rounded-lg p-2 max-md:p-1.5 cursor-pointer ${mobileMenuOpen ? '[&>span:nth-child(1)]:translate-y-[7px] max-md:[&>span:nth-child(1)]:translate-y-[6px] [&>span:nth-child(1)]:rotate-45 [&>span:nth-child(2)]:opacity-0 [&>span:nth-child(3)]:-translate-y-[7px] max-md:[&>span:nth-child(3)]:-translate-y-[6px] [&>span:nth-child(3)]:-rotate-45' : ''}`}
              aria-label={intl.formatMessage({ id: 'nav.toggle' })}
              aria-controls="mainNav"
              aria-expanded={mobileMenuOpen}
              type="button"
              onClick={toggleMobileMenu}
            >
              <span className="block w-full h-0.5 bg-gray-800 rounded-sm transition-all duration-300"></span>
              <span className="block w-full h-0.5 bg-gray-800 rounded-sm transition-all duration-300"></span>
              <span className="block w-full h-0.5 bg-gray-800 rounded-sm transition-all duration-300"></span>
            </button>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                id="langToggle"
                className="flex items-center gap-2 max-md:gap-1.5 px-4 py-2 max-md:px-3 max-md:py-1.5 bg-gray-50 border border-gray-300 rounded-md max-md:rounded text-base max-md:text-xs text-gray-800 transition-all duration-300 cursor-pointer hover:bg-gray-100 hover:border-hn-accent"
                type="button"
                aria-label={intl.formatMessage({ id: 'nav.selectLanguage' })}
                aria-expanded={langMenuOpen}
                onClick={toggleLangMenu}
              >
                <span className="text-xl max-md:text-sm leading-none">{currentLanguage.flag}</span>
                <span className="font-medium max-md:hidden">{currentLanguage.name}</span>
                <span className="font-medium md:hidden">{currentLanguage.code.split('-')[0].toUpperCase()}</span>
                <svg className={`transition-transform duration-300 max-md:w-2.5 max-md:h-2.5 ${langMenuOpen ? 'rotate-180' : ''}`} width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>

              {langMenuOpen && (
                <div className="absolute top-[calc(100%+0.5rem)] right-0 z-[9999] max-h-[400px] w-[360px] overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.15)] motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:slide-in-from-top-2 motion-safe:duration-200 max-md:w-[280px]">
                  <div className="grid grid-cols-2 gap-1 p-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`flex items-center gap-2 px-3 py-2.5 text-gray-800 text-sm rounded-md text-left transition-all duration-200 hover:bg-gray-50 ${
                          currentLocale === lang.code ? 'bg-hn-accent text-white font-medium hover:bg-hn-accent shadow-sm' : ''
                        }`}
                      >
                        <span className="text-lg leading-none flex-shrink-0">{lang.flag}</span>
                        <span className="truncate">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className={`order-4 md:order-2 flex-[0_0_100%] md:flex-[0_0_auto] w-full md:w-auto md:ml-auto ${mobileMenuOpen ? 'block motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-3 motion-safe:duration-200' : 'hidden'} md:block`} id="mainNav">
            <ul className="flex list-none flex-col md:flex-row md:items-center gap-1 md:gap-8 py-2 md:py-0 pb-4 max-md:pb-3 md:pb-0">
              <li><TransitionLink to="/" onClick={closeMobileMenu} className="block py-3 max-md:py-2.5 md:py-0 px-1 md:px-0 text-gray-800 text-base max-md:text-sm no-underline transition-colors duration-300 border-b md:border-b-0 border-gray-100 hover:text-hn-accent">{intl.formatMessage({ id: 'nav.home' })}</TransitionLink></li>
              <li><TransitionLink to="/products" onClick={closeMobileMenu} className="block py-3 max-md:py-2.5 md:py-0 px-1 md:px-0 text-gray-800 text-base max-md:text-sm no-underline transition-colors duration-300 border-b md:border-b-0 border-gray-100 hover:text-hn-accent">{intl.formatMessage({ id: 'nav.products' })}</TransitionLink></li>
              <li><TransitionLink to="/about" onClick={closeMobileMenu} className="block py-3 max-md:py-2.5 md:py-0 px-1 md:px-0 text-gray-800 text-base max-md:text-sm no-underline transition-colors duration-300 border-b md:border-b-0 border-gray-100 hover:text-hn-accent">{intl.formatMessage({ id: 'nav.about' })}</TransitionLink></li>
              <li><TransitionLink to="/contact" onClick={closeMobileMenu} className="block py-3 max-md:py-2.5 md:py-0 px-1 md:px-0 text-gray-800 text-base max-md:text-sm no-underline transition-colors duration-300 border-b md:border-b-0 border-gray-100 hover:text-hn-accent">{intl.formatMessage({ id: 'nav.contact' })}</TransitionLink></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
