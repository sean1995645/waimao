import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/products", component: "products" },
    { path: "/about", component: "about" },
    { path: "/contact", component: "contact" },
  ],
  npmClient: 'pnpm',
  title: 'HeatNexis - Floor Heating Thermostats',
  favicons: ['/heatnexis-icon.png'],
  headScripts: [
    {
      src: 'https://fonts.googleapis.com/css2?family=Lexend:wght@500;600;700;800&family=Source+Sans+3:wght@400;500;600;700&display=swap',
    },
  ],
});
