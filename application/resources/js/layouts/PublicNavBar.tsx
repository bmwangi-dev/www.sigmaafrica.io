import React, { useState } from 'react';
import NavItem from '@/components/ui/NavItem';
import sigmaLogo from '../../../public/sigma-logo.png';
import { Menu, X } from 'lucide-react';
import Link from '@/components/Typography/Link';
import PrimaryButton from '@/components/Typography/PrimaryButton';

const PublicNavBar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

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

                <ul className="hidden md:flex gap-6 items-center">
                    <li><NavItem className="text-" href="/" active={true} >Home</NavItem></li>
                    <li><NavItem href="/" >About Us</NavItem></li>
                    <li><NavItem href="/services.html" >Services</NavItem></li>
                    <li><NavItem href="/community.html" >Community</NavItem></li>
                    <li><NavItem href="/contact.html" >Contact</NavItem></li>
                    <li><NavItem href="/blogs.html" >Blogs</NavItem></li>
                </ul>
            </div>

            <div
                className={`fixed top-0 right-0 w-50 bg-[var(--color-secondary)] rounded-l-2xl text-contnet shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${menuOpen ? 'translate-x-0' : 'translate-x-full'
                    } md:hidden`}
            >
                <div className="flex justify-end py-2 px-4">
                    <PrimaryButton onClick={toggleMenu} aria-label="Close sidebar">
                        <X size={24} />
                    </PrimaryButton>
                </div>
                <ul className="flex flex-col gap-4 p-4">
                    <li><NavItem href="/" active>Home</NavItem></li>
                    <li><NavItem href="/about.html" >About Us</NavItem></li>
                    <li><NavItem href="/services.html" >Services</NavItem></li>
                    <li><NavItem href="/community.html" >Community</NavItem></li>
                    <li><NavItem href="/contact.html" >Contact</NavItem></li>
                    <li><NavItem href="/blogs.html" >Blogs</NavItem></li>
                </ul>
            </div>
        </nav>
    );
};

export default PublicNavBar;
