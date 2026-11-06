import React from 'react';
import TransitionLink from './TransitionLink';

/* One outline icon family: 24px grid, round caps, consistent stroke. */
const paths: Record<string, React.ReactNode> = {
  arrowUpRight: <path d="M7 17 17 7M8.5 7H17v8.5" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronUp: <path d="m6 15 6-6 6 6" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  check: <path d="m5 12.5 4.2 4.2L19 7" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  sliders: <path d="M4 7h9M17 7h3M4 17h3M11 17h9M15 5v4M9 15v4" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  phone: (
    <path d="M21 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 3.1 4.2 2 2 0 0 1 5.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L9.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  ),
  send: <path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z" />,
  list: <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />,
  thermostat: (
    <>
      <rect x="6" y="3" width="12" height="18" rx="3" />
      <circle cx="12" cy="11" r="3" />
      <path d="M9 17h6" />
    </>
  ),
  wireless: (
    <>
      <path d="M4 9a12 12 0 0 1 16 0M7 12.5a8 8 0 0 1 10 0M10 16a3 3 0 0 1 4 0" />
      <path d="M12 19.5h.01" />
    </>
  ),
  zones: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18M9 10v10M15 10v10" />
    </>
  ),
  parts: <path d="M8 4h8v5H8zM5 15h5v5H5zM14 15h5v5h-5zM12 9v3M7.5 15v-3h9v3" />,
  bolt: <path d="M13 2 5 14h6l-1 8 9-13h-6z" />,
  water: <path d="M12 2.5S5.5 10 5.5 15a6.5 6.5 0 0 0 13 0c0-5-6.5-12.5-6.5-12.5Z" />,
  flame: <path d="M12 2.5s1 4-2 7c-1.5-1.5-2.5-2.5-2.5-2.5S4 11.5 5.5 16a6.5 6.5 0 0 0 12.5-1c1-5-6-12.5-6-12.5Z" />,
};

export function Icon({
  name,
  size,
  className = '',
  flip = false,
  stroke = 1.75,
}: {
  name: string;
  size?: string;
  className?: string;
  /** Mirror directional glyphs in right-to-left locales. */
  flip?: boolean;
  stroke?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`hn-icon ${flip ? 'hn-icon-flip' : ''} ${className}`}
      style={size ? ({ '--hn-icon-size': size } as React.CSSProperties) : undefined}
    >
      {paths[name]}
    </svg>
  );
}

export const PillDot = () => (
  <span className="hn-pill-dot">
    <Icon name="arrowUpRight" flip size="1.125rem" />
  </span>
);

export const PillLink = ({ to, children, light = false, className = '' }: { to: string; children: React.ReactNode; light?: boolean; className?: string }) => (
  <TransitionLink to={to} className={`hn-pill ${light ? 'hn-pill-light' : ''} ${className}`}>
    <span>{children}</span>
    <PillDot />
  </TransitionLink>
);

/** Section heading in the three arrangements used across the site. */
export function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'split',
  className = '',
  children,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: 'split' | 'center' | 'start';
  className?: string;
  /** Extra content under the text, such as a link. */
  children?: React.ReactNode;
}) {
  if (align === 'center') {
    return (
      <div className={`mx-auto max-w-3xl text-center ${className}`}>
        <p className="hn-eyebrow mb-4">{eyebrow}</p>
        <h2 className="hn-h2">{title}</h2>
        {text && <p className="hn-lead mx-auto mt-5 max-w-xl">{text}</p>}
        {children}
      </div>
    );
  }
  if (align === 'start') {
    return (
      <div className={`max-w-2xl ${className}`}>
        <p className="hn-eyebrow mb-4">{eyebrow}</p>
        <h2 className="hn-h2">{title}</h2>
        {text && <p className="hn-lead mt-5 max-w-xl">{text}</p>}
        {children}
      </div>
    );
  }
  return (
    <div className={`grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16 ${className}`}>
      <div>
        <p className="hn-eyebrow mb-4">{eyebrow}</p>
        <h2 className="hn-h2">{title}</h2>
      </div>
      {(text || children) && (
        <div>
          {text && <p className="hn-lead">{text}</p>}
          {children}
        </div>
      )}
    </div>
  );
}
