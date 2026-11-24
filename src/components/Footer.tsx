'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, Globe, Mail, MessageSquare, Share2 } from 'lucide-react';
import { navigation } from '@/data/catalog';
import { Container } from './LayoutPrimitives';

export function Footer() {
  const [openCol, setOpenCol] = useState<string | null>(null);
  const navGroups = navigation.filter((n) => n.children);

  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-grid">
          <div className="footer-contact-col">
            <Link href="/" aria-label="Heatnexis home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brand/heatnexis-logo.png"
                alt="Heatnexis"
                className="footer-logo-img"
                width={110}
                height={30}
                loading="lazy"
              />
            </Link>
            <div>
              <strong>Brand : </strong>Heatnexis — Heating Control OEM/ODM
            </div>
            <div>
              <strong>Address : </strong>People&apos;s Square, Huangpu District, Shanghai, China
            </div>
            <div>
              <strong>RFQ Desk : </strong>Structured project quotes via Contact Us
            </div>
            <div>
              <strong>Support : </strong>Technical datasheets &amp; sample coordination
            </div>
            <div className="footer-qr-row">
              <div className="footer-qr-box" aria-label="Heatnexis B2B Inquiry Desk">
                B2B RFQ
              </div>
              <div>
                <div>Heatnexis B2B Desk</div>
                <div>Wholesale &amp; OEM/ODM Quotes</div>
                <Link href="/contact" className="text-link" style={{ fontSize: '12px', marginTop: '4px' }}>
                  Request a Quote →
                </Link>
              </div>
            </div>
          </div>

          {navGroups.map((group) => {
            const isOpen = openCol === group.name;
            return (
              <div className={`footer-col ${isOpen ? 'is-open' : ''}`} key={group.href}>
                <h2>
                  <Link href={group.href}>{group.name}</Link>
                </h2>
                <button
                  type="button"
                  className="footer-col-toggle"
                  aria-expanded={isOpen}
                  onClick={() => setOpenCol((c) => (c === group.name ? null : group.name))}
                >
                  <span>{group.name}</span>
                  <ChevronDown
                    size={16}
                    style={{ transform: isOpen ? 'rotate(180deg)' : undefined, transition: 'transform 200ms' }}
                  />
                </button>
                <ul>
                  {group.children?.map((child) => (
                    <li key={child.href}>
                      <Link href={child.href}>{child.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-links">
            <Link href="/sitemap">Site Map</Link>
            <Link href="/legal-notice">Legal Disclaimer</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <span>Copyright © {new Date().getFullYear()} Heatnexis. All rights reserved.</span>
          </div>
          <div className="footer-socials" aria-label="Heatnexis quick links">
            <Link href="/contact" aria-label="Contact inquiry">
              <Mail size={14} />
            </Link>
            <Link href="/support/faqs" aria-label="Technical FAQs">
              <MessageSquare size={14} />
            </Link>
            <Link href="/solutions" aria-label="Global heating solutions">
              <Globe size={14} />
            </Link>
            <Link href="/sitemap" aria-label="Website sitemap">
              <Share2 size={14} />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
