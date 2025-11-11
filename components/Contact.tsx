import React from 'react';
import { BAHI_LOGO_URL } from '../i18n';

interface ContactProps {
  t: any;
}

const Contact: React.FC<ContactProps> = ({ t }) => {
  const inputStyles = "w-full p-3 bg-brand-surface text-brand-text border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-secondary focus:border-transparent outline-none transition";
  const labelStyles = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="py-12 bg-brand-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-brand-surface p-8 rounded-xl shadow-lg">
          <div className="text-center mb-8">
            <img src={BAHI_LOGO_URL} alt="Bahi Logo" className="h-24 w-24 rounded-full object-cover border-4 border-brand-accent mx-auto mb-4"/>
            <h1 className="text-3xl font-bold text-brand-primary">{t.contactTitle}</h1>
            <p className="text-md text-gray-500 mt-2">{t.contactSubtitle}</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div>
                <label htmlFor="name" className={labelStyles}>{t.contactName}</label>
                <input type="text" id="name" className={inputStyles} />
            </div>
            <div>
                <label htmlFor="phone" className={labelStyles}>{t.contactPhone}</label>
                <input type="tel" id="phone" className={inputStyles} />
            </div>
             <div>
                <label htmlFor="email" className={labelStyles}>{t.contactEmail}</label>
                <input type="email" id="email" className={inputStyles} />
            </div>
            <div>
                <label htmlFor="message" className={labelStyles}>{t.contactMessage}</label>
                <textarea id="message" rows={5} className={inputStyles}></textarea>
            </div>
            <div>
                <button 
                  type="submit"
                  className="w-full bg-brand-primary text-white py-3 px-4 rounded-md hover:bg-brand-secondary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-opacity-50 font-bold"
                >
                  {t.contactSend}
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;