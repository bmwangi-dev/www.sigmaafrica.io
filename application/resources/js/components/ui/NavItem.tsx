import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import Text from '../Typography/Text';
import { clsx } from 'clsx';

interface NavItemProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    active?: boolean;
    disabled?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
    href,
    children,
    className = '',
    active = false,
    disabled = false,
    ...rest
}) => {
    const { url } = usePage().props;

    const isActive = active || url === href;

    const defaultClasses = clsx(
        'inline-block px-4 py-2 text-base transition duration-200 ease-in-out',
        {
            'text-[var(--color-sigma-blue)] cursor-not-allowed opacity-50 pointer-events-none': disabled,
            'text-[var(--color-migenta)] font-semibold': isActive && !disabled,
            'hover:text-[var(--color-migenta)]': !isActive && !disabled,
        },
        className
    );

    if (disabled) {
        return (
            <Text as="span" className={defaultClasses} {...rest}>
                {children}
            </Text>
        );
    }

    return (
        <Link href={href} className={defaultClasses} {...rest}>
            {children}
        </Link>
    );
};

export default NavItem;
