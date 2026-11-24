import Link from 'next/link';
import { articles, categories, odmCases, products, services, solutions } from '@/data/catalog';
import { pages, type PageRecord } from '@/data/pages';
import { BlogDetailView, BlogIndexView } from './BlogSections';
import { AboutPageView, AdvantagesPageView, ContactPageView, JoinUsPageView } from './CompanySections';
import { Footer } from './Footer';
import { HeroBanner } from './HeroBanner';
import { HomePageView } from './HomeSections';
import { Breadcrumb, Container, Pagination, SectionTitle } from './LayoutPrimitives';
import { ProductDetailView } from './ProductDetailView';
import { ProductGrid } from './ProductsCatalog';
import { SolutionDetailView, SolutionsIndexView } from './SolutionsSections';
import { DownloadsDirectory, FAQAccordion, SupportOverviewView, VideosLibrary } from './SupportSections';
import { OdmDetailView, OdmIndexView, ServiceDetailView, TailorMadeIndexView } from './TailorMadeSections';

export { Breadcrumb, Container, Footer, HeroBanner, Pagination, SectionTitle };

export function PageBody({
  page,
  q = '',
  requestedPage = 1,
}: {
  page: PageRecord;
  q?: string;
  requestedPage?: number;
}) {
  switch (page.kind) {
    case 'home':
      return <HomePageView />;

    case 'catalog':
      return <ProductGrid key={page.path} category={page.key} />;

    case 'product': {
      const prod = products.find((p) => p.slug === page.key);
      return prod ? <ProductDetailView product={prod} /> : null;
    }

    case 'services':
      return <TailorMadeIndexView />;

    case 'service': {
      const svc = services.find((s) => s.slug === page.key);
      return svc ? <ServiceDetailView service={svc} /> : null;
    }

    case 'odm-index':
      return <OdmIndexView />;

    case 'odm-detail': {
      const odm = odmCases.find((c) => c.slug === page.key);
      return odm ? <OdmDetailView odmCase={odm} /> : null;
    }

    case 'solutions':
      return <SolutionsIndexView />;

    case 'solution': {
      const sol = solutions.find((s) => s.slug === page.key);
      return sol ? <SolutionDetailView solution={sol} /> : null;
    }

    case 'blog':
      return <BlogIndexView activeCategory={page.key} currentPath={page.path} requestedPage={requestedPage} />;

    case 'article': {
      const art = articles.find((a) => a.slug === page.key);
      return art ? <BlogDetailView article={art} /> : null;
    }

    case 'support':
      return <SupportOverviewView />;

    case 'faq':
      return (
        <section className="section-block">
          <Container>
            <FAQAccordion />
          </Container>
        </section>
      );

    case 'downloads':
      return <DownloadsDirectory />;

    case 'videos':
      return <VideosLibrary />;

    case 'about':
      return <AboutPageView />;

    case 'advantages':
      return <AdvantagesPageView />;

    case 'join':
      return <JoinUsPageView />;

    case 'contact':
      return <ContactPageView />;

    case 'search': {
      const term = q.trim().toLowerCase();
      const found = term
        ? pages.filter(
            (p) =>
              !['home', 'search', 'sitemap', 'text'].includes(p.kind) &&
              `${p.title} ${p.description}`.toLowerCase().includes(term),
          )
        : [];
      return (
        <section className="section-block">
          <Container>
            <form className="page-search" action="/search">
              <label htmlFor="search-query">Search Heatnexis products, solutions, services and articles</label>
              <div className="search-row">
                <input
                  id="search-query"
                  name="q"
                  type="search"
                  defaultValue={q}
                  placeholder="Enter keywords such as boiler, underfloor, TRV, PCB..."
                  required
                />
                <button className="btn-primary" type="submit">
                  Search
                </button>
              </div>
            </form>
            <p role="status" style={{ fontWeight: 600 }}>
              {q ? `${found.length} ${found.length === 1 ? 'result' : 'results'} for “${q}”` : 'Enter a search term to begin.'}
            </p>
            <ul className="search-results">
              {found.map((item) => (
                <li key={item.path}>
                  <h2>
                    <Link href={item.path}>{item.title}</Link>
                  </h2>
                  <p style={{ margin: '6px 0 0', color: '#666' }}>{item.description}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      );
    }

    case 'sitemap': {
      const groups = [
        {
          title: 'Products & Categories',
          items: [
            { label: 'All Products', href: '/products' },
            ...categories.map((c) => ({ label: c.name, href: `/products/${c.slug}` })),
          ],
        },
        {
          title: 'Product Series & Models',
          items: products.map((p) => ({ label: p.name, href: `/products/${p.category}/${p.slug}` })),
        },
        {
          title: 'Tailor-Made Solution & ODM Projects',
          items: [
            { label: 'Tailor-Made Solution Overview', href: '/tailor-made-solution' },
            ...services.map((s) => ({ label: s.name, href: `/tailor-made-solution/${s.slug}` })),
            { label: 'All ODM Engineering Projects', href: '/odm' },
            ...odmCases.map((c) => ({ label: c.title, href: `/odm/${c.slug}` })),
          ],
        },
        {
          title: 'Solutions',
          items: [
            { label: 'All Solutions', href: '/solutions' },
            ...solutions.map((s) => ({ label: s.name, href: `/solutions/${s.slug}` })),
          ],
        },
        {
          title: 'Blog & Insights',
          items: [
            { label: 'All Articles', href: '/blog' },
            ...articles.map((a) => ({ label: a.title, href: `/blog/${a.slug}` })),
          ],
        },
        {
          title: 'Support, Company & Legal',
          items: [
            { label: 'Service & Support', href: '/support' },
            { label: 'Thermostat FAQs', href: '/support/faqs' },
            { label: 'Downloads', href: '/support/downloads' },
            { label: 'Videos', href: '/support/videos' },
            { label: 'Terms of Service', href: '/support/terms' },
            { label: 'About Heatnexis', href: '/about' },
            { label: 'Our Advantages', href: '/about/advantages' },
            { label: 'Join Us', href: '/about/join-us' },
            { label: 'Contact Us', href: '/contact' },
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Legal Notice', href: '/legal-notice' },
            { label: 'Search', href: '/search' },
          ],
        },
      ];

      return (
        <section className="section-block">
          <Container>
            <div className="sitemap-groups">
              {groups.map((grp) => (
                <div className="sitemap-group" key={grp.title}>
                  <h2>{grp.title}</h2>
                  <ul>
                    {grp.items.map((it) => (
                      <li key={it.href}>
                        <Link href={it.href}>{it.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </section>
      );
    }

    default:
      return (
        <section className="section-block">
          <Container>
            <article className="prose">
              <h2 style={{ marginTop: 0 }}>{page.title}</h2>
              <p>{page.description}</p>
              <p className="notice-box">
                This notice is an interim legal placeholder pending final corporate review by the operating Heatnexis
                legal entity prior to public commercial launch.
              </p>
              <Link href="/contact" className="text-link">
                Contact Us →
              </Link>
            </article>
          </Container>
        </section>
      );
  }
}
