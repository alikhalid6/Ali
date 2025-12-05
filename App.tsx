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

// Define emailjs for global script from index.html
declare const emailjs: any;

// ===================================================================================
//  ⚙️ إعدادات الإيميل (EmailJS Configuration)
// ===================================================================================
const EMAILJS_PUBLIC_KEY = 'dtZstLuozuiyqfM75'; 
const EMAILJS_SERVICE_ID = 'service_r36bq58'; 
const EMAILJS_ADMIN_TEMPLATE_ID = 'template_adzqluw'; 
const EMAILJS_CUSTOMER_TEMPLATE_ID = ''; // (اختياري)

function App() {
  // ===================================================================================
  // 💾 قاعدة البيانات المحلية (Local Storage Database System)
  //  هذا الكود يعمل كقاعدة بيانات لحفظ السلة والطلبات داخل متصفح المستخدم
  // ===================================================================================
  
  // 1. استرجاع السلة المحفوظة (Cart DB)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bahi_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Error loading cart from DB", e);
      return [];
    }
  });

  // 2. استرجاع المفضلة المحفوظة (Wishlist DB)
  const [wishlistItems, setWishlistItems] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('bahi_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // 3. استرجاع سجل الطلبات (Orders DB)
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('bahi_orders');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedDiscountCode, setAppliedDiscountCode] = useState<string>('');
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [page, setPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [pageData, setPageData] = useState<any>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  // ===================================================================================
  // 💾 حفظ التغييرات في قاعدة البيانات (Sync Data to Local Storage)
  // ===================================================================================
  useEffect(() => {
    localStorage.setItem('bahi_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('bahi_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    localStorage.setItem('bahi_orders', JSON.stringify(orders));
  }, [orders]);

  // إعداد اللغة والاتجاه
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);
  
  // تهيئة خدمة الإيميل
  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY && typeof emailjs !== 'undefined') {
      try {
        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
        console.log("EmailJS Initialized Successfully");
      } catch (error) {
        console.error("Failed to initialize EmailJS:", error);
      }
    }
  }, []);

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
    
    // 1. Save order immediately (LocalStorage effect will handle persistence)
    setOrders(prev => [newOrder, ...prev]);

    // 2. Submit to Netlify Forms (The "Database")
    const formData = new FormData();
    formData.append('form-name', 'orders');
    formData.append('orderId', newOrder.id);
    formData.append('customerName', `${customerDetails.firstName} ${customerDetails.lastName}`);
    formData.append('customerPhone', customerDetails.phone);
    formData.append('total', `${(total + shippingCost).toFixed(2)} ${t.currency}`);
    const orderDetailsString = cartItems.map(i => `${i.name[language]} (x${i.quantity})`).join(', ');
    formData.append('orderDetails', orderDetailsString);

    fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString(),
    }).then(() => console.log('Order saved to Netlify Database'))
      .catch((error) => console.error('Netlify Form Error:', error));
    
    // --- START: EmailJS Integration ---
    if (EMAILJS_SERVICE_ID && typeof emailjs !== 'undefined') {
        const itemsTable = cartItems.map(item =>
            `<tr>
                <td style="padding: 8px; border: 1px solid #ddd; direction: ${language === 'ar' ? 'rtl' : 'ltr'}; text-align: ${language === 'ar' ? 'right' : 'left'};">${item.name[language]}</td>
                <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${item.quantity}</td>
                <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${((item.salePrice ?? item.price) * item.quantity).toFixed(2)} ${t.currency}</td>
            </tr>`
        ).join('');

        const itemsHtml = `
            <table style="width: 100%; border-collapse: collapse; font-family: sans-serif; direction: ${language === 'ar' ? 'rtl' : 'ltr'};">
                <thead>
                    <tr style="background-color: #f2f2f2;">
                        <th style="padding: 8px; border: 1px solid #ddd; text-align: ${language === 'ar' ? 'right' : 'left'};">${t.checkoutProduct}</th>
                        <th style="padding: 8px; border: 1px solid #ddd; text-align: center;">${t.quantity}</th>
                        <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">${t.total}</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsTable}
                </tbody>
            </table>
        `;

        const templateParams = {
            order_id: newOrder.id.slice(-6),
            order_date: new Date(newOrder.date).toLocaleString(language === 'ar' ? 'ar-OM' : 'en-US'),
            customer_name: `${customerDetails.firstName} ${customerDetails.lastName}`,
            customer_phone: `+968 ${customerDetails.phone}`,
            customer_email: customerDetails.email,
            customer_address: `${customerDetails.address}, ${customerDetails.region}, ${customerDetails.city}, Oman`,
            items_html: itemsHtml,
            subtotal: subtotal.toFixed(2) + ` ${t.currency}`,
            discount: discount.toFixed(2) + ` ${t.currency}`,
            shipping: shippingCost.toFixed(2) + ` ${t.currency}`,
            total: (total + shippingCost).toFixed(2) + ` ${t.currency}`,
            payment_method: t.paymentMethodBankTransfer,
            reply_to: customerDetails.email,
            to_email: 'store@bahi.om' // Placeholder - update in EmailJS dashboard if needed
        };
        
        // --- 1. Send notification to YOU (the store owner) ---
        if (EMAILJS_ADMIN_TEMPLATE_ID) {
            console.log("Sending email to admin...");
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_ADMIN_TEMPLATE_ID, templateParams)
                .then((response: any) => {
                   console.log('SUCCESS! Admin notification sent.', response.status, response.text);
                }, (error: any) => {
                   console.error('FAILED to send admin notification.', error);
                   // Show specific error message to help debugging
                   const errorMsg = error.text || JSON.stringify(error);
                   alert(language === 'ar' 
                     ? `حدث خطأ في إرسال الإيميل: ${errorMsg}\nلكن تم تسجيل طلبك محلياً في صفحة سجل الطلبات.` 
                     : `Failed to send email: ${errorMsg}\nBut order is recorded locally in Order History.`);
                });
        } else {
            alert(language === 'ar' ? 'تنبيه: لم يتم ضبط معرف القالب (Template ID) للإيميل.' : 'Warning: Email Template ID is not set.');
        }

        // --- 2. Send receipt to the CUSTOMER (Optional) ---
        if (EMAILJS_CUSTOMER_TEMPLATE_ID) {
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CUSTOMER_TEMPLATE_ID, templateParams)
                .then((response: any) => {
                   console.log('SUCCESS! Customer receipt sent.');
                }, (error: any) => {
                   console.log('FAILED to send customer receipt.', error);
                });
        }
    } else {
        console.warn("EmailJS not configured or script not loaded.");
    }
    // --- END: EmailJS Integration ---
    
    // محاكاة تغيير حالة الطلب
    setTimeout(() => {
        setOrders(prev => prev.map(o => o.id === newOrder.id ? {...o, status: 'Shipped'} : o))
    }, 1000 * 60 * 2); 
     setTimeout(() => {
        setOrders(prev => prev.map(o => o.id === newOrder.id ? {...o, status: 'Delivered'} : o))
    }, 1000 * 60 * 5); 

    setCartItems([]);
    setAppliedDiscountCode('');
    navigate('orderConfirmation', { orderId: newOrder.id });
  }, [cartItems, total, navigate, language, t, subtotal, discount]);


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