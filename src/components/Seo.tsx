import React from 'react';
import { Helmet } from 'umi';
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
  const normalizedPath = path === '/' ? '/' : `/${path.replace(/^\/+/, '')}`;
  const canonicalUrl = `${SITE_URL}${normalizedPath}`;
  const imageUrl = toAbsoluteUrl(image);
  const robots = noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';
  const localeTag = locale.replace('-', '_');
  const keywordContent = [...DEFAULT_KEYWORDS, ...(keywords || [])].join(', ');
  const structuredDataItems = structuredData ? (Array.isArray(structuredData) ? structuredData : [structuredData]) : [];

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordContent} />
      <meta name="robots" content={robots} />
      <meta name="theme-color" content="#10233f" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt || title} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={imageAlt || title} />
      <meta property="og:locale" content={localeTag} />
      <link rel="canonical" href={canonicalUrl} />
      {structuredDataItems.map((item, index) => (
        <script key={`seo-json-ld-${index}`} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
