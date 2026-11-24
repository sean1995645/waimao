import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { pages } from '@/data/pages';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return pages
    .filter((p) => p.kind !== 'search')
    .map((p) => ({
      url: site.url + p.path,
      changeFrequency: 'monthly',
      priority: p.path === '/' ? 1 : 0.7,
    }));
}
