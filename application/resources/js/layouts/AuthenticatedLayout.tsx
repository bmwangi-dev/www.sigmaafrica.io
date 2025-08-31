import { ReactNode } from 'react';
import AuthenticatedNavBar from './AuthenticatedNavBar';
import BackToTop from '@/components/ui/BackToTop';
import NotificationCard from '@/pages/Admin/Notifications/Index';

interface AuthenticatedLayoutProps {
    children: ReactNode;
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col">
            <AuthenticatedNavBar />
            <main className="flex-1 pt-20">
                {children}
                <BackToTop />
                <NotificationCard />
            </main>
        </div>
    );
}
