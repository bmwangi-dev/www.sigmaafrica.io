import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { router } from '@inertiajs/react';

interface DashboardPageProps {
    auth: {
        user: App.DataTransferObjects.AuthUserData;
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
            <Head title="Dashboard" />

            <div className="min-h-screen bg-gray-50 py-6">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                                <p className="mt-2 text-gray-600">
                                    Welcome back, {user.name}!
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </div>
                    </div>

                    {/* User Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>Your account details</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div>
                                        <span className="font-medium text-sm text-gray-500">Name:</span>
                                        <p className="text-sm">{user.name}</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-sm text-gray-500">Email:</span>
                                        <p className="text-sm">{user.email}</p>
                                    </div>
                                    {user.role_label && (
                                        <div>
                                            <span className="font-medium text-sm text-gray-500">Role:</span>
                                            <p className="text-sm">{user.role_label}</p>
                                        </div>
                                    )}
                                    {user.student_number && (
                                        <div>
                                            <span className="font-medium text-sm text-gray-500">Student Number:</span>
                                            <p className="text-sm">{user.student_number}</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {user.department && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Department</CardTitle>
                                    <CardDescription>Your department information</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <p className="text-lg font-medium">{user.department.name}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                                <CardDescription>Common tasks</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button variant="outline" size="sm" className="w-full">
                                    Update Profile
                                </Button>
                                <Link href={route('home')} className="block">
                                    <Button variant="outline" size="sm" className="w-full">
                                        Back to Home
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Welcome Message */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Welcome to Sigma Africa</CardTitle>
                            <CardDescription>Your learning journey starts here</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">
                                You have successfully registered and logged into your account.
                                From here you can manage your profile, view your courses, and access
                                all the learning resources available to you.
                            </p>

                            {user.role === 'student' && (
                                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                                    <h4 className="font-medium text-blue-900">Student Dashboard</h4>
                                    <p className="text-blue-700 text-sm mt-1">
                                        As a student, you can view your enrolled courses, track your progress,
                                        and access course materials.
                                    </p>
                                </div>
                            )}

                            {user.role === 'technical_mentor' && (
                                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                                    <h4 className="font-medium text-green-900">Mentor Dashboard</h4>
                                    <p className="text-green-700 text-sm mt-1">
                                        As a technical mentor, you can manage your courses, monitor student
                                        progress, and provide guidance to your cohorts.
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
