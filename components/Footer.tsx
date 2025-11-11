import React from 'react';
import { INSTAGRAM_SVG, WHATSAPP_SVG } from '../i18n';

interface FooterProps {
  t: any;
}

const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="bg-brand-primary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-start">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold">Bahi.om</h3>
            <p className="text-brand-accent">{t.footerSubtitle}</p>
          </div>
          <div>
            <h4 className='font-semibold mb-2'>{t.contact}</h4>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/baahi_om/?igsh=MTExbmxoYWZ3OGZ0cg%3D%3D" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:text-white transition" dangerouslySetInnerHTML={{ __html: INSTAGRAM_SVG }}>
              </a>
              <a href="https://wa.me/96876971995" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:text-white transition" dangerouslySetInnerHTML={{ __html: WHATSAPP_SVG }}>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-brand-accent mt-8 border-t border-gray-700 pt-6">
          <p>&copy; {new Date().getFullYear()} Bahi.om.com. {t.footerRights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;