import React from 'react';
import type { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  t: any;
  language: string;
  onProductSelect: (productId: number) => void;
  wishlistItems: number[];
  toggleWishlist: (productId: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart, t, language, onProductSelect, wishlistItems, toggleWishlist }) => {
  return (
    <div className="py-12 bg-brand-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-brand-primary mb-10">{t.newArrivals}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map(product => (
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
      </div>
    </div>
  );
};

export default ProductList;