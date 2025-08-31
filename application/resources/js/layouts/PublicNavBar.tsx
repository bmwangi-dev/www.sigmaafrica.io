import React, { useState } from 'react';
import { usePage, Link as InertiaLink, router } from '@inertiajs/react';
import NavItem from '@/components/ui/NavItem';
import sigmaLogo from '../../../public/sigma-logo.png';
import { Menu, X } from 'lucide-react';
import Link from '@/components/Typography/Link';
import PrimaryButton from '@/components/Typography/PrimaryButton';
import { Button } from '@/components/ui/button';

interface NavigationItem {
    label: string;
    href: string;
    key: string;
}

const PublicNavBar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { url } = usePage();

    const navigationItems: NavigationItem[] = [
        { label: 'Home', href: '/', key: 'home' },
        { label: 'About Us', href: '/about', key: 'about' },
        { label: 'Services', href: '/services', key: 'services' },
        { label: 'Community', href: '/community', key: 'community' },
        { label: 'Contact', href: '/contact', key: 'contact' },
        { label: 'Blogs', href: '/blogs', key: 'blogs' },
    ];

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const isActiveRoute = (href: string): boolean => {
        if (href === '/' && url === '/') {
            return true;
        }

        if (href !== '/' && url.startsWith(href)) {
            return true;
        }

        return false;
    };

    const handleNavItemClick = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="bg-[var(--color-secondary)] shadow-md relative fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <img src={sigmaLogo} alt="Sigma's logo" className="h-16" />
                </Link>

                <PrimaryButton
                    className="md:hidden text-content"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {!menuOpen && <Menu size={28} />}
                </PrimaryButton>

                <div className="hidden md:flex gap-6 items-center">
                    <ul className="flex gap-6 items-center">
                        {navigationItems.map((item) => (
                            <li key={item.key}>
                                <NavItem
                                    href={item.href}
                                    active={isActiveRoute(item.href)}
                                    className="transition-colors duration-200"
                                >
                                    {item.label}
                                </NavItem>
                            </li>
                        ))}
                    </ul>
                    <div className="flex gap-2 ml-4">
                        <InertiaLink href={route('login')}>
                            <Button variant="outline" size="sm" className='bg-[var(--color-primary)] text-white cursor-pointer hover:text-[var(--color-migenta)]'>
                                Sign In
                            </Button>
                        </InertiaLink>
                    </div>
                </div>
            </div>

            <div
                className={`fixed top-0 right-0 w-80 bg-[var(--color-secondary)] rounded-l-2xl text-content shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${menuOpen ? 'translate-x-0' : 'translate-x-full'
                    } md:hidden`}
            >
                <div className="flex justify-end py-2 px-4">
                    <PrimaryButton onClick={toggleMenu} aria-label="Close sidebar">
                        <X size={24} />
                    </PrimaryButton>
                </div>
                <ul className="flex flex-col gap-4 p-4">
                    {navigationItems.map((item) => (
                        <li key={`mobile-${item.key}`}>
                            <NavItem
                                href={item.href}
                                active={isActiveRoute(item.href)}
                                onClick={handleNavItemClick}
                                className="transition-colors duration-200"
                            >
                                {item.label}
                            </NavItem>
                        </li>
                    ))}
                </ul>
            </div>

            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={toggleMenu}
                    aria-label="Close menu overlay"
                />
            )}
        </nav>
    );
};

export default PublicNavBar;
