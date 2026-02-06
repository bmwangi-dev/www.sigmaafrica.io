import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { router } from '@inertiajs/react';

export default function Index({ applications }: { applications: any[] }) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this application?')) {
            router.delete(route('admin.applications.destroy', id));
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Head title="Applications" />
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Applications</h1>
                    <Link href={route('admin.applications.create')}>
                        <Button>Add Application</Button>
                    </Link>
                </div>

                <div className="bg-white rounded-md shadow overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Organization</TableHead>
                                <TableHead>Cohort</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applications.map((app) => (
                                <TableRow key={app.id}>
                                    <TableCell className="font-medium">{app.name}</TableCell>
                                    <TableCell>{app.email}</TableCell>
                                    <TableCell>{app.phone_number}</TableCell>
                                    <TableCell>{app.organization || '-'}</TableCell>
                                    <TableCell>{app.cohort?.title || 'N/A'}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Link href={route('admin.applications.edit', app.id)}>
                                            <Button variant="outline" size="sm">Edit</Button>
                                        </Link>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(app.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {applications.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center text-gray-500 py-4">
                                        No applications found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="mt-4">
                    <Link href={route('dashboard')}>
                        <Button variant="ghost">Back to Dashboard</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
