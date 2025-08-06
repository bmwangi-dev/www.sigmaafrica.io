import PublicNavBar from './PublicNavBar';
import PublicFooter from './PublicFooter';
import { ReactNode } from 'react';

interface UnauthenticatedLayoutProps {
  children: ReactNode;
}

export default function UnauthenticatedLayout({ children }: UnauthenticatedLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNavBar />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}
