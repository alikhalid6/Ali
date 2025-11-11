import React from 'react';

interface HeroProps {
  t: any;
}

const Hero: React.FC<HeroProps> = ({ t }) => {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* =================================================================================== */}
        {/*  لتغيير صورة الخلفية، استبدل "phototest.jpg" باسم ملف صورتك.                  */}
        {/*  To change the background image, replace "phototest.jpg" with your image file name. */}
        {/*  e.g., url('/images/my-hero-image.jpg')                                          */}
        {/* =================================================================================== */}
        <div className="relative rounded-lg overflow-hidden bg-cover bg-center h-96" style={{ backgroundImage: "url('/images/phototest.jpg')" }}>
           <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center text-white p-4">
             <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 tracking-wide">{t.heroTitle}</h1>
             <p className="text-lg md:text-xl max-w-2xl mb-8">
               {t.heroSubtitle}
             </p>
             <a href="#" className="bg-brand-secondary hover:bg-brand-accent text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 duration-300">
               {t.heroButton}
             </a>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
