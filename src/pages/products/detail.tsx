import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link, useParams } from 'umi';
import ProductCard from '@/components/ProductCard';
import { addToInquiry, isInInquiry, removeFromInquiry } from '@/components/BulkInquiry';
import Seo, { SITE_URL, toAbsoluteUrl } from '@/components/Seo';
import { getProductBySlug, products } from '@/data/products';

const ProductDetailPage: React.FC = () => {
  const intl = useIntl();
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const product = getProductBySlug(slug);
  const [isSelected, setIsSelected] = useState(false);
  const getMessage = (id: string, fallback: string) => {
    const message = intl.messages?.[id];
    return typeof message === 'string' && message ? message : fallback;
  };

  useEffect(() => {
    if (!product) {
      return;
    }

    const syncSelectedState = () => {
      setIsSelected(isInInquiry(product.title));
    };

    syncSelectedState();
    window.addEventListener('storage', syncSelectedState);

    return () => {
      window.removeEventListener('storage', syncSelectedState);
    };
  }, [product]);

  if (!product) {
    return (
      <div>
        <Seo
          title="Product Not Found | HeatNexis"
          description="The requested underfloor heating control product could not be found in the HeatNexis catalog."
          path={`/products/${slug}`}
          noIndex
        />
        <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f6f9fc_0%,#ffffff_100%)] py-20 max-md:py-12">
          <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top_left,rgba(95,167,212,0.18),transparent_45%)]" />
          <div className="relative mx-auto max-w-[920px] px-5 max-md:px-4">
            <div className="rounded-[2rem] border border-[#dbe6f0] bg-white/90 p-10 shadow-[0_24px_80px_rgba(13,34,60,0.08)] backdrop-blur max-md:rounded-[1.5rem] max-md:p-6">
              <span className="inline-flex rounded-full border border-[#d8e4ef] bg-[#f5f8fc] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#5a7289]">
                {getMessage('product.detail.notFoundTag', 'Catalog')}
              </span>
              <h1 className="mt-5 text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-hn-primary">
                {getMessage('product.detail.notFoundTitle', 'Product not found')}
              </h1>
              <p className="mt-4 max-w-[44rem] text-[1rem] leading-8 text-[#5d7186]">
                {getMessage('product.detail.notFoundDescription', 'The product you requested is not available in the current catalog. Return to the product list to continue browsing available heating control models.')}
              </p>
              <div className="mt-8 flex gap-3 max-md:flex-col">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center rounded-xl bg-hn-primary px-6 py-3 text-[0.92rem] font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(12,25,45,0.18)]"
                >
                  {getMessage('product.detail.backToCatalog', 'Back to catalog')}
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-[#d8e4ef] bg-white px-6 py-3 text-[0.92rem] font-semibold text-hn-primary no-underline transition-all duration-200 hover:border-hn-accent hover:text-hn-accent"
                >
                  {getMessage('product.detail.contactTeam', 'Contact team')}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const productStats = [
    { label: getMessage('product.detail.category', 'Category'), value: product.category },
    { label: getMessage('product.detail.voltage', 'Voltage'), value: product.specs?.voltage || 'N/A' },
    { label: getMessage('product.detail.control', 'Control'), value: product.specs?.control || 'N/A' },
    { label: getMessage('product.detail.display', 'Display'), value: product.specs?.display || 'N/A' },
  ];

  const relatedProducts = products
    .filter((item) => item.slug !== product.slug && item.category === product.category)
    .slice(0, 3);

  const capabilityCards = [
    {
      title: getMessage('product.detail.useCaseTitle', 'Use-case ready'),
      text: getMessage('product.detail.useCaseText', 'Configured for OEM, distributor and project-driven heating control requirements.'),
    },
    {
      title: getMessage('product.detail.integrationTitle', 'Fast integration'),
      text: getMessage('product.detail.integrationText', 'Share target market, control logic and compliance scope to match the correct variant faster.'),
    },
    {
      title: getMessage('product.detail.brandingTitle', 'Flexible branding'),
      text: getMessage('product.detail.brandingText', 'Core models can be adapted for panel finish, packaging, language set and project documentation.'),
    },
  ];

  const handleToggleInquiry = () => {
    if (isSelected) {
      removeFromInquiry(product.title);
      setIsSelected(false);
      return;
    }

    addToInquiry({
      name: product.title,
      url: `/products/${product.slug}`,
      img: product.image,
    });
    setIsSelected(true);
  };

  const handleContact = () => {
    if (!isSelected) {
      addToInquiry({
        name: product.title,
        url: `/products/${product.slug}`,
        img: product.image,
      });
      setIsSelected(true);
    }

    window.location.href = '/contact';
  };
  const productTitle = `${product.title} | HeatNexis`;
  const productDescription = `${product.description || getMessage('product.detail.defaultDescription', 'Heating control model built for stable performance, clear specification matching and efficient project quoting.')} ${product.specs?.control ? `Control: ${product.specs.control}.` : ''} ${product.specs?.voltage ? `Voltage: ${product.specs.voltage}.` : ''}`.trim();
  const productStructuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title,
      description: product.description || productTitle,
      image: [toAbsoluteUrl(product.image)],
      sku: product.id,
      brand: {
        '@type': 'Brand',
        name: 'HeatNexis',
      },
      manufacturer: {
        '@type': 'Organization',
        name: 'HeatNexis',
        url: SITE_URL,
      },
      category: product.category,
      url: `${SITE_URL}/products/${product.slug}`,
      additionalProperty: Object.entries(product.specs || {}).map(([name, value]) => ({
        '@type': 'PropertyValue',
        name,
        value,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Products',
          item: `${SITE_URL}/products`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: product.title,
          item: `${SITE_URL}/products/${product.slug}`,
        },
      ],
    },
  ];

  return (
    <div className="w-full bg-[linear-gradient(180deg,#eff5fa_0%,#ffffff_28%,#f6f9fc_100%)]">
      <Seo
        title={productTitle}
        description={productDescription}
        path={`/products/${product.slug}`}
        image={product.image}
        keywords={[product.category, product.id, product.specs?.control || 'thermostat']}
        type="product"
        structuredData={productStructuredData}
      />
      <section className="relative overflow-hidden border-b border-[#e1e9f1] bg-[radial-gradient(circle_at_top_left,rgba(95,167,212,0.22),transparent_34%),linear-gradient(135deg,#081a2d_0%,#102b49_58%,#17395e_100%)] text-white">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'url(/pattern.svg)' }} />
        <div className="absolute -right-20 top-14 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22),transparent_65%)] blur-[30px]" />
        <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(90deg,rgba(5,14,26,0.78)_0%,rgba(5,14,26,0.3)_54%,rgba(5,14,26,0.14)_100%)]" />
        <div className="relative mx-auto grid max-w-[1200px] gap-10 px-5 py-10 lg:grid-cols-[minmax(0,1.05fr)_420px] lg:items-center lg:py-16 max-md:px-4 max-md:py-8">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-[0.78rem] font-semibold tracking-[0.12em] text-white/70">
              <Link to="/" className="no-underline transition-colors duration-200 hover:text-white">
                {getMessage('product.detail.home', 'Home')}
              </Link>
              <span>/</span>
              <Link to="/products" className="no-underline transition-colors duration-200 hover:text-white">
                {getMessage('product.detail.catalog', 'Products')}
              </Link>
              <span>/</span>
              <span className="text-white">{product.title}</span>
            </div>

            <div className="motion-fade-up animation-delay-100 mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#c8dbeb]">
                {product.category}
              </span>
              {product.featured && (
                <span className="inline-flex rounded-full border border-[#93d4b7]/40 bg-[#93d4b7]/12 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#c5f0da]">
                  {getMessage('product.detail.featured', 'Featured')}
                </span>
              )}
              {isSelected && (
                <span className="inline-flex rounded-full border border-[#5fa7d4]/40 bg-[#5fa7d4]/12 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#d1e8f8]">
                  {getMessage('product.detail.inInquiry', 'In inquiry list')}
                </span>
              )}
            </div>

            <h1 className="motion-fade-up animation-delay-150 mt-5 max-w-[13ch] text-[clamp(2.4rem,5vw,4.6rem)] font-bold leading-[0.98] tracking-[-0.04em]">
              {product.title}
            </h1>
            <p className="motion-fade-up animation-delay-200 mt-5 max-w-[42rem] text-[1rem] leading-8 text-white/78 max-md:text-[0.95rem] max-md:leading-7">
              {product.description || getMessage('product.detail.defaultDescription', 'Heating control model built for stable performance, clear specification matching and efficient project quoting.')}
            </p>

            <div className="motion-fade-up animation-delay-300 mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {productStats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/12 bg-white/8 px-4 py-4 backdrop-blur-sm">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#c1d5e6]">{item.label}</p>
                  <p className="mt-2 text-[0.92rem] font-semibold leading-6 text-white">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="motion-fade-up animation-delay-500 mt-8 flex flex-wrap gap-3 max-md:flex-col">
              <button
                type="button"
                onClick={handleToggleInquiry}
                className={`inline-flex items-center justify-center rounded-xl px-6 py-3 text-[0.92rem] font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'border border-[#8cc5e7] bg-[#5fa7d4] text-white hover:bg-[#5299c6]'
                    : 'border border-white/15 bg-white text-hn-primary hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(0,0,0,0.2)]'
                }`}
              >
                {isSelected ? getMessage('product.detail.removeInquiry', 'Remove from inquiry') : getMessage('product.detail.addInquiry', 'Add to inquiry')}
              </button>
              <button
                type="button"
                onClick={handleContact}
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-6 py-3 text-[0.92rem] font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white/35 hover:bg-white/14"
              >
                {getMessage('product.detail.requestQuote', 'Request quote for this model')}
              </button>
            </div>
          </div>

          <div className="motion-fade-left relative">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-[radial-gradient(circle_at_top,rgba(95,167,212,0.28),transparent_60%)] blur-[20px]" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl max-md:rounded-[1.5rem]">
              <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),transparent)]" />
              <div className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#0d2036] p-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="aspect-square w-full rounded-[1rem] object-cover"
                />
              </div>
              <div className="relative mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.25rem] border border-white/10 bg-white/8 px-4 py-4">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#c1d5e6]">
                    {getMessage('product.detail.sku', 'SKU')}
                  </p>
                  <p className="mt-2 text-[1rem] font-semibold text-white">{product.id}</p>
                </div>
                <div className="rounded-[1.25rem] border border-white/10 bg-white/8 px-4 py-4">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#c1d5e6]">
                    {getMessage('product.detail.modelType', 'Model type')}
                  </p>
                  <p className="mt-2 text-[1rem] font-semibold text-white">{product.specs?.control || product.category}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1200px] gap-8 px-5 py-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start max-md:px-4 max-md:py-8">
        <div className="space-y-8">
          <div className="motion-fade-up rounded-[2rem] border border-[#dde7f0] bg-white p-7 shadow-[0_16px_50px_rgba(13,34,60,0.05)] max-md:rounded-[1.5rem] max-md:p-5">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-[#6d8298]">
                  {getMessage('product.detail.specTag', 'Specification snapshot')}
                </p>
                <h2 className="mt-3 text-[1.8rem] font-bold tracking-[-0.03em] text-hn-primary max-md:text-[1.4rem]">
                  {getMessage('product.detail.specTitle', 'Technical details')}
                </h2>
              </div>
              <Link to="/contact" className="text-[0.86rem] font-semibold text-hn-accent no-underline transition-colors duration-200 hover:text-hn-accent-strong">
                {getMessage('product.detail.needVariant', 'Need another variant? Contact us')}
              </Link>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {productStats.map((item) => (
                <div key={item.label} className="rounded-[1.4rem] border border-[#e6edf4] bg-[linear-gradient(180deg,#fbfdff_0%,#f5f8fc_100%)] px-5 py-5">
                  <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#6f8498]">{item.label}</p>
                  <p className="mt-3 text-[1.05rem] font-semibold leading-7 text-hn-primary">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="motion-fade-up animation-delay-150 rounded-[2rem] border border-[#dde7f0] bg-white p-7 shadow-[0_16px_50px_rgba(13,34,60,0.05)] max-md:rounded-[1.5rem] max-md:p-5">
            <p className="text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-[#6d8298]">
              {getMessage('product.detail.valueTag', 'Project value')}
            </p>
            <h2 className="mt-3 text-[1.8rem] font-bold tracking-[-0.03em] text-hn-primary max-md:text-[1.4rem]">
              {getMessage('product.detail.valueTitle', 'Why this model fits heating control projects')}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {capabilityCards.map((item) => (
                <div key={item.title} className="rounded-[1.4rem] border border-[#e6edf4] bg-[linear-gradient(180deg,#ffffff_0%,#f7fafc_100%)] p-5">
                  <div className="mb-4 h-10 w-10 rounded-xl bg-[linear-gradient(135deg,#e4f0f8_0%,#c7dff0_100%)]" />
                  <h3 className="text-[1rem] font-semibold text-hn-primary">{item.title}</h3>
                  <p className="mt-3 text-[0.92rem] leading-7 text-[#5c7187]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="motion-fade-left space-y-5 lg:sticky lg:top-24">
          <div className="overflow-hidden rounded-[1.8rem] border border-[#dbe6f0] bg-[linear-gradient(180deg,#f8fbfe_0%,#eef5fa_100%)] p-6 shadow-[0_16px_40px_rgba(13,34,60,0.05)] max-md:rounded-[1.4rem] max-md:p-5">
            <p className="text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-[#6d8298]">
              {getMessage('product.detail.quoteTag', 'Quick action')}
            </p>
            <h2 className="mt-3 text-[1.45rem] font-bold tracking-[-0.03em] text-hn-primary">
              {getMessage('product.detail.quoteTitle', 'Build your inquiry pack')}
            </h2>
            <p className="mt-3 text-[0.92rem] leading-7 text-[#5c7187]">
              {getMessage('product.detail.quoteText', 'Add this product to your inquiry list and continue building a shortlist before sending the request.')}
            </p>
            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={handleToggleInquiry}
                className={`inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-[0.92rem] font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'bg-hn-accent text-white hover:bg-hn-accent-strong'
                    : 'bg-hn-primary text-white hover:bg-[#0a2138]'
                }`}
              >
                {isSelected ? getMessage('product.detail.addedState', 'Added to inquiry') : getMessage('product.detail.sidebarAdd', 'Add this model')}
              </button>
              <button
                type="button"
                onClick={handleContact}
                className="inline-flex w-full items-center justify-center rounded-xl border border-[#d7e2ec] bg-white px-5 py-3 text-[0.92rem] font-semibold text-hn-primary transition-all duration-200 hover:border-hn-accent hover:text-hn-accent"
              >
                {getMessage('product.detail.sidebarContact', 'Send inquiry now')}
              </button>
            </div>
          </div>

          <div className="motion-fade-left animation-delay-200 rounded-[1.8rem] border border-[#dbe6f0] bg-white p-6 shadow-[0_16px_40px_rgba(13,34,60,0.05)] max-md:rounded-[1.4rem] max-md:p-5">
            <p className="text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-[#6d8298]">
              {getMessage('product.detail.supportTag', 'Support scope')}
            </p>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-[0.86rem] font-semibold text-hn-primary">{getMessage('product.detail.supportMarket', 'Target market')}</p>
                <p className="mt-1 text-[0.9rem] leading-7 text-[#5c7187]">{getMessage('product.detail.supportMarketText', 'Share region, voltage standard and control preference to match the correct variant.')}</p>
              </div>
              <div>
                <p className="text-[0.86rem] font-semibold text-hn-primary">{getMessage('product.detail.supportOEM', 'OEM options')}</p>
                <p className="mt-1 text-[0.9rem] leading-7 text-[#5c7187]">{getMessage('product.detail.supportOEMText', 'Panel branding, packaging, multilingual UI and project documentation can be aligned with your order plan.')}</p>
              </div>
            </div>
          </div>
        </aside>
      </section>

      {relatedProducts.length > 0 && (
        <section className="border-t border-[#e1e9f1] bg-white py-12 max-md:py-8">
          <div className="mx-auto max-w-[1200px] px-5 max-md:px-4">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-[#6d8298]">
                  {getMessage('product.detail.relatedTag', 'Same category')}
                </p>
                <h2 className="mt-3 text-[1.8rem] font-bold tracking-[-0.03em] text-hn-primary max-md:text-[1.4rem]">
                  {getMessage('product.detail.relatedTitle', 'Related models')}
                </h2>
              </div>
              <Link to="/products" className="text-[0.86rem] font-semibold text-hn-accent no-underline transition-colors duration-200 hover:text-hn-accent-strong">
                {getMessage('product.detail.viewAll', 'View all products')}
              </Link>
            </div>
            <div className="motion-fade-up mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
