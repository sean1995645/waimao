'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { ChevronDown, ChevronRight, Download, FileText, HelpCircle, Play, ShieldCheck, Video, X } from 'lucide-react';
import { categories, downloads, faqs, videos } from '@/data/catalog';
import type { VideoItem } from '@/types/content';
import { Container, SectionTitle } from './LayoutPrimitives';

export function FAQAccordion({ limit, showTabs = true }: { limit?: number; showTabs?: boolean }) {
  const faqCats = ['All', ...Array.from(new Set(faqs.map((f) => f.category)))];
  const [selectedCat, setSelectedCat] = useState('All');

  const items = (selectedCat === 'All' ? faqs : faqs.filter((f) => f.category === selectedCat)).slice(
    0,
    limit || faqs.length,
  );

  return (
    <div>
      {showTabs && (
        <div className="pill-tab-bar" role="group" aria-label="FAQ categories">
          {faqCats.map((cat) => (
            <button
              type="button"
              key={cat}
              className="pill-tab-btn"
              aria-pressed={selectedCat === cat}
              onClick={() => setSelectedCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="faq-list">
        {items.map((item) => (
          <details key={item.question}>
            <summary>
              <span className="faq-q-left">
                <span className="faq-q-badge" aria-hidden="true">
                  Q
                </span>
                <span>{item.question}</span>
              </span>
              <ChevronDown size={18} className="faq-chevron" aria-hidden="true" />
            </summary>
            <p className="faq-answer">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

export function DownloadsDirectory() {
  const [catFilter, setCatFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = downloads.filter(
    (d) => (catFilter === 'all' || d.category === catFilter) && (typeFilter === 'all' || d.type === typeFilter),
  );

  return (
    <section className="section-block">
      <Container>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ margin: '0 0 8px' }}>Technical Documentation &amp; Downloads</h2>
          <p style={{ margin: 0, color: '#666' }}>
            Filter by Heatnexis product category and document type to request model-matched user manuals, technical
            datasheets and wiring schematics from our B2B engineering desk.
          </p>
        </div>

        <div className="download-filters">
          <label className="sr-only" htmlFor="dl-cat">
            Filter by product category
          </label>
          <select id="dl-cat" value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
            <option value="all">All Product Categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <label className="sr-only" htmlFor="dl-type">
            Filter by document type
          </label>
          <select id="dl-type" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="all">All Document Types</option>
            <option value="Manual">User Manual</option>
            <option value="Datasheet">Technical Datasheet</option>
            <option value="Wiring Guide">Wiring Guide</option>
          </select>
        </div>

        <div className="download-rows">
          {filtered.map((item) => (
            <div className="download-row" key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.languages}</p>
              <Link href="/contact" className="btn-dark">
                <span>Request Verified PDF</span>
                <Download size={14} aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function VideosLibrary() {
  const tabs: ('ALL' | VideoItem['category'])[] = ['ALL', 'Product Showcase', 'Installation & Wiring', 'Technical Guides'];
  const [activeTab, setActiveTab] = useState<'ALL' | VideoItem['category']>('ALL');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const groups =
    activeTab === 'ALL'
      ? (['Product Showcase', 'Installation & Wiring', 'Technical Guides'] as const)
      : [activeTab];

  return (
    <section className="section-block">
      <Container>
        <SectionTitle
          title="Videos"
          subtitle="Product hardware overviews, installation wiring guides and OEM/ODM workflow walkthroughs for B2B partners."
        />

        <div className="pill-tab-bar" role="group" aria-label="Video categories">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab}
              className="pill-tab-btn"
              aria-pressed={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {groups.map((group) => {
          const items = videos.filter((v) => v.category === group);
          return (
            <div key={group} style={{ marginTop: 36 }}>
              <h3 style={{ fontSize: 20, margin: '0 0 18px' }}>{group}</h3>
              <div className="video-grid">
                {items.map((vid) => (
                  <button
                    type="button"
                    key={vid.id}
                    className="video-card"
                    onClick={() => {
                      setSelectedVideo(vid);
                      dialogRef.current?.showModal();
                    }}
                  >
                    <div className="video-thumb">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={vid.image} alt={vid.title} className="img-cover" loading="lazy" />
                      <span className="video-play-badge" aria-hidden="true">
                        <Play size={18} />
                      </span>
                    </div>
                    <div className="video-card-body">
                      <h3>{vid.title}</h3>
                      <span>{vid.duration}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        <dialog
          ref={dialogRef}
          className="image-dialog"
          aria-label="Video preview status"
          onClose={() => setSelectedVideo(null)}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <strong>{selectedVideo?.title || 'Heatnexis Video'}</strong>
            <button
              type="button"
              autoFocus
              className="image-dialog-close"
              aria-label="Close video dialog"
              onClick={() => dialogRef.current?.close()}
            >
              <X size={20} />
            </button>
          </div>
          <div className="notice-box" style={{ marginBottom: 16 }}>
            On-demand video playback for this model is supplied directly by our B2B technical desk upon request.
          </div>
          <Link href="/contact" className="btn-primary" onClick={() => dialogRef.current?.close()}>
            Request Live Demo or Video File →
          </Link>
        </dialog>
      </Container>
    </section>
  );
}

export function SupportOverviewView() {
  const cards = [
    {
      icon: Video,
      title: 'Videos',
      desc: 'Hardware overviews, wireless pairing walkthroughs and installation wiring guides.',
      href: '/support/videos',
    },
    {
      icon: HelpCircle,
      title: 'Thermostat FAQs',
      desc: 'Answers covering OEM/ODM scoping, heating compatibility, documentation and inquiry workflow.',
      href: '/support/faqs',
    },
    {
      icon: FileText,
      title: 'Downloads',
      desc: 'Filterable directory of user manuals, technical datasheets and wiring schematics.',
      href: '/support/downloads',
    },
    {
      icon: ShieldCheck,
      title: 'Terms of Service',
      desc: 'Website preview terms and legal notice status pending final commercial approval.',
      href: '/support/terms',
    },
  ];

  return (
    <>
      <section className="section-block">
        <Container>
          <SectionTitle
            title="Technical Support & Documentation Hub"
            subtitle="Structured after-sales and pre-sales engineering resources for Heatnexis distributors and HVAC installers."
          />
          <div className="qa-grid">
            {cards.map(({ icon: Icon, title, desc, href }) => (
              <Link href={href} key={href} className="qa-card">
                <Icon size={26} aria-hidden="true" />
                <div>
                  <h3>{title}</h3>
                  <p style={{ marginBottom: 10 }}>{desc}</p>
                  <span className="text-link">
                    <span>Explore {title}</span>
                    <ChevronRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-block is-surface">
        <Container>
          <SectionTitle
            title="Service Purpose"
            subtitle="Helping international heating partners confirm electrical compatibility, documentation and OEM deliverables clearly."
          />
          <div className="process-flow-grid">
            <div className="process-column">
              <h3>Pre-Sales Scoping</h3>
              <p style={{ fontSize: 13.5, margin: 0 }}>
                Review heating load types, boiler/manifold interfaces and wall-box fitment before ordering samples.
              </p>
            </div>
            <div className="process-column">
              <h3>OEM Engineering Support</h3>
              <p style={{ fontSize: 13.5, margin: 0 }}>
                Align schematic drawings, enclosure CAD, firmware behavior and regional manual translations.
              </p>
            </div>
            <div className="process-column">
              <h3>Installer Documentation</h3>
              <p style={{ fontSize: 13.5, margin: 0 }}>
                Maintain clean wiring diagrams, pairing workflows and troubleshooting guides per verified model.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
