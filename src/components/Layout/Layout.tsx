import { ReactNode } from 'react';
import Header from '@/components/Header/Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className="flex flex-col min-h-screen max-w-[1440px] mx-auto my-0 scroll-smooth">
      <Header />
      <main className="flex grow-1 shrink-0 basis-auto mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
