import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb, HeroBanner, PageBody } from '@/components/Site';
import { site } from '@/config/site';
import { articles, products } from '@/data/catalog';
import { pages } from '@/data/pages';

type Props = {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ q?: string; page?: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return pages.map((p) => ({
    slug: p.path === '/' ? [] : p.path.slice(1).split('/'),
  }));
}

async function resolve(params: Props['params']) {
  const p = await params;
  return pages.find((page) => page.path === `/${(p.slug || []).join('/')}`);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await resolve(params);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: p.path },
    openGraph: {
      title: `${p.title} | BEOK Controls`,
      description: p.description,
      url: p.path,
      siteName: 'BEOK Controls',
      type: p.kind === 'article' ? 'article' : 'website',
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const page = await resolve(params);
  if (!page) notFound();

  const query = ['search', 'blog'].includes(page.kind) ? await searchParams : {};

  const breadcrumbItems = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
    ...(page.parent
      ? [{ '@type': 'ListItem', position: 2, name: page.parent.label, item: site.url + page.parent.href }]
      : []),
    ...(page.path === '/'
      ? []
      : [
          {
            '@type': 'ListItem',
            position: page.parent ? 3 : 2,
            name: page.title,
            item: site.url + page.path,
          },
        ]),
  ];

  const jsonLdGraph: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems,
    },
  ];

  if (page.kind === 'home') {
    jsonLdGraph.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'BEOK Controls',
      url: site.url,
      description: page.description,
    });
  } else if (page.kind === 'product') {
    const prod = products.find((p) => p.slug === page.key);
    if (prod) {
      jsonLdGraph.push({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: prod.name,
        sku: prod.reference,
        brand: { '@type': 'Brand', name: 'BEOK Controls' },
        description: prod.description,
      });
    }
  } else if (page.kind === 'article') {
    const art = articles.find((a) => a.slug === page.key);
    if (art) {
      jsonLdGraph.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: art.title,
        datePublished: art.date.replaceAll('.', '-'),
        author: { '@type': 'Organization', name: 'BEOK Controls' },
        description: art.excerpt,
      });
    }
  }

  const hasCustomHero = page.kind === 'home' || page.kind === 'product';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdGraph).replace(/</g, '\\u003c'),
        }}
      />
      {hasCustomHero ? (
        <PageBody page={page} q={query.q || ''} requestedPage={Number(query.page) || 1} />
      ) : (
        <>
          <HeroBanner page={page} />
          <Breadcrumb page={page} />
          <PageBody page={page} q={query.q || ''} requestedPage={Number(query.page) || 1} />
        </>
      )}
    </>
  );
}
