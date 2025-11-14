import React, { useState } from 'react';
import type { CustomerDetails } from '../types';

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
  const { total = 0, shippingCost = 0, customerDetails } = pageData || {};

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Basic validation for image type
      if (file.type.startsWith('image/')) {
        setReceiptFile(file);
        setError('');
      } else {
        // Handle non-image file selection if needed
        setReceiptFile(null);
        setError('Please upload an image file.');
      }
    }
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiptFile) {
      setError(t.bankTransferFileRequired);
      return;
    }
    setError('');
    setIsProcessing(true);

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onPaymentSuccess(customerDetails, shippingCost, 'bankTransfer');
      }, 3000);
    }, 1500);
  };

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
          <h1 className="text-3xl font-bold text-center text-brand-primary mb-2">{t.paymentTitleBank}</h1>
          <p className="text-center text-gray-600 mb-4">{t.bankTransferInstructions}</p>
          <p className="text-center text-gray-600 mb-8">المبلغ الإجمالي للدفع: <span className="font-bold text-2xl text-brand-primary">{total.toFixed(2)} {t.currency}</span></p>
          
          <div className="space-y-3 text-center border-2 border-dashed border-brand-secondary p-4 rounded-lg bg-brand-accent/10 mb-8">
            <p className="font-bold text-lg text-brand-primary">{t.bankTransferBankName}</p>
            <p className="text-brand-text text-md">{t.bankTransferAccountName}</p>
            <p className="text-brand-text text-md">{t.bankTransferAccountNumber}</p>
            <p className="text-brand-text text-md">{t.bankTransferPhoneNumber}</p>
          </div>

          <form onSubmit={handlePayment} className="space-y-6">
            <div>
              <label className={labelStyles}>{t.bankTransferUploadReceipt} *</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label htmlFor="receipt-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-primary hover:text-brand-secondary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-secondary px-2">
                      <span>{receiptFile ? t.bankTransferFileSelected : t.bankTransferNoFile}</span>
                      <input id="receipt-upload" name="receipt-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                    </label>
                  </div>
                   {receiptFile && <p className="text-xs text-gray-500">{receiptFile.name}</p>}
                </div>
              </div>
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>

            <button type="submit" className="w-full bg-brand-primary text-white py-3 mt-4 rounded-md font-bold text-lg hover:bg-brand-secondary transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={!receiptFile}>
              {t.bankTransferConfirmPayment}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;