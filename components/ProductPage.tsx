import React, { useState } from 'react';
import type { Product } from '../types';
import { HEART_SVG, HEART_FILLED_SVG, SHARE_SVG } from '../i18n';
import ProductCard from './ProductCard';


interface ProductPageProps {
  product: Product;
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
  onImageClick: (imageUrl: string) => void;
  navigate: (page: string, data?: any) => void;
  t: any;
  language: string;
  wishlistItems: number[];
  toggleWishlist: (productId: number) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ product, products, onAddToCart, onImageClick, navigate, t, language, wishlistItems, toggleWishlist }) => {
  const [quantity, setQuantity] = useState(1);
  const hasSale = typeof product.salePrice === 'number';
  const currency = t.currency;
  const isInWishlist = wishlistItems.includes(product.id);

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };
  
  if (!product) {
    return (
        <div className="text-center py-20">
            <p>Product not found.</p>
        </div>
    );
  }

  const relatedProducts = products.filter(p => p.id !== product.id);

  return (
    <>
      <div className="bg-brand-background py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <nav className="text-sm mb-6 sm:mb-8 text-gray-500" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <button onClick={() => navigate('home')} className="hover:text-brand-primary transition-colors">{t.menuHome}</button>
              </li>
              <li className="flex items-center mx-2">/</li>
              <li className="flex items-center">
                 <span className="font-medium text-gray-600">{product.category[language]}</span>
              </li>
            </ol>
          </nav>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            
            {/* Image Column */}
            <div className="flex justify-center items-start">
              <div className="relative w-full max-w-lg">
                <img 
                  src={product.imageUrl}
                  alt={product.name[language]}
                  onClick={() => onImageClick(product.imageUrl)}
                  className="w-full h-auto object-cover rounded-lg shadow-lg cursor-pointer aspect-square"
                />
                 {hasSale && (
                  <div className="absolute top-4 right-4 bg-brand-secondary text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-md">
                    {t.sale}
                  </div>
                )}
              </div>
            </div>
            
            {/* Details Column */}
            <div className="flex flex-col">
              <h1 className="text-3xl sm:text-4xl font-bold text-brand-primary mb-3">{product.name[language]}</h1>
              
              <div className="flex items-baseline mb-5">
                <p className={`font-bold text-3xl ${hasSale ? 'text-red-500' : 'text-brand-primary'}`}>
                  {product.salePrice ?? product.price} {currency}
                </p>
                {hasSale && (
                  <p className="text-lg text-gray-500 line-through mx-3">
                    {product.price} {currency}
                  </p>
                )}
              </div>

              <p className="text-green-600 font-semibold mb-5 border-l-4 border-green-500 pl-3">
                {product.stock > 0 ? `${product.stock} ${t.inStock}` : t.outOfStock}
              </p>

              <div className="mb-6">
                  <h2 className="text-lg font-semibold text-brand-text mb-2">{t.description}</h2>
                  <p className="text-gray-600 leading-relaxed">{product.description[language]}</p>
              </div>
              
              <div className="flex items-center gap-4 my-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button onClick={() => handleQuantityChange(-1)} className="w-10 h-10 text-xl text-gray-600 hover:bg-gray-100 rounded-l-md transition">-</button>
                  <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
                  <button onClick={() => handleQuantityChange(1)} className="w-10 h-10 text-xl text-gray-600 hover:bg-gray-100 rounded-r-md transition">+</button>
                </div>
                <button 
                  onClick={() => onAddToCart(product, quantity)}
                  disabled={product.stock === 0}
                  className="flex-grow bg-brand-primary text-white py-3 px-6 rounded-md font-bold text-lg hover:bg-brand-secondary transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {t.addToCart}
                </button>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-4">
                  <button 
                    onClick={() => toggleWishlist(product.id)}
                    className={`flex items-center gap-2 hover:text-brand-primary transition-colors ${isInWishlist ? 'text-brand-primary font-semibold' : ''}`}
                  >
                      <span dangerouslySetInnerHTML={{ __html: isInWishlist ? HEART_FILLED_SVG : HEART_SVG }} />
                      {isInWishlist ? t.addedToWishlist : t.addToWishlist}
                  </button>
                  <button className="flex items-center gap-2 hover:text-brand-primary transition-colors">
                      <span dangerouslySetInnerHTML={{ __html: SHARE_SVG }} />
                      {t.share}
                  </button>
              </div>

              <div className="border-t mt-8 pt-6">
                  <div className="text-sm text-gray-600 space-y-2">
                      <p><span className="font-semibold text-gray-800">{t.sku}:</span> {product.sku}</p>
                      <p><span className="font-semibold text-gray-800">{t.category}:</span> {product.category[language]}</p>
                      {product.tags[language] && product.tags[language].length > 0 && (
                          <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-gray-800">{t.tags}:</span>
                              {product.tags[language].map(tag => (
                                  <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">{tag}</span>
                              ))}
                          </div>
                      )}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {relatedProducts.length > 0 && (
        <div className="py-12 bg-white border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-brand-primary mb-10">{t.relatedProducts}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {relatedProducts.map(relatedProduct => (
                <ProductCard 
                  key={relatedProduct.id} 
                  product={relatedProduct} 
                  onAddToCart={(p) => onAddToCart(p, 1)} 
                  t={t} 
                  language={language} 
                  onProductSelect={(id) => navigate('product', id)}
                  wishlistItems={wishlistItems}
                  toggleWishlist={toggleWishlist}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;