'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Download } from 'lucide-react';
import { categories } from '@/data/catalog';

export function InquiryForm({ product, title = 'Service Inquiry' }: { product?: string; title?: string }) {
  const [status, setStatus] = useState('');
  const [draftText, setDraftText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const body = [
      'BEOK Controls — B2B Project Inquiry Draft',
      `Company: ${d.get('company') || ''}`,
      `Name: ${d.get('name') || ''}`,
      `Business Email: ${d.get('email') || ''}`,
      `Phone / WhatsApp: ${d.get('phone') || 'Not provided'}`,
      `Country / Market: ${d.get('market') || ''}`,
      `Product / Project: ${d.get('product') || ''}`,
      '',
      'Project Requirements:',
      String(d.get('message') || ''),
    ].join('\n');

    setSubmitting(true);
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: d.get('name'),
          email: d.get('email'),
          company: d.get('company'),
        }),
      });
      if (!res.ok) {
        setDraftText(body);
        setStatus(
          'Your inquiry draft is ready to download. It has not been sent: live inquiry delivery is not configured on this preview (HTTP 503).',
        );
      }
    } catch {
      setDraftText(body);
      setStatus(
        'Your inquiry draft is ready to download. It has not been sent: live inquiry delivery is not configured.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <div className="inquiry-form-head">
        <h2>{title}</h2>
        <p>Prepare your sourcing, distribution or OEM/ODM customization requirements for BEOK Controls.</p>
      </div>

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

      <label>
        Interested Product / Project
        <input
          name="product"
          list="beok-product-categories"
          defaultValue={product || ''}
          maxLength={200}
          placeholder="Select or enter a product line or OEM/ODM project"
        />
        <datalist id="beok-product-categories">
          {categories.map((c) => (
            <option key={c.slug} value={c.name} />
          ))}
          <option value="OEM/ODM Custom Thermostat Development" />
        </datalist>
      </label>

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
        Online email/CRM delivery is not configured yet. Submitting prepares a verified local inquiry draft only and
        never claims a message was transmitted.
      </p>

      <div className="inquiry-submit-wrap">
        <button className="btn-primary" type="submit" disabled={submitting}>
          {submitting ? 'Preparing...' : 'Prepare Inquiry'}
        </button>
      </div>

      {status && (
        <div role="status" className="notice-box" style={{ marginTop: 6 }}>
          <p style={{ margin: '0 0 10px', fontWeight: 600 }}>{status}</p>
          {draftText && (
            <button
              type="button"
              className="text-link"
              onClick={() => {
                const url = URL.createObjectURL(new Blob([draftText], { type: 'text/plain' }));
                const a = document.createElement('a');
                a.href = url;
                a.download = 'beok-controls-project-inquiry.txt';
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              <Download size={16} />
              <span>Download inquiry draft (.txt)</span>
            </button>
          )}
        </div>
      )}
    </form>
  );
}
