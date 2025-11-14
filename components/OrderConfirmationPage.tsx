import React from 'react';
import type { Order } from '../types';
import { WHATSAPP_SVG } from '../i18n';

interface OrderConfirmationPageProps {
  order: Order;
  t: any;
  language: string;
  navigate: (page: string) => void;
}

const OrderStatusTracker: React.FC<{ status: 'Processing' | 'Shipped' | 'Delivered', t: any }> = ({ status, t }) => {
    const statuses = ['Processing', 'Shipped', 'Delivered'];
    const currentStatusIndex = statuses.indexOf(status);

    return (
        <div className="w-full my-8">
            <div className="flex justify-between items-center relative">
                <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 transform -translate-y-1/2">
                    <div 
                        className="absolute left-0 top-0 h-full bg-brand-secondary transition-all duration-500"
                        style={{ width: `${(currentStatusIndex / (statuses.length - 1)) * 100}%`}}
                    ></div>
                </div>
                {statuses.map((s, index) => (
                    <div key={s} className="z-10 flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500 ${
                            index <= currentStatusIndex ? 'bg-brand-secondary text-white' : 'bg-gray-200 text-gray-500'
                        }`}>
                            {index <= currentStatusIndex ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                            ) : (
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                            )}
                        </div>
                        <span className={`mt-2 text-xs font-semibold ${index <= currentStatusIndex ? 'text-brand-primary' : 'text-gray-500'}`}>{t[s.toLowerCase()]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ order, t, language, navigate }) => {
  if (!order) {
    return (
      <div className="py-12 bg-brand-background text-center">
        <h1 className="text-2xl font-bold text-brand-primary">{t.orderNotFound}</h1>
      </div>
    );
  }

  const subtotal = order.items.reduce((acc, item) => acc + (item.salePrice ?? item.price) * item.quantity, 0);

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <div className="text-center">
                <svg className="w-20 h-20 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h1 className="text-3xl font-bold text-brand-primary">{t.thankYouMessage}</h1>
                <p className="text-gray-600 mt-2">{t.orderConfirmationSubtitle}</p>
            </div>

            <OrderStatusTracker status={order.status} t={t} />

            <div className="border-t border-b py-4 my-6 text-sm grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                    <span className="block text-gray-500 uppercase tracking-wider">{t.orderNumber}</span>
                    <span className="font-bold text-brand-text">#{order.id.slice(-6)}</span>
                </div>
                <div>
                    <span className="block text-gray-500 uppercase tracking-wider">{t.date}</span>
                    <span className="font-bold text-brand-text">{new Date(order.date).toLocaleDateString(language === 'ar' ? 'ar-OM' : 'en-US')}</span>
                </div>
                <div>
                    <span className="block text-gray-500 uppercase tracking-wider">{t.total}</span>
                    <span className="font-bold text-brand-text">{(order.total + order.shippingCost).toFixed(2)} {t.currency}</span>
                </div>
                <div>
                    <span className="block text-gray-500 uppercase tracking-wider">{t.checkoutPaymentMethod}</span>
                    <span className="font-bold text-brand-text">
                       {order.paymentMethod === 'bankTransfer' ? t.paymentMethodBankTransfer : order.paymentMethod}
                    </span>
                </div>
            </div>
            
            <h3 className="text-xl font-bold text-brand-primary mb-4">{t.checkoutOrderSummary}</h3>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2 border rounded-md p-4 bg-gray-50">
                {order.items.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center">
                    <img src={item.imageUrl} alt={item.name[language]} className="w-16 h-20 object-cover rounded me-4" />
                    <div>
                        <p className="font-semibold text-brand-text">{item.name[language]}</p>
                        <p className="text-gray-500">{t.quantity}: {item.quantity}</p>
                    </div>
                    </div>
                    <p className="font-semibold text-gray-800">{((item.salePrice ?? item.price) * item.quantity).toFixed(2)} {t.currency}</p>
                </div>
                ))}
            </div>
             <div className="border-t mt-4 pt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                <span className="text-gray-600">{t.cartSubtotal}</span>
                <span className="font-semibold text-brand-text">{subtotal.toFixed(2)} {t.currency}</span>
                </div>
                <div className="flex justify-between">
                <span className="text-gray-600">{t.checkoutShipping}</span>
                <span className="font-semibold text-brand-text">{order.shippingCost.toFixed(2)} {t.currency}</span>
                </div>
                {order.total < subtotal &&
                <div className="flex justify-between text-green-600">
                    <span>{t.cartDiscount}</span>
                    <span>-{(subtotal - order.total).toFixed(2)} {t.currency}</span>
                </div>
                }
                <div className="flex justify-between text-lg font-bold text-brand-primary border-t pt-3 mt-3">
                <span>{t.cartTotal}</span>
                <span>{(order.total + order.shippingCost).toFixed(2)} {t.currency}</span>
                </div>
            </div>
             <div className="mt-8 text-center space-y-4">
                <button
                    onClick={() => window.open('https://wa.me/96876971995', '_blank')}
                    className="w-full sm:w-auto bg-[#25D366] text-white py-3 px-6 rounded-md font-bold hover:bg-opacity-90 transition-colors duration-300 flex items-center justify-center mx-auto gap-3"
                >
                    <span dangerouslySetInnerHTML={{ __html: WHATSAPP_SVG }} />
                    {t.orderConfirmationWhatsApp}
                </button>
                <button
                    onClick={() => navigate('home')}
                    className="w-full sm:w-auto bg-brand-primary text-white py-3 px-8 rounded-md font-bold hover:bg-brand-secondary transition-colors duration-300"
                >
                    {t.goToHomepage}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;