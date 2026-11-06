import { Outlet } from 'umi';
import Crisp from '@/components/Crisp';
import '@/global.css';

export default function Layout() {
  return <><Outlet /><Crisp /></>;
}
