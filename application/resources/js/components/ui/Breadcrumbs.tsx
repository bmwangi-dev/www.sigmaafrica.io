import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
    variant?: 'default' | 'header';
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className, variant = 'default' }) => {
    const isHeader = variant === 'header';

    return (
        <nav className={cn(
            "flex py-6 px-4",
            isHeader ? "justify-center" : "container mx-auto",
            className
        )} aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link
                        href="/"
                        className={cn(
                            "inline-flex items-center text-sm font-medium transition-colors",
                            isHeader ? "text-white/70 hover:text-white" : "text-gray-400 hover:text-[var(--color-primary)]"
                        )}
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Home
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={index}>
                        <div className="flex items-center">
                            <ChevronRight className={cn(
                                "w-4 h-4 mx-1",
                                isHeader ? "text-white/40" : "text-gray-400"
                            )} />
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "ml-1 text-sm font-medium md:ml-2 transition-colors",
                                        isHeader ? "text-white/70 hover:text-white" : "text-gray-400 hover:text-[var(--color-primary)]"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className={cn(
                                    "ml-1 text-sm font-bold md:ml-2",
                                    isHeader ? "text-white" : "text-[var(--color-primary)]"
                                )}>
                                    {item.label}
                                </span>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
