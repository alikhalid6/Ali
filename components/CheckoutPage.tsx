import React, { useState, useMemo } from 'react';
import type { CartItem, CustomerDetails } from '../types';

interface CheckoutPageProps {
  cartItems: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  t: any;
  language: string;
  navigate: (page: string, data?: any) => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems, subtotal, discount, total, t, language, navigate }) => {
  const [shippingMethod, setShippingMethod] = useState('home');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formState, setFormState] = useState<Omit<CustomerDetails, 'country'>>({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    region: '',
    phone: '',
    email: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormState(prev => ({...prev, [id]: value}));
  };

  const shippingCost = useMemo(() => {
    if (cartItems.length === 0) return 0;
    if (shippingMethod === 'home') return 2.0;
    if (shippingMethod === 'pickup') return 1.0;
    return 0;
  }, [shippingMethod, cartItems]);

  const finalTotal = total + shippingCost;

  const inputStyles = "w-full p-3 bg-white text-brand-text border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-secondary focus:border-transparent outline-none transition";
  const labelStyles = `block text-sm font-medium text-gray-700 mb-1 ${language === 'ar' ? 'text-right' : 'text-left'}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const customerDetails: CustomerDetails = {
      ...formState,
      country: 'Oman',
    };
    navigate('payment', { 
      total: finalTotal, 
      shippingCost: shippingCost,
      customerDetails: customerDetails,
      paymentMethod: paymentMethod,
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 sm-px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl font-bold text-brand-primary mb-4">{t.cartEmptyTitle}</h1>
        <p className="text-gray-600 mb-8">{t.cartEmptySubtitle}</p>
        <button
          onClick={() => navigate('home')}
          className="bg-brand-primary text-white py-3 px-8 rounded-md font-bold hover:bg-brand-secondary transition"
        >
          {t.heroButton}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-brand-primary mb-10">{t.checkoutTitle}</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-12">
            
            <div className="w-full lg:w-3/5 order-2 lg:order-1">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className={labelStyles}>{t.checkoutFirstName} *</label>
                    <input type="text" id="firstName" value={formState.firstName} onChange={handleInputChange} className={inputStyles} required />
                  </div>
                  <div>
                    <label htmlFor="lastName" className={labelStyles}>{t.checkoutLastName} *</label>
                    <input type="text" id="lastName" value={formState.lastName} onChange={handleInputChange} className={inputStyles} required />
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="country" className={labelStyles}>{t.checkoutCountry} *</label>
                  <select id="country" className={inputStyles}>
                    <option>{language === 'ar' ? 'عُمان' : 'Oman'}</option>
                  </select>
                </div>
                
                <div className="mt-6">
                  <label htmlFor="address" className={labelStyles}>{t.checkoutStreetAddress} *</label>
                  <input type="text" id="address" value={formState.address} onChange={handleInputChange} placeholder={t.checkoutStreetAddressPlaceholder} className={inputStyles} required />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label htmlFor="city" className={labelStyles}>{t.checkoutCity} *</label>
                    <input type="text" id="city" value={formState.city} onChange={handleInputChange} className={inputStyles} required />
                  </div>
                  <div>
                    <label htmlFor="region" className={labelStyles}>{t.checkoutRegion} *</label>
                    <input type="text" id="region" value={formState.region} onChange={handleInputChange} className={inputStyles} required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label htmlFor="phone" className={labelStyles}>{t.checkoutPhone} *</label>
                    <input type="tel" id="phone" value={formState.phone} onChange={handleInputChange} className={inputStyles} required />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelStyles}>{t.checkoutEmail} *</label>
                    <input type="email" id="email" value={formState.email} onChange={handleInputChange} className={inputStyles} required />
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                   <label className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-secondary focus:ring-brand-secondary" />
                    <span className={`mx-2 text-sm text-gray-700`}>{t.checkoutIsGift}</span>
                  </label>
                </div>

                <div className="mt-6">
                    <label htmlFor="notes" className={labelStyles}>{t.checkoutOrderNotes}</label>
                    <textarea id="notes" rows={4} placeholder={t.checkoutOrderNotesPlaceholder} className={inputStyles}></textarea>
                </div>

                <div className="mt-8">
                  <label className="flex items-start">
                    <input type="checkbox" className="h-4 w-4 mt-1 rounded border-gray-300 text-brand-secondary focus:ring-brand-secondary" required />
                    <span className={`mx-2 text-xs text-gray-600`}>{t.checkoutTerms} *</span>
                  </label>
                   <button 
                    type="submit"
                    className="w-full bg-brand-primary text-white py-4 mt-6 rounded-md font-bold text-lg hover:bg-brand-secondary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-opacity-50"
                  >
                    {t.checkoutPlaceOrder}
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-2/5 order-1 lg:order-2">
              <div className="bg-white p-8 rounded-lg shadow-md sticky top-28">
                <h3 className="text-2xl font-bold text-brand-primary border-b pb-4 mb-4">{t.checkoutOrderSummary}</h3>
                
                <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <img src={item.imageUrl} alt={item.name[language]} className="w-12 h-14 object-cover rounded me-3" />
                        <div>
                          <p className="font-semibold">{item.name[language]} <span className="text-gray-500">× {item.quantity}</span></p>
                        </div>
                      </div>
                      <p className="text-gray-700">{( (item.salePrice ?? item.price) * item.quantity).toFixed(2)} {t.currency}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t mt-4 pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.cartSubtotal}</span>
                    <span className="font-semibold">{subtotal.toFixed(2)} {t.currency}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>{t.cartDiscount}</span>
                      <span>-{discount.toFixed(2)} {t.currency}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.checkoutShipping}</span>
                    <span className="font-semibold">{shippingCost.toFixed(2)} {t.currency}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-brand-primary border-t pt-3 mt-3">
                    <span>{t.checkoutTotal}</span>
                    <span>{finalTotal.toFixed(2)} {t.currency}</span>
                  </div>
                </div>

                <div className="border-t mt-6 pt-6">
                   <h4 className="font-semibold mb-4 text-gray-800">{t.checkoutShipping}</h4>
                   <div className="space-y-3">
                    <label className="flex items-center p-3 border rounded-md has-[:checked]:bg-blue-50 has-[:checked]:border-brand-secondary transition">
                      <input type="radio" name="shipping" value="home" checked={shippingMethod === 'home'} onChange={(e) => setShippingMethod(e.target.value)} className="h-4 w-4 text-brand-secondary focus:ring-brand-secondary" />
                      <span className={`mx-3 text-sm flex-grow`}>{t.checkoutShippingHome}</span>
                      <span className="font-semibold text-sm">2.00 {t.currency}</span>
                    </label>
                     <label className="flex items-center p-3 border rounded-md has-[:checked]:bg-blue-50 has-[:checked]:border-brand-secondary transition">
                      <input type="radio" name="shipping" value="pickup" checked={shippingMethod === 'pickup'} onChange={(e) => setShippingMethod(e.target.value)} className="h-4 w-4 text-brand-secondary focus:ring-brand-secondary" />
                      <span className={`mx-3 text-sm flex-grow`}>{t.checkoutShippingPickup}</span>
                      <span className="font-semibold text-sm">1.00 {t.currency}</span>
                    </label>
                   </div>
                </div>
                
                <div className="border-t mt-6 pt-6">
                   <h4 className="font-semibold mb-4 text-gray-800">{t.checkoutPaymentMethod}</h4>
                   <div className="space-y-3">
                    <label className="flex items-center p-3 border rounded-md has-[:checked]:bg-blue-50 has-[:checked]:border-brand-secondary transition">
                      <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} className="h-4 w-4 text-brand-secondary focus:ring-brand-secondary" />
                      <span className={`mx-3 text-sm flex-grow`}>{t.paymentMethodCard}</span>
                    </label>
                     <label className="flex items-center p-3 border rounded-md has-[:checked]:bg-blue-50 has-[:checked]:border-brand-secondary transition">
                      <input type="radio" name="payment" value="applepay" checked={paymentMethod === 'applepay'} onChange={(e) => setPaymentMethod(e.target.value)} className="h-4 w-4 text-brand-secondary focus:ring-brand-secondary" />
                      <span className={`mx-3 text-sm flex-grow`}>{t.paymentMethodApplePay}</span>
                    </label>
                   </div> 
                </div>

              </div>
            </div>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;