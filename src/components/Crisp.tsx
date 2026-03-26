import { useEffect } from 'react';

const Crisp: React.FC = () => {
  useEffect(() => {
    // Crisp Chat configuration
    if (typeof window !== 'undefined') {
      // @ts-ignore
      window.$crisp = [];
      // @ts-ignore
      window.CRISP_WEBSITE_ID = "ca9d8e2e-cc3a-409b-bf67-16e6778a2c1e";

      // Load Crisp script
      const script = document.createElement('script');
      script.src = 'https://client.crisp.chat/l.js';
      script.async = true;
      document.head.appendChild(script);

      // Cleanup function
      return () => {
        // Remove Crisp when component unmounts
        const crispScript = document.querySelector('script[src="https://client.crisp.chat/l.js"]');
        if (crispScript) {
          crispScript.remove();
        }
        // @ts-ignore
        if (window.$crisp) {
          // @ts-ignore
          delete window.$crisp;
          // @ts-ignore
          delete window.CRISP_WEBSITE_ID;
        }
      };
    }
  }, []);

  return null;
};

export default Crisp;
