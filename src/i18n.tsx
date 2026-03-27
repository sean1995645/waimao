import React, { createContext, useContext, useEffect, useState, startTransition } from 'react';
import { IntlProvider } from 'react-intl';

// Import all locale files
import enUS from './locales/en-US';
import zhCN from './locales/zh-CN';
import esES from './locales/es-ES';
import frFR from './locales/fr-FR';
import arSA from './locales/ar-SA';
import deDE from './locales/de-DE';
import jaJP from './locales/ja-JP';
import koKR from './locales/ko-KR';
import trTR from './locales/tr-TR';
import itIT from './locales/it-IT';
import ruRU from './locales/ru-RU';
import ptPT from './locales/pt-PT';
import viVN from './locales/vi-VN';
import csCZ from './locales/cs-CZ';
import plPL from './locales/pl-PL';
import nlNL from './locales/nl-NL';
import thTH from './locales/th-TH';
import svSE from './locales/sv-SE';
import noNO from './locales/no-NO';
import fiFI from './locales/fi-FI';
import huHU from './locales/hu-HU';
import daDK from './locales/da-DK';
import elGR from './locales/el-GR';
import roRO from './locales/ro-RO';
import heIL from './locales/he-IL';
import ukUA from './locales/uk-UA';
import idID from './locales/id-ID';
import hiIN from './locales/hi-IN';
import skSK from './locales/sk-SK';
import hrHR from './locales/hr-HR';

type LocaleMessages = Record<string, string>;

const baseMessages: Record<string, LocaleMessages> = {
  'en-US': enUS,
  'zh-CN': zhCN,
  'es-ES': esES,
  'fr-FR': frFR,
  'ar-SA': arSA,
  'de-DE': deDE,
  'ja-JP': jaJP,
  'ko-KR': koKR,
  'tr-TR': trTR,
  'it-IT': itIT,
  'ru-RU': ruRU,
  'pt-PT': ptPT,
  'vi-VN': viVN,
  'cs-CZ': csCZ,
  'pl-PL': plPL,
  'nl-NL': nlNL,
  'th-TH': thTH,
  'sv-SE': svSE,
  'no-NO': noNO,
  'fi-FI': fiFI,
  'hu-HU': huHU,
  'da-DK': daDK,
  'el-GR': elGR,
  'ro-RO': roRO,
  'he-IL': heIL,
  'uk-UA': ukUA,
  'id-ID': idID,
  'hi-IN': hiIN,
  'sk-SK': skSK,
  'hr-HR': hrHR,
};

const defaultLocale = 'en-US';
const localeStorageKey = 'umi_locale';
const rtlLocales = new Set(['ar-SA', 'he-IL']);
const supportedLocales = Object.keys(baseMessages);

const messages: Record<string, LocaleMessages> = Object.fromEntries(
  Object.entries(baseMessages).map(([locale, localeMessages]) => [
    locale,
    locale === defaultLocale ? baseMessages[defaultLocale] : { ...baseMessages[defaultLocale], ...localeMessages },
  ]),
);

const localeLookup = Object.fromEntries(supportedLocales.map((locale) => [locale.toLowerCase(), locale]));

const resolveLocale = (value?: string | null) => {
  if (!value) {
    return null;
  }

  const normalized = value.trim().replace(/_/g, '-').toLowerCase();

  if (localeLookup[normalized]) {
    return localeLookup[normalized];
  }

  const language = normalized.split('-')[0];
  return supportedLocales.find((locale) => locale.toLowerCase().startsWith(`${language}-`)) ?? null;
};

const readStoredLocale = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return resolveLocale(localStorage.getItem(localeStorageKey));
};

const detectBrowserLocale = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const browserLocales = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const browserLocale of browserLocales) {
    const resolvedLocale = resolveLocale(browserLocale);
    if (resolvedLocale) {
      return resolvedLocale;
    }
  }

  return null;
};

const getClientLocale = () => {
  return readStoredLocale() ?? detectBrowserLocale() ?? defaultLocale;
};

const syncDocumentLocale = (locale: string) => {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.lang = locale;
  document.documentElement.dir = rtlLocales.has(locale) ? 'rtl' : 'ltr';
};

const persistLocale = (locale: string) => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(localeStorageKey, locale);
};

interface LocaleContextType {
  locale: string;
  setLocale: (locale: string) => void;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: defaultLocale,
  setLocale: () => {},
});

export const useLocale = () => useContext(LocaleContext);

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<string>(defaultLocale);

  useEffect(() => {
    const clientLocale = getClientLocale();

    if (clientLocale !== locale) {
      startTransition(() => {
        setLocaleState(clientLocale);
      });
    }
  }, [locale]);

  useEffect(() => {
    syncDocumentLocale(locale);
  }, [locale]);

  const setLocale = (newLocale: string) => {
    const resolvedLocale = resolveLocale(newLocale);

    if (!resolvedLocale || resolvedLocale === locale) {
      return;
    }

    persistLocale(resolvedLocale);

    startTransition(() => {
      setLocaleState(resolvedLocale);
    });
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <IntlProvider locale={locale} defaultLocale={defaultLocale} messages={messages[locale] || messages[defaultLocale]}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};

export const getLocale = () => {
  if (typeof window !== 'undefined') {
    return getClientLocale();
  }
  return defaultLocale;
};
