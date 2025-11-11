import React from 'react';

interface AboutProps {
  t: any;
}

const About: React.FC<AboutProps> = ({ t }) => {
  return (
    <div className="py-12 bg-brand-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-brand-primary mb-4">{t.aboutTitle}</h1>
        <p className="text-lg text-brand-text max-w-2xl mx-auto">
          {t.aboutText}
        </p>
      </div>
    </div>
  );
};

export default About;
