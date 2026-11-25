import Link from 'next/link';
import { CheckCircle2, ChevronRight, Cpu, MessageSquare, Package, Palette } from 'lucide-react';
import { site } from '@/config/site';
import { Container, Reveal } from './LayoutPrimitives';

export function B2BCollaborationMatrix({ compact = false }: { compact?: boolean }) {
  const tiers = [
    {
      code: 'TIER 01 · DISTRIBUTION',
      badge: 'READY TO CONFIGURE',
      icon: Package,
      title: 'Wholesale & Distribution',
      idealFor: 'Regional HVAC Wholesalers, Plumbing Supply Chains & Project Contractors',
      points: [
        'Sample evaluation kits across all 7 heating control categories',
        'Standard Heatnexis or neutral export carton packaging',
        'Model-matched wiring schematics & installer quick-start guides',
        'Target regional voltage, relay output & NTC sensor matching',
      ],
      ctaLabel: 'Inquire Wholesale Supply',
      ctaHref: '/contact?type=wholesale#inquiry',
      featured: false,
    },
    {
      code: 'TIER 02 · PRIVATE LABEL',
      badge: 'MOST POPULAR FOR BRANDS',
      icon: Palette,
      title: 'OEM Brand Customization',
      idealFor: 'Heating Equipment Brands, Smart Home Retailers & National Channels',
      points: [
        'Silk-screen or laser-etched corporate logo on thermostat fascia',
        'Custom enclosure CMF, display backlight tone & trim finishes',
        'Bespoke retail giftbox artwork & localized user manuals',
        'White-label smart app UI branding & cloud ecosystem alignment',
      ],
      ctaLabel: 'Start OEM Private-Label Brief',
      ctaHref: '/contact?type=oem#inquiry',
      featured: true,
    },
    {
      code: 'TIER 03 · BESPOKE R&D',
      badge: 'FULL-CYCLE ENGINEERING',
      icon: Cpu,
      title: 'Custom ODM Development',
      idealFor: 'Boiler / Heat-Pump Manufacturers & Building Automation Integrators',
      points: [
        'Industrial ID & mechanical tooling for EU 86mm, UK & US wall-boxes',
        'Custom PCB layout, switching load relays & dual-sensor circuits',
        'Embedded firmware control logic, WiFi / Zigbee / RF / Modbus protocols',
        'EVT / DVT prototype validation & regional compliance preparation',
      ],
      ctaLabel: 'Request ODM Feasibility Review',
      ctaHref: '/contact?type=odm#inquiry',
      featured: false,
    },
  ];

  return (
    <section className={`section-block ${compact ? '' : 'is-surface'}`} aria-labelledby="b2b-tiers-heading">
      <Reveal>
        <Container>
          <div className="section-header">
            <span className="section-eyebrow">B2B PARTNERSHIP MODELS</span>
            <h2 id="b2b-tiers-heading">Wholesale, Private-Label OEM &amp; Custom ODM Tiers</h2>
            <p>
              Select the collaboration model aligned with your commercial channel, branding scope and technical
              requirements—scoped transparently per B2B project brief.
            </p>
          </div>

          <div className="b2b-tier-grid">
            {tiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <article
                  key={tier.code}
                  className={`b2b-tier-card ${tier.featured ? 'is-featured' : ''}`}
                >
                  <div className="b2b-tier-top">
                    <span className="mono-label b2b-tier-code">{tier.code}</span>
                    <span className="b2b-tier-badge">{tier.badge}</span>
                  </div>

                  <div className="b2b-tier-title-row">
                    <span className="b2b-tier-icon" aria-hidden="true">
                      <Icon size={20} />
                    </span>
                    <div>
                      <h3>{tier.title}</h3>
                      <p className="b2b-tier-audience">{tier.idealFor}</p>
                    </div>
                  </div>

                  <ul className="b2b-tier-list">
                    {tier.points.map((pt) => (
                      <li key={pt}>
                        <CheckCircle2 size={16} aria-hidden="true" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="b2b-tier-action">
                    <Link
                      href={tier.ctaHref}
                      className={tier.featured ? 'btn-primary' : 'btn-outline'}
                      style={{ width: '100%' }}
                    >
                      <span>{tier.ctaLabel}</span>
                      <ChevronRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </Reveal>
    </section>
  );
}

export function B2BCtaBand({
  kicker = 'B2B SOURCING & OEM / ODM DESK',
  title = 'Ready to Source or Customize Your Next Thermostat Line?',
  description = 'Share your heating system type, target market standards and project scope for a structured B2B quotation, sample evaluation or custom ODM engineering brief.',
}: {
  kicker?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section className="cta-band" aria-label="B2B Sourcing and Quotation">
      <Container>
        <div className="cta-band-inner">
          <div className="cta-band-copy">
            <span className="detail-banner-kicker">{kicker}</span>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <div className="cta-band-actions">
            <Link href="/contact#inquiry" className="btn-primary">
              <span>Request B2B Quote</span>
              <ChevronRight size={15} aria-hidden="true" />
            </Link>
            <a
              href={site.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-white"
            >
              <MessageSquare size={15} aria-hidden="true" />
              <span>WhatsApp Direct</span>
            </a>
            <Link href="/tailor-made-solution" className="btn-ghost-white">
              <span>Explore OEM/ODM</span>
              <ChevronRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
