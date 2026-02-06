import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { router } from '@inertiajs/react';

interface DashboardPageProps {
    auth: {
        user: any;
    };
    [key: string]: any;
}

export default function Dashboard() {
    const { auth } = usePage<DashboardPageProps>().props;
    const user = auth.user;

    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="min-h-screen bg-gray-50 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                            <p className="mt-2 text-gray-600">
                                Maintain Courses, Cohorts and Applications
                            </p>
                        </div>
                        <Button variant="outline" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link href={route('admin.courses.index')}>
                            <Card className="hover:bg-gray-50 transition-colors cursor-pointer h-full">
                                <CardHeader>
                                    <CardTitle>Courses</CardTitle>
                                    <CardDescription>Manage curriculum and course details</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-500">View, add, edit or delete courses.</p>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href={route('admin.cohorts.index')}>
                            <Card className="hover:bg-gray-50 transition-colors cursor-pointer h-full">
                                <CardHeader>
                                    <CardTitle>Cohorts</CardTitle>
                                    <CardDescription>Manage intakes and schedules</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-500">View, add, edit or delete cohorts.</p>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href={route('admin.applications.index')}>
                            <Card className="hover:bg-gray-50 transition-colors cursor-pointer h-full">
                                <CardHeader>
                                    <CardTitle>Applications</CardTitle>
                                    <CardDescription>Manage student applications</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-500">View, add, edit or delete applications.</p>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
