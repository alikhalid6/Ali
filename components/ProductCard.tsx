import React from 'react';
import type { Product } from '../types';
import { HEART_SVG, HEART_FILLED_SVG } from '../i18n';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  t: any;
  language: string;
  onProductSelect: (productId: number) => void;
  wishlistItems: number[];
  toggleWishlist: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, t, language, onProductSelect, wishlistItems, toggleWishlist }) => {
  const hasSale = typeof product.salePrice === 'number';
  const currency = t.currency;
  const isInWishlist = wishlistItems.includes(product.id);

  return (
    <div 
      className="bg-brand-surface rounded-lg shadow-md overflow-hidden group flex flex-col cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      onClick={() => onProductSelect(product.id)}
    >
      <div 
        className="relative overflow-hidden"
        role="button"
        aria-label={`View details for ${product.name[language]}`}
      >
        <img 
          src={product.imageUrl} 
          alt={product.name[language]} 
          className="w-full h-56 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {hasSale && (
          <div className="absolute top-3 right-3 bg-brand-secondary text-white text-xs font-semibold px-3 py-1 rounded-full">
            {t.sale}
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center p-4">
            <p className="text-white text-center text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-5">
                {product.description[language]}
            </p>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-md font-semibold text-brand-text mb-2 truncate">{product.name[language]}</h3>
        <div className="flex items-baseline mb-4">
          <p className={`font-bold text-lg ${hasSale ? 'text-red-500' : 'text-brand-primary'}`}>
            {product.salePrice ?? product.price} {currency}
          </p>
          {hasSale && (
            <p className="text-sm text-gray-500 line-through mx-2">
              {product.price} {currency}
            </p>
          )}
        </div>
        <div className="mt-auto flex items-stretch gap-2">
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigation when adding to cart
              onAddToCart(product);
            }}
            className="flex-grow bg-brand-primary text-white py-2 px-4 rounded-md hover:bg-brand-secondary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-opacity-50"
          >
            {t.addToCart}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`flex-shrink-0 p-2.5 rounded-md border transition-colors duration-300 ${isInWishlist ? 'bg-red-100 border-red-500 text-red-500' : 'bg-white border-gray-300 text-gray-500 hover:bg-red-50 hover:border-red-400 hover:text-red-500'}`}
            aria-label={isInWishlist ? t.addedToWishlist : t.addToWishlist}
          >
            <span dangerouslySetInnerHTML={{ __html: isInWishlist ? HEART_FILLED_SVG : HEART_SVG }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;