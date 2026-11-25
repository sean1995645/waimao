export type VisualVariant =
  | 'boiler'
  | 'electric'
  | 'water'
  | 'trv'
  | 'actuator'
  | 'wiring'
  | 'controller';

export interface ProductCategory {
  slug: string;
  name: string;
  shortName: string;
  application: string;
  summary: string;
  icon: VisualVariant;
}

export interface ProductRecord {
  slug: string;
  name: string;
  eyebrow: string;
  category: string;
  application: string;
  reference: string;
  visual: VisualVariant;
  variantStyle: 'white-square' | 'black-square' | 'round-dial' | 'valve' | 'actuator' | 'hub';
  image: string;
  darkImage: string;
  gallery: string[];
  highlights: string[];
  status: string;
  description: string;
  specifications: [string, string][];
}

export interface OdmCaseRecord {
  slug: string;
  title: string;
  subtitle: string;
  serviceSlug: ServiceRecord['slug'];
  serviceName: string;
  variant: ProductRecord['variantStyle'];
  image: string;
  summary: string;
  scopePoints: { label: string; detail: string }[];
}

export interface ServiceRecord {
  slug: string;
  name: string;
  shortDesc: string;
  description: string;
  icon: 'home' | 'cpu' | 'smartphone' | 'layers';
  image: string;
  deliverables: string[];
  odmExamples: {
    slug: string;
    title: string;
    subtitle: string;
    variant: ProductRecord['variantStyle'];
    image: string;
  }[];
}

export interface SolutionRecord {
  slug: string;
  name: string;
  summary: string;
  description: string;
  icon: 'flame' | 'grid' | 'home' | 'leaf' | 'building' | 'wrench';
  image: string;
  requirements: string[];
  recommendedCategories: string[];
}

export interface ArticleRecord {
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  tags: string[];
  body: string[];
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  headline: string;
  ctaLabel: string;
  ctaHref: string;
  visualType: 'oem' | 'thermostats' | 'smart-hvac';
  image: string;
  mobileImage: string;
  video: string;
}

export interface FaqItem {
  category: string;
  question: string;
  answer: string;
}

export interface DownloadItem {
  id: string;
  title: string;
  category: string;
  languages: string;
  type: 'Manual' | 'Datasheet' | 'Wiring Guide';
}

export interface VideoItem {
  id: string;
  title: string;
  category: 'Product Showcase' | 'Installation & Wiring' | 'Technical Guides';
  duration: string;
  visual: VisualVariant;
  image: string;
}

export interface ContentRepository<T> {
  list(): Promise<T[]>;
  get(slug: string): Promise<T | null>;
}

export interface NavItem {
  name: string;
  href: string;
  previewSummary?: string;
  children?: {
    name: string;
    href: string;
    slug?: string;
    summary?: string;
  }[];
}
