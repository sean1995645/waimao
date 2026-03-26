import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import PageHero from '@/components/PageHero';

const ContactPage: React.FC = () => {
  const intl = useIntl();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'name' || name === 'email') {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrors((prev) => ({
        ...prev,
        name: intl.formatMessage({
          id: 'contact.form.nameRequired',
          defaultMessage: 'Name is required',
        }),
      }));
      return;
    }

    if (!formData.email) {
      setErrors((prev) => ({
        ...prev,
        email: intl.formatMessage({
          id: 'contact.form.emailRequired',
          defaultMessage: 'Email is required',
        }),
      }));
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrors((prev) => ({
        ...prev,
        email: intl.formatMessage({
          id: 'contact.form.emailInvalid',
          defaultMessage: 'Please enter a valid email address',
        }),
      }));
      return;
    }

    // Handle form submission
    console.log('Form submitted:', formData);
  };

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

      <section className="py-24 max-md:py-8 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 max-md:px-4">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-12">
            <div>
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] max-md:text-[1.5rem] font-bold text-hn-primary mb-6 max-md:mb-3 tracking-[-0.02em]">{intl.formatMessage({ id: 'contact.form.title' })}</h2>
              <p className="text-[1.125rem] max-md:text-[0.95rem] text-gray-600 leading-[1.8] max-md:leading-[1.7] mb-10 max-md:mb-5">
                {intl.formatMessage({ id: 'contact.form.description' })}
              </p>

              <div className="flex flex-col gap-6 max-md:gap-3">
                <div className="flex gap-4 max-md:gap-3 items-start">
                  <div className="w-12 h-12 max-md:w-11 max-md:h-11 rounded-xl max-md:rounded-lg bg-gradient-to-br from-hn-surface to-white border border-gray-100 flex items-center justify-center flex-shrink-0 text-hn-accent shadow-sm">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="max-md:w-5 max-md:h-5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[1rem] max-md:text-[0.9rem] font-semibold text-hn-primary mb-1">{intl.formatMessage({ id: 'contact.form.email' })}</h3>
                    <p className="text-[0.95rem] max-md:text-[0.85rem] text-gray-600">sales@heatnexis.com</p>
                  </div>
                </div>

                <div className="flex gap-4 max-md:gap-3 items-start">
                  <div className="w-12 h-12 max-md:w-11 max-md:h-11 rounded-xl max-md:rounded-lg bg-gradient-to-br from-hn-surface to-white border border-gray-100 flex items-center justify-center flex-shrink-0 text-hn-accent shadow-sm">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="max-md:w-5 max-md:h-5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[1rem] max-md:text-[0.9rem] font-semibold text-hn-primary mb-1">{intl.formatMessage({ id: 'contact.form.phone' })}</h3>
                    <p className="text-[0.95rem] max-md:text-[0.85rem] text-gray-600">+86 138 0010 2400</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full max-w-[440px] justify-self-start lg:justify-self-end rounded-2xl border border-gray-100 bg-gradient-to-br from-hn-surface to-white p-6 shadow-sm max-md:rounded-xl max-md:p-5">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-md:gap-3.5">
                <div>
                  <label htmlFor="name" className="block text-[0.9rem] max-md:text-[0.85rem] font-semibold text-hn-primary mb-2 max-md:mb-1.5">{intl.formatMessage({ id: 'contact.form.name' })}*</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-[0.92rem] text-hn-text transition-all duration-200 focus:outline-none max-md:px-3.5 max-md:py-2.5 max-md:text-[0.88rem] ${
                      errors.name ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-[#d5dfeb] focus:border-hn-accent focus:ring-2 focus:ring-hn-accent/20'
                    }`}
                    required
                  />
                  {errors.name && (
                    <p className="mt-1.5 flex items-center gap-1 text-sm text-red-500">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-[0.9rem] max-md:text-[0.85rem] font-semibold text-hn-primary mb-2 max-md:mb-1.5">{intl.formatMessage({ id: 'contact.form.email' })}*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-[0.92rem] text-hn-text transition-all duration-200 focus:outline-none max-md:px-3.5 max-md:py-2.5 max-md:text-[0.88rem] ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-[#d5dfeb] focus:border-hn-accent focus:ring-2 focus:ring-hn-accent/20'}`}
                    required
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="company" className="block text-[0.9rem] max-md:text-[0.85rem] font-semibold text-hn-primary mb-2 max-md:mb-1.5">{intl.formatMessage({ id: 'contact.form.company' })}</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#d5dfeb] bg-white px-3.5 py-2.5 text-[0.92rem] text-hn-text transition-all duration-200 focus:outline-none focus:border-hn-accent focus:ring-2 focus:ring-hn-accent/20 max-md:px-3.5 max-md:py-2.5 max-md:text-[0.88rem]"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[0.9rem] max-md:text-[0.85rem] font-semibold text-hn-primary mb-2 max-md:mb-1.5">{intl.formatMessage({ id: 'contact.form.message' })}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full resize-none rounded-lg border border-[#d5dfeb] bg-white px-3.5 py-2.5 text-[0.92rem] text-hn-text transition-all duration-200 focus:outline-none focus:border-hn-accent focus:ring-2 focus:ring-hn-accent/20 max-md:px-3.5 max-md:py-2.5 max-md:text-[0.88rem]"
                    rows={4}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-hn-accent px-6 py-3 text-[0.92rem] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-hn-accent-strong hover:shadow-[0_8px_24px_rgba(13,111,184,0.3)] max-md:px-6 max-md:py-3 max-md:text-[0.88rem]"
                >
                  {intl.formatMessage({ id: 'contact.form.submit' })}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
