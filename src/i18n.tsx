import React, { createContext, useContext, useState, useEffect } from 'react';
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

const baseMessages: Record<string, Record<string, string>> = {
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

const messages = Object.fromEntries(
  Object.entries(baseMessages).map(([locale, localeMessages]) => [
    locale,
    locale === defaultLocale ? baseMessages[defaultLocale] : { ...baseMessages[defaultLocale], ...localeMessages },
  ]),
);

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
  const [locale, setLocaleState] = useState<string>(() => {
    // Try to get from localStorage first
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('umi_locale');
      if (saved && messages[saved]) {
        return saved;
      }
      // Try browser language
      const browserLang = navigator.language;
      if (messages[browserLang]) {
        return browserLang;
      }
    }
    return defaultLocale;
  });

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    document.documentElement.lang = locale;
    document.documentElement.dir = ['ar-SA', 'he-IL'].includes(locale) ? 'rtl' : 'ltr';
  }, [locale]);

  const setLocale = (newLocale: string) => {
    if (messages[newLocale]) {
      setLocaleState(newLocale);
      if (typeof window !== 'undefined') {
        localStorage.setItem('umi_locale', newLocale);
      }
    }
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
    const saved = localStorage.getItem('umi_locale');
    if (saved && messages[saved]) {
      return saved;
    }
  }
  return defaultLocale;
};
