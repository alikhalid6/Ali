import React, { useState, useEffect, useRef } from 'react';
import type { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
  t: any;
  language: string;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex justify-center text-yellow-400 mb-4">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-6 h-6 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials, t, language }) => {
  const ITEMS_PER_PAGE = 4;
  const totalPages = Math.ceil(testimonials.length / ITEMS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = window.setTimeout(
      () =>
        setCurrentPage((prevPage) =>
          prevPage === totalPages - 1 ? 0 : prevPage + 1
        ),
      5000 // 5 seconds
    );

    return () => {
      resetTimeout();
    };
  }, [currentPage, totalPages, language]);
  
  const handleDotClick = (index: number) => {
    setCurrentPage(index);
  };

  return (
    <div className="bg-brand-background py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <p className="text-brand-secondary font-semibold uppercase tracking-wider">{t.testimonialsSubtitle}</p>
            <h2 className="text-4xl font-bold text-brand-primary mt-2">{t.testimonialsTitle}</h2>
            <div className="w-24 h-1 bg-brand-secondary mx-auto mt-4"></div>
        </div>
        
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {[...Array(totalPages)].map((_, pageIndex) => (
              <div key={pageIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {testimonials
                    .slice(
                      pageIndex * ITEMS_PER_PAGE,
                      (pageIndex + 1) * ITEMS_PER_PAGE
                    )
                    .map((testimonial) => (
                      <div key={testimonial.id} className="bg-brand-surface p-8 rounded-lg shadow-lg text-center border-t-4 border-brand-secondary flex flex-col">
                        <StarRating rating={testimonial.rating} />
                        <p className="text-gray-600 italic leading-relaxed mb-6 flex-grow">"{testimonial.text[language]}"</p>
                        <p className="font-bold text-brand-primary text-lg mt-auto">{testimonial.author[language]}</p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-3 h-3 rounded-full mx-1.5 transition-colors duration-300 ${
                        currentPage === index ? 'bg-brand-secondary' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
