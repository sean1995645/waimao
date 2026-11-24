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
            Official telephone, WhatsApp and direct email credentials are awaiting brand approval. You can prepare a
            structured OEM/ODM project brief online now.
          </p>
          <Link href="/contact" className="btn-primary" style={{ width: '100%' }} onClick={() => setOpen(false)}>
            Prepare Project Inquiry →
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
