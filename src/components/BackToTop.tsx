import React, { useState, useEffect } from 'react';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`fixed bottom-8 right-8 md:bottom-10 md:right-6 w-12 h-12 md:w-10 md:h-10 bg-hn-primary text-white border-none rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.15)] z-[100] ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} hover:bg-hn-accent hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)]`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <svg className="md:w-5 md:h-5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </button>
  );
};

export default BackToTop;
