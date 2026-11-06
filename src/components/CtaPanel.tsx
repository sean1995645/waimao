import React from 'react';
import { Icon, PillLink } from './UI';

interface CtaPanelProps {
  image: string;
  imageMobile?: string;
  eyebrow: string;
  title: string;
  text?: string;
  button: string;
  stats?: Array<{ value: string; label: string }>;
}

/** Closing call to action: rounded photo panel with contact details in the corner. */
const CtaPanel: React.FC<CtaPanelProps> = ({ image, imageMobile, eyebrow, title, text, button, stats }) => (
  <section className="hn-container pb-16 md:pb-24">
    <div className="relative isolate flex min-h-[520px] flex-col justify-between gap-20 overflow-hidden rounded-hn-lg bg-hn-surface p-6 md:min-h-[560px] md:p-10">
      <picture>
        {imageMobile && <source media="(max-width: 767px)" srcSet={imageMobile} />}
        <img src={image} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      </picture>
      <div aria-hidden="true" className="hn-scrim-light absolute inset-0 -z-10" />

      <div className="flex flex-wrap justify-end gap-2">
        <a href="mailto:sales@heatnexis.com" className="hn-tag min-h-11 border-transparent px-4 text-sm hover:border-hn-ink">
          <Icon name="mail" size="1.125rem" />
          sales@heatnexis.com
        </a>
        <a href="tel:+8613800102400" className="hn-tag min-h-11 border-transparent px-4 text-sm hover:border-hn-ink">
          <Icon name="phone" size="1.125rem" />
          <span dir="ltr">+86 138 0010 2400</span>
        </a>
      </div>

      <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="hn-eyebrow mb-4">{eyebrow}</p>
          <h2 className="hn-h2">{title}</h2>
          {text && <p className="mt-4 text-base leading-7 text-hn-ink-2">{text}</p>}
          {stats && (
            <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
              {stats.map(({ value, label }) => (
                <div key={label} className="flex flex-col-reverse justify-end">
                  <dt className="mt-1 text-sm leading-5 text-hn-ink-2">{label}</dt>
                  <dd className="whitespace-nowrap text-2xl font-medium tracking-[-0.02em] text-hn-ink">{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        <PillLink to="/contact" className="flex-none">
          {button}
        </PillLink>
      </div>
    </div>
  </section>
);

export default CtaPanel;
