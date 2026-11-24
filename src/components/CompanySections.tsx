'use client';

import Link from 'next/link';
import {
  Award,
  CheckCircle2,
  ChevronRight,
  Compass,
  Cpu,
  Factory,
  FlaskConical,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Target,
  Wrench,
} from 'lucide-react';
import { InquiryForm } from './InquiryForm';
import { Container, SectionTitle } from './LayoutPrimitives';

export function AboutPageView() {
  return (
    <>
      {/* Company Intro Split */}
      <section className="section-block">
        <Container>
          <div className="split-band">
            <div>
              <h2 style={{ margin: '0 0 16px' }}>Heatnexis</h2>
              <p>
                Heatnexis is the designated smart thermostat and heating control brand for global B2B distributors,
                wholesalers, HVAC contractors and OEM/ODM private-label partners.
              </p>
              <p>
                Our product architecture spans gas boiler thermostats, electric underfloor heating thermostats,
                water heating thermostats, smart radiator valves, thermal actuators, wiring centres and smart heating
                controllers—supporting wholesale distribution, private-label OEM and full-cycle ODM programs.
              </p>

              <div className="iaboutus-stats-bar" style={{ position: 'static', width: '100%', padding: '20px 0 0', marginTop: 12 }}>
                <div className="iaboutus-stat">
                  <div>
                    <strong>7 Lines</strong>
                    <span>Heating Control Categories</span>
                  </div>
                </div>
                <div className="iaboutus-stat">
                  <div>
                    <strong>OEM / ODM</strong>
                    <span>Full-Cycle Workflow</span>
                  </div>
                </div>
                <div className="iaboutus-stat">
                  <div>
                    <strong>Global B2B</strong>
                    <span>Wholesale &amp; Brand Supply</span>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ aspectRatio: '16 / 10', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/factory/about-building.jpg" alt="Heatnexis manufacturing facility" className="img-cover" />
            </div>
          </div>
        </Container>
      </section>

      {/* R&D Center */}
      <section className="section-block is-surface">
        <Container>
          <SectionTitle
            title="R&D Center"
            subtitle="Hardware, embedded firmware, mobile connectivity and industrial structural engineering workflows."
          />
          <div className="rd-grid">
            <div className="rd-card">
              <div className="rd-card-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/factory/rd-1.jpg" alt="Hardware and PCB engineering center" className="img-cover" loading="lazy" />
              </div>
              <div className="rd-card-body">
                <h3>Hardware &amp; Firmware Engineering</h3>
                <p style={{ margin: 0, fontSize: 13.5 }}>
                  Schematic design, relay &amp; sensor architecture, RF/WiFi/Zigbee integration and thermal validation.
                </p>
              </div>
            </div>
            <div className="rd-card">
              <div className="rd-card-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/factory/rd-2.jpg" alt="Industrial design and connected software studio" className="img-cover" loading="lazy" />
              </div>
              <div className="rd-card-body">
                <h3>Industrial Design &amp; Connected Software</h3>
                <p style={{ margin: 0, fontSize: 13.5 }}>
                  Regional wall-box mechanical CAD, faceplate CMF customization and white-label mobile app workflows.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Environment Strip */}
      <section className="section-block">
        <Container>
          <SectionTitle
            title="Environment"
            subtitle="Electronic assembly, testing and quality inspection workshop views."
          />
          <div className="inews-grid">
            {[
              { img: '/images/factory/env-1.jpg', caption: 'SMT & Electronic Assembly Zone' },
              { img: '/images/factory/env-2.jpg', caption: 'Final Thermostat Testing Area' },
              { img: '/images/factory/env-3.jpg', caption: 'Engineering & Packaging Hub' },
            ].map((item) => (
              <div className="rd-card" key={item.caption}>
                <div className="rd-card-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.img} alt={item.caption} className="img-cover" loading="lazy" />
                </div>
                <div className="rd-card-body">
                  <h3 style={{ margin: 0, fontSize: 15 }}>{item.caption}</h3>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Corporate Culture 4-Card Band */}
      <section
        className="culture-band"
        style={{
          backgroundImage: 'linear-gradient(rgba(16,24,38,0.68), rgba(16,24,38,0.72)), url(/images/factory/culture-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container>
          <div className="section-header" style={{ marginBottom: 16 }}>
            <h2 style={{ color: '#ffffff' }}>Corporate Culture</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)' }}>
              Engineering discipline and transparent B2B collaboration guiding every heating control project.
            </p>
          </div>
          <div className="culture-grid">
            {[
              { icon: Compass, title: 'Corporate Vision', desc: 'Deliver dependable, cleanly engineered heating control hardware and connected platforms for international HVAC markets.' },
              { icon: Target, title: 'Corporate Mission', desc: 'Support distributors and OEM/ODM brands with clear specifications, honest documentation and tailored product execution.' },
              { icon: HeartHandshake, title: 'Business Concept', desc: 'Customer-centric scoping, transparent compatibility verification and long-term partnership reliability.' },
              { icon: ShieldCheck, title: 'Core Values', desc: 'Integrity, engineering rigor, safety compliance awareness and continuous product refinement.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div className="culture-card" key={title}>
                <Icon size={24} color="#fda4af" aria-hidden="true" />
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Development History Band */}
      <section
        className="section-block"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.86), rgba(255,255,255,0.92)), url(/images/factory/history-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom center',
        }}
      >
        <Container>
          <SectionTitle
            title="Development Roadmap"
            subtitle="Structured product architecture and B2B engineering expansion across global smart heating control markets."
          />
          <div className="qa-grid">
            {[
              ['Stage 01', 'Heating Control Product Foundation', 'Core thermostat and heating control hardware architecture scoped for international HVAC markets.'],
              ['Stage 02', 'Multi-Zone Hydronic & Boiler Expansion', 'Portfolio structured across gas boiler, underfloor, TRV, actuator and wiring centre categories.'],
              ['Stage 03', 'Connected Smart Home Integration', 'WiFi, Zigbee and RF wireless control pathways structured for OEM/ODM partners.'],
              ['Stage 04', 'Global B2B Documentation & Compliance', 'Ongoing verification of regional datasheets, wiring diagrams and certification files.'],
            ].map(([stage, heading, text]) => (
              <div className="qa-card" key={stage}>
                <span className="setup-step-num" style={{ fontSize: 18 }}>
                  {stage}
                </span>
                <div>
                  <h3>{heading}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Qualifications & Next Step */}
      <section className="section-block is-surface">
        <Container>
          <div className="split-band">
            <div>
              <h2 style={{ margin: '0 0 14px' }}>Qualifications &amp; Certifications</h2>
              <p>
                Verified compliance files (such as CE, RoHS, UKCA, UL or ERP declarations) are supplied per commercial
                model and target market requirements. Contact our team to confirm documentation for your region.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 22 }}>
                <Link href="/about/advantages" className="btn-outline">
                  <span>Our Advantages</span>
                  <ChevronRight size={14} aria-hidden="true" />
                </Link>
                <Link href="/contact" className="btn-primary">
                  <span>Contact Us</span>
                  <ChevronRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div style={{ aspectRatio: '16 / 10', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/factory/env-5.jpg" alt="Heatnexis quality and testing workshop" className="img-cover" loading="lazy" />
            </div>
          </div>
        </Container>
      </section>

      {/* Target Global Partners */}
      <section className="section-block">
        <Container>
          <SectionTitle
            title="Target Global Partners"
            subtitle="Serving B2B heating control channels worldwide."
          />
          <div className="culture-grid">
            {[
              'European HVAC Distributors',
              'Smart Home Brand Partners',
              'Underfloor Heating Contractors',
              'Commercial Building Integrators',
            ].map((channel) => (
              <div
                key={channel}
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius)',
                  padding: '26px 20px',
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: 14.5,
                  color: 'var(--color-title)',
                }}
              >
                {channel}
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

export function AdvantagesPageView() {
  return (
    <>
      <section className="section-block">
        <Container>
          <SectionTitle
            title="R&D Strength"
            subtitle="Structured hardware, reliability and software customization capabilities for OEM/ODM thermostat partners."
          />
          <div className="inews-grid">
            {[
              {
                img: '/images/factory/adv-rd-1.jpg',
                title: 'Hardware & Control Architecture',
                desc: 'Dedicated thermostat engineering covering boiler dry-contact relays, electric floor loads and multi-zone hydronic wiring centres.',
              },
              {
                img: '/images/factory/adv-rd-2.jpg',
                title: 'Reliability Verification Planning',
                desc: 'Structured validation scope covering temperature accuracy, switching endurance and environmental cycling confirmed per project.',
              },
              {
                img: '/images/factory/adv-rd-3.jpg',
                title: 'Connected App & Protocol Flexibility',
                desc: 'Configurable WiFi, Zigbee, RF and Modbus integration options aligned with your regional smart home ecosystem.',
              },
            ].map((item) => (
              <div className="rd-card" key={item.title}>
                <div className="rd-card-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.img} alt={item.title} className="img-cover" loading="lazy" />
                </div>
                <div className="rd-card-body">
                  <h3>{item.title}</h3>
                  <p style={{ margin: 0, fontSize: 13.5 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Dark Innovation Band + Overlapping 3-Col Card Strip */}
      <section
        className="innovation-dark-band"
        style={{
          backgroundImage: 'linear-gradient(rgba(14,20,28,0.68), rgba(14,20,28,0.78)), url(/images/factory/innovation-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container>
          <h2>Innovation Capability</h2>
          <p style={{ maxWidth: 640, margin: '0 auto', color: 'rgba(255,255,255,0.85)' }}>
            Modular hardware platforms, disciplined prototype validation and transparent documentation built to
            accelerate OEM/ODM thermostat launches for global HVAC channels.
          </p>
        </Container>
      </section>

      <Container>
        <div className="innovation-overlap-grid">
          <div className="innovation-overlap-item">
            <Cpu size={28} aria-hidden="true" />
            <h3>Modular Hardware Platforms</h3>
            <p>Reusable base architectures accelerate custom enclosure, display and relay variants for global markets.</p>
          </div>
          <div className="innovation-overlap-item">
            <FlaskConical size={28} aria-hidden="true" />
            <h3>Disciplined Prototype Reviews</h3>
            <p>Clear feasibility, EVT/DVT sample validation and installer feedback checkpoints before mass tooling.</p>
          </div>
          <div className="innovation-overlap-item">
            <Award size={28} aria-hidden="true" />
            <h3>Documentation Transparency</h3>
            <p>Model-matched datasheets, wiring diagrams and target-market compliance files verified prior to release.</p>
          </div>
        </div>
      </Container>

      {/* Quality Assurance 2x2 Grid */}
      <section className="section-block is-surface" style={{ marginTop: 48 }}>
        <Container>
          <SectionTitle
            title="Quality Assurance"
            subtitle="End-to-end quality checkpoints from design review and component sourcing to final inspection."
          />
          <div className="qa-grid">
            {[
              { icon: Wrench, title: 'Design', desc: 'Controlled workflow across industrial design, mechanical fitment, schematic review and software UX.' },
              { icon: FlaskConical, title: 'Testing', desc: 'Defined functional, sensor calibration and switching verification plans agreed per commercial model.' },
              { icon: Cpu, title: 'Research & Development', desc: 'Cross-functional alignment across PCB hardware, embedded firmware, enclosure CAD and mobile apps.' },
              { icon: ShieldCheck, title: 'Compliance Readiness', desc: 'Product safety and regional certification requirements scoped early; approved certificates uploaded on supply.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div className="qa-card" key={title}>
                <Icon size={24} aria-hidden="true" />
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Manufacturing Capability Split */}
      <section className="section-block">
        <Container>
          <div className="split-band">
            <div>
              <h2 style={{ margin: '0 0 16px' }}>Manufacturing &amp; Supply Readiness</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {['Incoming component inspection', 'In-circuit functional testing', 'Aging & burn-in screening', 'Pre-shipment AQL review'].map((line) => (
                  <li key={line} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5 }}>
                    <CheckCircle2 size={16} color="var(--color-primary)" aria-hidden="true" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="notice-box">
                Production lead times, MOQ tiers and pre-shipment AQL inspection criteria are confirmed in writing for
                each commercial B2B order.
              </p>
            </div>
            <div style={{ aspectRatio: '16 / 10', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/factory/manufacturing.jpg" alt="Heatnexis PCB testing and soldering" className="img-cover" loading="lazy" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export function JoinUsPageView() {
  return (
    <>
      <section className="section-block">
        <Container>
          <SectionTitle
            title="Collaborate & Grow With Heatnexis"
            subtitle="Explore engineering and global B2B collaboration opportunities."
          />
          <div className="rd-grid">
            <div className="rd-card">
              <div className="rd-card-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/factory/join-1.jpg" alt="Engineering and product team culture" className="img-cover" loading="lazy" />
              </div>
              <div className="rd-card-body">
                <h3>Engineering &amp; Product Roles</h3>
                <p style={{ margin: 0, fontSize: 13.5 }}>
                  Future openings in embedded HVAC firmware, hardware PCB engineering and mechanical CAD will be listed
                  here once HR announcements are approved.
                </p>
              </div>
            </div>
            <div className="rd-card">
              <div className="rd-card-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/factory/join-2.jpg" alt="Global B2B partnership collaboration" className="img-cover" loading="lazy" />
              </div>
              <div className="rd-card-body">
                <h3>International B2B Partnerships</h3>
                <p style={{ margin: 0, fontSize: 13.5 }}>
                  Distributors, regional agents and HVAC system integrators can prepare an introduction via our Contact
                  page.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-block is-surface">
        <Container>
          <div className="notice-box" style={{ maxWidth: 820, marginInline: 'auto' }}>
            Interested in regional distribution partnerships, OEM/ODM agency collaboration, or future engineering roles?
            Reach our B2B desk via <Link href="/contact" className="text-link">Contact Us →</Link>
          </div>
        </Container>
      </section>
    </>
  );
}

export function ContactPageView() {
  return (
    <>
      <section className="section-block">
        <Container>
          <div className="contact-top-grid">
            <div>
              <h2 style={{ margin: '0 0 12px' }}>Heatnexis — Global B2B Desk</h2>
              <p style={{ margin: 0 }}>
                Share your heating application, target regional market, product category or OEM/ODM customization scope.
              </p>
              <ul className="contact-info-list">
                <li>
                  <Phone size={18} aria-hidden="true" />
                  <span>
                    <strong>Telephone / WhatsApp:</strong> Direct regional sales line shared upon B2B account inquiry
                  </span>
                </li>
                <li>
                  <Mail size={18} aria-hidden="true" />
                  <span>
                    <strong>Business RFQ Desk:</strong> Prepare your structured project inquiry draft below
                  </span>
                </li>
                <li>
                  <MapPin size={18} aria-hidden="true" />
                  <span>
                    <strong>Export &amp; Factory Desk:</strong> Manufacturing and shipping logistics details supplied per quotation
                  </span>
                </li>
              </ul>
            </div>

            <div style={{ aspectRatio: '16 / 10', overflow: 'hidden', border: '1px solid #e8ecf0' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/factory/contact-map.jpg" alt="Location map overview" className="img-cover" />
            </div>
          </div>

          <div className="contact-location-cards">
            <div className="contact-location-card">
              <MapPin size={22} aria-hidden="true" />
              <div>
                <h3 style={{ margin: '0 0 6px', fontSize: 16 }}>Sales &amp; OEM/ODM Coordination</h3>
                <p style={{ margin: 0, fontSize: 13.5 }}>Wholesale pricing, distributor onboarding and custom RFQ engineering review.</p>
              </div>
            </div>
            <div className="contact-location-card">
              <Factory size={22} aria-hidden="true" />
              <div>
                <h3 style={{ margin: '0 0 6px', fontSize: 16 }}>Manufacturing &amp; R&amp;D Base</h3>
                <p style={{ margin: 0, fontSize: 13.5 }}>Sample prototyping, PCB/enclosure engineering and export quality inspection.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="inquiry"
        className="inquiry-backdrop-band"
        style={{
          backgroundImage: 'url(/images/factory/message-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container>
          <div className="inquiry-card">
            <InquiryForm title="Service Inquiry" />
          </div>
        </Container>
      </section>
    </>
  );
}
