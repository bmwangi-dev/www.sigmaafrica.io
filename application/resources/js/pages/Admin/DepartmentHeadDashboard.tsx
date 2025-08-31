import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { router } from '@inertiajs/react';

interface DepartmentHeadDashboardProps {
    auth: {
        user: App.DataTransferObjects.AuthUserData;
    };
    [key: string]: any;
}

export default function DepartmentHeadDashboard() {
    const { auth } = usePage<DepartmentHeadDashboardProps>().props;
    const user = auth.user;

    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <>
            <Head title="Department Head Dashboard" />
            
            <div className="min-h-screen bg-gray-50 py-6">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Department Head Dashboard</h1>
                                <p className="mt-2 text-gray-600">
                                    Welcome back, {user.name}! Lead your department to excellence.
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Link href={route('home')}>
                                    <Button variant="outline">
                                        View Site
                                    </Button>
                                </Link>
                                <Button 
                                    variant="outline" 
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Profile Card */}
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>Your Department</CardTitle>
                            <CardDescription>Department leadership overview</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Personal Information</h4>
                                    <div className="space-y-2 text-sm text-gray-600">
                                        <p><span className="font-medium">Name:</span> {user.name}</p>
                                        <p><span className="font-medium">Email:</span> {user.email}</p>
                                        <p><span className="font-medium">Role:</span> {user.role_label}</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Your Department</h4>
                                    <div className="space-y-2 text-sm text-gray-600">
                                        {user.department ? (
                                            <p className="text-lg font-medium text-blue-600">{user.department.name}</p>
                                        ) : (
                                            <p>No department assigned</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Department Management Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Department Staff</CardTitle>
                                <CardDescription>Manage your team</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-sm mb-4">
                                    View and manage mentors and staff in your department.
                                </p>
                                <Button variant="outline" size="sm" disabled>
                                    Coming Soon
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Department Courses</CardTitle>
                                <CardDescription>Course oversight</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-sm mb-4">
                                    Oversee all courses offered by your department.
                                </p>
                                <Button variant="outline" size="sm" disabled>
                                    Coming Soon
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Department Analytics</CardTitle>
                                <CardDescription>Performance metrics</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-sm mb-4">
                                    Review department performance and student outcomes.
                                </p>
                                <Button variant="outline" size="sm" disabled>
                                    Coming Soon
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Budget & Resources</CardTitle>
                                <CardDescription>Resource management</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-sm mb-4">
                                    Manage department budget and resource allocation.
                                </p>
                                <Button variant="outline" size="sm" disabled>
                                    Coming Soon
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
