'use client';

import Link from 'next/link';
import { useState, useSyncExternalStore } from 'react';
import { Check, Copy, Download, Mail, MessageSquare, X } from 'lucide-react';
import { site } from '@/config/site';
import { categories } from '@/data/catalog';
import { useB2BShortlist } from './B2BShortlist';

function subscribeUrlSearch(cb: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('popstate', cb);
  return () => window.removeEventListener('popstate', cb);
}

function getUrlSearchSnapshot(): string {
  return typeof window === 'undefined' ? '' : window.location.search;
}

function getServerSearchSnapshot(): string {
  return '';
}

function resolveInquiryType(raw: string | null): string {
  if (!raw) return 'Wholesale / Distribution';
  const key = raw.toLowerCase();
  if (key.includes('oem')) return 'OEM Private Label';
  if (key.includes('odm')) return 'Custom ODM Development';
  if (key.includes('sample') || key.includes('datasheet')) return 'Sample & Datasheet Request';
  if (key.includes('support') || key.includes('tech')) return 'Technical / Engineering Support';
  return 'Wholesale / Distribution';
}

export function InquiryForm({ product, title = 'Service Inquiry' }: { product?: string; title?: string }) {
  const [status, setStatus] = useState('');
  const [draftText, setDraftText] = useState('');
  const [draftSubject, setDraftSubject] = useState('Heatnexis — B2B Project Inquiry');
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { shortlistProducts, removeFromShortlist, clearShortlist } = useB2BShortlist();
  const urlSearch = useSyncExternalStore(subscribeUrlSearch, getUrlSearchSnapshot, getServerSearchSnapshot);
  const params = new URLSearchParams(urlSearch);
  const initialType = resolveInquiryType(params.get('type'));
  const urlProduct = params.get('product') || '';

  const shortlistedSummary =
    shortlistProducts.length > 0
      ? shortlistProducts.map((p) => `${p.name} (${p.reference})`).join(', ')
      : '';

  const defaultProductValue = product || urlProduct || shortlistedSummary || '';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const companyName = String(d.get('company') || '').trim();
    const inquiryType = String(d.get('inquiryType') || 'Wholesale / OEM / ODM');
    const selectedProducts =
      shortlistProducts.length > 0
        ? shortlistProducts.map((p) => `- ${p.name} [${p.reference}] (${p.application})`).join('\n')
        : '';

    const subject = `Heatnexis B2B RFQ — ${companyName || 'Partner'} (${inquiryType})`;
    const body = [
      'Heatnexis — B2B Project Inquiry Draft',
      '======================================',
      `Company: ${companyName}`,
      `Name: ${d.get('name') || ''}`,
      `Business Email: ${d.get('email') || ''}`,
      `Phone / WhatsApp: ${d.get('phone') || 'Not provided'}`,
      `Country / Market: ${d.get('market') || ''}`,
      `Inquiry Type: ${inquiryType}`,
      `Project Stage / Scope: ${d.get('orderScope') || 'Sample Evaluation'}`,
      `Regional Wall-Box / Standard: ${d.get('regionalStandard') || 'EU 86mm Wall-Box (230V)'}`,
      `Primary Product / Project: ${d.get('product') || defaultProductValue || 'General Thermostat Lineup'}`,
      ...(selectedProducts ? ['', 'Shortlisted RFQ Models:', selectedProducts] : []),
      '',
      'Project Requirements:',
      String(d.get('message') || ''),
    ].join('\n');

    setSubmitting(true);
    setCopied(false);
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: d.get('name'),
          email: d.get('email'),
          company: companyName,
        }),
      });
      if (!res.ok) {
        setDraftSubject(subject);
        setDraftText(body);
        setStatus(
          'Your inquiry draft is ready to download. It has not been sent: live inquiry delivery is not configured on this preview (HTTP 503).',
        );
      }
    } catch {
      setDraftSubject(subject);
      setDraftText(body);
      setStatus(
        'Your inquiry draft is ready to download. It has not been sent: live inquiry delivery is not configured.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappDraftUrl = draftText
    ? `${site.contact.whatsappUrl}?text=${encodeURIComponent(draftText)}`
    : site.contact.whatsappUrl;

  const mailtoDraftUrl = draftText
    ? `mailto:${site.contact.email}?subject=${encodeURIComponent(draftSubject)}&body=${encodeURIComponent(draftText)}`
    : `mailto:${site.contact.email}`;

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <div className="inquiry-form-head">
        <span className="section-eyebrow">STRUCTURED B2B RFQ BUILDER</span>
        <h2>{title}</h2>
        <p>Prepare your sourcing, distribution or OEM/ODM customization requirements for Heatnexis.</p>
      </div>

      {shortlistProducts.length > 0 && (
        <div className="inquiry-shortlist-box">
          <div className="inquiry-shortlist-head">
            <strong>Attached RFQ Shortlist ({shortlistProducts.length})</strong>
            <button type="button" className="inquiry-shortlist-clear" onClick={clearShortlist}>
              Clear all
            </button>
          </div>
          <div className="inquiry-shortlist-chips">
            {shortlistProducts.map((item) => (
              <span className="inquiry-shortlist-chip" key={item.slug}>
                <span>
                  {item.name} <em>({item.reference})</em>
                </span>
                <button
                  type="button"
                  aria-label={`Remove ${item.name} from RFQ`}
                  onClick={() => removeFromShortlist(item.slug)}
                >
                  <X size={13} aria-hidden="true" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <label>
        Company *
        <input name="company" required autoComplete="organization" maxLength={150} placeholder="Corporate Name" />
      </label>

      <div className="form-grid">
        <label>
          Name *
          <input name="name" required autoComplete="name" maxLength={100} placeholder="Your full name" />
        </label>
        <label>
          Business email *
          <input name="email" type="email" required autoComplete="email" maxLength={150} placeholder="name@company.com" />
        </label>
        <label>
          Country / Market *
          <input name="market" required maxLength={100} placeholder="e.g. Germany, UK, EU, North America" />
        </label>
        <label>
          Phone / WhatsApp
          <input name="phone" type="tel" maxLength={60} placeholder="Optional contact number" />
        </label>
      </div>

      <div className="form-grid">
        <label>
          Inquiry Type
          <select name="inquiryType" key={initialType} defaultValue={initialType}>
            <option value="Wholesale / Distribution">Wholesale / Distribution</option>
            <option value="OEM Private Label">OEM Private Label</option>
            <option value="Custom ODM Development">Custom ODM Development</option>
            <option value="Sample & Datasheet Request">Sample &amp; Datasheet Request</option>
            <option value="Technical / Engineering Support">Technical / Engineering Support</option>
          </select>
        </label>
        <label>
          Interested Product / Project
          <input
            name="product"
            list="heatnexis-product-categories"
            key={defaultProductValue}
            defaultValue={defaultProductValue}
            maxLength={300}
            placeholder="Select or enter a product line or OEM/ODM project"
          />
          <datalist id="heatnexis-product-categories">
            {categories.map((c) => (
              <option key={c.slug} value={c.name} />
            ))}
            <option value="OEM/ODM Custom Thermostat Development" />
          </datalist>
        </label>
      </div>

      <div className="form-grid">
        <label>
          Order Scope / Project Stage
          <select name="orderScope" defaultValue="Sample Evaluation">
            <option value="Sample Evaluation">Sample Evaluation &amp; Testing</option>
            <option value="Pilot / Trial Batch">Pilot / Trial Batch Order</option>
            <option value="Wholesale Distribution">Wholesale Channel Distribution</option>
            <option value="Annual OEM/ODM Program">Annual OEM / ODM Brand Program</option>
          </select>
        </label>
        <label>
          Target Regional Standard
          <select name="regionalStandard" defaultValue="EU 86mm Wall-Box (230V)">
            <option value="EU 86mm Wall-Box (230V)">EU 86mm Round / Square (230V)</option>
            <option value="UK Back-Box Standard">UK Standard Back-Box</option>
            <option value="North America (120V / 24VAC)">North America (120V / 24VAC)</option>
            <option value="Global / Multi-Region">Global / Multi-Region Portfolio</option>
            <option value="To Be Confirmed">To Be Confirmed with Engineer</option>
          </select>
        </label>
      </div>

      <label>
        Project requirements *
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          placeholder="Share heating system type, target voltage/market, connectivity needs and estimated project scope..."
        />
      </label>

      <label className="consent">
        <input type="checkbox" required />
        <span>
          I have read the <Link href="/privacy">privacy notice</Link>. *
        </span>
      </label>

      <p className="notice-box">
        Online email/CRM delivery is not configured yet. Submitting prepares a verified local inquiry draft (ready to
        download or hand off via WhatsApp/Email) and never claims a message was automatically transmitted.
      </p>

      <div className="inquiry-submit-wrap">
        <button className="btn-primary" type="submit" disabled={submitting}>
          {submitting ? 'Preparing...' : 'Prepare Inquiry'}
        </button>
      </div>

      {status && (
        <div role="status" className="notice-box inquiry-draft-result" style={{ marginTop: 6 }}>
          <p style={{ margin: '0 0 12px', fontWeight: 600 }}>{status}</p>
          {draftText && (
            <div className="inquiry-handoff-actions">
              <a
                href={whatsappDraftUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inquiry-handoff-btn"
              >
                <MessageSquare size={15} aria-hidden="true" />
                <span>Send Draft via WhatsApp</span>
              </a>

              <a href={mailtoDraftUrl} className="btn-dark inquiry-handoff-btn">
                <Mail size={15} aria-hidden="true" />
                <span>Open in Email Client</span>
              </a>

              <button
                type="button"
                className="btn-outline inquiry-handoff-btn"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(draftText);
                    setCopied(true);
                  } catch {
                    setCopied(false);
                  }
                }}
              >
                {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                <span>{copied ? 'Copied Brief' : 'Copy RFQ Brief'}</span>
              </button>

              <button
                type="button"
                className="btn-outline inquiry-handoff-btn"
                onClick={() => {
                  const url = URL.createObjectURL(new Blob([draftText], { type: 'text/plain' }));
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'heatnexis-project-inquiry.txt';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                <Download size={15} aria-hidden="true" />
                <span>Download (.txt)</span>
              </button>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
