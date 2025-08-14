import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import NavItem from '@/components/ui/NavItem';
import sigmaLogo from '../../../public/sigma-logo.png';
import { Menu, X } from 'lucide-react';
import Link from '@/components/Typography/Link';
import PrimaryButton from '@/components/Typography/PrimaryButton';

interface NavigationItem {
    label: string;
    href: string;
    key: string;
}

const PublicNavBar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { url } = usePage(); // Get current URL from Inertia

    const navigationItems: NavigationItem[] = [
        { label: 'Home', href: '/', key: 'home' },
        { label: 'About Us', href: '/about', key: 'about' },
        { label: 'Services', href: '/services', key: 'services' },
        { label: 'Community', href: '/community', key: 'community' },
        { label: 'Contact', href: '/contact', key: 'contact' },
        { label: 'Blogs', href: '/blogs', key: 'blogs' },
    ];

    const toggleMenu = () => setMenuOpen(!menuOpen);

    // Function to determine if a navigation item is active
    const isActiveRoute = (href: string): boolean => {
        // Exact match for home page
        if (href === '/' && url === '/') {
            return true;
        }

        // For other pages, check if current URL starts with the href
        if (href !== '/' && url.startsWith(href)) {
            return true;
        }

        return false;
    };

    // Close mobile menu when clicking on a nav item
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

                {/* Desktop Navigation */}
                <ul className="hidden md:flex gap-6 items-center">
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
            </div>

            {/* Mobile Sidebar */}
            <div
                className={`fixed top-0 right-0 w-80 bg-[var(--color-secondary)] rounded-l-2xl text-content shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
                    menuOpen ? 'translate-x-0' : 'translate-x-full'
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

            {/* Overlay for mobile menu */}
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
