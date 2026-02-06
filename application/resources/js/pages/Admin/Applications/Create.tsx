import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Create({ cohorts }: { cohorts: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone_number: '',
        organization: '',
        cohort_id: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.applications.store'));
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Head title="Create Application" />
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow">
                <h1 className="text-2xl font-bold mb-6">Create New Application</h1>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                    </div>

                    <div>
                        <Label htmlFor="phone_number">Phone Number</Label>
                        <Input
                            id="phone_number"
                            value={data.phone_number}
                            onChange={(e) => setData('phone_number', e.target.value)}
                            required
                        />
                        {errors.phone_number && <div className="text-red-500 text-sm mt-1">{errors.phone_number}</div>}
                    </div>

                    <div>
                        <Label htmlFor="organization">Organization</Label>
                        <Input
                            id="organization"
                            value={data.organization}
                            onChange={(e) => setData('organization', e.target.value)}
                            placeholder="Optional"
                        />
                        {errors.organization && <div className="text-red-500 text-sm mt-1">{errors.organization}</div>}
                    </div>

                    <div>
                        <Label htmlFor="cohort_id">Cohort</Label>
                        <Select onValueChange={(value) => setData('cohort_id', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a cohort" />
                            </SelectTrigger>
                            <SelectContent>
                                {cohorts.map((cohort) => (
                                    <SelectItem key={cohort.id} value={cohort.id.toString()}>
                                        {cohort.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.cohort_id && <div className="text-red-500 text-sm mt-1">{errors.cohort_id}</div>}
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Link href={route('admin.applications.index')}>
                            <Button variant="outline" type="button">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            Create Application
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
