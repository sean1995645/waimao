import { useEffect } from 'react';
import { useLocation } from 'umi';
import { COOKIE_CONSENT_EVENT, hasCookieConsentFor } from '@/utils/cookieConsent';

const GA_MEASUREMENT_ID = process.env.UMI_APP_GA_MEASUREMENT_ID;
const GA_SCRIPT_SELECTOR = 'script[data-ga-loader="true"]';

type GtagCommand = 'js' | 'config' | 'event' | 'consent';

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (command: GtagCommand, target: string | Date, params?: Record<string, unknown>) => void;
  __heatnexisGaInitialized?: boolean;
};

const ensureAnalyticsLoaded = () => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) {
    return false;
  }

  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  analyticsWindow.gtag =
    analyticsWindow.gtag ||
    function gtag(...args: unknown[]) {
      analyticsWindow.dataLayer?.push(args);
    };

  const existingScript = document.querySelector<HTMLScriptElement>(GA_SCRIPT_SELECTOR);
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    script.dataset.gaLoader = 'true';
    document.head.appendChild(script);
  }

  if (!analyticsWindow.__heatnexisGaInitialized) {
    analyticsWindow.gtag('js', new Date());
    analyticsWindow.gtag('consent', 'default', {
      analytics_storage: 'denied',
    });
    analyticsWindow.gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: false,
    });
    analyticsWindow.__heatnexisGaInitialized = true;
  }

  analyticsWindow.gtag('consent', 'update', {
    analytics_storage: 'granted',
  });

  return true;
};

const disableAnalytics = () => {
  if (typeof window === 'undefined') {
    return;
  }

  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.gtag?.('consent', 'update', {
    analytics_storage: 'denied',
  });
};

const Analytics: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      return;
    }

    const syncAnalyticsConsent = () => {
      if (hasCookieConsentFor('analytics')) {
        ensureAnalyticsLoaded();
      } else {
        disableAnalytics();
      }
    };

    syncAnalyticsConsent();
    window.addEventListener(COOKIE_CONSENT_EVENT, syncAnalyticsConsent);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, syncAnalyticsConsent);
    };
  }, []);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !hasCookieConsentFor('analytics')) {
      return;
    }

    const loaded = ensureAnalyticsLoaded();
    if (!loaded) {
      return;
    }

    const analyticsWindow = window as AnalyticsWindow;
    analyticsWindow.gtag?.('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: `${location.pathname}${location.search}${location.hash}`,
    });
  }, [location.hash, location.pathname, location.search]);

  return null;
};

export default Analytics;

