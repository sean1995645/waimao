import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useForm, ValidationError } from '@formspree/react';
import PageHero from '@/components/PageHero';

type ContactFormFields = {
  name: string;
  email: string;
  company: string;
  message: string;
  selected_products?: string;
  selected_product_urls?: string;
  selected_product_image_links?: string;
};

type InquiryItem = {
  name: string;
  url?: string;
  img?: string;
};

const INQUIRY_STORAGE_KEY = 'nextherm_inquiry_selection';
const FORMSPREE_FORM_ID = 'mlgoeokj';

const ContactPage: React.FC = () => {
  const intl = useIntl();
  const [state, handleSubmit, reset] = useForm<ContactFormFields>(FORMSPREE_FORM_ID);
  const [selectedItems, setSelectedItems] = useState<InquiryItem[]>([]);
  const getMessage = (id: string, fallback: string) => {
    const message = intl.messages?.[id];
    return typeof message === 'string' && message ? message : fallback;
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const loadSelectedItems = () => {
      try {
        const stored = localStorage.getItem(INQUIRY_STORAGE_KEY);
        const storedItems: InquiryItem[] = stored ? JSON.parse(stored) : [];
        setSelectedItems(storedItems);
      } catch (error) {
        setSelectedItems([]);
      }
    };

    loadSelectedItems();
    window.addEventListener('storage', loadSelectedItems);

    return () => {
      window.removeEventListener('storage', loadSelectedItems);
    };
  }, []);

  const submitLabel = state.submitting
    ? getMessage('contact.form.submitting', 'Sending...')
    : intl.formatMessage({ id: 'contact.form.submit' });
  const selectedProductNames = selectedItems.map((item) => item.name).join('\n');
  const selectedProductUrls = selectedItems
    .map((item) => item.url)
    .filter((url): url is string => Boolean(url))
    .join('\n');
  const selectedProductImageLinks = selectedItems
    .map((item) => item.img)
    .filter((img): img is string => Boolean(img))
    .join('\n');

  return (
    <div className="w-full">
      <PageHero
        bgImage="/page-hero-contact-photo.jpg"
        bgImageMobile="/page-hero-contact-photo-mobile.jpg"
        bgPosition="center center"
        accentColor="#5fa7d4"
        eyebrow={intl.formatMessage({ id: 'contact.hero.eyebrow' })}
        title={intl.formatMessage({ id: 'contact.hero.title' })}
        description={intl.formatMessage({ id: 'contact.hero.description' })}
        panelTitle={intl.formatMessage({ id: 'contact.hero.panelTitle' })}
        panelText={intl.formatMessage({ id: 'contact.hero.panelText' })}
        stats={[
          { value: '24h', label: intl.formatMessage({ id: 'contact.hero.responseTime' }) },
          { value: '5', label: intl.formatMessage({ id: 'contact.hero.languages' }) },
          { value: 'Global', label: intl.formatMessage({ id: 'contact.hero.support' }) },
        ]}
      />

      <section className="bg-white py-24 max-md:py-8">
        <div className="mx-auto max-w-[1200px] px-5 max-md:px-4">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-12">
            <div>
              <h2 className="mb-6 text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-[-0.02em] text-hn-primary max-md:mb-3 max-md:text-[1.5rem]">
                {intl.formatMessage({ id: 'contact.form.title' })}
              </h2>
              <p className="mb-10 text-[1.125rem] leading-[1.8] text-gray-600 max-md:mb-5 max-md:text-[0.95rem] max-md:leading-[1.7]">
                {intl.formatMessage({ id: 'contact.form.description' })}
              </p>

              <div className="flex flex-col gap-6 max-md:gap-3">
                <div className="flex items-start gap-4 max-md:gap-3">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-gradient-to-br from-hn-surface to-white text-hn-accent shadow-sm max-md:h-11 max-md:w-11 max-md:rounded-lg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="max-md:h-5 max-md:w-5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-1 text-[1rem] font-semibold text-hn-primary max-md:text-[0.9rem]">
                      {intl.formatMessage({ id: 'contact.form.email' })}
                    </h3>
                    <p className="text-[0.95rem] text-gray-600 max-md:text-[0.85rem]">sales@heatnexis.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 max-md:gap-3">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-gradient-to-br from-hn-surface to-white text-hn-accent shadow-sm max-md:h-11 max-md:w-11 max-md:rounded-lg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="max-md:h-5 max-md:w-5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-1 text-[1rem] font-semibold text-hn-primary max-md:text-[0.9rem]">
                      {intl.formatMessage({ id: 'contact.form.phone' })}
                    </h3>
                    <p className="text-[0.95rem] text-gray-600 max-md:text-[0.85rem]">+86 138 0010 2400</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full max-w-[440px] justify-self-start rounded-2xl border border-gray-100 bg-gradient-to-br from-hn-surface to-white p-6 shadow-sm lg:justify-self-end max-md:rounded-xl max-md:p-5">
              {state.succeeded ? (
                <div className="flex flex-col gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-[1.25rem] font-bold text-hn-primary">
                      {getMessage('contact.form.successTitle', 'Thanks for reaching out')}
                    </h3>
                    <p className="text-[0.95rem] leading-7 text-gray-600">
                      {getMessage('contact.form.successDescription', 'Your message has been sent. We will get back to you shortly.')}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={reset}
                    className="w-full rounded-lg border border-[#d5dfeb] bg-white px-6 py-3 text-[0.92rem] font-semibold text-hn-primary transition-all duration-200 hover:border-hn-accent hover:text-hn-accent max-md:px-6 max-md:py-3 max-md:text-[0.88rem]"
                  >
                    {getMessage('contact.form.sendAnother', 'Send another message')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-md:gap-3.5">
                  {selectedItems.length > 0 && (
                    <div className="rounded-xl border border-[#d8e4ef] bg-white/80 p-4">
                      <div className="mb-3">
                        <h3 className="text-[0.92rem] font-semibold text-hn-primary">
                          {getMessage('contact.form.selectedProductsTitle', 'Selected products')}
                        </h3>
                        <p className="mt-1 text-[0.82rem] leading-6 text-gray-500">
                          {getMessage('contact.form.selectedProductsDescription', 'These product details and image links will be included with your inquiry.')}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2.5">
                        {selectedItems.map((item) => (
                          <div key={item.name} className="flex items-center gap-3 rounded-lg border border-[#e8eef5] bg-white px-3 py-2.5">
                            {item.img ? (
                              <img src={item.img} alt={item.name} className="h-12 w-12 rounded-lg object-cover" />
                            ) : (
                              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#eef3f8] text-[0.95rem] font-semibold text-hn-primary">
                                {item.name.charAt(0)}
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="truncate text-[0.84rem] font-semibold text-hn-primary">{item.name}</p>
                              {item.img && <p className="truncate text-[0.74rem] text-gray-500">{item.img}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                      <input type="hidden" name="selected_products" value={selectedProductNames} />
                      <input type="hidden" name="selected_product_urls" value={selectedProductUrls} />
                      <input type="hidden" name="selected_product_image_links" value={selectedProductImageLinks} />
                    </div>
                  )}

                  <div>
                    <label htmlFor="name" className="mb-2 block text-[0.9rem] font-semibold text-hn-primary max-md:mb-1.5 max-md:text-[0.85rem]">
                      {intl.formatMessage({ id: 'contact.form.name' })}*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full rounded-lg border border-[#d5dfeb] bg-white px-3.5 py-2.5 text-[0.92rem] text-hn-text transition-all duration-200 focus:border-hn-accent focus:outline-none focus:ring-2 focus:ring-hn-accent/20 max-md:px-3.5 max-md:py-2.5 max-md:text-[0.88rem]"
                      required
                    />
                    <ValidationError
                      prefix={getMessage('contact.form.nameError', 'Name')}
                      field="name"
                      errors={state.errors}
                      className="mt-1.5 text-sm text-red-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-[0.9rem] font-semibold text-hn-primary max-md:mb-1.5 max-md:text-[0.85rem]">
                      {intl.formatMessage({ id: 'contact.form.email' })}*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full rounded-lg border border-[#d5dfeb] bg-white px-3.5 py-2.5 text-[0.92rem] text-hn-text transition-all duration-200 focus:border-hn-accent focus:outline-none focus:ring-2 focus:ring-hn-accent/20 max-md:px-3.5 max-md:py-2.5 max-md:text-[0.88rem]"
                      required
                    />
                    <p className="mt-1.5 text-[0.82rem] leading-6 text-gray-500">
                      {getMessage('contact.form.emailDescription', 'This will help us respond to your inquiry by email.')}
                    </p>
                    <ValidationError
                      prefix={getMessage('contact.form.emailError', 'Email')}
                      field="email"
                      errors={state.errors}
                      className="mt-1.5 text-sm text-red-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="mb-2 block text-[0.9rem] font-semibold text-hn-primary max-md:mb-1.5 max-md:text-[0.85rem]">
                      {intl.formatMessage({ id: 'contact.form.company' })}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full rounded-lg border border-[#d5dfeb] bg-white px-3.5 py-2.5 text-[0.92rem] text-hn-text transition-all duration-200 focus:border-hn-accent focus:outline-none focus:ring-2 focus:ring-hn-accent/20 max-md:px-3.5 max-md:py-2.5 max-md:text-[0.88rem]"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-[0.9rem] font-semibold text-hn-primary max-md:mb-1.5 max-md:text-[0.85rem]">
                      {intl.formatMessage({ id: 'contact.form.message' })}*
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="w-full resize-none rounded-lg border border-[#d5dfeb] bg-white px-3.5 py-2.5 text-[0.92rem] text-hn-text transition-all duration-200 focus:border-hn-accent focus:outline-none focus:ring-2 focus:ring-hn-accent/20 max-md:px-3.5 max-md:py-2.5 max-md:text-[0.88rem]"
                      rows={4}
                      required
                    />
                    <p className="mt-1.5 text-[0.82rem] leading-6 text-gray-500">
                      {getMessage('contact.form.messageDescription', 'Tell us what you would like to discuss.')}
                    </p>
                    <ValidationError
                      prefix={getMessage('contact.form.messageError', 'Message')}
                      field="message"
                      errors={state.errors}
                      className="mt-1.5 text-sm text-red-500"
                    />
                  </div>

                  <ValidationError
                    errors={state.errors}
                    className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-600"
                  />

                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full rounded-lg bg-hn-accent px-6 py-3 text-[0.92rem] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-hn-accent-strong hover:shadow-[0_8px_24px_rgba(13,111,184,0.3)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none max-md:px-6 max-md:py-3 max-md:text-[0.88rem]"
                  >
                    {submitLabel}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
