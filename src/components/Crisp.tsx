import { useEffect } from 'react';

const CRISP_SCRIPT_SELECTOR = 'script[data-crisp-loader="true"]';
const CRISP_WEBSITE_ID = 'ca9d8e2e-cc3a-409b-bf67-16e6778a2c1e';

const Crisp: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const crispWindow = window as Window & {
      $crisp?: unknown[];
      CRISP_WEBSITE_ID?: string;
    };

    crispWindow.$crisp = crispWindow.$crisp || [];
    crispWindow.CRISP_WEBSITE_ID = CRISP_WEBSITE_ID;

    const existingScript = document.querySelector<HTMLScriptElement>(CRISP_SCRIPT_SELECTOR);
    if (existingScript) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://client.crisp.chat/l.js';
    script.async = true;
    script.dataset.crispLoader = 'true';
    document.head.appendChild(script);
  }, []);

  return null;
};

export default Crisp;
