import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { router } from '@inertiajs/react';

interface MentorDashboardProps {
    auth: {
        user: App.DataTransferObjects.AuthUserData;
    };
    [key: string]: any;
}

export default function MentorDashboard() {
    const { auth } = usePage<MentorDashboardProps>().props;
    const user = auth.user;

    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <>
            <Head title="Mentor Dashboard" />
            
            <div className="min-h-screen bg-gray-50 py-6">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Mentor Dashboard</h1>
                                <p className="mt-2 text-gray-600">
                                    Welcome back, {user.name}! Guide and inspire your students.
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
                            <CardTitle>Your Profile</CardTitle>
                            <CardDescription>Your mentor information</CardDescription>
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
                                    <h4 className="font-medium text-gray-900 mb-2">Department</h4>
                                    <div className="space-y-2 text-sm text-gray-600">
                                        {user.department ? (
                                            <p>{user.department.name}</p>
                                        ) : (
                                            <p>No department assigned</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Mentor Features Coming Soon */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>My Courses</CardTitle>
                                <CardDescription>Courses you are mentoring</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-sm mb-4">
                                    View and manage the courses you are assigned to mentor.
                                </p>
                                <Button variant="outline" size="sm" disabled>
                                    Coming Soon
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>My Cohorts</CardTitle>
                                <CardDescription>Student cohorts under your guidance</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-sm mb-4">
                                    Monitor progress and communicate with your student cohorts.
                                </p>
                                <Button variant="outline" size="sm" disabled>
                                    Coming Soon
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Student Progress</CardTitle>
                                <CardDescription>Track student performance</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-sm mb-4">
                                    Review assignments, grades, and provide feedback.
                                </p>
                                <Button variant="outline" size="sm" disabled>
                                    Coming Soon
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Schedule</CardTitle>
                                <CardDescription>Your mentoring schedule</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-sm mb-4">
                                    Manage your mentoring sessions and availability.
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
