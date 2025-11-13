import React from 'react';
import type { Order } from '../types';

interface OrderHistoryPageProps {
  orders: Order[];
  t: any;
  language: string;
  navigate: (page: string, data?: any) => void;
}

const OrderHistoryPage: React.FC<OrderHistoryPageProps> = ({ orders, t, language, navigate }) => {
  return (
    <div className="py-12 bg-brand-background min-h-[60vh]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-brand-primary mb-10">{t.orderHistoryTitle}</h1>
        {orders.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">{t.orderNumber}</th>
                    <th scope="col" className="px-6 py-3">{t.date}</th>
                    <th scope="col" className="px-6 py-3">{t.status}</th>
                    <th scope="col" className="px-6 py-3">{t.total}</th>
                    <th scope="col" className="px-6 py-3"><span className="sr-only">View</span></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">#{order.id.slice(-6)}</td>
                      <td className="px-6 py-4">{new Date(order.date).toLocaleDateString(language === 'ar' ? 'ar-OM' : 'en-US')}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {t[order.status.toLowerCase()]}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold">{(order.total + order.shippingCost).toFixed(2)} {t.currency}</td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => navigate('orderConfirmation', { orderId: order.id })} className="font-medium text-brand-primary hover:underline">{t.viewOrder}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h2 className="mt-2 text-xl font-semibold text-gray-800">{t.noOrders}</h2>
            <p className="mt-1 text-sm text-gray-500">{t.noOrdersSubtitle}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
