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
      <main>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <BulkInquiry />
      <Crisp />
    </>
  );
}
