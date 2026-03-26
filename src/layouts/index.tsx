import { Outlet } from 'umi';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import BulkInquiry from '@/components/BulkInquiry';
import Crisp from '@/components/Crisp';
import '@/global.css';

export default function Layout() {
  return (
    <>
      <Header />
      <main className="min-h-screen motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <BulkInquiry />
      <Crisp />
    </>
  );
}
