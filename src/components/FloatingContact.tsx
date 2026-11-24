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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: 10,
              marginBottom: 14,
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/brand/whatsapp-qr.png"
              alt="Scan Heatnexis WhatsApp QR Code"
              width={78}
              height={78}
              style={{ borderRadius: 4, background: '#fff', flexShrink: 0 }}
            />
            <div style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--color-text-muted)' }}>
              <strong style={{ display: 'block', color: 'var(--color-title)', marginBottom: 2 }}>
                Scan WhatsApp QR
              </strong>
              Instant B2B quote &amp; OEM/ODM consultation.
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
