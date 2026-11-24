import Link from 'next/link';
import { Container } from '@/components/Site';

export default function NotFound() {
  return (
    <Container className="not-found">
      <h1>404 — Page Not Found</h1>
      <p style={{ maxWidth: '50ch', color: '#666' }}>
        The Heatnexis page you requested could not be found or has moved.
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link href="/" className="btn-primary">
          Return Home
        </Link>
        <Link href="/products" className="btn-outline">
          Browse Products
        </Link>
      </div>
    </Container>
  );
}
