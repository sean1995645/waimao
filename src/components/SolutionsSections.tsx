import Link from 'next/link';
import { Building2, ChevronRight, Flame, Grid3X3, Home, Leaf, Wrench } from 'lucide-react';
import { products, solutions } from '@/data/catalog';
import type { SolutionRecord } from '@/types/content';
import { B2BCtaBand } from './B2BSections';
import { InquiryForm } from './InquiryForm';
import { Container, SectionTitle } from './LayoutPrimitives';
import { ProductCard } from './ProductsCatalog';

function SolutionIcon({ icon }: { icon: SolutionRecord['icon'] }) {
  switch (icon) {
    case 'flame':
      return <Flame size={28} className="solution-alt-icon" aria-hidden="true" />;
    case 'grid':
      return <Grid3X3 size={28} className="solution-alt-icon" aria-hidden="true" />;
    case 'home':
      return <Home size={28} className="solution-alt-icon" aria-hidden="true" />;
    case 'leaf':
      return <Leaf size={28} className="solution-alt-icon" aria-hidden="true" />;
    case 'building':
      return <Building2 size={28} className="solution-alt-icon" aria-hidden="true" />;
    case 'wrench':
      return <Wrench size={28} className="solution-alt-icon" aria-hidden="true" />;
  }
}

export function SolutionsIndexView() {
  return (
    <>
      <section className="section-block">
        <Container>
          {solutions.map((sol, idx) => (
            <div className={`solution-alt-row ${idx % 2 === 1 ? 'is-reversed' : ''}`} key={sol.slug}>
              <Link href={`/solutions/${sol.slug}`} className="solution-alt-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={sol.image} alt={sol.name} className="img-cover" loading="lazy" />
              </Link>
              <div className="solution-alt-copy">
                <SolutionIcon icon={sol.icon} />
                <h2>
                  <Link href={`/solutions/${sol.slug}`}>{sol.name}</Link>
                </h2>
                <p>{sol.summary}</p>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                  <Link href={`/solutions/${sol.slug}`} className="btn-outline" style={{ minHeight: 40, padding: '8px 18px' }}>
                    <span>View System Guide</span>
                    <ChevronRight size={15} aria-hidden="true" />
                  </Link>
                  <Link href="/contact#inquiry" className="text-link">
                    <span>Request Solution Quote</span>
                    <ChevronRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Container>
      </section>

      <B2BCtaBand
        kicker="APPLICATIONS ENGINEERING"
        title="Planning a Boiler, Underfloor or Multi-Zone Heating Project?"
        description="Send our applications engineering desk your heat source, manifold layout and zone count for matched Heatnexis product recommendations."
      />
    </>
  );
}

export function SolutionDetailView({ solution }: { solution: SolutionRecord }) {
  const matchedProducts = products
    .filter((p) => solution.recommendedCategories.includes(p.category))
    .slice(0, 3);

  return (
    <>
      <section className="section-block">
        <Container>
          <div className="split-band">
            <div style={{ aspectRatio: '16 / 10', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={solution.image} alt={solution.name} className="img-cover" />
            </div>
            <div>
              <SolutionIcon icon={solution.icon} />
              <h2 style={{ margin: '12px 0 14px' }}>Plan Your Heating Control System</h2>
              <p>{solution.description}</p>
              <p>
                Share your heat source, installation wiring layout, control zones and target regional compliance. Final
                compatibility and electrical design require verification by a qualified HVAC professional.
              </p>
              <div style={{ marginTop: 22 }}>
                <a href="#inquiry" className="btn-primary">
                  <span>Request Solution Quote</span>
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
            title="Key Project Requirements"
            subtitle="Technical parameters to confirm when specifying this heating control architecture."
          />
          <div className="qa-grid">
            {solution.requirements.map((req, idx) => (
              <div className="qa-card" key={req}>
                <span className="setup-step-num" style={{ fontSize: 20 }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3>Checkpoint {idx + 1}</h3>
                  <p>{req}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-block">
        <Container>
          <SectionTitle
            title="Recommended Product Lines"
            subtitle="Heatnexis product families aligned with this heating application scenario."
          />
          <div className="product-grid">
            {matchedProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </Container>
      </section>

      <section id="inquiry" className="inquiry-backdrop-band">
        <Container>
          <div className="inquiry-card">
            <InquiryForm product={solution.name} title={`Discuss ${solution.name}`} />
          </div>
        </Container>
      </section>
    </>
  );
}
