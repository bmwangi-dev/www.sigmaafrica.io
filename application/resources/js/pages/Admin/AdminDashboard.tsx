import { Head, Link, usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { router } from '@inertiajs/react';
import { Users, GraduationCap, Building, BookOpen, Settings, BarChart3 } from 'lucide-react';
import { Header } from '@/components/ui/Header';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import StatisticsCard from '@/components/ui/StatisticsCard';

interface AdminDashboardProps extends PageProps {
    auth: {
        user: App.DataTransferObjects.AuthUserData;
    };
    stats?: {
        total_students: number;
        total_mentors: number;
        total_departments: number;
        total_courses: number;
        total_cohorts: number;
    };
}

export default function AdminDashboard() {
    const { auth, stats } = usePage<AdminDashboardProps>().props;
    const user = auth.user;

    const handleLogout = () => {
        router.post(route('logout'));
    };

    const adminMenuItems = [
        {
            title: 'User Management',
            description: 'Manage students, mentors, and staff',
            icon: Users,
            href: route('admin.users.index'),
            color: 'bg-blue-50 border-blue-200 text-blue-700',
            iconColor: 'text-blue-600',
            superAdminOnly: true,
            comingSoon: false,
        },
        {
            title: 'Department Management',
            description: 'Manage departments and their heads',
            icon: Building,
            href: route('admin.departments.index'),
            color: 'bg-green-50 border-green-200 text-green-700',
            iconColor: 'text-green-600',
            comingSoon: true,
        },
        {
            title: 'Course Management',
            description: 'Create and manage courses',
            icon: BookOpen,
            href: route('admin.courses.index'),
            color: 'bg-purple-50 border-purple-200 text-purple-700',
            iconColor: 'text-purple-600',
            comingSoon: true,
        },
        {
            title: 'Cohort Management',
            description: 'Manage student cohorts',
            icon: GraduationCap,
            href: route('admin.cohorts.index'),
            color: 'bg-orange-50 border-orange-200 text-orange-700',
            iconColor: 'text-orange-600',
            comingSoon: true,
        },
        {
            title: 'Reports & Analytics',
            description: 'View system reports and statistics',
            icon: BarChart3,
            href: route('dashboard'), // Redirect to dashboard for now
            color: 'bg-pink-50 border-pink-200 text-pink-700',
            iconColor: 'text-pink-600',
            comingSoon: true,
        },
        {
            title: 'System Settings',
            description: 'Configure system settings',
            icon: Settings,
            href: route('admin.system.settings'),
            color: 'bg-gray-50 border-gray-200 text-gray-700',
            iconColor: 'text-gray-600',
            comingSoon: true,
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />
            <Header
                className={{ background: "linear-gradient(90deg, #0a2540, #06659b)" }}
                textColor="text-white"
            >
                {stats && (
                    <StatisticsCard
                        variant="detailed"
                        gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-5"
                        stats={[
                            { title: "Total Students", value: stats.total_students, icon: <i className="fas fa-user-graduate text-blue-500 text-2xl"></i> },
                            { title: "Total Mentors", value: stats.total_mentors, icon: <i className="fas fa-chalkboard-teacher text-green-500 text-2xl"></i> },
                            { title: "Departments", value: stats.total_departments, icon: <i className="fas fa-building text-purple-500 text-2xl"></i> },
                            { title: "Courses", value: stats.total_courses, icon: <i className="fas fa-book-open text-orange-500 text-2xl"></i> },
                            { title: "Active Cohorts", value: stats.total_cohorts, icon: <i className="fas fa-users text-pink-500 text-2xl"></i> },
                        ]}
                    />
                )}
            </Header>


            <div className="min-h-screen py-6 mx-auto">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {adminMenuItems.filter(item => !(item.superAdminOnly && !user. is_super_admin))
                            .map((item) => {
                                const IconComponent = item.icon;
                                return (
                                    <Card
                                        key={item.title}
                                        className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg cursor-pointer transition-all duration-300 group"
                                    >
                                        <CardHeader className="pb-2 flex items-center gap-3">
                                            <div className="p-2 rounded-md bg-[var(--color-primary)] text-white group-hover:bg-[var(--color-migenta)] transition-colors">
                                                <IconComponent className="h-6 w-6" />
                                            </div>
                                            <CardTitle className="text-lg font-semibold text-[var(--color-sigma-blue)]">
                                                {item.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                                            <Button
                                                className="w-full bg-[var(--color-primary)] text-white hover:bg-[var(--color-migenta)] transition-colors"
                                                onClick={() => router.get(item.href)}
                                                disabled={item.comingSoon}
                                            >
                                                {item.comingSoon ? 'Coming Soon' : 'Open'}
                                            </Button>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                    </div>


                    {/* Quick Info */}
                    <Card className="bg-white border border-gray-100 shadow-sm rounded-xl">
                        <CardHeader>
                            <CardTitle className="text-[var(--color-sigma-blue)]">System Overview</CardTitle>
                            <CardDescription className="text-gray-600">
                                Your administrative privileges and access
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-medium text-[var(--color-sigma-blue)] mb-2">Your Role</h4>
                                    <p className="text-sm text-gray-700 mb-4">
                                        {user.role_label} — You have {user.is_super_admin ? 'full system access' : 'administrative access to manage users and content'}.
                                    </p>
                                    {user.department && (
                                        <>
                                            <h4 className="font-medium text-[var(--color-sigma-blue)] mb-2">Primary Department</h4>
                                            <p className="text-sm text-[var(--color-primary)] font-semibold">
                                                {user.department.name}
                                            </p>
                                        </>
                                    )}
                                </div>

                                <div>
                                    <h4 className="font-medium text-[var(--color-sigma-blue)] mb-2">Quick Actions</h4>
                                    <div className="space-y-2">
                                        {["View Recent Activity", "System Health Check", "Export Data"].map(action => (
                                            <Button
                                                key={action}
                                                variant="outline"
                                                size="sm"
                                                className="w-full justify-start hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                                            >
                                                {action}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
