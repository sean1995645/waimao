'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Cpu,
  FileCheck,
  Layers,
  MessageSquare,
  PackageCheck,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import { odmCases, services } from '@/data/catalog';
import type { OdmCaseRecord, ServiceRecord } from '@/types/content';
import { InquiryForm } from './InquiryForm';
import { Container, SectionTitle } from './LayoutPrimitives';
import { ProductGallery } from './ProductDetailView';

export function TailorMadeIndexView() {
  const [activeSvcSlug, setActiveSvcSlug] = useState(services[0].slug);
  const [advTab, setAdvTab] = useState(0);
  const activeSvc = services.find((s) => s.slug === activeSvcSlug) || services[0];

  const advantageTabs = [
    { label: 'Engineering Environment', caption: 'Dedicated R&D workspace imagery pending brand photography.' },
    { label: 'Assembly & Production', caption: 'SMT and final assembly line visuals awaiting verified factory photos.' },
    { label: 'Reliability Validation', caption: 'Environmental and switching reliability test scope confirmed per project.' },
    { label: 'Compliance & Quality', caption: 'Target market certification and quality documentation supplied on approval.' },
  ];

  return (
    <>
      {/* Intro split on soft surface */}
      <section className="section-block is-surface">
        <Container>
          <div className="split-band">
            <div>
              <h2 style={{ margin: '0 0 16px' }}>Tailored Manufacturing Solutions for Your Brand</h2>
              <p>
                With Heatnexis, B2B partners can structure OEM private-label branding or full ODM engineering across
                gas boiler, underfloor, radiator valve and smart HVAC controllers.
              </p>
              <p>
                From industrial design and custom PCB schematics to mobile app workflows and pilot validation, every
                deliverable is scoped transparently against your target market requirements.
              </p>
              <div style={{ marginTop: 22 }}>
                <a href="#inquiry" className="text-link">
                  <span>Get in Touch</span>
                  <ChevronRight size={15} aria-hidden="true" />
                </a>
              </div>
            </div>
            <div style={{ aspectRatio: '16 / 10', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/services/intro.jpg" alt="Heatnexis OEM/ODM engineering team" className="img-cover" />
            </div>
          </div>
        </Container>
      </section>

      {/* 4-Tab Interactive Tailor-Made Showcase */}
      <section className="section-block">
        <Container>
          <SectionTitle
            title="Tailor-Made Solution"
            subtitle={activeSvc.description}
          />
          <div className="pill-tab-bar" role="group" aria-label="Customization services">
            {services.map((svc) => (
              <button
                type="button"
                key={svc.slug}
                className="pill-tab-btn"
                aria-pressed={activeSvc.slug === svc.slug}
                onClick={() => setActiveSvcSlug(svc.slug)}
              >
                {svc.name}
              </button>
            ))}
          </div>

          <div className="product-grid" style={{ marginTop: 28 }}>
            {activeSvc.odmExamples.map((ex) => (
              <Link
                href={`/odm/${ex.slug}`}
                key={ex.slug}
                className="product-card"
              >
                <div className="product-card-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ex.image} alt={ex.title} className="img-contain" loading="lazy" />
                </div>
                <div className="product-card-body">
                  <h3>{ex.title}</h3>
                  <p style={{ margin: 0, fontSize: 13, color: '#666' }}>{ex.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="iproducts-more-wrap">
            <Link href="/odm" className="btn-outline">
              <span>View All ODM Projects</span>
              <ChevronRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Service Process 3-Column Flowchart */}
      <section className="section-block is-surface">
        <Container>
          <SectionTitle
            title="Service Process"
            subtitle="Structured engineering gates from requirement capture through validation and mass delivery."
          />

          <div className="process-flow-grid">
            <div className="process-column">
              <h3>User Needs Analysis</h3>
              <ul className="process-step-list">
                <li>
                  <MessageSquare size={18} /> <span>Requirement collection &amp; market brief</span>
                </li>
                <li>
                  <Wrench size={18} /> <span>Technical feasibility communication</span>
                </li>
                <li>
                  <FileCheck size={18} /> <span>Specification &amp; interface confirmation</span>
                </li>
                <li>
                  <ClipboardCheck size={18} /> <span>Project initiation &amp; milestone plan</span>
                </li>
              </ul>
            </div>

            <div className="process-column">
              <h3>Product Design</h3>
              <ul className="process-step-list">
                <li>
                  <Layers size={18} /> <span>Industrial ID &amp; mechanical CAD design</span>
                </li>
                <li>
                  <Cpu size={18} /> <span>Hardware PCB &amp; embedded software design</span>
                </li>
                <li>
                  <CheckCircle2 size={18} /> <span>Prototype testing, validation &amp; compliance prep</span>
                </li>
                <li>
                  <ShieldCheck size={18} /> <span>Trial run &amp; customer engineering acceptance</span>
                </li>
              </ul>
            </div>

            <div className="process-column">
              <h3>Production and Shipment</h3>
              <ul className="process-step-list">
                <li>
                  <PackageCheck size={18} /> <span>Pilot verification &amp; mass production</span>
                </li>
                <li>
                  <ShieldCheck size={18} /> <span>Pre-shipment inspection &amp; packaging checks</span>
                </li>
                <li>
                  <MessageSquare size={18} /> <span>Ongoing firmware &amp; after-sales technical support</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="quality-bar">
            <span>Design Quality Control</span>
            <span>Supply Chain Quality Control</span>
            <span>Production Quality Control</span>
          </div>
        </Container>
      </section>

      {/* Service Advantages Bento Grid */}
      <section className="section-block">
        <Container>
          <SectionTitle
            title="Service Advantages"
            subtitle={advantageTabs[advTab].caption}
          />
          <div className="pill-tab-bar" role="group" aria-label="Service advantage categories">
            {advantageTabs.map((t, idx) => (
              <button
                type="button"
                key={t.label}
                className="pill-tab-btn"
                aria-pressed={advTab === idx}
                onClick={() => setAdvTab(idx)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="bento-advantage-grid">
            <div className="bento-cell bento-main">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/factory/about-building.jpg" alt={advantageTabs[advTab].label} className="img-cover" loading="lazy" />
            </div>
            <div className="bento-cell">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/factory/env-1.jpg" alt="Hardware engineering line" className="img-cover" loading="lazy" />
            </div>
            <div className="bento-cell">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/factory/env-2.jpg" alt="Reliability testing lab" className="img-cover" loading="lazy" />
            </div>
            <div className="bento-cell">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/factory/env-3.jpg" alt="Assembly workshop" className="img-cover" loading="lazy" />
            </div>
            <div className="bento-cell">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/factory/env-4.jpg" alt="Quality inspection facility" className="img-cover" loading="lazy" />
            </div>
          </div>
        </Container>
      </section>

      {/* Project Inquiry */}
      <section id="inquiry" className="inquiry-backdrop-band">
        <Container>
          <div className="inquiry-card">
            <InquiryForm product="Tailor-Made OEM/ODM Solution" title="Start Your Custom Thermostat Brief" />
          </div>
        </Container>
      </section>
    </>
  );
}

export function ServiceDetailView({ service }: { service: ServiceRecord }) {
  return (
    <>
      <section className="section-block">
        <Container>
          <div className="split-band">
            <div style={{ aspectRatio: '16 / 10', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={service.image} alt={service.name} className="img-cover" />
            </div>
            <div>
              <h2 style={{ margin: '0 0 14px' }}>{service.name}</h2>
              <p>{service.description}</p>
              <p>
                Prepare your expected heating interfaces, regional installation standards, wireless protocols and target
                launch timeline. Final engineering scope and deliverables are agreed per project brief.
              </p>
              <div style={{ marginTop: 22 }}>
                <a href="#inquiry" className="btn-primary">
                  <span>Discuss Your Requirements</span>
                  <ChevronRight size={15} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-block is-surface">
        <Container>
          <SectionTitle
            title="Key Engineering Deliverables"
            subtitle={`Core workstreams covered in ${service.name} projects with Heatnexis.`}
          />
          <div className="qa-grid">
            {service.deliverables.map((item, idx) => (
              <div className="qa-card" key={item}>
                <span className="setup-step-num" style={{ fontSize: 20 }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3>Stage {idx + 1}</h3>
                  <p>{item}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-block">
        <Container>
          <SectionTitle title="Illustrative Concept Projects" subtitle="Representative architectures for scoping discussions." />
          <div className="product-grid">
            {service.odmExamples.map((ex) => (
              <Link href={`/odm/${ex.slug}`} className="product-card" key={ex.slug}>
                <div className="product-card-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ex.image} alt={ex.title} className="img-contain" loading="lazy" />
                </div>
                <div className="product-card-body">
                  <h3>{ex.title}</h3>
                  <p style={{ margin: 0, fontSize: 13, color: '#666' }}>{ex.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section id="inquiry" className="inquiry-backdrop-band">
        <Container>
          <div className="inquiry-card">
            <InquiryForm product={service.name} title={`Inquire About ${service.name}`} />
          </div>
        </Container>
      </section>
    </>
  );
}

export function ServiceProcessSection() {
  return (
    <section className="section-block is-surface">
      <Container>
        <SectionTitle
          title="Service Process"
          subtitle="Structured engineering gates from requirement capture through validation and mass delivery."
        />

        <div className="process-flow-grid">
          <div className="process-column">
            <h3>User Needs Analysis</h3>
            <ul className="process-step-list">
              <li>
                <MessageSquare size={18} /> <span>Requirement collection &amp; market brief</span>
              </li>
              <li>
                <Wrench size={18} /> <span>Technical feasibility communication</span>
              </li>
              <li>
                <FileCheck size={18} /> <span>Specification &amp; interface confirmation</span>
              </li>
              <li>
                <ClipboardCheck size={18} /> <span>Project initiation &amp; milestone plan</span>
              </li>
            </ul>
          </div>

          <div className="process-column">
            <h3>Product Design</h3>
            <ul className="process-step-list">
              <li>
                <Layers size={18} /> <span>Industrial ID &amp; mechanical CAD design</span>
              </li>
              <li>
                <Cpu size={18} /> <span>Hardware PCB &amp; embedded software design</span>
              </li>
              <li>
                <CheckCircle2 size={18} /> <span>Prototype testing, validation &amp; compliance prep</span>
              </li>
              <li>
                <ShieldCheck size={18} /> <span>Trial run &amp; customer engineering acceptance</span>
              </li>
            </ul>
          </div>

          <div className="process-column">
            <h3>Production and Shipment</h3>
            <ul className="process-step-list">
              <li>
                <PackageCheck size={18} /> <span>Pilot verification &amp; mass production</span>
              </li>
              <li>
                <ShieldCheck size={18} /> <span>Pre-shipment inspection &amp; packaging checks</span>
              </li>
              <li>
                <MessageSquare size={18} /> <span>Ongoing firmware &amp; after-sales technical support</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="quality-bar">
          <span>Design Quality Control</span>
          <span>Supply Chain Quality Control</span>
          <span>Production Quality Control</span>
        </div>
      </Container>
    </section>
  );
}

export function OdmIndexView() {
  const [selectedService, setSelectedService] = useState('all');
  const filtered =
    selectedService === 'all' ? odmCases : odmCases.filter((item) => item.serviceSlug === selectedService);

  return (
    <>
      <section className="section-block">
        <Container>
          <SectionTitle
            title="ODM Engineering Projects"
            subtitle="Filter concept ODM project architectures across Smart Home Integration, PCB Development, APP Development and Structural Design."
          />

          <div className="pill-tab-bar" role="group" aria-label="Filter ODM projects by discipline">
            <button
              type="button"
              className="pill-tab-btn"
              aria-pressed={selectedService === 'all'}
              onClick={() => setSelectedService('all')}
            >
              All Projects ({odmCases.length})
            </button>
            {services.map((svc) => (
              <button
                type="button"
                key={svc.slug}
                className="pill-tab-btn"
                aria-pressed={selectedService === svc.slug}
                onClick={() => setSelectedService(svc.slug)}
              >
                {svc.name}
              </button>
            ))}
          </div>

          <div className="product-grid" style={{ marginTop: 28 }}>
            {filtered.map((item) => (
              <Link href={`/odm/${item.slug}`} key={item.slug} className="product-card">
                <div className="product-card-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.title} className="img-contain" loading="lazy" />
                </div>
                <div className="product-card-body">
                  <span style={{ fontSize: 12, color: '#0067e7', fontWeight: 600 }}>{item.serviceName}</span>
                  <h3>{item.title}</h3>
                  <p style={{ margin: 0, fontSize: 13, color: '#666' }}>{item.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <ServiceProcessSection />

      <section id="inquiry" className="inquiry-backdrop-band">
        <Container>
          <div className="inquiry-card">
            <InquiryForm product="Custom ODM Engineering Project" title="Request an ODM Feasibility Review" />
          </div>
        </Container>
      </section>
    </>
  );
}

export function OdmDetailView({ odmCase }: { odmCase: OdmCaseRecord }) {
  const moreProjects = odmCases.filter((item) => item.slug !== odmCase.slug).slice(0, 3);

  return (
    <>
      {/* Reference odm-detail terminalBg: Centered Title, Summary, Gallery & Dual CTAs */}
      <section className="section-block is-surface">
        <Container>
          <SectionTitle title={odmCase.title} subtitle={odmCase.summary} />
          <div style={{ maxWidth: 680, marginInline: 'auto' }}>
            <ProductGallery
              name={odmCase.title}
              images={[
                odmCase.image,
                '/images/services/odm-10.png',
                '/images/services/odm-11.png',
                '/images/services/odm-12.png',
              ]}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap', marginTop: 28 }}>
            <a href="#inquiry" className="btn-outline">
              <span>Consultation</span>
              <ChevronRight size={14} aria-hidden="true" />
            </a>
            <a href="#inquiry" className="btn-primary">
              <span>Message</span>
              <ChevronRight size={14} aria-hidden="true" />
            </a>
          </div>
        </Container>
      </section>

      {/* Reference serParameter: Structured Engineering Scope Highlights */}
      <section className="section-block">
        <Container>
          <SectionTitle
            title={`${odmCase.serviceName} Scope`}
            subtitle="Illustrative ODM engineering checkpoints confirmed against signed customer requirements."
          />
          <div className="prose">
            <ol>
              {odmCase.scopePoints.map((pt) => (
                <li key={pt.label}>
                  <strong>{pt.label}:</strong> {pt.detail}
                </li>
              ))}
            </ol>
            <p className="notice-box" style={{ marginTop: 24 }}>
              Concept ODM engineering showcase — exact electrical load ratings, PCB bill of materials and regional
              certifications are defined during formal project initiation.
            </p>
          </div>
        </Container>
      </section>

      {/* Reference serviceFlowPathBg: 3-Column Service Process Flowchart */}
      <ServiceProcessSection />

      {/* Reference serviceMore: More Projects 3-Column Grid */}
      <section className="section-block">
        <Container>
          <SectionTitle title="More Projects" subtitle="Explore additional Heatnexis OEM/ODM concept programs." />
          <div className="product-grid">
            {moreProjects.map((item) => (
              <Link href={`/odm/${item.slug}`} key={item.slug} className="product-card">
                <div className="product-card-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.title} className="img-contain" loading="lazy" />
                </div>
                <div className="product-card-body">
                  <h3>{item.title}</h3>
                  <p style={{ margin: 0, fontSize: 13, color: '#666' }}>{item.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section id="inquiry" className="inquiry-backdrop-band">
        <Container>
          <div className="inquiry-card">
            <InquiryForm product={odmCase.title} title="Inquire About This ODM Architecture" />
          </div>
        </Container>
      </section>
    </>
  );
}
