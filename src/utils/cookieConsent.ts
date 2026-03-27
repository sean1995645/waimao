export const COOKIE_CONSENT_STORAGE_KEY = 'heatnexis_cookie_consent';
export const COOKIE_CONSENT_EVENT = 'heatnexis-cookie-consent-change';
export const COOKIE_CONSENT_OPEN_EVENT = 'heatnexis-cookie-consent-open';

export interface CookieConsentPreferences {
  necessary: true;
  analytics: boolean;
  supportChat: boolean;
}

const ACCEPT_ALL_PREFERENCES: CookieConsentPreferences = {
  necessary: true,
  analytics: true,
  supportChat: true,
};

const NECESSARY_ONLY_PREFERENCES: CookieConsentPreferences = {
  necessary: true,
  analytics: false,
  supportChat: false,
};

const normalizeCookieConsent = (value: unknown): CookieConsentPreferences | null => {
  if (value === 'accepted') {
    return ACCEPT_ALL_PREFERENCES;
  }

  if (value === 'necessary') {
    return NECESSARY_ONLY_PREFERENCES;
  }

  if (!value || typeof value !== 'object') {
    return null;
  }

  const candidate = value as Record<string, unknown>;
  return {
    necessary: true,
    analytics: candidate.analytics === true,
    supportChat: candidate.supportChat === true,
  };
};

export const getCookieConsentPreferences = (): CookieConsentPreferences | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const value = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);

  if (!value) {
    return null;
  }

  try {
    return normalizeCookieConsent(JSON.parse(value));
  } catch (error) {
    return normalizeCookieConsent(value);
  }
};

export const hasCookieConsentFor = (category: keyof CookieConsentPreferences) => {
  const preferences = getCookieConsentPreferences();
  return preferences ? preferences[category] === true : false;
};

export const createAcceptAllCookieConsent = (): CookieConsentPreferences => ({ ...ACCEPT_ALL_PREFERENCES });

export const createNecessaryOnlyCookieConsent = (): CookieConsentPreferences => ({ ...NECESSARY_ONLY_PREFERENCES });

export const setCookieConsentPreferences = (value: CookieConsentPreferences) => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent<CookieConsentPreferences>(COOKIE_CONSENT_EVENT, { detail: value }));
};

export const openCookieConsentPreferences = () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(new Event(COOKIE_CONSENT_OPEN_EVENT));
};
