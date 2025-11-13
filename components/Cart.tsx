import React, { useState, useEffect } from 'react';
import type { CartItem, DiscountCode } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemove: (productId: number) => void;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  subtotal: number;
  discount: number;
  total: number;
  onApplyDiscount: (code: string) => void;
  appliedCode: string;
  discountDetails: DiscountCode[];
  t: any;
  language: string;
  onCheckout: () => void;
}

const CartItemRow: React.FC<{item: CartItem; onRemove: (id: number) => void; onUpdateQuantity: (id: number, q: number) => void; t: any, language: string}> = ({ item, onRemove, onUpdateQuantity, t, language }) => (
    <div className="flex items-center py-4 border-b border-gray-200">
        <img src={item.imageUrl} alt={item.name[language]} className="w-20 h-24 object-cover rounded-md me-4 bg-gray-100" />
        <div className="flex-grow">
            <h4 className="font-semibold">{item.name[language]}</h4>
            <p className="text-sm text-gray-500">{item.salePrice ?? item.price} {t.currency}</p>
            <div className="flex items-center mt-2">
                <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 border rounded-full">-</button>
                <span className="mx-2">{item.quantity}</span>
                <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 border rounded-full">+</button>
            </div>
        </div>
        <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>
);

const Cart: React.FC<CartProps> = ({ isOpen, onClose, cartItems, onRemove, onUpdateQuantity, subtotal, discount, total, onApplyDiscount, appliedCode, discountDetails, t, language, onCheckout }) => {
  const [discountInput, setDiscountInput] = useState('');
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (!isOpen) {
      setError('');
    }
  }, [isOpen]);

  const handleApplyDiscount = () => {
    const codeUpper = discountInput.toUpperCase();
    const validCode = discountDetails.find(d => d.code.toUpperCase() === codeUpper);
    
    if (validCode) {
      onApplyDiscount(validCode.code);
      setError('');
    } else {
      onApplyDiscount('');
      setError(t.cartInvalidCode);
    }
  };


  if (!isOpen) return null;

  const rainbowTextStyle: React.CSSProperties = {
    background: 'linear-gradient(to right, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #6366f1, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 'bold',
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex ${language === 'ar' ? 'justify-end' : 'justify-start'}`} onClick={onClose}>
      <div className={`w-full max-w-md bg-white h-full flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : (language === 'ar' ? 'translate-x-full' : '-translate-x-full')}`} onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-2xl font-bold">{t.cartTitle}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
             </svg>
          </button>
        </div>
        
        {cartItems.length > 0 ? (
          <>
            <div className="flex-grow overflow-y-auto px-6">
              {cartItems.map(item => <CartItemRow key={item.id} item={item} onRemove={onRemove} onUpdateQuantity={onUpdateQuantity} t={t} language={language} />)}
            </div>
            
            <div className="p-6 border-t bg-gray-50">
                <div className="flex mb-4">
                  <input 
                    type="text" 
                    placeholder={t.cartDiscountPlaceholder}
                    value={discountInput}
                    onChange={(e) => setDiscountInput(e.target.value)}
                    className={`flex-grow border bg-white p-2 ${language === 'ar' ? 'rounded-r-md' : 'rounded-l-md'} focus:ring-brand-secondary focus:border-brand-secondary`}
                    style={discountInput ? rainbowTextStyle : {}}
                  />
                  <button onClick={handleApplyDiscount} className={`bg-brand-primary text-white px-4 ${language === 'ar' ? 'rounded-l-md' : 'rounded-r-md'} hover:bg-brand-secondary transition`}>{t.cartApply}</button>
                </div>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                {appliedCode && !error && <p className="text-green-600 text-sm mb-2">{t.cartCodeSuccess}</p>}


                <div className="space-y-2 text-md">
                    <div className="flex justify-between"><span>{t.cartSubtotal}</span><span>{subtotal.toFixed(2)} {t.currency}</span></div>
                    {discount > 0 && <div className="flex justify-between text-green-600"><span>{t.cartDiscount}</span><span>-{discount.toFixed(2)} {t.currency}</span></div>}
                    <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2"><span>{t.cartTotal}</span><span>{total.toFixed(2)} {t.currency}</span></div>
                </div>
                <button onClick={onCheckout} className="w-full bg-brand-secondary text-white py-3 mt-6 rounded-md font-bold hover:opacity-90 transition">
                  {t.cartCheckout}
                </button>
            </div>
          </>
        ) : (
          <div className="flex-grow flex flex-col justify-center items-center text-center p-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h4 className="text-xl font-semibold text-gray-700">{t.cartEmptyTitle}</h4>
            <p className="text-gray-500 mt-2">{t.cartEmptySubtitle}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;