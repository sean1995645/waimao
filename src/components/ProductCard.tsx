import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { addToInquiry, removeFromInquiry, isInInquiry } from './BulkInquiry';
import TransitionLink from '@/components/TransitionLink';
import { Product, localizeProduct } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const intl = useIntl();
  const [isSelected, setIsSelected] = useState(false);
  const localizedProduct = localizeProduct(product, intl.formatMessage);

  useEffect(() => {
    setIsSelected(isInInquiry(product.id));

    const handleStorageChange = () => {
      setIsSelected(isInInquiry(product.id));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [product.id]);

  const handleToggleInquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSelected) {
      removeFromInquiry(product.id);
    } else {
      addToInquiry({
        id: product.id,
        name: localizedProduct.title,
        url: `/products/${product.slug}`,
        img: product.image,
      });
    }
    setIsSelected(!isSelected);
  };

  return (
    <div
      className={`motion-card group flex flex-col overflow-hidden rounded-xl bg-white border border-hn-border transition-all duration-300 hover:shadow-md ${isSelected ? 'border-hn-accent ring-1 ring-hn-accent/20' : ''}`}
      data-category={product.categoryId}
      data-featured={product.featured}
      data-title={localizedProduct.title}
    >
      <TransitionLink to={`/products/${product.slug}`} className="flex flex-1 flex-col no-underline text-inherit">
        <div className="relative h-[140px] lg:h-[152px] bg-hn-surface-soft overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={localizedProduct.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-hn-surface"></div>
          )}
        </div>
        <div className="block lg:hidden py-2 px-2.5 text-center border-b border-hn-surface-soft">
          <h3 className="text-[0.6rem] leading-[1.3] text-hn-primary font-semibold">{localizedProduct.title}</h3>
        </div>
        <div className="hidden lg:block py-3 px-4 text-center border-b border-hn-surface-soft flex-1 flex items-center justify-center">
          <h3 className="text-[0.8rem] leading-[1.3] text-hn-primary font-semibold">{localizedProduct.title}</h3>
        </div>
      </TransitionLink>
      <div className="mt-auto flex justify-center px-2 py-2 lg:px-3.5 lg:py-3 bg-hn-surface">
        <button
          type="button"
          className={`flex min-h-[40px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 py-2 lg:px-4 lg:py-2.5 text-center font-semibold transition-all duration-300 ${
            isSelected
              ? 'border-hn-accent bg-hn-accent text-white shadow-sm hover:bg-hn-accent-strong active:scale-95'
              : 'border-transparent bg-white text-gray-700 hover:border-hn-border hover:bg-gray-50 hover:text-hn-primary active:scale-95 shadow-sm'
          }`}
          onClick={handleToggleInquiry}
          aria-label={
            isSelected
              ? intl.formatMessage({ id: 'inquiry.remove' })
              : intl.formatMessage({ id: 'inquiry.add' })
          }
        >
          <svg
            className={`w-3.5 h-3.5 lg:w-4 lg:h-4 transition-transform duration-300 ${isSelected ? 'rotate-45' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span className="text-[0.7rem] lg:text-[0.75rem] tracking-wide">
            {isSelected ? intl.formatMessage({ id: 'inquiry.added' }) : intl.formatMessage({ id: 'inquiry.add' })}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
