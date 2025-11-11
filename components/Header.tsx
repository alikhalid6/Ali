import React, { useState, useEffect, useRef } from 'react';
import { BAHI_LOGO_URL, OMAN_FLAG_SVG, USA_FLAG_SVG } from '../i18n';

interface CartIconProps {
  onClick: () => void;
  itemCount: number;
}

const CartIcon: React.FC<CartIconProps> = ({ onClick, itemCount }) => (
  <button onClick={onClick} className="relative text-brand-primary hover:text-brand-secondary transition-colors duration-300">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
    {itemCount > 0 && (
      <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 bg-brand-secondary text-white text-xs rounded-full font-bold">
        {itemCount}
      </span>
    )}
  </button>
);

const MenuIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button onClick={onClick} className="text-brand-primary hover:text-brand-secondary transition-colors duration-300">
        <svg className="h-7 w-7" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
    </button>
);

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  t: any;
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
  navigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick, t, language, setLanguage, navigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavigate = (page: string) => {
      navigate(page);
      setIsMenuOpen(false);
  }

  return (
    <header className="bg-brand-surface/80 backdrop-blur-lg sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigate('home')}>
             <img src={BAHI_LOGO_URL} alt="Bahi Logo" className="h-14 w-14 rounded-full object-cover border-2 border-brand-accent"/>
             <div className="text-3xl font-bold text-brand-primary tracking-wider">
                {t.brandName}
             </div>
          </div>
          
          <nav className="flex items-center space-x-6">
             <CartIcon onClick={onCartClick} itemCount={cartItemCount} />
             <div className="relative" ref={menuRef}>
                <MenuIcon onClick={() => setIsMenuOpen(v => !v)} />
                {isMenuOpen && (
                    <div className={`absolute ${language === 'ar' ? 'left-0' : 'right-0'} mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1`}>
                        <a onClick={() => handleNavigate('home')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">{t.menuHome}</a>
                        <a onClick={() => handleNavigate('about')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">{t.menuAbout}</a>
                        <a onClick={() => handleNavigate('contact')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">{t.menuContact}</a>
                        <div className="border-t my-1"></div>
                        <div className="px-4 py-2 text-sm text-gray-500">{t.menuLanguage}</div>
                        <button onClick={() => setLanguage('ar')} className={`w-full text-left flex items-center gap-3 px-4 py-2 text-sm ${language === 'ar' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} hover:bg-gray-100`}>
                            <span dangerouslySetInnerHTML={{ __html: OMAN_FLAG_SVG }} className="w-5 h-5 rounded-full overflow-hidden"></span>
                            <span>العربية</span>
                        </button>
                        <button onClick={() => setLanguage('en')} className={`w-full text-left flex items-center gap-3 px-4 py-2 text-sm ${language === 'en' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} hover:bg-gray-100`}>
                            <span dangerouslySetInnerHTML={{ __html: USA_FLAG_SVG }} className="w-5 h-5 rounded-full overflow-hidden"></span>
                            <span>English</span>
                        </button>
                    </div>
                )}
             </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;