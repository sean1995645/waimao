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
import { DarkSectionBackdrop } from './BrandVisual';
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
              <h2 style={{ margin: '0 0 16px' }}>BEOK Controls</h2>
              <p>
                BEOK Controls is the designated smart thermostat and heating control brand for global B2B distributors,
                wholesalers, HVAC contractors and OEM/ODM private-label partners.
              </p>
              <p>
                Our planned product architecture spans gas boiler thermostats, electric underfloor heating thermostats,
                water heating thermostats, smart radiator valves, thermal actuators, wiring centres and smart heating
                controllers. Verified founding year, factory footprint, headcount and certification records await
                official brand documentation.
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
                    <strong>Pending</strong>
                    <span>Verified Corporate Figures</span>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ aspectRatio: '16 / 10', overflow: 'hidden' }}>
              <DarkSectionBackdrop theme="building" label="BEOK Controls headquarters placeholder" />
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
                <DarkSectionBackdrop theme="tech" label="Hardware and PCB engineering placeholder" />
              </div>
              <div className="rd-card-body">
                <h3>Hardware &amp; Firmware Engineering</h3>
                <p style={{ margin: 0, fontSize: 13.5 }}>
                  Schematic design, relay &amp; sensor architecture, RF/WiFi/Zigbee integration and thermal validation.
                  Verified R&amp;D lab location pending brand approval.
                </p>
              </div>
            </div>
            <div className="rd-card">
              <div className="rd-card-media">
                <DarkSectionBackdrop theme="service" label="App and ID design studio placeholder" />
              </div>
              <div className="rd-card-body">
                <h3>Industrial Design &amp; Connected Software</h3>
                <p style={{ margin: 0, fontSize: 13.5 }}>
                  Regional wall-box mechanical CAD, faceplate CMF customization and white-label mobile app workflows.
                  Approved photography pending supply.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Corporate Culture 4-Card Band */}
      <section className="culture-band">
        <Container>
          <div className="section-header" style={{ marginBottom: 16 }}>
            <h2 style={{ color: '#ffffff' }}>Corporate Culture</h2>
            <p style={{ color: 'rgba(255,255,255,0.78)' }}>
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
                <Icon size={24} color="#0067e7" aria-hidden="true" />
                <h3>{title}</h3>
                <p>{desc}</p>
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
                No commercial certificates, patent numbers or third-party test reports have been uploaded to this
                development preview. Verified compliance files (such as CE, RoHS, UKCA, UL or ERP declarations) will be
                published here only after authorized documents are supplied in <code>public/images/certificates/</code>.
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
              <DarkSectionBackdrop theme="tech" label="Certification showcase pending approved documents" />
            </div>
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
                title: 'Hardware & Control Architecture',
                desc: 'Dedicated thermostat engineering covering boiler dry-contact relays, electric floor loads and multi-zone hydronic wiring centres.',
              },
              {
                title: 'Reliability Verification Planning',
                desc: 'Structured validation scope covering temperature accuracy, switching endurance and environmental cycling confirmed per project.',
              },
              {
                title: 'Connected App & Protocol Flexibility',
                desc: 'Configurable WiFi, Zigbee, RF and Modbus integration options aligned with your regional smart home ecosystem.',
              },
            ].map((item) => (
              <div className="rd-card" key={item.title}>
                <div className="rd-card-media">
                  <DarkSectionBackdrop theme="service" label={item.title} />
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
      <section className="innovation-dark-band">
        <Container>
          <h2>Innovation Capability</h2>
          <p style={{ maxWidth: 640, margin: '0 auto', color: 'rgba(255,255,255,0.8)' }}>
            Quantitative R&amp;D team headcount, patent totals and factory floor figures are intentionally omitted until
            verified corporate records are supplied by BEOK Controls.
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
                    <CheckCircle2 size={16} color="#0067e7" aria-hidden="true" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="notice-box">
                Verified factory production capacity figures and authorized manufacturing photography will be published
                once supplied by BEOK Controls.
              </p>
            </div>
            <div style={{ aspectRatio: '16 / 10', overflow: 'hidden' }}>
              <DarkSectionBackdrop theme="building" label="BEOK Controls manufacturing visual placeholder" />
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
            title="Collaborate & Grow With BEOK Controls"
            subtitle="Recruitment listings and approved workplace photography are pending brand publication."
          />
          <div className="rd-grid">
            <div className="rd-card">
              <div className="rd-card-media">
                <DarkSectionBackdrop theme="service" label="Engineering team placeholder" />
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
                <DarkSectionBackdrop theme="application" label="Global B2B partnership placeholder" />
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
            No active job vacancies are published on this development preview yet. For partnership or recruitment
            inquiries, visit <Link href="/contact" className="text-link">Contact Us →</Link>
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
              <h2 style={{ margin: '0 0 12px' }}>BEOK Controls — Global B2B Desk</h2>
              <p style={{ margin: 0 }}>
                Share your heating application, target regional market, product category or OEM/ODM customization scope.
              </p>
              <ul className="contact-info-list">
                <li>
                  <Phone size={18} aria-hidden="true" />
                  <span>
                    <strong>Telephone / WhatsApp:</strong> Official contact number awaiting brand approval
                  </span>
                </li>
                <li>
                  <Mail size={18} aria-hidden="true" />
                  <span>
                    <strong>Business Email:</strong> Official commercial email awaiting brand approval
                  </span>
                </li>
                <li>
                  <MapPin size={18} aria-hidden="true" />
                  <span>
                    <strong>Registered Address:</strong> Official office and factory address pending verification
                  </span>
                </li>
              </ul>
            </div>

            <div style={{ aspectRatio: '16 / 10', overflow: 'hidden', border: '1px solid #e8ecf0' }}>
              <DarkSectionBackdrop theme="building" label="BEOK Controls location map placeholder pending verified address" />
            </div>
          </div>

          <div className="contact-location-cards">
            <div className="contact-location-card">
              <MapPin size={22} aria-hidden="true" />
              <div>
                <h3 style={{ margin: '0 0 6px', fontSize: 16 }}>Sales &amp; OEM/ODM Coordination</h3>
                <p style={{ margin: 0, fontSize: 13.5 }}>Verified regional sales office details pending publication.</p>
              </div>
            </div>
            <div className="contact-location-card">
              <Factory size={22} aria-hidden="true" />
              <div>
                <h3 style={{ margin: '0 0 6px', fontSize: 16 }}>Manufacturing &amp; R&amp;D Base</h3>
                <p style={{ margin: 0, fontSize: 13.5 }}>Verified production site address pending brand approval.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="inquiry" className="inquiry-backdrop-band">
        <Container>
          <div className="inquiry-card">
            <InquiryForm title="Service Inquiry" />
          </div>
        </Container>
      </section>
    </>
  );
}
