import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  t: any;
  language: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, t, language }) => {
  const hasSale = typeof product.salePrice === 'number';
  const currency = t.currency;

  return (
    <div className="bg-brand-surface rounded-lg shadow-md overflow-hidden group flex flex-col">
      <div className="relative overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name[language]} 
          className="w-full h-56 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {hasSale && (
          <div className="absolute top-3 right-3 bg-brand-secondary text-white text-xs font-semibold px-3 py-1 rounded-full">
            {t.sale}
          </div>
        )}
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
        <button 
          onClick={() => onAddToCart(product)}
          className="mt-auto w-full bg-brand-primary text-white py-2 px-4 rounded-md hover:bg-brand-secondary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-opacity-50"
        >
          {t.addToCart}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;