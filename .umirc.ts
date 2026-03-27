import { defineConfig } from 'umi';
import { products } from './src/data/products';

const productDetailRoutes = products.map((product) => `/products/${product.slug}`);

export default defineConfig({
  ssr: {
    useStream: false,
  },
  exportStatic: {
    extraRoutePaths: productDetailRoutes,
  },
  routes: [
    { path: '/', component: 'index' },
    { path: '/products/:slug', component: 'products/detail' },
    { path: '/products', component: 'products' },
    { path: '/about', component: 'about' },
    { path: '/contact', component: 'contact' },
  ],
  esbuildMinifyIIFE: true,
  npmClient: 'pnpm',
  favicons: ['/heatnexis-icon.png'],
  links: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Lexend:wght@500;600;700;800&family=Source+Sans+3:wght@400;500;600;700&display=swap',
    },
  ],
});
