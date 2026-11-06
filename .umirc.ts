import { defineConfig } from 'umi';
import referencePages from './src/reference/pages.json';

export default defineConfig({
  define: {
    'process.env.UMI_APP_GA_MEASUREMENT_ID': process.env.UMI_APP_GA_MEASUREMENT_ID || '',
  },
  ssr: {},
  exportStatic: {},
  routes: [
    { path: '/', component: '@/pages/index' },
    ...Object.keys(referencePages).filter(path => path.startsWith('/products/')).map(path => ({ path, component: '@/pages/products/detail' })),
    { path: '/products', component: '@/pages/products' },
    { path: '/about', component: '@/pages/about' },
    { path: '/contact', component: '@/pages/contact' },
    { path: '/inquiry', component: '@/reference/ReferencePage' },
    { path: '/*', component: '@/reference/ReferencePage' },
  ],
  esbuildMinifyIIFE: true,
  npmClient: 'pnpm',
  favicons: ['/reference/img/heatnexis-icon.png'],

});
