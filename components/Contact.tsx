import React, { useState, useRef, useEffect } from 'react';
import { 
  BAHI_LOGO_URL, 
  OMAN_FLAG_SVG,
  SAUDI_ARABIA_FLAG_SVG,
  UAE_FLAG_SVG,
  QATAR_FLAG_SVG,
  KUWAIT_FLAG_SVG,
  BAHRAIN_FLAG_SVG
} from '../i18n';

interface Country {
  name: string;
  en_name: string;
  code: string;
  flag: string;
}

const countries: Country[] = [
  { name: 'عُمان', en_name: 'Oman', code: '+968', flag: OMAN_FLAG_SVG },
  { name: 'السعودية', en_name: 'Saudi Arabia', code: '+966', flag: SAUDI_ARABIA_FLAG_SVG },
  { name: 'الإمارات', en_name: 'UAE', code: '+971', flag: UAE_FLAG_SVG },
  { name: 'قطر', en_name: 'Qatar', code: '+974', flag: QATAR_FLAG_SVG },
  { name: 'البحرين', en_name: 'Bahrain', code: '+973', flag: BAHRAIN_FLAG_SVG },
  { name: 'الكويت', en_name: 'Kuwait', code: '+965', flag: KUWAIT_FLAG_SVG },
];

interface ContactProps {
  t: any;
  language: 'ar' | 'en';
}

const Contact: React.FC<ContactProps> = ({ t, language }) => {
  const inputStyles = "w-full p-3 bg-brand-surface text-brand-text border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-secondary focus:border-transparent outline-none transition";
  const labelStyles = "block text-sm font-medium text-gray-700 mb-1";

  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Allow only digits
    setPhone(value);

    if (selectedCountry.code !== '+968') {
      setPhoneError('');
      return;
    }

    if (value === '') {
        setPhoneError('');
        return;
    }

    if (!/^[79]/.test(value)) {
        setPhoneError(language === 'ar' ? 'يجب أن يبدأ الرقم بـ 7 أو 9' : 'Number must start with 7 or 9');
    } else if (value.length !== 8) {
        setPhoneError(language === 'ar' ? 'يجب أن يتكون الرقم من 8 أرقام' : 'Number must be 8 digits long');
    } else {
        setPhoneError('');
    }
  };

  useEffect(() => {
      // Reset phone validation when country changes
      setPhone('');
      setPhoneError('');
  }, [selectedCountry]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
              <div className="relative flex items-center w-full border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-brand-secondary focus-within:border-transparent transition">
                {/* Country selector dropdown */}
                <div ref={dropdownRef} className="relative">
                  <button 
                    type="button" 
                    className={`flex items-center h-full p-3 bg-gray-50 ${language === 'ar' ? 'rounded-r-md' : 'rounded-l-md'} hover:bg-gray-100`}
                    onClick={() => setIsDropdownOpen(o => !o)}
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                  >
                    <span dangerouslySetInnerHTML={{ __html: selectedCountry.flag }} className="w-6 h-5 rounded-sm overflow-hidden" />
                    <svg className={`w-4 h-4 ${language === 'ar' ? 'mr-2' : 'ml-2'} text-gray-600 transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <div className={`absolute z-10 w-72 mt-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1 ${language === 'ar' ? 'right-0' : 'left-0'}`}>
                      <ul>
                        {countries.map((country) => (
                          <li 
                            key={country.code}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setSelectedCountry(country);
                              setIsDropdownOpen(false);
                            }}
                          >
                            <span dangerouslySetInnerHTML={{ __html: country.flag }} className="w-6 h-5 rounded-sm overflow-hidden" />
                            <span>{language === 'ar' ? country.name : country.en_name}</span>
                            <span className="text-gray-500">{country.code}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Phone number input */}
                <div className="flex-grow flex items-center">
                   <span className={`pl-3 text-brand-text ${language === 'ar' ? 'border-r' : 'border-l'} border-gray-300`}>{selectedCountry.code}</span>
                   <input 
                     type="tel" 
                     id="phone" 
                     className="w-full p-3 bg-transparent border-none outline-none"
                     dir="ltr"
                     value={phone}
                     onChange={handlePhoneChange}
                     maxLength={selectedCountry.code === '+968' ? 8 : undefined}
                     placeholder={selectedCountry.code === '+968' ? '7xxxxxxx / 9xxxxxxx' : ''}
                   />
                </div>
              </div>
              {phoneError && <p className="text-red-500 text-xs mt-1 px-1">{phoneError}</p>}
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
                  disabled={!!phoneError}
                  className="w-full bg-brand-primary text-white py-3 px-4 rounded-md hover:bg-brand-secondary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-opacity-50 font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
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