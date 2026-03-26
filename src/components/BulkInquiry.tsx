import React, { useState, useEffect } from 'react';

interface InquiryItem {
  name: string;
  url?: string;
  img?: string;
}

const STORAGE_KEY = 'nextherm_inquiry_selection';

const BulkInquiry: React.FC = () => {
  const [items, setItems] = useState<InquiryItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadItems();

    // Listen for storage changes
    const handleStorageChange = () => {
      loadItems();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadItems = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsedItems = stored ? JSON.parse(stored) : [];
      setItems(parsedItems);
    } catch (e) {
      setItems([]);
    }
  };

  const saveItems = (newItems: InquiryItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
    setItems(newItems);
  };

  const removeItem = (name: string) => {
    const newItems = items.filter(i => i.name !== name);
    saveItems(newItems);
    if (newItems.length === 0) {
      setIsModalOpen(false);
    }
  };

  const clearAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setItems([]);
    setIsModalOpen(false);
  };

  const openModal = () => {
    if (items.length > 0) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleWhatsApp = () => {
    const productNames = items.map(i => i.name).join('\n');
    const message = `Hi, I am interested in these products:\n\n${productNames}\n\nPlease send me more information.`;
    const phoneNumber = '8613800102400'; // Replace with your WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleInquiry = () => {
    window.location.href = '/contact';
  };

  if (items.length === 0) return null;

  return (
    <>
      {/* Bulk Inquiry Bar - Always visible when items exist */}
      <div className={`fixed bottom-0 left-0 right-0 z-[500] bg-hn-primary text-white transition-transform duration-300 ease-out shadow-[0_-4px_24px_rgba(0,0,0,0.2)] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 motion-safe:duration-500 ${items.length > 0 ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-[1200px] mx-auto px-5 max-md:px-4 py-4 max-md:py-3 flex max-md:flex-col items-center justify-between gap-4 max-md:gap-2">
          <div className="flex items-center gap-3 max-md:gap-2 flex-1 min-w-0 max-md:w-full">
            <span className="inline-flex items-center justify-center min-w-[28px] max-md:min-w-[24px] h-7 max-md:h-6 px-1.5 bg-white text-hn-primary font-bold text-sm max-md:text-xs rounded-full flex-shrink-0">{items.length}</span>
            <div className="flex items-center gap-2 max-md:gap-1.5 overflow-x-auto max-md:flex-1">
              {items.slice(0, 5).map((item, index) => (
                <div key={index} className="relative group flex-shrink-0 motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-500" style={{ animationDelay: `${index * 70}ms` }}>
                  {item.img ? (
                    <img src={item.img} alt={item.name} className="w-20 h-20 max-md:w-14 max-md:h-14 rounded-lg object-cover border-2 border-white/20" />
                  ) : (
                    <span className="inline-flex items-center justify-center w-20 h-20 max-md:w-14 max-md:h-14 rounded-lg bg-white/20 font-semibold text-sm max-md:text-xs">{item.name.charAt(0)}</span>
                  )}
                  <button
                    className="absolute top-1 right-1 max-md:top-0.5 max-md:right-0.5 flex items-center justify-center w-6 h-6 max-md:w-5 max-md:h-5 bg-white/90 backdrop-blur-sm rounded-full cursor-pointer transition-all duration-200 opacity-0 group-hover:opacity-100 max-md:opacity-100 hover:bg-white hover:scale-110 shadow-lg"
                    onClick={() => removeItem(item.name)}
                    aria-label="Remove item"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" className="max-md:w-3 max-md:h-3">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              ))}
              {items.length > 5 && (
                <span className="inline-flex items-center justify-center w-20 h-20 max-md:w-14 max-md:h-14 rounded-lg bg-white/15 text-xs font-semibold flex-shrink-0">+{items.length - 5}</span>
              )}
            </div>
            <button
              className="ml-auto px-3 max-md:px-2 py-1.5 max-md:py-1 bg-transparent border border-white/30 text-white/75 rounded text-xs cursor-pointer transition-all duration-200 hover:border-white/70 hover:text-white max-md:hidden"
              onClick={openModal}
            >
              View All
            </button>
          </div>
          <div className="flex items-center gap-3 max-md:gap-2 flex-shrink-0 max-md:w-full">
            <button className="px-4 max-md:px-3 py-2 max-md:py-1.5 bg-transparent border-[1.5px] border-white/30 text-white/75 rounded-md cursor-pointer text-sm max-md:text-xs transition-all duration-200 max-md:flex-1 hover:border-white/70 hover:text-white" onClick={clearAll}>Clear</button>
            <button className="inline-flex items-center justify-center gap-2 px-5 max-md:px-3 py-2.5 max-md:py-2 bg-[#25D366] text-white border-none rounded-md font-bold text-sm max-md:text-xs cursor-pointer transition-all duration-200 max-md:flex-1 hover:bg-[#1fb855] hover:-translate-y-px" onClick={handleWhatsApp}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="max-md:w-3.5 max-md:h-3.5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span className="max-md:hidden">WhatsApp</span>
            </button>
            <button className="inline-flex items-center justify-center gap-2 px-5 max-md:px-3 py-2.5 max-md:py-2 bg-white text-hn-primary border-none rounded-md font-bold text-sm max-md:text-xs cursor-pointer transition-all duration-200 max-md:flex-1 hover:bg-gray-100 hover:-translate-y-px" onClick={handleInquiry}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="max-md:w-3.5 max-md:h-3.5">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
              <span className="max-md:hidden">Inquiry</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Inquiry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/50 opacity-100 transition-opacity duration-300 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200" onClick={closeModal}>
          <div className="relative bg-white rounded-t-3xl max-md:rounded-t-2xl w-full max-w-[960px] max-md:max-w-full max-h-[86vh] max-md:max-h-[68vh] overflow-y-auto px-10 max-md:px-4 pt-8 max-md:pt-4 pb-10 max-md:pb-6 shadow-[0_-12px_40px_rgba(0,0,0,0.18)] animate-modalSlideIn" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto mb-5 max-md:mb-3 h-1.5 w-14 rounded-full bg-hn-border"></div>
            <button className="absolute top-5 max-md:top-3 right-5 max-md:right-3 w-9 max-md:w-7 h-9 max-md:h-7 rounded-lg border-none bg-gray-100 text-gray-500 cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-hn-primary hover:text-white" onClick={closeModal}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="max-md:w-4 max-md:h-4">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div className="flex max-md:flex-col flex-row gap-6 max-md:gap-3 items-start justify-center">
              <div className="flex-1 flex flex-wrap gap-5 max-md:gap-2.5 p-6 max-md:p-3 bg-[#f6f8fb] rounded-xl max-md:rounded-lg items-center justify-center">
                {items.map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-3 max-md:gap-2 p-6 max-md:p-2.5 bg-white border border-[#dde4ec] rounded-xl max-md:rounded-lg text-sm transition-all duration-200 relative w-[200px] max-md:w-[110px] hover:border-hn-accent hover:shadow-[0_8px_20px_rgba(13,111,184,0.16)]">
                    {item.img ? (
                      <img src={item.img} alt={item.name} className="w-[180px] max-md:w-[90px] h-[180px] max-md:h-[90px] object-cover rounded-lg" />
                    ) : (
                      <div className="w-[180px] max-md:w-[90px] h-[180px] max-md:h-[90px] bg-gray-200 rounded-lg flex items-center justify-center font-semibold text-gray-500 text-[3rem] max-md:text-xl">{item.name.charAt(0)}</div>
                    )}
                    <button
                      className="absolute top-2 max-md:top-1 right-2 max-md:right-1 flex items-center justify-center w-8 max-md:w-6 h-8 max-md:h-6 bg-[#eef2f7] border-none rounded-full cursor-pointer transition-all duration-200 hover:bg-red-500 hover:text-white"
                      onClick={() => removeItem(item.name)}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="max-md:w-3.5 max-md:h-3.5">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex-shrink-0 w-[200px] max-md:w-full flex flex-col gap-3 max-md:gap-2">
                <button className="inline-flex items-center justify-center gap-2 w-full px-4 py-3.5 max-md:py-2.5 text-white border-none rounded-lg font-bold cursor-pointer transition-all duration-200 bg-[#25D366] hover:bg-[#1fb855] hover:-translate-y-0.5" onClick={handleWhatsApp}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="max-md:w-4 max-md:h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp
                </button>
                <button className="inline-flex items-center justify-center gap-2 w-full px-4 py-3.5 max-md:py-2.5 text-white border-none rounded-lg font-bold cursor-pointer transition-all duration-200 bg-[#0d6fb8] hover:bg-[#0b5fa0] hover:-translate-y-0.5" onClick={handleInquiry}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="max-md:w-4 max-md:h-4">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                  Inquiry Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkInquiry;

// Export helper functions for use in product pages
export const addToInquiry = (item: InquiryItem) => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const items: InquiryItem[] = stored ? JSON.parse(stored) : [];
    if (!items.find(i => i.name === item.name)) {
      items.push(item);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      window.dispatchEvent(new Event('storage'));
    }
  } catch (e) {
    console.error('Failed to add item to inquiry:', e);
  }
};

export const removeFromInquiry = (name: string) => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const items: InquiryItem[] = stored ? JSON.parse(stored) : [];
    const newItems = items.filter(i => i.name !== name);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
    window.dispatchEvent(new Event('storage'));
  } catch (e) {
    console.error('Failed to remove item from inquiry:', e);
  }
};

export const isInInquiry = (name: string): boolean => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const items: InquiryItem[] = stored ? JSON.parse(stored) : [];
    return items.some(i => i.name === name);
  } catch (e) {
    return false;
  }
};
