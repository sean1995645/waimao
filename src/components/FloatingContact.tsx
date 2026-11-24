'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUp, Headphones, X } from 'lucide-react';

export function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <aside className="aside-module" aria-label="Quick contact and navigation controls">
      {open && (
        <div className="contact-popover" role="region" aria-label="Heatnexis quick inquiry">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <h3 style={{ margin: 0 }}>Contact Heatnexis</h3>
            <button type="button" aria-label="Close contact panel" onClick={() => setOpen(false)}>
              <X size={16} />
            </button>
          </div>
          <p>
            Looking for wholesale pricing, sample evaluation, or OEM/ODM thermostat customization? Reach us directly or
            prepare a B2B brief online.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14, fontSize: 13 }}>
            <div>
              <strong>WhatsApp:</strong>{' '}
              <a
                href="https://wa.me/8617301760334"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
                style={{ fontSize: 13 }}
              >
                +86 173 0176 0334
              </a>
            </div>
            <div>
              <strong>Email:</strong>{' '}
              <a href="mailto:sean.org.cn@gmail.com" className="text-link" style={{ fontSize: 13 }}>
                sean.org.cn@gmail.com
              </a>
            </div>
          </div>
          <Link href="/contact" className="btn-primary" style={{ width: '100%' }} onClick={() => setOpen(false)}>
            Request B2B Quote →
          </Link>
        </div>
      )}

      <button
        type="button"
        className="aside-contact-btn"
        aria-label="Contact options"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Headphones size={16} aria-hidden="true" />
        <span className="aside-contact-label">Contact Us</span>
      </button>

      <button
        type="button"
        className="aside-top-btn"
        aria-label="Back to top"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
          })
        }
      >
        <ArrowUp size={18} aria-hidden="true" />
      </button>
    </aside>
  );
}
