import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Pagination } from '@/components/ui/pagination';
import { usePagination } from '@/hooks/usePagination';
import { Trash2, Edit, Eye, MoreVertical, UserPlus, Filter, Download } from 'lucide-react';
import type { Pagination as PaginationType } from '../../../types/Pagination';

type DepartmentData = App.DataTransferObjects.DepartmentData;
type UserData = App.DataTransferObjects.UserData;

interface Props {
    users: PaginationType<UserData>;
    departments: DepartmentData[];
    roles: Record<string, string>;
    filters: {
        search?: string;
        role?: string;
        department_id?: string;
        status?: string;
        sort?: string;
        direction?: string;
    };
}

export default function Index({ users, departments, roles, filters }: Props) {
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [searchInput, setSearchInput] = useState(filters.search || '');

    const pagination = usePagination({
        preserveState: true,
        preserveScroll: true,
        only: ['users'],
    });

    // Debounced search
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        pagination.search(searchInput, {
            role: filters.role,
            department_id: filters.department_id,
            status: filters.status,
            sort: filters.sort,
            direction: filters.direction,
        });
    };

    const handleFilter = (key: keyof Props["filters"], value: string) => {
        const currentFilters = {
            search: filters.search,
            role: filters.role,
            department_id: filters.department_id,
            status: filters.status,
            sort: filters.sort,
            direction: filters.direction,
        };

        const newFilters = { ...currentFilters, [key]: value };
        if (!value) delete newFilters[key];

        pagination.applyFilters(newFilters);
    };

    const clearFilters = () => {
        setSearchInput('');
        pagination.clearFilters();
    };

    const handlePageChange = (page: number) => {
        pagination.goToPage(page, {
            search: filters.search,
            role: filters.role,
            department_id: filters.department_id,
            status: filters.status,
            sort: filters.sort,
            direction: filters.direction,
        });
    };

    const handlePageSizeChange = (pageSize: number) => {
        pagination.changePageSize(pageSize);
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedUsers(users.data.map(user => user.id));
        } else {
            setSelectedUsers([]);
        }
    };

    const handleSelectUser = (userId: number, checked: boolean) => {
        if (checked) {
            setSelectedUsers([...selectedUsers, userId]);
        } else {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        }
    };

    const handleBulkAction = (action: string) => {
        if (selectedUsers.length === 0) return;

        const actionLabels: Record<string, string> = {
            activate: 'activate',
            deactivate: 'deactivate',
            suspend: 'suspend',
            delete: 'delete'
        };

        if (confirm(`Are you sure you want to ${actionLabels[action]} ${selectedUsers.length} user(s)?`)) {
            router.post(route('admin.users.bulk-action'), {
                action,
                user_ids: selectedUsers
            }, {
                onSuccess: () => setSelectedUsers([])
            });
        }
    };

    const handleDelete = (user: UserData) => {
        if (confirm(`Are you sure you want to delete ${user.name}? This action cannot be undone.`)) {
            router.delete(route('admin.users.destroy', user.id));
        }
    };

    const getStatusBadge = (status: string) => {
        const variants: Record<string, string> = {
            active: 'bg-green-100 text-green-800 border-green-200',
            inactive: 'bg-gray-100 text-gray-800 border-gray-200',
            suspended: 'bg-red-100 text-red-800 border-red-200'
        };

        return (
            <Badge className={`${variants[status] || variants.inactive} border`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    const getRoleBadge = (role: string, roleLabel: string) => {
        const variants: Record<string, string> = {
            super_admin: 'bg-purple-100 text-purple-800 border-purple-200',
            admin: 'bg-blue-100 text-blue-800 border-blue-200',
            department_head: 'bg-orange-100 text-orange-800 border-orange-200',
            technical_mentor: 'bg-green-100 text-green-800 border-green-200',
            student: 'bg-gray-100 text-gray-800 border-gray-200'
        };

        return (
            <Badge className={`${variants[role] || variants.student} border`}>
                {roleLabel}
            </Badge>
        );
    };

    const hasActiveFilters = Object.values(filters).some(filter => filter && filter.length > 0);

    return (
        <AuthenticatedLayout>
            <AdminLayout>
                <Head title="User Management" />

                <div className="space-y-6">
                    <div className="flex justify-between items-center bg-[var(--color-header-gradient)] p-6 rounded-xl shadow-md">
                        <div>
                            <h1 className="text-3xl font-bold">User Management</h1>
                            <p className="opacity-90">Manage all system users and their roles</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="border-white hover:bg-white hover:text-[var(--color-primary)] transition">
                                <Download className="w-4 h-4 mr-2" />
                                Export
                            </Button>
                            <Link href={route('admin.users.create')}>
                                <Button className="bg-[var(--color-migenta)] hover:bg-orange-500 transition">
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Add User
                                </Button>
                            </Link>
                        </div>
                    </div>


                    {users.data.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <Card className="bg-[var(--color-primary)] text-white shadow-lg rounded-2xl">
                                <CardContent className="p-6 text-center">
                                    <p className="text-3xl font-bold">{users.total}</p>
                                    <p className="text-sm opacity-80">Total Users</p>
                                </CardContent>
                            </Card>

                            <Card className="bg-green-600 text-white shadow-lg rounded-2xl">
                                <CardContent className="p-6 text-center">
                                    <p className="text-3xl font-bold">
                                        {users.data.filter(u => u.status === 'active').length}
                                    </p>
                                    <p className="text-sm opacity-80">Active Users</p>
                                </CardContent>
                            </Card>

                            <Card className="bg-purple-600 text-white shadow-lg rounded-2xl">
                                <CardContent className="p-6 text-center">
                                    <p className="text-3xl font-bold">
                                        {users.data.filter(u => u.role === 'student').length}
                                    </p>
                                    <p className="text-sm opacity-80">Students</p>
                                </CardContent>
                            </Card>

                            <Card className="bg-orange-600 text-white shadow-lg rounded-2xl">
                                <CardContent className="p-6 text-center">
                                    <p className="text-3xl font-bold">
                                        {users.data.filter(u => u.role === 'technical_mentor').length}
                                    </p>
                                    <p className="text-sm opacity-80">Mentors</p>
                                </CardContent>
                            </Card>
                        </div>

                    )}

                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-lg">Search & Filter</CardTitle>
                                <div className="flex gap-2">
                                    {hasActiveFilters && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={clearFilters}
                                        >
                                            Clear Filters
                                        </Button>
                                    )}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setShowFilters(!showFilters)}
                                    >
                                        <Filter className="w-4 h-4 mr-2" />
                                        {showFilters ? 'Hide' : 'Show'} Filters
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <form onSubmit={handleSearchSubmit} className="flex gap-2">
                                <Input
                                    placeholder="Search by name, email, or student number..."
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    className="flex-1"
                                />
                                <Button type="submit" variant="outline">
                                    Search
                                </Button>
                            </form>

                            {showFilters && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Role</label>
                                        <Select
                                            value={filters.role || ''}
                                            onValueChange={(value) => handleFilter('role', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="All roles" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="">All roles</SelectItem>
                                                {Object.entries(roles).map(([value, label]) => (
                                                    <SelectItem key={value} value={value}>{label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Department</label>
                                        <Select
                                            value={filters.department_id || ''}
                                            onValueChange={(value) => handleFilter('department_id', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="All departments" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="">All departments</SelectItem>
                                                {departments.map((dept) => (
                                                    <SelectItem key={dept.id} value={dept.id.toString()}>
                                                        {dept.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Status</label>
                                        <Select
                                            value={filters.status || ''}
                                            onValueChange={(value) => handleFilter('status', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="All statuses" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="">All statuses</SelectItem>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="inactive">Inactive</SelectItem>
                                                <SelectItem value="suspended">Suspended</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {selectedUsers.length > 0 && (
                        <Card className="border-orange-200 bg-orange-50">
                            <CardContent className="py-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-medium">
                                            {selectedUsers.length} user(s) selected
                                        </span>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => setSelectedUsers([])}
                                        >
                                            Clear Selection
                                        </Button>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleBulkAction('activate')}
                                            className="text-green-700 border-green-200 hover:bg-green-50"
                                        >
                                            Activate
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleBulkAction('deactivate')}
                                            className="text-gray-700 border-gray-200 hover:bg-gray-50"
                                        >
                                            Deactivate
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleBulkAction('suspend')}
                                            className="text-yellow-700 border-yellow-200 hover:bg-yellow-50"
                                        >
                                            Suspend
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleBulkAction('delete')}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <Card>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="border-b bg-gray-50">
                                        <tr>
                                            <th className="text-left p-4 w-12">
                                                <Checkbox
                                                    checked={selectedUsers.length === users.data.length && users.data.length > 0}
                                                    onCheckedChange={handleSelectAll}
                                                />
                                            </th>
                                            <th className="text-left p-4 font-medium">User</th>
                                            <th className="text-left p-4 font-medium">Role</th>
                                            <th className="text-left p-4 font-medium">Department</th>
                                            <th className="text-left p-4 font-medium">Status</th>
                                            <th className="text-left p-4 font-medium">Created</th>
                                            <th className="text-left p-4 font-medium w-24">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.data.map((user) => (
                                            <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                                                <td className="p-4">
                                                    <Checkbox
                                                        checked={selectedUsers.includes(user.id)}
                                                        onCheckedChange={(checked) => handleSelectUser(user.id, checked === true)}
                                                    />
                                                </td>
                                                <td className="p-4">
                                                    <div>
                                                        <div className="font-medium text-gray-900">{user.name}</div>
                                                        <div className="text-sm text-gray-600">{user.email}</div>
                                                        {user.student_number && (
                                                            <div className="text-sm text-gray-500 font-mono">#{user.student_number}</div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    {getRoleBadge(user.role!, user.role_label!)}
                                                </td>
                                                <td className="p-4">
                                                    <span className="text-sm text-gray-700">
                                                        {departments.find(d => d.id === user.department_id)?.name || 'N/A'}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    {getStatusBadge(user.status!)}
                                                </td>
                                                <td className="p-4">
                                                    <span className="text-sm text-gray-600">
                                                        {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                                <MoreVertical className="w-4 h-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem asChild>
                                                                <Link href={route('admin.users.show', user.id)}>
                                                                    <Eye className="w-4 h-4 mr-2" />
                                                                    View Details
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem asChild>
                                                                <Link href={route('admin.users.edit', user.id)}>
                                                                    <Edit className="w-4 h-4 mr-2" />
                                                                    Edit User
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => handleDelete(user)}
                                                                className="text-red-600 focus:text-red-600"
                                                            >
                                                                <Trash2 className="w-4 h-4 mr-2" />
                                                                Delete User
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {users.data.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <UserPlus className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                                    <p className="text-gray-500 mb-4">
                                        {hasActiveFilters
                                            ? 'Try adjusting your search criteria or filters.'
                                            : 'Get started by creating your first user.'
                                        }
                                    </p>
                                    {!hasActiveFilters && (
                                        <Link href={route('admin.users.create')}>
                                            <Button>
                                                <UserPlus className="w-4 h-4 mr-2" />
                                                Create User
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            )}

                            {users.data.length > 0 && (
                                <div className="border-t border-gray-200 p-4">
                                    <Pagination
                                        pagination={users}
                                        onPageChange={handlePageChange}
                                        onPageSizeChange={handlePageSizeChange}
                                        showPageSizeSelector={true}
                                        pageSizeOptions={[10, 15, 25, 50, 100]}
                                        showInfo={true}
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </AdminLayout>
        </AuthenticatedLayout>

    );
}
