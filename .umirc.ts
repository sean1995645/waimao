import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env.UMI_APP_GA_MEASUREMENT_ID': process.env.UMI_APP_GA_MEASUREMENT_ID || '',
  },
  ssr: {
     // 更多配置
    forceInitial: true,
    devServerRender: true,
    mode: 'stream',
    staticMarkup: true,
  },
  exportStatic: { htmlSuffix: true },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/products/:slug', component: '@/pages/products/detail' },
    { path: '/products', component: '@/pages/products' },
    { path: '/about', component: '@/pages/about' },
    { path: '/contact', component: '@/pages/contact' },
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
