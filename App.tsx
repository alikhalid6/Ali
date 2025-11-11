import React, { useState, useMemo, useCallback, useEffect } from 'react';
import type { Product, CartItem } from './types';
import { PRODUCTS, DISCOUNT_CODES } from './constants';
import { translations } from './i18n';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedDiscountCode, setAppliedDiscountCode] = useState<string>('');
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [page, setPage] = useState('home');

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = useMemo(() => translations[language], [language]);

  const addToCart = useCallback((product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  }, [removeFromCart]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = item.salePrice ?? item.price;
      return total + price * item.quantity;
    }, 0);
  }, [cartItems]);

  const discount = useMemo(() => {
    const codeUpper = appliedDiscountCode.toUpperCase();
    const activeCode = DISCOUNT_CODES.find(d => d.code.toUpperCase() === codeUpper);
    if (activeCode) {
      return subtotal * (activeCode.percentage / 100);
    }
    return 0;
  }, [subtotal, appliedDiscountCode]);

  const total = useMemo(() => subtotal - discount, [subtotal, discount]);

  const navigate = (newPage: string) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-brand-background min-h-screen font-sans text-brand-text">
      <Header 
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        t={t}
        language={language}
        setLanguage={setLanguage}
        navigate={navigate}
      />
      <main>
        {page === 'home' && (
          <>
            <Hero t={t} />
            <ProductList products={PRODUCTS} onAddToCart={addToCart} t={t} language={language} />
          </>
        )}
        {page === 'about' && <About t={t} />}
        {page === 'contact' && <Contact t={t} />}
      </main>
      <Footer t={t} />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        subtotal={subtotal}
        discount={discount}
        total={total}
        onApplyDiscount={setAppliedDiscountCode}
        appliedCode={appliedDiscountCode}
        discountDetails={DISCOUNT_CODES}
        t={t}
        language={language}
      />
    </div>
  );
}

export default App;