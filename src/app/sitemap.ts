import type {MetadataRoute} from 'next';
import {pages} from '@/data/pages';
import {site} from '@/config/site';
export default function sitemap():MetadataRoute.Sitemap{return pages.filter(p=>p.kind!=='search').map(p=>({url:site.url+p.path,changeFrequency:'monthly',priority:p.path==='/'?1:.7}))}
