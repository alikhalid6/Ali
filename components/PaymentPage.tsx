import React, { useState, useMemo } from 'react';
import type { CustomerDetails } from '../types';
import { VISA_SVG } from '../i18n';

// A simple SVG for the Apple Pay button logo
const APPLE_PAY_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="20" viewBox="0 0 48 20"><path d="M38.859 10.82c0 2.44-1.883 3.61-4.717 3.61-2.922 0-4.322-1.12-6.953-1.12-2.719 0-4.518 1.12-6.953 1.12-2.834 0-4.717-1.17-4.717-3.61 0-2.31 1.74-3.52 4.67-3.52 2.834 0 4.136 1.12 6.998 1.12 2.766 0 4.229-1.12 6.953-1.12 2.934 0 4.67 1.21 4.67 3.52zm-12.78-7.5c1.258-1.52 2.128-3.32.189-4.81-1.3-.99-3.205-.44-4.463 1.08-1.17 1.43-2.26 3.23-.328 4.67 1.455 1.08 3.348.54 4.602-1z" fill-rule="evenodd" fill="#FFF"></path></svg>`;

interface PaymentPageProps {
  pageData: {
    total: number;
    shippingCost: number;
    customerDetails: CustomerDetails;
    paymentMethod: string;
  };
  t: any;
  language: string;
  onPaymentSuccess: (customerDetails: CustomerDetails, shippingCost: number, paymentMethod: string) => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ pageData, t, language, onPaymentSuccess }) => {
  const { total = 0, shippingCost = 0, customerDetails, paymentMethod: initialPaymentMethod } = pageData || {};

  const [paymentMethod, setPaymentMethod] = useState(initialPaymentMethod || 'card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cardError, setCardError] = useState('');

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + ' / ' + value.slice(2, 4);
    }
    setExpiryDate(value);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Basic Visa check (starts with 4)
    if (value.length > 0 && !value.startsWith('4')) {
      setCardError(t.invalidCardNumber);
    } else {
      setCardError('');
    }
    setCardNumber(value);
  }

  const handlePayment = (e?: React.FormEvent) => {
    e?.preventDefault();
    if(paymentMethod === 'card' && cardError) return;

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onPaymentSuccess(customerDetails, shippingCost, paymentMethod);
      }, 3000);
    }, 2500);
  };

  const inputStyles = "w-full p-3 bg-gray-100 text-brand-text border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-secondary focus:border-transparent outline-none transition";
  const labelStyles = `block text-sm font-medium text-gray-700 mb-1 ${language === 'ar' ? 'text-right' : 'text-left'}`;

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center bg-brand-background">
        <div className="bg-white p-10 rounded-xl shadow-lg">
          <svg className="w-24 h-24 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-3xl font-bold text-brand-primary">{t.paymentSuccessful}</h2>
          <p className="text-gray-600 mt-2">{t.paymentRedirecting}</p>
        </div>
      </div>
    );
  }
  
  if (isProcessing) {
      return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center bg-brand-background">
              <div className="bg-white p-10 rounded-xl shadow-lg">
                  <div className="w-16 h-16 border-4 border-brand-secondary border-t-transparent border-solid rounded-full animate-spin mx-auto mb-4"></div>
                  <h2 className="text-2xl font-bold text-brand-primary">{t.paymentProcessing}</h2>
                  <p className="text-gray-600 mt-2">{t.paymentWait}</p>
              </div>
          </div>
      );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-center text-brand-primary mb-2">{t.paymentTitle}</h1>
          <p className="text-center text-gray-600 mb-8">{t.paymentTotal}: <span className="font-bold text-2xl text-brand-primary">{total.toFixed(2)} {t.currency}</span></p>

          <div className="mb-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-4" aria-label="Tabs">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`${paymentMethod === 'card' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
              >
                {t.paymentPayWithCard}
              </button>
              <button
                onClick={() => setPaymentMethod('applepay')}
                className={`${paymentMethod === 'applepay' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
              >
                {t.paymentApplePay}
              </button>
            </nav>
          </div>

          {paymentMethod === 'card' && (
            <form onSubmit={handlePayment} className="space-y-5">
              <div>
                <label htmlFor="cardNumber" className={labelStyles}>{t.paymentCardNumber}</label>
                <div className="relative">
                  <input type="text" id="cardNumber" value={cardNumber} onChange={handleCardNumberChange} className={`${inputStyles} pl-10 ${cardError ? 'border-red-500' : ''}`} placeholder="4000 0000 0000 0000" required />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none" dangerouslySetInnerHTML={{ __html: VISA_SVG }}></div>
                </div>
                {cardError && <p className="text-red-500 text-xs mt-1">{cardError}</p>}
              </div>
              <div>
                <label htmlFor="cardHolder" className={labelStyles}>{t.paymentCardHolder}</label>
                <input type="text" id="cardHolder" className={inputStyles} placeholder={t.paymentCardHolder} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiryDate" className={labelStyles}>{t.paymentExpiryDate}</label>
                  <input type="text" id="expiryDate" value={expiryDate} onChange={handleExpiryChange} className={inputStyles} placeholder="MM / YY" required />
                </div>
                <div>
                  <label htmlFor="cvc" className={labelStyles}>{t.paymentCVC}</label>
                  <input type="text" id="cvc" className={inputStyles} placeholder="CVC" required maxLength={3} />
                </div>
              </div>
              <button type="submit" className="w-full bg-brand-primary text-white py-3 mt-4 rounded-md font-bold text-lg hover:bg-brand-secondary transition-colors duration-300 disabled:bg-gray-400" disabled={!!cardError}>
                {t.paymentPayNow} {total.toFixed(2)} {t.currency}
              </button>
            </form>
          )}

          {paymentMethod === 'applepay' && (
            <div className="text-center py-4">
               <p className="text-gray-600 mb-6">{t.paymentApplePayInstruction}</p>
               <button 
                 onClick={() => handlePayment()}
                 className="w-full bg-black text-white h-12 rounded-md font-semibold text-lg hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center"
               >
                 <span className="mr-2" dangerouslySetInnerHTML={{ __html: APPLE_PAY_SVG }}></span>
                 Pay
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;