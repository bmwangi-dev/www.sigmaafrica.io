import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import Heading from '@/components/Typography/Heading';
import PrimaryButton from '@/components/Typography/PrimaryButton';

type ProfileForm = {
    name: string;
    email: string;
};

export default function Profile({ mustVerifyEmail = false, status }: { mustVerifyEmail?: boolean; status?: string }) {
    const user = usePage().props.auth?.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<ProfileForm>({
        name: user?.name || '',
        email: user?.email || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch('/user/profile-information', {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Profile Settings" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className="max-w-xl">
                            <Heading level={2} className="mb-4">Profile Information</Heading>
                            <p className="mt-1 text-sm text-gray-600">
                                Update your account's profile information and email address.
                            </p>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        autoComplete="name"
                                    />
                                    {errors.name && <div className="text-red-600 text-sm mt-2">{errors.name}</div>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        autoComplete="username"
                                    />
                                    {errors.email && <div className="text-red-600 text-sm mt-2">{errors.email}</div>}
                                </div>

                                {mustVerifyEmail && user && !user.email_verified_at && (
                                    <div>
                                        <p className="text-sm text-gray-800">
                                            Your email address is unverified.{' '}
                                            <Link
                                                href="/email/verification-notification"
                                                method="post"
                                                as="button"
                                                className="underline text-sm text-gray-600 hover:text-gray-900"
                                            >
                                                Click here to re-send the verification email.
                                            </Link>
                                        </p>

                                        {status === 'verification-link-sent' && (
                                            <div className="mt-2 font-medium text-sm text-green-600">
                                                A new verification link has been sent to your email address.
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>
                                        Save
                                    </PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600">Saved.</p>
                                    </Transition>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
