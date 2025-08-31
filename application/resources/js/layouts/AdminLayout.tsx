import React, { PropsWithChildren, ReactNode, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Users, Settings, Home, LogOut, Menu, X } from "lucide-react";

interface Props {
    header?: ReactNode;
}

export default function AdminLayout({ header, children }: PropsWithChildren<Props>) {
    const { auth } = usePage().props as any;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = [
        {
            name: "Dashboard",
            href: route("dashboard"),
            icon: Home,
            current: route().current("dashboard"),
        },
        ...(auth?.user?.is_super_admin
            ? [
                {
                    name: "User Management",
                    href: route("admin.users.index"),
                    icon: Users,
                    current: route().current("admin.users.*"),
                },
            ]
            : []),
        {
            name: "Settings",
            href: route("appearance"),
            icon: Settings,
            current: route().current("settings.*"),
        },
    ];

    return (
        <>
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                    style={{ top: '64px' }} // Start below navbar
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-16 bottom-0 left-0 z-50 w-64 bg-[var(--color-sigma-blue)] text-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between px-4 border-b border-white/10">
                    <h1 className="text-lg font-bold tracking-wide">Admin Panel</h1>
                    <button
                        className="lg:hidden p-1 rounded-lg hover:bg-white/10"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="w-5 h-5 text-white/70 hover:text-white" />
                    </button>
                </div>

                {/* Navigation - with proper scrolling */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                                        item.current
                                            ? "bg-[var(--color-migenta)] text-white shadow-md"
                                            : "text-gray-200 hover:bg-white/10 hover:text-white"
                                    }`}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <Icon
                                        className={`mr-3 h-5 w-5 ${
                                            item.current ? "text-white" : "text-gray-400 group-hover:text-white"
                                        }`}
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User info at bottom */}
                    <div className="p-4 border-t border-white/10 bg-[var(--color-sigma-blue)]">
                        <div className="flex items-center justify-between">
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold truncate">{auth?.user?.name}</p>
                                <p className="text-xs text-gray-300 truncate">{auth?.user?.role_label}</p>
                            </div>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="ml-3 p-2 rounded-lg hover:bg-white/10 transition"
                                title="Logout"
                            >
                                <LogOut className="w-4 h-4 text-gray-300 hover:text-white" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="bg-gray-50" style={{ paddingLeft: 'max(0px, calc(100vw - 100vw))' }}>
                {/* Mobile menu button */}
                <div className="lg:hidden fixed top-16 left-0 right-0 z-30 p-4 bg-white border-b border-gray-200">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
                    >
                        <Menu className="w-5 h-5" />
                        <span className="font-medium">Menu</span>
                    </button>
                </div>

                {/* Content with proper spacing */}
                <main
                    className="pt-0 lg:pt-0 p-4 sm:p-6 lg:p-8 transition-all duration-300"
                    style={{
                        marginLeft: window.innerWidth >= 1024 ? '256px' : '0',
                        paddingTop: window.innerWidth < 1024 ? '60px' : '0' // Extra space for mobile menu button
                    }}
                >
                    {children}
                </main>
            </div>
        </>
    );
}
