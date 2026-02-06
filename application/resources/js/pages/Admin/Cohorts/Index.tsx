import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { router } from '@inertiajs/react';

export default function Index({ cohorts }: { cohorts: any[] }) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this cohort?')) {
            router.delete(route('admin.cohorts.destroy', id));
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Head title="Cohorts" />
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Cohorts</h1>
                    <Link href={route('admin.cohorts.create')}>
                        <Button>Add Cohort</Button>
                    </Link>
                </div>

                <div className="bg-white rounded-md shadow overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Course</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Fee</TableHead>
                                <TableHead>Mode</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cohorts.map((cohort) => (
                                <TableRow key={cohort.id}>
                                    <TableCell className="font-medium">{cohort.title}</TableCell>
                                    <TableCell>{cohort.course?.title || 'N/A'}</TableCell>
                                    <TableCell>{cohort.duration}</TableCell>
                                    <TableCell>{cohort.fee}</TableCell>
                                    <TableCell className="capitalize">{cohort.mode}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded text-xs ${cohort.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {cohort.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Link href={route('admin.cohorts.edit', cohort.id)}>
                                            <Button variant="outline" size="sm">Edit</Button>
                                        </Link>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(cohort.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {cohorts.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center text-gray-500 py-4">
                                        No cohorts found.
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
