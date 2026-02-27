import PublicNavBar from './PublicNavBar';
import PublicFooter from './PublicFooter';
import BackToTop from '@/components/ui/BackToTop';
import AcademyAdvert from '@/components/ui/AcademyAdvert';

import { ReactNode } from 'react';

interface UnauthenticatedLayoutProps {
    children: ReactNode;
    onlyHome?: boolean;
}

export default function UnauthenticatedLayout({ children, onlyHome = false }: UnauthenticatedLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="sticky top-0 z-50">
                <AcademyAdvert />
                <PublicNavBar onlyHome={onlyHome} />
            </div>
            <main className="flex-1">
                {children}
                <BackToTop />
            </main>
            <PublicFooter />
        </div>
    );
}
