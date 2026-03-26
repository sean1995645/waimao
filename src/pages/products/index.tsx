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

      <div className="relative bg-hn-surface py-2 lg:py-8 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top_right,rgba(95,167,212,0.16),transparent_42%)] motion-safe:animate-floatSoft" />
        <div className="max-w-[1200px] mx-auto px-4 lg:px-5">
          {/* Mobile Accordion */}
          <div className="motion-fade-up flex flex-col gap-1.5 lg:hidden" data-product-accordion>
            {categoryIds.map((categoryId) => {
              const categoryProducts = getCategoryProducts(categoryId);
              const isOpen = openAccordion === categoryId;
              const categoryLabel = getLocalizedCategoryName(categoryId, intl.formatMessage);

              return (
                <div key={categoryId} className="overflow-hidden rounded-xl border border-[#e4eaf3] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]" data-product-accordion-item>
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center justify-between gap-3 px-3 py-2 text-left text-[0.8rem] text-hn-primary bg-transparent border-0"
                    onClick={() => toggleAccordion(categoryId)}
                    aria-expanded={isOpen}
                    data-product-accordion-trigger
                  >
                    <span>{categoryLabel}</span>
                    <span className="ml-auto inline-flex min-w-[1.5rem] items-center justify-center rounded-full bg-[#f5f8fc] px-2 py-0.5 text-[0.7rem] font-semibold text-[#60758e]">{categoryProducts.length}</span>
                    <svg
                      className={`h-4 w-4 text-[#60758e] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      data-product-accordion-icon
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="border-t border-[#e7edf5] p-1.5" data-product-accordion-panel>
                      <div className="grid grid-cols-2 gap-1.5">
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
          <div className="hidden lg:grid lg:grid-cols-[228px_minmax(0,1fr)] lg:gap-6">
            <aside className="motion-fade-right sticky top-24 self-start">
              <div className="rounded-2xl border border-[#e4eaf3] bg-white p-4 shadow-[0_4px_16px_rgba(15,23,42,0.04)]">
                <h2 className="mb-3 border-b border-[#edf2f7] pb-2.5 text-[0.95rem] font-bold text-hn-primary">{intl.formatMessage({ id: 'products.categories' })}</h2>
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    aria-pressed={selectedCategory === 'all'}
                    className={`relative flex w-full items-start justify-start gap-2 rounded-lg border px-3 py-2.5 text-left text-[0.82rem] transition-colors duration-200 ${
                      selectedCategory === 'all'
                        ? 'border-[#d8e4ef] bg-[#f5f8fc] text-hn-primary'
                        : 'border-transparent bg-transparent text-[#445468] hover:border-[#e2eaf2] hover:bg-[#f8fafc] hover:text-hn-primary'
                    }`}
                    onClick={() => setSelectedCategory('all')}
                    data-category="all"
                  >
                    <span
                      className={`absolute left-0 top-2.5 bottom-2.5 w-0.5 rounded-full ${
                        selectedCategory === 'all' ? 'bg-hn-accent' : 'bg-transparent'
                      }`}
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1 pl-1.5 font-medium leading-5">{intl.formatMessage({ id: 'products.allProducts' })}</span>
                    <span className={`mt-0.5 inline-flex h-6 min-w-[1.8rem] shrink-0 items-center justify-center self-start rounded-full px-1.5 text-[0.68rem] font-semibold ${
                      selectedCategory === 'all'
                        ? 'bg-white text-hn-primary ring-1 ring-[#d8e4ef]'
                        : 'bg-[#f3f6fb] text-[#60758e]'
                    }`}>{products.length}</span>
                  </button>
                  {categoryItems.map(({ id, name, count }) => (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={selectedCategory === id}
                      className={`relative flex w-full items-start justify-start gap-2 rounded-lg border px-3 py-2.5 text-left text-[0.82rem] transition-colors duration-200 ${
                        selectedCategory === id
                          ? 'border-[#d8e4ef] bg-[#f5f8fc] text-hn-primary'
                          : 'border-transparent bg-transparent text-[#445468] hover:border-[#e2eaf2] hover:bg-[#f8fafc] hover:text-hn-primary'
                      }`}
                      onClick={() => setSelectedCategory(id)}
                      data-category={id}
                    >
                      <span
                        className={`absolute left-0 top-2.5 bottom-2.5 w-0.5 rounded-full ${
                          selectedCategory === id ? 'bg-hn-accent' : 'bg-transparent'
                        }`}
                        aria-hidden="true"
                      />
                      <span className="min-w-0 flex-1 pl-1.5 font-medium leading-5 text-current">{name}</span>
                      <span className={`mt-0.5 inline-flex h-6 min-w-[1.8rem] shrink-0 items-center justify-center self-start rounded-full px-1.5 text-[0.68rem] font-semibold ${
                        selectedCategory === id
                          ? 'bg-white text-hn-primary ring-1 ring-[#d8e4ef]'
                          : 'bg-[#f3f6fb] text-[#60758e]'
                      }`}>{count}</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            <div className="motion-fade-left flex-1">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[0.9rem] text-[#5f7088]">
                  {intl.formatMessage({ id: 'products.showing' })} <strong className="text-hn-primary font-semibold">{filteredProducts.length}</strong> {intl.formatMessage({ id: 'products.productsCount' })}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3" id="productGrid">
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
