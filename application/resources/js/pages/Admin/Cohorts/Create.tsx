import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Create({ courses }: { courses: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        duration: '',
        fee: '',
        mode: 'hybrid',
        status: 'active',
        course_id: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.cohorts.store'));
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Head title="Create Cohort" />
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow">
                <h1 className="text-2xl font-bold mb-6">Create New Cohort</h1>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            required
                        />
                        {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                    </div>

                    <div>
                        <Label htmlFor="course_id">Course</Label>
                        <Select onValueChange={(value) => setData('course_id', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a course" />
                            </SelectTrigger>
                            <SelectContent>
                                {courses.map((course) => (
                                    <SelectItem key={course.id} value={course.id.toString()}>
                                        {course.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.course_id && <div className="text-red-500 text-sm mt-1">{errors.course_id}</div>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="duration">Duration</Label>
                            <Input
                                id="duration"
                                value={data.duration}
                                onChange={(e) => setData('duration', e.target.value)}
                                placeholder="e.g. 12 Weeks"
                                required
                            />
                            {errors.duration && <div className="text-red-500 text-sm mt-1">{errors.duration}</div>}
                        </div>
                        <div>
                            <Label htmlFor="fee">Fee</Label>
                            <Input
                                id="fee"
                                type="number"
                                value={data.fee}
                                onChange={(e) => setData('fee', e.target.value)}
                                required
                            />
                            {errors.fee && <div className="text-red-500 text-sm mt-1">{errors.fee}</div>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="mode">Mode</Label>
                            <Select defaultValue={data.mode} onValueChange={(value) => setData('mode', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select mode" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="hybrid">Hybrid</SelectItem>
                                    <SelectItem value="online">Online</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.mode && <div className="text-red-500 text-sm mt-1">{errors.mode}</div>}
                        </div>
                        <div>
                            <Label htmlFor="status">Status</Label>
                            <Select defaultValue={data.status} onValueChange={(value) => setData('status', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && <div className="text-red-500 text-sm mt-1">{errors.status}</div>}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Link href={route('admin.cohorts.index')}>
                            <Button variant="outline" type="button">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            Create Cohort
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
