import React from 'react';
import type { Product } from '../types';
import ProductCard from './ProductCard';
import { HEART_SVG } from '../i18n';

interface WishlistPageProps {
  products: Product[];
  wishlistItems: number[];
  onAddToCart: (product: Product) => void;
  onProductSelect: (productId: number) => void;
  t: any;
  language: string;
  toggleWishlist: (productId: number) => void;
}

const WishlistPage: React.FC<WishlistPageProps> = ({ products, wishlistItems, onAddToCart, onProductSelect, t, language, toggleWishlist }) => {
  const favoritedProducts = products.filter(p => wishlistItems.includes(p.id));

  return (
    <div className="py-12 bg-brand-background min-h-[60vh]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-brand-primary mb-10">{t.wishlistTitle}</h1>
        
        {favoritedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {favoritedProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart} 
                t={t} 
                language={language} 
                onProductSelect={onProductSelect}
                wishlistItems={wishlistItems}
                toggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div 
              className="mx-auto w-24 h-24 text-gray-300" 
              dangerouslySetInnerHTML={{ __html: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>` }} 
            />
            <h2 className="mt-6 text-2xl font-semibold text-gray-800">{t.wishlistEmptyTitle}</h2>
            <p className="mt-2 text-gray-500">{t.wishlistEmptySubtitle}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;