import { articles, articleCategories, categories, odmCases, products, services, solutions } from './catalog';

export type PageKind =
  | 'home'
  | 'catalog'
  | 'product'
  | 'solutions'
  | 'solution'
  | 'services'
  | 'service'
  | 'odm-index'
  | 'odm-detail'
  | 'blog'
  | 'article'
  | 'faq'
  | 'downloads'
  | 'videos'
  | 'contact'
  | 'about'
  | 'advantages'
  | 'join'
  | 'text'
  | 'search'
  | 'sitemap'
  | 'support';

export type PageRecord = {
  path: string;
  title: string;
  description: string;
  kind: PageKind;
  key?: string;
  parent?: { label: string; href: string };
};

const page = (
  path: string,
  title: string,
  kind: PageKind,
  description: string,
  key?: string,
  parent?: { label: string; href: string },
): PageRecord => ({ path, title, kind, description, key, parent });

export const pages: PageRecord[] = [
  page(
    '/',
    'Smart Thermostat Manufacturer & OEM/ODM Solutions',
    'home',
    'Heatnexis: professional smart thermostat and heating control OEM/ODM solutions for global distributors, HVAC contractors and brand partners.',
  ),
  page(
    '/products',
    'Products',
    'catalog',
    'Explore Heatnexis gas boiler thermostats, underfloor heating thermostats, smart radiator valves, thermal actuators, wiring centres and smart controllers.',
  ),
  ...categories.map((c) =>
    page(`/products/${c.slug}`, c.name, 'catalog', c.summary, c.slug, { label: 'Products', href: '/products' }),
  ),
  ...products.map((p) => {
    const cat = categories.find((c) => c.slug === p.category);
    return page(`/products/${p.category}/${p.slug}`, p.name, 'product', p.description, p.slug, {
      label: cat?.name || 'Products',
      href: `/products/${p.category}`,
    });
  }),
  page(
    '/tailor-made-solution',
    'Tailor-Made Solution',
    'services',
    'From ID design, PCB development, software integration to verification, Heatnexis structures end-to-end OEM/ODM thermostat programs.',
  ),
  ...services.map((s) =>
    page(`/tailor-made-solution/${s.slug}`, s.name, 'service', s.description, s.slug, {
      label: 'Tailor-Made Solution',
      href: '/tailor-made-solution',
    }),
  ),
  page(
    '/odm',
    'ODM Engineering Projects',
    'odm-index',
    'Explore Heatnexis concept ODM engineering cases across smart home integration, PCB development, mobile apps and structural enclosure design.',
    undefined,
    { label: 'Tailor-Made Solution', href: '/tailor-made-solution' },
  ),
  ...odmCases.map((c) =>
    page(`/odm/${c.slug}`, c.title, 'odm-detail', c.summary, c.slug, {
      label: 'ODM Engineering Projects',
      href: '/odm',
    }),
  ),
  page(
    '/solutions',
    'Solutions',
    'solutions',
    'Heatnexis provides smart thermostat and heating control solutions for underfloor heating, gas boilers, commercial HVAC and smart home applications.',
  ),
  ...solutions.map((s) =>
    page(`/solutions/${s.slug}`, s.name, 'solution', s.description, s.slug, {
      label: 'Solutions',
      href: '/solutions',
    }),
  ),
  page(
    '/blog',
    'Blog',
    'blog',
    'Professional resources covering smart thermostat buying guides, HVAC systems, WiFi/Zigbee technologies and OEM/ODM development insights.',
  ),
  ...articleCategories.map((c, i) =>
    page(`/blog/category/${i + 1}`, c, 'blog', `Read Heatnexis technical resources in ${c}.`, c, {
      label: 'Blog',
      href: '/blog',
    }),
  ),
  ...articles.map((a) =>
    page(`/blog/${a.slug}`, a.title, 'article', a.excerpt, a.slug, { label: 'Blog', href: '/blog' }),
  ),
  page(
    '/support',
    'Service & Support',
    'support',
    'Find thermostat FAQs, product documentation directories, setup video guides and technical support resources.',
  ),
  page(
    '/support/faqs',
    'Thermostat FAQs',
    'faq',
    'Quick answers and technical guidance for OEM/ODM customization, thermostat compatibility, documentation and ordering.',
    undefined,
    { label: 'Service & Support', href: '/support' },
  ),
  page(
    '/support/downloads',
    'Downloads',
    'downloads',
    'Access structured product manuals, technical datasheets and wiring guide listings for Heatnexis heating devices.',
    undefined,
    { label: 'Service & Support', href: '/support' },
  ),
  page(
    '/support/videos',
    'Videos',
    'videos',
    'Learn product setup, installation wiring and smart thermostat operation through structured technical video guides.',
    undefined,
    { label: 'Service & Support', href: '/support' },
  ),
  page(
    '/support/terms',
    'Terms of Service',
    'text',
    'Draft website terms of service pending review by the operating legal entity. No commercial contract is formed by browsing this preview.',
    undefined,
    { label: 'Service & Support', href: '/support' },
  ),
  page(
    '/about',
    'About Heatnexis',
    'about',
    'Heatnexis is a dedicated smart thermostat and heating control brand platform for global distributors, HVAC contractors and OEM/ODM partners.',
  ),
  page(
    '/about/advantages',
    'Our Advantages',
    'advantages',
    'Structured R&D workflows, hardware-to-cloud customization capabilities and disciplined quality assurance processes for global smart heating brands.',
    undefined,
    { label: 'About Us', href: '/about' },
  ),
  page(
    '/about/join-us',
    'Join Us',
    'join',
    'Explore engineering and international B2B collaboration opportunities with Heatnexis.',
    undefined,
    { label: 'About Us', href: '/about' },
  ),
  page(
    '/contact',
    'Contact Us',
    'contact',
    'Get professional support for OEM/ODM customization, thermostat sourcing and smart heating control projects.',
    undefined,
    { label: 'About Us', href: '/about' },
  ),
  page(
    '/search',
    'Search',
    'search',
    'Search Heatnexis thermostats, heating control solutions, OEM/ODM services and technical articles.',
  ),
  page(
    '/privacy',
    'Privacy Policy',
    'text',
    'Development preview notice: this site does not transmit inquiry form data over the network. Final data controller details and approved privacy policy are pending before public launch.',
  ),
  page(
    '/legal-notice',
    'Legal Notice',
    'text',
    'Heatnexis is the designated website brand. Approved legal entity name, registered address and statutory disclosures must be finalized prior to commercial launch.',
  ),
  page(
    '/sitemap',
    'Website Sitemap',
    'sitemap',
    'Browse the complete page structure of the Heatnexis smart thermostat and heating control website.',
  ),
];
