'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import type { PageRecord } from '@/data/pages';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`container ${className}`}>{children}</div>;
}

export function SectionTitle({
  title,
  subtitle,
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  return (
    <div className="section-header">
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

export function Breadcrumb({ page }: { page: PageRecord }) {
  return (
    <div className="breadcrumb-bar">
      <Container>
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} aria-hidden="true" />
          {page.parent && (
            <>
              <Link href={page.parent.href}>{page.parent.label}</Link>
              <ChevronRight size={14} aria-hidden="true" />
            </>
          )}
          <span aria-current="page">{page.title}</span>
        </nav>
      </Container>
    </div>
  );
}

export function Pagination({
  current,
  total,
  base,
}: {
  current: number;
  total: number;
  base: string;
}) {
  if (total <= 1) return null;
  return (
    <nav className="pagination" aria-label="Pagination">
      {Array.from({ length: total }, (_, i) => {
        const pageNum = i + 1;
        const href = `${base}${base.includes('?') ? '&' : '?'}page=${pageNum}`;
        return (
          <Link key={pageNum} href={href} aria-current={current === pageNum ? 'page' : undefined}>
            {pageNum}
          </Link>
        );
      })}
    </nav>
  );
}

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'idle' | 'pending' | 'visible'>('idle');

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.96) return;
    setState('pending');
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState('visible');
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} data-reveal={state === 'idle' ? undefined : state}>
      {children}
    </div>
  );
}
