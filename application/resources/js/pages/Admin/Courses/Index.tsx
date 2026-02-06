import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { router } from '@inertiajs/react';

export default function Index({ courses }: { courses: any[] }) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this course?')) {
            router.delete(route('admin.courses.destroy', id));
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Head title="Courses" />
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Courses</h1>
                    <Link href={route('admin.courses.create')}>
                        <Button>Add Course</Button>
                    </Link>
                </div>

                <div className="bg-white rounded-md shadow overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {courses.map((course) => (
                                <TableRow key={course.id}>
                                    <TableCell className="font-medium">{course.title}</TableCell>
                                    <TableCell>{course.description}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Link href={route('admin.courses.edit', course.id)}>
                                            <Button variant="outline" size="sm">Edit</Button>
                                        </Link>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(course.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {courses.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center text-gray-500 py-4">
                                        No courses found.
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
