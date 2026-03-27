import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import {
  createAcceptAllCookieConsent,
  createNecessaryOnlyCookieConsent,
  getCookieConsentPreferences,
  setCookieConsentPreferences,
  type CookieConsentPreferences,
} from '@/utils/cookieConsent';

const CookieConsent: React.FC = () => {
  const intl = useIntl();
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookieConsentPreferences>(createNecessaryOnlyCookieConsent());

  useEffect(() => {
    const savedPreferences = getCookieConsentPreferences();
    if (savedPreferences) {
      setPreferences(savedPreferences);
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    setIsReady(true);
  }, []);

  const handleSave = (value: CookieConsentPreferences) => {
    setCookieConsentPreferences(value);
    setPreferences(value);
    setIsVisible(false);
    setIsPreferencesOpen(false);
  };

  const togglePreference = (key: 'analytics' | 'supportChat') => {
    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  if (!isReady || !isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-[650] mx-auto max-w-[1080px] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-5 motion-safe:duration-300">
      <div className="overflow-hidden rounded-[1.75rem] border border-[#d9e4ef] bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(244,248,252,0.96))] shadow-[0_22px_60px_rgba(12,25,45,0.16)] backdrop-blur-xl">
        <div className="grid gap-5 px-5 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:px-6 md:py-5">
          <div className="min-w-0">
            <span className="inline-flex items-center rounded-full bg-hn-accent/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-hn-accent">
              {intl.formatMessage({ id: 'cookie.badge' })}
            </span>
            <h3 className="mt-3 text-[1.1rem] font-bold tracking-[-0.02em] text-hn-primary md:text-[1.2rem]">
              {intl.formatMessage({ id: 'cookie.title' })}
            </h3>
            <p className="mt-2 max-w-[52rem] text-[0.92rem] leading-7 text-[#5d7186] md:text-[0.95rem]">
              {intl.formatMessage({ id: 'cookie.description' })}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row md:justify-end">
            <button
              type="button"
              onClick={() => setIsPreferencesOpen((current) => !current)}
              className="inline-flex min-h-[46px] items-center justify-center rounded-xl border border-[#d8e4ef] bg-white px-5 py-3 text-[0.9rem] font-semibold text-hn-primary transition-all duration-200 hover:border-hn-accent hover:text-hn-accent"
            >
              {intl.formatMessage({ id: 'cookie.manage' })}
            </button>
            <button
              type="button"
              onClick={() => handleSave(createNecessaryOnlyCookieConsent())}
              className="inline-flex min-h-[46px] items-center justify-center rounded-xl border border-[#d8e4ef] bg-white px-5 py-3 text-[0.9rem] font-semibold text-hn-primary transition-all duration-200 hover:border-hn-accent hover:text-hn-accent"
            >
              {intl.formatMessage({ id: 'cookie.rejectOptional' })}
            </button>
            <button
              type="button"
              onClick={() => handleSave(createAcceptAllCookieConsent())}
              className="inline-flex min-h-[46px] items-center justify-center rounded-xl bg-hn-primary px-5 py-3 text-[0.9rem] font-semibold text-white shadow-[0_14px_30px_rgba(16,35,63,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0b2138] hover:shadow-[0_18px_36px_rgba(16,35,63,0.22)]"
            >
              {intl.formatMessage({ id: 'cookie.acceptAll' })}
            </button>
          </div>
        </div>

        {isPreferencesOpen && (
          <div className="border-t border-[#e2ebf3] bg-white/70 px-5 py-5 md:px-6">
            <div className="grid gap-3">
              <div className="flex items-start justify-between gap-4 rounded-2xl border border-[#dfe8f1] bg-white px-4 py-4">
                <div>
                  <p className="text-[0.92rem] font-semibold text-hn-primary">
                    {intl.formatMessage({ id: 'cookie.categoryNecessaryTitle' })}
                  </p>
                  <p className="mt-1 text-[0.84rem] leading-6 text-[#5d7186]">
                    {intl.formatMessage({ id: 'cookie.categoryNecessaryDescription' })}
                  </p>
                </div>
                <span className="inline-flex min-w-[4.8rem] items-center justify-center rounded-full bg-[#eef4f9] px-3 py-1 text-[0.78rem] font-semibold text-hn-primary">
                  {intl.formatMessage({ id: 'cookie.alwaysOn' })}
                </span>
              </div>

              <button
                type="button"
                onClick={() => togglePreference('supportChat')}
                className="flex items-start justify-between gap-4 rounded-2xl border border-[#dfe8f1] bg-white px-4 py-4 text-left transition-all duration-200 hover:border-hn-accent/40"
              >
                <div>
                  <p className="text-[0.92rem] font-semibold text-hn-primary">
                    {intl.formatMessage({ id: 'cookie.categorySupportTitle' })}
                  </p>
                  <p className="mt-1 text-[0.84rem] leading-6 text-[#5d7186]">
                    {intl.formatMessage({ id: 'cookie.categorySupportDescription' })}
                  </p>
                </div>
                <span className={`inline-flex min-w-[4.8rem] items-center justify-center rounded-full px-3 py-1 text-[0.78rem] font-semibold ${preferences.supportChat ? 'bg-hn-primary text-white' : 'bg-[#eef4f9] text-[#60758e]'}`}>
                  {preferences.supportChat ? intl.formatMessage({ id: 'cookie.on' }) : intl.formatMessage({ id: 'cookie.off' })}
                </span>
              </button>

              <button
                type="button"
                onClick={() => togglePreference('analytics')}
                className="flex items-start justify-between gap-4 rounded-2xl border border-[#dfe8f1] bg-white px-4 py-4 text-left transition-all duration-200 hover:border-hn-accent/40"
              >
                <div>
                  <p className="text-[0.92rem] font-semibold text-hn-primary">
                    {intl.formatMessage({ id: 'cookie.categoryAnalyticsTitle' })}
                  </p>
                  <p className="mt-1 text-[0.84rem] leading-6 text-[#5d7186]">
                    {intl.formatMessage({ id: 'cookie.categoryAnalyticsDescription' })}
                  </p>
                </div>
                <span className={`inline-flex min-w-[4.8rem] items-center justify-center rounded-full px-3 py-1 text-[0.78rem] font-semibold ${preferences.analytics ? 'bg-hn-primary text-white' : 'bg-[#eef4f9] text-[#60758e]'}`}>
                  {preferences.analytics ? intl.formatMessage({ id: 'cookie.on' }) : intl.formatMessage({ id: 'cookie.off' })}
                </span>
              </button>

              <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsPreferencesOpen(false)}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[#d8e4ef] bg-white px-5 py-3 text-[0.88rem] font-semibold text-hn-primary transition-all duration-200 hover:border-hn-accent hover:text-hn-accent"
                >
                  {intl.formatMessage({ id: 'cookie.cancel' })}
                </button>
                <button
                  type="button"
                  onClick={() => handleSave(preferences)}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-hn-primary px-5 py-3 text-[0.88rem] font-semibold text-white transition-all duration-200 hover:bg-[#0b2138]"
                >
                  {intl.formatMessage({ id: 'cookie.savePreferences' })}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
