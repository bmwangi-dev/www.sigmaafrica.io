import React, { PropsWithChildren, ReactNode } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Users, Settings, Home, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface Props {
    header?: ReactNode;
}

export default function AppLayout({ header, children }: PropsWithChildren<Props>) {
    const { auth } = usePage().props as any;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = [
        {
            name: 'Dashboard',
            href: route('dashboard'),
            icon: Home,
            current: route().current('dashboard'),
        },
        {
            name: 'Settings',
            href: route('settings.appearance'),
            icon: Settings,
            current: route().current('settings.*'),
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold text-gray-900">App</h1>
                    </div>
                    <button
                        className="lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="w-6 h-6 text-gray-400" />
                    </button>
                </div>

                <nav className="mt-8 px-4">
                    <div className="space-y-2">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                        item.current
                                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <Icon className={`mr-3 h-5 w-5 ${
                                        item.current ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                                    }`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* User info at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
                    <div className="flex items-center">
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {auth?.user?.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                {auth?.user?.role_label}
                            </p>
                        </div>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="ml-3 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:ml-64">
                {/* Top navigation bar */}
                <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <button
                                    className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                                    onClick={() => setSidebarOpen(true)}
                                >
                                    <Menu className="w-6 h-6" />
                                </button>
                                {header && (
                                    <div className="ml-4 lg:ml-0">
                                        {header}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
