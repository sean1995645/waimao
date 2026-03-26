import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'umi';
import { addToInquiry, removeFromInquiry, isInInquiry } from './BulkInquiry';
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
      className={`motion-card group flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(0,0,0,0.1)] ${isSelected ? '[&>a]:shadow-[0_16px_36px_rgba(13,111,184,0.2)] ring-1 ring-hn-accent/20' : ''}`}
      data-category={product.categoryId}
      data-featured={product.featured}
      data-title={localizedProduct.title}
    >
      <Link to={`/products/${product.slug}`} className="flex flex-1 flex-col no-underline text-inherit">
        <div className="relative h-[140px] lg:h-[152px] bg-[#e9eef5] overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={localizedProduct.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.06] group-focus-visible:scale-[1.06]"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#e4e9f2] to-[#cad3e1]"></div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[rgba(6,12,24,0.45)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          <div className="absolute inset-0 hidden lg:flex items-center justify-start w-[min(72%,220px)] right-0 px-4 pl-6 opacity-0 translate-x-full transition-[transform,opacity] duration-300 ease-out bg-gradient-to-l from-[rgba(4,8,16,1)] via-[rgba(5,10,20,0.96)_58%] to-[rgba(5,10,20,0.16)] pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 [@media(hover:none)]:!hidden">
            <h3 className="text-[0.82rem] lg:text-[0.86rem] font-normal leading-[1.4] text-white">{localizedProduct.title}</h3>
          </div>
        </div>
        <div className="block lg:hidden py-2 px-2.5 text-center">
          <h3 className="text-[0.6rem] leading-[1.3] text-hn-primary font-semibold">{localizedProduct.title}</h3>
        </div>
      </Link>
      <div className="mt-auto flex justify-center border-t border-hn-surface-soft px-2 py-2 lg:px-3.5 lg:py-3">
        <button
          type="button"
          className={`flex min-h-[40px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-2 px-3 py-2 lg:px-4 lg:py-2.5 text-center font-semibold transition-all duration-300 ${
            isSelected
              ? 'border-hn-accent bg-hn-accent text-white shadow-[0_4px_12px_rgba(13,111,184,0.25)] hover:bg-hn-accent-strong hover:border-hn-accent-strong hover:shadow-[0_6px_16px_rgba(13,111,184,0.35)] active:scale-95'
              : 'border-gray-200 bg-white text-gray-700 hover:border-hn-accent hover:bg-hn-accent/5 hover:text-hn-accent active:scale-95 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]'
          } lg:hover:-translate-y-0.5`}
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
