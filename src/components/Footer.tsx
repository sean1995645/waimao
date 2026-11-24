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
            <div>
              <strong>Brand : </strong>BEOK Controls — Heating Control OEM/ODM
            </div>
            <div>
              <strong>Address : </strong>Official factory &amp; office address pending brand approval
            </div>
            <div>
              <strong>Email : </strong>Commercial email address pending verification
            </div>
            <div>
              <strong>Tel : </strong>Business telephone pending verification
            </div>
            <div className="footer-qr-row">
              <div className="footer-qr-box" aria-label="Official contact QR code placeholder">
                QR PENDING
              </div>
              <div>
                <div>BEOK Controls</div>
                <div>Official channel QR pending</div>
                <Link href="/contact" className="text-link" style={{ fontSize: '12px', marginTop: '4px' }}>
                  Prepare Inquiry →
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
            <span>Copyright © {new Date().getFullYear()} BEOK Controls. Development preview.</span>
          </div>
          <div className="footer-socials" aria-label="BEOK Controls quick links">
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
