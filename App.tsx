import React, { useState, useMemo, useCallback, useEffect } from 'react';
import type { Product, CartItem, Order, CustomerDetails } from './types';
import { PRODUCTS, DISCOUNT_CODES, TESTIMONIALS } from './constants';
import { translations } from './i18n';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import ImageModal from './components/ImageModal';
import WishlistPage from './components/WishlistPage';
import CheckoutPage from './components/CheckoutPage';
import Testimonials from './components/Testimonials';
import FeedbackPage from './components/FeedbackPage';
import PaymentPage from './components/PaymentPage';
import OrderConfirmationPage from './components/OrderConfirmationPage';
import OrderHistoryPage from './components/OrderHistoryPage';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedDiscountCode, setAppliedDiscountCode] = useState<string>('');
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [page, setPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [pageData, setPageData] = useState<any>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = useMemo(() => translations[language], [language]);

  const navigate = useCallback((newPage: string, data?: any) => {
    setPage(newPage);
    setPageData(data);
    if (newPage === 'product' && typeof data === 'number') {
      setSelectedProductId(data);
    } else if (newPage !== 'product') {
      setSelectedProductId(null);
    }
    window.scrollTo(0, 0);
  }, []);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
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

  const toggleWishlist = useCallback((productId: number) => {
    setWishlistItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const openImageModal = useCallback((imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setIsImageModalOpen(true);
  }, []);

  const closeImageModal = useCallback(() => {
    setIsImageModalOpen(false);
    setSelectedImageUrl(null);
  }, []);

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

  const handleCheckout = useCallback(() => {
    setIsCartOpen(false);
    navigate('checkout');
  }, [navigate]);

  const handlePaymentSuccess = useCallback((customerDetails: CustomerDetails, shippingCost: number, paymentMethod: string) => {
    const newOrder: Order = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: cartItems,
      total: total,
      shippingCost: shippingCost,
      customer: customerDetails,
      status: 'Processing',
      paymentMethod: paymentMethod,
    };
    // Simulate order status progression for demonstration
    setTimeout(() => {
        setOrders(prev => prev.map(o => o.id === newOrder.id ? {...o, status: 'Shipped'} : o))
    }, 1000 * 60 * 2); // 2 minutes
     setTimeout(() => {
        setOrders(prev => prev.map(o => o.id === newOrder.id ? {...o, status: 'Delivered'} : o))
    }, 1000 * 60 * 5); // 5 minutes


    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    setAppliedDiscountCode('');
    navigate('orderConfirmation', { orderId: newOrder.id });
  }, [cartItems, total, navigate]);


  const renderPage = () => {
    switch(page) {
      case 'home':
        return (
          <>
            <Hero t={t} />
            <ProductList 
              products={PRODUCTS} 
              onAddToCart={(p) => addToCart(p, 1)} 
              t={t} 
              language={language} 
              onProductSelect={(id) => navigate('product', id)}
              wishlistItems={wishlistItems}
              toggleWishlist={toggleWishlist}
            />
            <Testimonials
              testimonials={TESTIMONIALS}
              t={t}
              language={language}
            />
          </>
        );
      case 'product':
        if (selectedProductId) {
          const product = PRODUCTS.find(p => p.id === selectedProductId);
          if (product) {
            return (
              <ProductPage
                product={product}
                products={PRODUCTS}
                onAddToCart={addToCart}
                onImageClick={openImageModal}
                navigate={navigate}
                t={t}
                language={language}
                wishlistItems={wishlistItems}
                toggleWishlist={toggleWishlist}
              />
            );
          }
        }
        navigate('home');
        return null;
      case 'about':
        return <About t={t} />;
      case 'contact':
        return <Contact t={t} language={language} />;
      case 'wishlist':
        return (
          <WishlistPage
            products={PRODUCTS}
            wishlistItems={wishlistItems}
            onAddToCart={(p) => addToCart(p, 1)}
            onProductSelect={(id) => navigate('product', id)}
            t={t}
            language={language}
            toggleWishlist={toggleWishlist}
          />
        );
      case 'checkout':
        return (
          <CheckoutPage 
            cartItems={cartItems}
            subtotal={subtotal}
            discount={discount}
            total={total}
            t={t}
            language={language}
            navigate={navigate}
          />
        );
      case 'payment':
        return (
            <PaymentPage
              pageData={pageData}
              t={t}
              language={language}
              onPaymentSuccess={handlePaymentSuccess}
            />
        );
      case 'feedback':
        return <FeedbackPage t={t} language={language} />;
      case 'orderConfirmation':
        const order = orders.find(o => o.id === pageData?.orderId);
        return <OrderConfirmationPage order={order!} t={t} language={language} navigate={navigate} />;
      case 'orderHistory':
        return <OrderHistoryPage orders={orders} t={t} language={language} navigate={navigate} />;
      default:
        navigate('home');
        return null;
    }
  };

  return (
    <div className="bg-brand-background min-h-screen font-sans text-brand-text">
      <Header 
        cartItems={cartItems}
        onCartClick={() => setIsCartOpen(true)}
        t={t}
        language={language}
        setLanguage={setLanguage}
        navigate={navigate}
      />
      <main>
        {renderPage()}
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
        onCheckout={handleCheckout}
      />
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={closeImageModal}
        imageUrl={selectedImageUrl}
      />
    </div>
  );
}

export default App;