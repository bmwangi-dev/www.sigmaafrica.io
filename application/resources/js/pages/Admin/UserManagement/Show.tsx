import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Edit, Mail, Phone, Calendar, MapPin, Users, BookOpen, GraduationCap, Award, Activity } from 'lucide-react';

type UserData = App.DataTransferObjects.UserData;
type DepartmentData = App.DataTransferObjects.DepartmentData;
type CohortData = App.DataTransferObjects.CohortData;
type CourseData = App.DataTransferObjects.CourseData;

interface Props {
    user: UserData;
    additional_data: {
        student_cohort?: CohortData;
        student_course?: CourseData;
        cohort_mentors?: UserData[];
        cohort_peers?: UserData[];
        mentor_courses?: CourseData[];
        mentor_cohorts?: CohortData[];
        mentoring_students?: UserData[];
        managed_departments?: DepartmentData[];
        admin_departments?: DepartmentData[];
        recent_activities?: any[];
    };
    stats: {
        total_login_days: number;
        account_age_days: number;
        last_activity: string;
        cohort_progress?: number;
        cohort_peers_count?: number;
        courses_count?: number;
        cohorts_count?: number;
        students_mentoring?: number;
    };
}

export default function Show({ user, additional_data, stats }: Props) {
    const getStatusBadge = (status: string) => {
        const variants: Record<string, string> = {
            active: 'bg-green-100 text-green-800',
            inactive: 'bg-gray-100 text-gray-800',
            suspended: 'bg-red-100 text-red-800'
        };

        return (
            <Badge className={variants[status] || variants.inactive}>
                {status}
            </Badge>
        );
    };

    const getRoleBadge = (role: string, roleLabel: string) => {
        const variants: Record<string, string> = {
            super_admin: 'bg-purple-100 text-purple-800',
            admin: 'bg-blue-100 text-blue-800',
            department_head: 'bg-orange-100 text-orange-800',
            technical_mentor: 'bg-green-100 text-green-800',
            student: 'bg-gray-100 text-gray-800'
        };

        return (
            <Badge className={variants[role] || variants.student}>
                {roleLabel}
            </Badge>
        );
    };

    return (
        <AdminLayout>
            <Head title={`${user.name} - User Details`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('admin.users.index')}>
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Users
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold">{user.name}</h1>
                            <div className="flex items-center gap-2 mt-1">
                                {getRoleBadge(user.role!, user.role_label!)}
                                {getStatusBadge(user.status!)}
                            </div>
                        </div>
                    </div>
                    <Link href={route('admin.users.edit', user.id)}>
                        <Button>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit User
                        </Button>
                    </Link>
                </div>

                {/* User Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-8 h-8 text-blue-500" />
                                <div>
                                    <p className="text-sm text-gray-600">Account Age</p>
                                    <p className="text-lg font-semibold">{stats.account_age_days} days</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <Activity className="w-8 h-8 text-green-500" />
                                <div>
                                    <p className="text-sm text-gray-600">Last Activity</p>
                                    <p className="text-lg font-semibold">{stats.last_activity}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {user.is_student && stats.cohort_progress !== undefined && (
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <GraduationCap className="w-8 h-8 text-purple-500" />
                                    <div>
                                        <p className="text-sm text-gray-600">Cohort Progress</p>
                                        <p className="text-lg font-semibold">{Math.round(stats.cohort_progress)}%</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {user.is_technical_mentor && (
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <Users className="w-8 h-8 text-orange-500" />
                                    <div>
                                        <p className="text-sm text-gray-600">Students Mentoring</p>
                                        <p className="text-lg font-semibold">{stats.students_mentoring || 0}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <Award className="w-8 h-8 text-yellow-500" />
                                <div>
                                    <p className="text-sm text-gray-600">Email Status</p>
                                    <p className="text-lg font-semibold">
                                        {user.email_verified_at ? 'Verified' : 'Unverified'}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* User Information */}
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle>User Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gray-500" />
                                <span className="text-sm">{user.email}</span>
                            </div>

                            {user.phone_number && (
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm">{user.phone_number}</span>
                                </div>
                            )}

                            {user.date_of_birth && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm">{new Date(user.date_of_birth).toLocaleDateString()}</span>
                                </div>
                            )}

                            {user.student_number && (
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Student Number</p>
                                    <p className="text-lg font-mono">{user.student_number}</p>
                                </div>
                            )}

                            {user.bio && (
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Biography</p>
                                    <p className="text-sm text-gray-600 mt-1">{user.bio}</p>
                                </div>
                            )}

                            <div className="pt-4 border-t">
                                <p className="text-xs text-gray-500">
                                    Created: {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                                </p>
                                <p className="text-xs text-gray-500">
                                    Updated: {user.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Role-specific Content */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>
                                {user.is_student && 'Student Details'}
                                {user.is_technical_mentor && 'Mentor Details'}
                                {user.is_department_head && 'Department Head Details'}
                                {(user.is_admin && !user.is_super_admin) && 'Admin Details'}
                                {user.is_super_admin && 'Super Admin Details'}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="overview" className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="relationships">Relationships</TabsTrigger>
                                    <TabsTrigger value="activity">Activity</TabsTrigger>
                                </TabsList>

                                <TabsContent value="overview" className="space-y-4">
                                    {/* Student Overview */}
                                    {user.is_student && (
                                        <div className="space-y-4">
                                            {additional_data.student_cohort && (
                                                <div>
                                                    <h4 className="font-medium mb-2">Current Cohort</h4>
                                                    <Card>
                                                        <CardContent className="p-4">
                                                            <div className="flex justify-between items-start mb-2">
                                                                <div>
                                                                    <h5 className="font-medium">{additional_data.student_cohort.title}</h5>
                                                                    <p className="text-sm text-gray-600">{additional_data.student_cohort.cohort_number}</p>
                                                                </div>
                                                                <Badge className="bg-blue-100 text-blue-800">
                                                                    {additional_data.student_cohort.status}
                                                                </Badge>
                                                            </div>
                                                            {additional_data.student_cohort.completion_percentage !== undefined && (
                                                                <div className="mt-3">
                                                                    <div className="flex justify-between text-sm mb-1">
                                                                        <span>Progress</span>
                                                                        <span>{Math.round(additional_data.student_cohort.completion_percentage)}%</span>
                                                                    </div>
                                                                    <Progress value={additional_data.student_cohort.completion_percentage} />
                                                                </div>
                                                            )}
                                                            <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                                                                <div>
                                                                    <span className="text-gray-600">Duration:</span> {additional_data.student_cohort.duration_weeks} weeks
                                                                </div>
                                                                <div>
                                                                    <span className="text-gray-600">Students:</span> {additional_data.student_cohort.current_students}/{additional_data.student_cohort.max_students}
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            )}

                                            {additional_data.student_course && (
                                                <div>
                                                    <h4 className="font-medium mb-2">Course</h4>
                                                    <Card>
                                                        <CardContent className="p-4">
                                                            <h5 className="font-medium">{additional_data.student_course.name}</h5>
                                                            {additional_data.student_course.description && (
                                                                <p className="text-sm text-gray-600 mt-1">{additional_data.student_course.description}</p>
                                                            )}
                                                            <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                                                                <div>
                                                                    <span className="text-gray-600">Duration:</span> {additional_data.student_course.duration_weeks} weeks
                                                                </div>
                                                                {additional_data.student_course.price && (
                                                                    <div>
                                                                        <span className="text-gray-600">Price:</span> ${additional_data.student_course.price}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Mentor Overview */}
                                    {user.is_technical_mentor && (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <Card>
                                                    <CardContent className="p-4 text-center">
                                                        <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                                                        <p className="text-2xl font-bold">{stats.courses_count}</p>
                                                        <p className="text-sm text-gray-600">Courses</p>
                                                    </CardContent>
                                                </Card>
                                                <Card>
                                                    <CardContent className="p-4 text-center">
                                                        <GraduationCap className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                                        <p className="text-2xl font-bold">{stats.cohorts_count}</p>
                                                        <p className="text-sm text-gray-600">Cohorts</p>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </div>
                                    )}

                                    {/* Admin Overview */}
                                    {(user.is_admin || user.is_super_admin) && (
                                        <div>
                                            <h4 className="font-medium mb-2">System Access</h4>
                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                                <p className="text-blue-800 font-medium">
                                                    {user.is_super_admin ? 'Full System Administrator' : 'Administrator'}
                                                </p>
                                                <p className="text-sm text-blue-700 mt-1">
                                                    {user.is_super_admin
                                                        ? 'Has complete access to all system features and user management.'
                                                        : 'Has administrative access to manage content and assigned departments.'
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </TabsContent>

                                <TabsContent value="relationships" className="space-y-4">
                                    {/* Student Relationships */}
                                    {user.is_student && (
                                        <>
                                            {additional_data.cohort_mentors && additional_data.cohort_mentors.length > 0 && (
                                                <div>
                                                    <h4 className="font-medium mb-2">Cohort Mentors</h4>
                                                    <div className="space-y-2">
                                                        {additional_data.cohort_mentors.map((mentor) => (
                                                            <Card key={mentor.id}>
                                                                <CardContent className="p-3">
                                                                    <div className="flex items-center justify-between">
                                                                        <div>
                                                                            <p className="font-medium">{mentor.name}</p>
                                                                            <p className="text-sm text-gray-600">{mentor.email}</p>
                                                                        </div>
                                                                        <Link href={route('admin.users.show', mentor.id)}>
                                                                            <Button variant="outline" size="sm">View</Button>
                                                                        </Link>
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {additional_data.cohort_peers && additional_data.cohort_peers.length > 0 && (
                                                <div>
                                                    <h4 className="font-medium mb-2">Cohort Peers ({additional_data.cohort_peers.length})</h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                        {additional_data.cohort_peers.slice(0, 6).map((peer) => (
                                                            <Card key={peer.id}>
                                                                <CardContent className="p-3">
                                                                    <div className="flex items-center justify-between">
                                                                        <div>
                                                                            <p className="text-sm font-medium">{peer.name}</p>
                                                                            <p className="text-xs text-gray-600">{peer.student_number}</p>
                                                                        </div>
                                                                        <Link href={route('admin.users.show', peer.id)}>
                                                                            <Button variant="outline" size="sm">View</Button>
                                                                        </Link>
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                        ))}
                                                    </div>
                                                    {additional_data.cohort_peers.length > 6 && (
                                                        <p className="text-sm text-gray-600 mt-2">
                                                            And {additional_data.cohort_peers.length - 6} more peers...
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {/* Mentor Relationships */}
                                    {user.is_technical_mentor && additional_data.mentoring_students && additional_data.mentoring_students.length > 0 && (
                                        <div>
                                            <h4 className="font-medium mb-2">Students Mentoring ({additional_data.mentoring_students.length})</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {additional_data.mentoring_students.slice(0, 8).map((student) => (
                                                    <Card key={student.id}>
                                                        <CardContent className="p-3">
                                                            <div className="flex items-center justify-between">
                                                                <div>
                                                                    <p className="text-sm font-medium">{student.name}</p>
                                                                    <p className="text-xs text-gray-600">{student.student_number}</p>
                                                                </div>
                                                                <Link href={route('admin.users.show', student.id)}>
                                                                    <Button variant="outline" size="sm">View</Button>
                                                                </Link>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </div>
                                            {additional_data.mentoring_students.length > 8 && (
                                                <p className="text-sm text-gray-600 mt-2">
                                                    And {additional_data.mentoring_students.length - 8} more students...
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </TabsContent>

                                <TabsContent value="activity" className="space-y-4">
                                    <div>
                                        <h4 className="font-medium mb-2">Recent Activity</h4>
                                        {additional_data.recent_activities && additional_data.recent_activities.length > 0 ? (
                                            <div className="space-y-2">
                                                {additional_data.recent_activities.map((activity: any) => (
                                                    <Card key={activity.id}>
                                                        <CardContent className="p-3">
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <p className="text-sm font-medium capitalize">
                                                                        {activity.action.replace('_', ' ')}
                                                                    </p>
                                                                    {activity.description && (
                                                                        <p className="text-sm text-gray-600">{activity.description}</p>
                                                                    )}
                                                                </div>
                                                                <span className="text-xs text-gray-500">
                                                                    {activity.created_at_human}
                                                                </span>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                                <p className="text-gray-600 text-center">
                                                    No recent activity found.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
