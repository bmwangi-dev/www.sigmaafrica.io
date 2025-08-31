import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save } from 'lucide-react';

type UserData = App.DataTransferObjects.UserData;
type DepartmentData = App.DataTransferObjects.DepartmentData;

interface Props {
    user: UserData;
    departments: DepartmentData[];
    roles: Record<string, string>;
}

export default function Edit({ user, departments, roles }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        role: user.role || '',
        department_id: user.department_id?.toString() || '',
        phone_number: user.phone_number || '',
        date_of_birth: user.date_of_birth || '',
        bio: user.bio || '',
        status: user.status || 'active',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.users.update', user.id));
    };

    return (
        <AdminLayout>
            <Head title={`Edit ${user.name}`} />

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link href={route('admin.users.index')}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Users
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Edit User: {user.name}</h1>
                        <p className="text-gray-600">Update user information and settings</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter full name"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="email">Email Address *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="Enter email address"
                                        required
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="phone_number">Phone Number</Label>
                                    <Input
                                        id="phone_number"
                                        value={data.phone_number}
                                        onChange={(e) => setData('phone_number', e.target.value)}
                                        placeholder="Enter phone number"
                                    />
                                    {errors.phone_number && (
                                        <p className="text-sm text-red-600 mt-1">{errors.phone_number}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="date_of_birth">Date of Birth</Label>
                                    <Input
                                        id="date_of_birth"
                                        type="date"
                                        value={data.date_of_birth}
                                        onChange={(e) => setData('date_of_birth', e.target.value)}
                                    />
                                    {errors.date_of_birth && (
                                        <p className="text-sm text-red-600 mt-1">{errors.date_of_birth}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="bio">Biography</Label>
                                    <Textarea
                                        id="bio"
                                        value={data.bio}
                                        onChange={(e) => setData('bio', e.target.value)}
                                        placeholder="Enter a brief biography"
                                        rows={3}
                                    />
                                    {errors.bio && (
                                        <p className="text-sm text-red-600 mt-1">{errors.bio}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Account Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Account Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="password">New Password (Optional)</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Leave blank to keep current password"
                                    />
                                    {errors.password && (
                                        <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="password_confirmation">Confirm New Password</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        placeholder="Confirm new password"
                                    />
                                    {errors.password_confirmation && (
                                        <p className="text-sm text-red-600 mt-1">{errors.password_confirmation}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="role">Role *</Label>
                                    <Select
                                        value={data.role}
                                        onValueChange={(value) => setData('role', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(roles).map(([value, label]) => (
                                                <SelectItem key={value} value={value}>
                                                    {label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.role && (
                                        <p className="text-sm text-red-600 mt-1">{errors.role}</p>
                                    )}
                                    {user.is_super_admin && (
                                        <p className="text-sm text-amber-600 mt-1">
                                            Warning: You cannot change your own super admin role.
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="department_id">Department *</Label>
                                    <Select
                                        value={data.department_id}
                                        onValueChange={(value) => setData('department_id', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a department" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {departments.map((department) => (
                                                <SelectItem key={department.id} value={department.id.toString()}>
                                                    {department.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.department_id && (
                                        <p className="text-sm text-red-600 mt-1">{errors.department_id}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="status">Status *</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(value) => setData('status', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                            <SelectItem value="suspended">Suspended</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && (
                                        <p className="text-sm text-red-600 mt-1">{errors.status}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* User Info */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h4 className="font-medium text-blue-900 mb-2">User Information:</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-blue-800">
                                    <div>
                                        <strong>Created:</strong> {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                                    </div>
                                    <div>
                                        <strong>Last Login:</strong> {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
                                    </div>
                                    <div>
                                        <strong>Email Verified:</strong> {user.email_verified_at ? 'Yes' : 'No'}
                                    </div>
                                    {user.student_number && (
                                        <div>
                                            <strong>Student Number:</strong> {user.student_number}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4">
                        <Link href={route('admin.users.index')}>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            <Save className="w-4 h-4 mr-2" />
                            {processing ? 'Updating...' : 'Update User'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
