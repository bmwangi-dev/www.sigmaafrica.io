import React from 'react';
import { usePage, Link as InertiaLink, router } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';
import sigmaLogo from '../../../public/sigma-logo.png';
import { Button } from '@/components/ui/button';

const AuthenticatedNavBar: React.FC = () => {
    const { props } = usePage<PageProps & {
        auth: {
            user: App.DataTransferObjects.AuthUserData | null;
        };
    }>();
    const user = props.auth?.user;

    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <nav className="bg-[var(--color-secondary)] shadow-md fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">

                <InertiaLink href="/" className="flex items-center">
                    <img src={sigmaLogo} alt="Sigma's logo" className="h-12" />
                </InertiaLink>

                {user && (
                    <div className="text-center flex-1">
                        <h1 className="text-2xl md:text-3xl font-bold text-[color(--color-sigma-blue)]">
                            {user.is_super_admin ? 'Super Admin' : 'Admin Dashboard'}
                        </h1>
                        <p className="mt-1 text-[var(--color-migenta)] font-medium">
                            Welcome back, {user.name}!
                        </p>
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <InertiaLink href="/" target="_blank">
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-[var(--color-migenta)] text-black cursor-pointer hover:scale-[1.02] duration-200 transition-all"
                        >
                            Visit Site
                        </Button>
                    </InertiaLink>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLogout}
                        className="bg-[var(--color-primary)] text-white cursor-pointer hover:scale-[1.02] duration-200 transition-all"
                    >
                        Log Out
                    </Button>
                </div>
            </div>
        </nav>

    );
};

export default AuthenticatedNavBar;
