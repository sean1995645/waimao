import {products} from '@/data/catalog';
import type {ContentRepository} from '@/types/content';
/** Replace this adapter when a verified CMS is configured. */
export const productRepository:ContentRepository<typeof products[number]>={async list(){return products},async get(slug){return products.find(p=>p.slug===slug)||null}};
