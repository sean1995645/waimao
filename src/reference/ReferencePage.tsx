import { useEffect } from 'react';
import { useLocation } from 'umi';
import { useLocale } from '@/i18n';
import Seo from '@/components/Seo';
import { products } from '@/data/products';
import pages from './pages.json';
import dictionaries from './locales.json';
import artwork from './art.json';
import { initializeReference } from './runtime';

type ReferenceContent = { html: string; title: string; description: string; titleKey?: string };
const content = pages as Record<string, ReferenceContent>;
const emptyDictionary: Record<string, string> = {};

/** Trusted, versioned markup migrated from the user-supplied design reference.
 * Keep its SVG illustrations and layout intact; behavior has a mount/unmount lifecycle.
 */
export default function ReferencePage() {
  const { pathname } = useLocation();
  const { locale } = useLocale();
  const path = pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
  const page = content[path] || content['/404'];
  const dictionary = (dictionaries as Record<string, Record<string, string>>)[locale] || emptyDictionary;
  const title = page.titleKey && dictionary[page.titleKey]
    ? `${dictionary[page.titleKey].replace(/\s*[→←]\s*$/, '')} | HeatNexis`
    : page.title;

  useEffect(() => {
    // Carry existing visitor shortlists into the reference inquiry workflow once.
    try {
      if (localStorage.getItem('hn_inquiry') === null) {
        const previous = JSON.parse(localStorage.getItem('nextherm_inquiry_selection') || '[]');
        if (Array.isArray(previous)) {
          const migrated = previous.flatMap(item => {
            const product = products.find(product => product.id === item?.id);
            return product ? [{ sku: product.id, model: product.id.toUpperCase(), slug: product.slug, qty: 100 }] : [];
          });
          localStorage.setItem('hn_inquiry', JSON.stringify(migrated));
        }
      }
    } catch { /* The reference runtime also supports unavailable browser storage. */ }
    return initializeReference(locale, dictionary, artwork);
  }, [page, locale, dictionary]);

  return <>
    <Seo title={title} description={page.description} path={path} image="/reference/img/heatnexis-logo.png" noIndex={!content[path] || path === '/404' || path === '/inquiry'} />
    <div key={path} dangerouslySetInnerHTML={{ __html: page.html }} />
  </>;
}
