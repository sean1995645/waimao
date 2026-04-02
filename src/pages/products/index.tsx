import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import PageHero from '@/components/PageHero';
import ProductCard from '@/components/ProductCard';
import Seo, { SITE_URL, toAbsoluteUrl } from '@/components/Seo';
import { categoryIds, getLocalizedCategoryName, localizeProducts, products } from '@/data/products';

const ProductsPage: React.FC = () => {
  const intl = useIntl();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const localizedProducts = localizeProducts(products, intl.formatMessage);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.categoryId === selectedCategory));
    }
  }, [selectedCategory]);

  const toggleAccordion = (category: string) => {
    setOpenAccordion(openAccordion === category ? null : category);
  };

  const getCategoryProducts = (category: string) => {
    return products.filter((product) => product.categoryId === category);
  };

  const categoryItems = categoryIds.map((categoryId) => ({
    id: categoryId,
    name: getLocalizedCategoryName(categoryId, intl.formatMessage),
    count: getCategoryProducts(categoryId).length,
  }));
  const productsTitle = `${intl.formatMessage({ id: 'products.hero.title' })} | HeatNexis`;
  const productsDescription = intl.formatMessage({ id: 'products.hero.description' });
  const productsStructuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: productsTitle,
      description: productsDescription,
      url: `${SITE_URL}/products`,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: products.length,
        itemListElement: localizedProducts.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${SITE_URL}/products/${product.slug}`,
          name: product.title,
          image: toAbsoluteUrl(product.image),
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: intl.formatMessage({ id: 'nav.home' }),
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: intl.formatMessage({ id: 'products.hero.title' }),
          item: `${SITE_URL}/products`,
        },
      ],
    },
  ];

  return (
    <div className="w-full">
      <Seo
        title={productsTitle}
        description={productsDescription}
        path="/products"
        image="/page-hero-products-photo.jpg"
        keywords={['product catalog', 'floor heating thermostat catalog', 'smart thermostat supplier', 'heating control products']}
        structuredData={productsStructuredData}
      />
      <PageHero
        bgImage="/page-hero-products-photo.jpg"
        bgImageMobile="/page-hero-products-photo-mobile.jpg"
        bgPosition="68% center"
        accentColor="#5fa7d4"
        eyebrow={intl.formatMessage({ id: 'products.hero.eyebrow' })}
        title={intl.formatMessage({ id: 'products.hero.title' })}
        description={intl.formatMessage({ id: 'products.hero.description' })}
        panelTitle={intl.formatMessage({ id: 'products.hero.panelTitle' })}
        panelText={intl.formatMessage({ id: 'products.hero.panelText' })}
        stats={[
          { value: `${products.length}+`, label: intl.formatMessage({ id: 'products.hero.browsableModels' }) },
          { value: `${categoryIds.length}`, label: intl.formatMessage({ id: 'products.hero.categories' }) },
          { value: 'OEM', label: intl.formatMessage({ id: 'products.hero.privateLabelReady' }) },
        ]}
      />

      <div className="relative bg-hn-surface py-6 lg:py-10">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-5">
          {/* Mobile Accordion */}
          <div className="motion-fade-up flex flex-col gap-2 lg:hidden" data-product-accordion>
            {categoryIds.map((categoryId) => {
              const categoryProducts = getCategoryProducts(categoryId);
              const isOpen = openAccordion === categoryId;
              const categoryLabel = getLocalizedCategoryName(categoryId, intl.formatMessage);

              return (
                <div key={categoryId} className="overflow-hidden rounded-xl border border-hn-border bg-white shadow-sm" data-product-accordion-item>
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3 text-left text-[0.85rem] font-medium text-hn-primary bg-transparent border-0"
                    onClick={() => toggleAccordion(categoryId)}
                    aria-expanded={isOpen}
                    data-product-accordion-trigger
                  >
                    <span>{categoryLabel}</span>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex min-w-[1.5rem] items-center justify-center rounded-full bg-hn-surface-soft px-2 py-0.5 text-[0.7rem] font-semibold text-hn-text-muted">{categoryProducts.length}</span>
                      <svg
                        className={`h-4 w-4 text-hn-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        data-product-accordion-icon
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </div>
                  </button>
                  {isOpen && (
                    <div className="border-t border-hn-border p-2 bg-hn-surface/50" data-product-accordion-panel>
                      <div className="grid grid-cols-2 gap-2">
                        {categoryProducts.map((product) => (
                          <ProductCard key={product.slug} product={product} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8">
            <aside className="motion-fade-right sticky top-24 self-start">
              <div className="rounded-xl border border-hn-border bg-white p-5 shadow-sm">
                <h2 className="mb-4 border-b border-hn-border pb-3 text-[0.95rem] font-bold text-hn-primary">{intl.formatMessage({ id: 'products.categories' })}</h2>
                <div className="flex flex-col gap-1.5">
                  <button
                    type="button"
                    aria-pressed={selectedCategory === 'all'}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[0.85rem] font-medium transition-colors duration-200 ${
                      selectedCategory === 'all'
                        ? 'bg-hn-surface-soft text-hn-accent'
                        : 'bg-transparent text-hn-text-muted hover:bg-hn-surface hover:text-hn-primary'
                    }`}
                    onClick={() => setSelectedCategory('all')}
                    data-category="all"
                  >
                    <span>{intl.formatMessage({ id: 'products.allProducts' })}</span>
                    <span className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[0.7rem] font-semibold ${
                      selectedCategory === 'all'
                        ? 'bg-white text-hn-accent ring-1 ring-hn-accent/20'
                        : 'bg-hn-surface-soft text-hn-text-muted'
                    }`}>{products.length}</span>
                  </button>
                  {categoryItems.map(({ id, name, count }) => (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={selectedCategory === id}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[0.85rem] font-medium transition-colors duration-200 ${
                        selectedCategory === id
                          ? 'bg-hn-surface-soft text-hn-accent'
                          : 'bg-transparent text-hn-text-muted hover:bg-hn-surface hover:text-hn-primary'
                      }`}
                      onClick={() => setSelectedCategory(id)}
                      data-category={id}
                    >
                      <span>{name}</span>
                      <span className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[0.7rem] font-semibold ${
                        selectedCategory === id
                          ? 'bg-white text-hn-accent ring-1 ring-hn-accent/20'
                          : 'bg-hn-surface-soft text-hn-text-muted'
                      }`}>{count}</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            <div className="motion-fade-left flex-1">
              <div className="mb-6 flex items-center justify-between border-b border-hn-border pb-3">
                <h1 className="text-[1.5rem] font-bold text-hn-primary">{selectedCategory === 'all' ? intl.formatMessage({ id: 'products.allProducts' }) : getLocalizedCategoryName(selectedCategory, intl.formatMessage)}</h1>
                <p className="text-[0.9rem] text-hn-text-muted">
                  <strong className="font-semibold text-hn-primary">{filteredProducts.length}</strong> {intl.formatMessage({ id: 'products.productsCount' })}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4" id="productGrid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
