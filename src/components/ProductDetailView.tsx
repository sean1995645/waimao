'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import {
  CalendarClock,
  ChevronRight,
  Download,
  Lock,
  Mic,
  ShieldCheck,
  Smartphone,
  Snowflake,
  Sun,
  Thermometer,
  X,
  ZoomIn,
} from 'lucide-react';
import { products } from '@/data/catalog';
import type { ProductRecord } from '@/types/content';
import { InquiryForm } from './InquiryForm';
import { Container, SectionTitle } from './LayoutPrimitives';
import { ProductCard } from './ProductsCatalog';
import { FAQAccordion } from './SupportSections';

export function ProductGallery({
  name,
  images,
}: {
  name: string;
  images: string[];
}) {
  const [viewIndex, setViewIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const views = ['Front', 'Back', 'Dimensions', 'Wiring'];
  const currentImg = images[viewIndex] || images[0] || '/images/products/prod-white-1.png';

  return (
    <div className="gallery">
      <button
        ref={triggerRef}
        type="button"
        className="gallery-main"
        aria-label="Enlarge product image"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
      >
        <div className="gallery-main-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={currentImg} alt={`${name} — ${views[viewIndex]}`} className="img-contain" />
        </div>
        <span className="sr-only">{['PRODUCT IMAGE', 'REAR VIEW', 'DIMENSION DRAWING', 'WIRING DIAGRAM'][viewIndex]}</span>
        <span className="zoom-icon" aria-hidden="true">
          <ZoomIn size={16} />
        </span>
      </button>

      <div className="thumbnails">
        {views.map((view, idx) => (
          <button
            type="button"
            key={view}
            aria-pressed={viewIndex === idx}
            onClick={() => setViewIndex(idx)}
          >
            {view}
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="image-dialog"
        aria-label="Product image preview"
        onClose={() => triggerRef.current?.focus()}
        onKeyDown={(e) => {
          if (e.key !== 'Tab') return;
          const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
          );
          if (!focusables || !focusables.length) return;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <strong>
            {name} — {views[viewIndex]}
          </strong>
          <button
            type="button"
            autoFocus
            className="image-dialog-close"
            aria-label="Close preview"
            onClick={() => dialogRef.current?.close()}
          >
            <X size={20} />
          </button>
        </div>
        <div style={{ aspectRatio: '4 / 3', width: '100%' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={currentImg} alt={`${name} — ${views[viewIndex]}`} className="img-contain" />
        </div>
      </dialog>
    </div>
  );
}

export function SpecificationsTable({ rows }: { rows: [string, string][] }) {
  return (
    <table className="spec-table">
      <caption>Technical parameters — model-specific values confirmed in your project datasheet</caption>
      <tbody>
        {rows.map(([k, v]) => (
          <tr key={k}>
            <th scope="row">{k}</th>
            <td>{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ProductDownload({ productName }: { productName?: string }) {
  return (
    <div className="download-rows">
      {[
        { title: `${productName || 'Product'} — Technical Datasheet (PDF)`, desc: 'Full electrical specs & dimensions supplied via B2B desk' },
        { title: `${productName || 'Product'} — Installation & Wiring Manual (PDF)`, desc: 'Model-matched wiring schematic & installer guide' },
        { title: `${productName || 'Product'} — Compliance & Declaration Pack`, desc: 'Target-market compliance documents supplied on request' },
      ].map((doc) => (
        <div className="download-row" key={doc.title}>
          <h3>{doc.title}</h3>
          <p>{doc.desc}</p>
          <Link href="/contact" className="btn-dark">
            <Download size={14} aria-hidden="true" />
            <span>Request File</span>
          </Link>
        </div>
      ))}
    </div>
  );
}

export function ProductDetailView({ product }: { product: ProductRecord }) {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Specifications' | 'Downloads'>('Overview');
  const tabs: ('Overview' | 'Specifications' | 'Downloads')[] = ['Overview', 'Specifications', 'Downloads'];
  const related = products.filter((x) => x.slug !== product.slug).slice(0, 3);

  const featureIcons = [
    { icon: Smartphone, label: 'Mobile App Control' },
    { icon: Mic, label: 'Voice Ecosystem Ready' },
    { icon: Thermometer, label: 'Precision Sensing' },
    { icon: Snowflake, label: 'Frost Protection' },
    { icon: Lock, label: 'Child / Keypad Lock' },
    { icon: Sun, label: 'Custom Backlight' },
    { icon: CalendarClock, label: 'Weekly Programming' },
    { icon: ShieldCheck, label: 'OEM Quality Control' },
  ];

  return (
    <>
      {/* Product Detail Banner (Measured 412px @ 1440, 2-col Intro + Gallery) */}
      <section className="product-detail-hero">
        <Container>
          <div className="product-intro">
            <div className="product-intro-copy">
              <span className="article-tag" style={{ marginBottom: 12 }}>{product.reference} · {product.application}</span>
              <h1>{product.name}</h1>
              <p>{product.description}</p>
              <p className="notice-box">{product.status}</p>
              <div className="product-intro-actions">
                <a href="#inquiry" className="btn-outline">
                  <span>Request Sample</span>
                  <ChevronRight size={14} aria-hidden="true" />
                </a>
                <a href="#inquiry" className="btn-primary">
                  <span>Request B2B Quote</span>
                  <ChevronRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>

            <ProductGallery name={product.name} images={product.gallery} />
          </div>
        </Container>
      </section>

      {/* Sticky Follow Nav (Measured 52px bar) */}
      <div className="follow-nav-bar">
        <Container>
          <div className="follow-nav-inner" role="tablist" aria-label="Product information">
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab}
                role="tab"
                id={`tab-${tab}`}
                className="follow-nav-tab"
                aria-selected={activeTab === tab}
                aria-controls="product-panel"
                tabIndex={activeTab === tab ? 0 : -1}
                onKeyDown={(e) => {
                  const idx = tabs.indexOf(tab);
                  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const nextTab = tabs[(idx + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
                    setActiveTab(nextTab);
                    document.getElementById(`tab-${nextTab}`)?.focus();
                  }
                }}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
            <a href="#inquiry" className="follow-nav-tab">
              Inquiry
            </a>
          </div>
        </Container>
      </div>

      {/* Main Tab Panel */}
      <section className="section-block">
        <Container>
          <div role="tabpanel" id="product-panel" aria-labelledby={`tab-${activeTab}`} tabIndex={0}>
            {activeTab === 'Overview' && (
              <>
                <SectionTitle
                  title="Highlights at a glance"
                  subtitle={`Core capabilities for ${product.name}. Final commercial specifications are confirmed per your target region and OEM/ODM brief.`}
                />
                <div className="prose" style={{ marginBottom: 32 }}>
                  <ul>
                    {product.highlights.map((item) => (
                      <li key={item}>
                        <strong>{item}:</strong> Configurable during OEM/ODM engineering scoping and confirmed in the
                        approved product specification.
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="highlights-icon-grid">
                  {featureIcons.map(({ icon: Icon, label }) => (
                    <div className="highlight-icon-item" key={label}>
                      <Icon size={24} aria-hidden="true" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 56 }}>
                  <SectionTitle
                    title="Thermostat & Commissioning Workflow"
                    subtitle="Illustrative B2B onboarding workflow (confirm exact model steps in the verified user manual)."
                  />
                  <div className="setup-steps-grid">
                    {[
                      ['01', 'Verify Heating Interface', 'Confirm supply voltage, relay load type and sensor resistance against the official wiring schematic.'],
                      ['02', 'Mount Wall Plate / Receiver', 'Install inside the target regional back-box or boiler receiver location following local electrical codes.'],
                      ['03', 'Pair Wireless / App Control', 'Follow the approved quick-start pairing guide for WiFi, Zigbee gateway or RF receiver models.'],
                      ['04', 'Configure Schedules & Limits', 'Set daily comfort periods, frost protection and keypad lock policies before handover.'],
                    ].map(([num, heading, text]) => (
                      <div className="setup-step-card" key={num}>
                        <span className="setup-step-num">{num}</span>
                        <div>
                          <h3 style={{ margin: '0 0 6px', fontSize: 16 }}>{heading}</h3>
                          <p style={{ margin: 0, fontSize: 13.5 }}>{text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'Specifications' && (
              <>
                <SectionTitle
                  title="Technical Specifications"
                  subtitle={`Reference Series: ${product.reference} — Request the signed engineering datasheet for your target region.`}
                />
                <SpecificationsTable rows={product.specifications} />
              </>
            )}

            {activeTab === 'Downloads' && (
              <>
                <SectionTitle
                  title="Product Documentation & Downloads"
                  subtitle="Approved PDFs, wiring diagrams and certification files will be linked directly once supplied."
                />
                <ProductDownload productName={product.name} />
              </>
            )}
          </div>
        </Container>
      </section>

      {/* Product FAQ */}
      <section className="section-block is-surface">
        <Container>
          <SectionTitle title="FAQ" subtitle="Common technical and sourcing questions for Heatnexis products." />
          <FAQAccordion limit={4} showTabs={false} />
        </Container>
      </section>

      {/* Product Inquiry */}
      <section id="inquiry" className="inquiry-backdrop-band">
        <Container>
          <div className="inquiry-card">
            <InquiryForm product={product.name} title="Product Inquiry" />
          </div>
        </Container>
      </section>

      {/* Related Products */}
      <section className="section-block">
        <Container>
          <SectionTitle title="Related Products" subtitle="Explore complementary Heatnexis heating control categories." />
          <div className="product-grid">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
