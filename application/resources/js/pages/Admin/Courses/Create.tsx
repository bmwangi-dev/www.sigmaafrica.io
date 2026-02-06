import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.courses.store'));
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Head title="Create Course" />
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow">
                <h1 className="text-2xl font-bold mb-6">Create New Course</h1>

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
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Link href={route('admin.courses.index')}>
                            <Button variant="outline" type="button">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            Create Course
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
