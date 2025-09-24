import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import Heading from '@/components/Typography/Heading';

export default function Appearance() {
    return (
        <AuthenticatedLayout>
            <Head title="Appearance Settings" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Heading level={2} className="mb-4">Appearance Settings</Heading>
                            <p className="text-gray-600">Appearance settings functionality will be implemented here.</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
