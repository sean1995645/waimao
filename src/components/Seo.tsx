import React, { useEffect } from 'react';
import { useLocale } from '@/i18n';

type JsonLdValue = Record<string, unknown> | Array<Record<string, unknown>>;

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article' | 'product';
  keywords?: string[];
  noIndex?: boolean;
  structuredData?: JsonLdValue;
}

export const SITE_NAME = 'HeatNexis';
export const SITE_URL = 'https://heatnexis.com';
export const DEFAULT_IMAGE = '/home-hero-thermostat.jpg';
const DEFAULT_KEYWORDS = [
  'underfloor heating thermostat',
  'floor heating thermostat',
  'OEM thermostat supplier',
  'WiFi thermostat manufacturer',
  'Zigbee thermostat supplier',
  'manifold control center',
  'heating control gateway',
];

export const toAbsoluteUrl = (value?: string) => {
  if (!value) {
    return `${SITE_URL}${DEFAULT_IMAGE}`;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `${SITE_URL}${value.startsWith('/') ? value : `/${value}`}`;
};

const upsertMeta = (key: 'name' | 'property', value: string, content: string) => {
  let element = document.head.querySelector(`meta[${key}="${value}"]`) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(key, value);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const upsertLink = (rel: string, href: string) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
};

const Seo: React.FC<SeoProps> = ({
  title,
  description,
  path = '/',
  image,
  imageAlt,
  type = 'website',
  keywords,
  noIndex = false,
  structuredData,
}) => {
  const { locale } = useLocale();

  useEffect(() => {
    const normalizedPath = path === '/' ? '/' : `/${path.replace(/^\/+/, '')}`;
    const canonicalUrl = `${SITE_URL}${normalizedPath}`;
    const imageUrl = toAbsoluteUrl(image);
    const robots = noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';
    const localeTag = locale.replace('-', '_');
    const keywordContent = [...DEFAULT_KEYWORDS, ...(keywords || [])].join(', ');

    document.title = title;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'keywords', keywordContent);
    upsertMeta('name', 'robots', robots);
    upsertMeta('name', 'theme-color', '#10233f');
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', imageUrl);

    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', imageUrl);
    upsertMeta('property', 'og:image:alt', imageAlt || title);
    upsertMeta('property', 'og:locale', localeTag);

    upsertLink('canonical', canonicalUrl);

    const existingJsonLd = document.getElementById('seo-json-ld');
    if (existingJsonLd) {
      existingJsonLd.remove();
    }

    if (structuredData) {
      const script = document.createElement('script');
      script.id = 'seo-json-ld';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [description, image, imageAlt, keywords, locale, noIndex, path, structuredData, title, type]);

  return null;
};

export default Seo;
