import type { Metadata } from 'next';
import { FloatingContact } from '@/components/FloatingContact';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { site } from '@/config/site';
import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Heatnexis | Smart Thermostat OEM/ODM Manufacturer',
    template: '%s | Heatnexis',
  },
  description:
    'Heatnexis: professional B2B smart thermostat and heating control OEM/ODM solutions for global distributors, HVAC contractors and brand partners.',
  robots: {
    index: process.env.INDEX_SITE === 'true',
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
