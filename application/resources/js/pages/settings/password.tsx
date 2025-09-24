import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';
import { Transition } from '@headlessui/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Heading } from '@/components/Typography/Heading';
import PrimaryButton from '@/components/Typography/PrimaryButton';

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put('/user/password', {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Password Settings" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className="max-w-xl">
                            <Heading level="h2" className="mb-4">Update Password</Heading>
                            <p className="mt-1 text-sm text-gray-600">
                                Ensure your account is using a long, random password to stay secure.
                            </p>

                            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                                <div>
                                    <label htmlFor="current_password" className="block text-sm font-medium text-gray-700">
                                        Current Password
                                    </label>
                                    <input
                                        id="current_password"
                                        ref={currentPasswordInput}
                                        value={data.current_password}
                                        onChange={(e) => setData('current_password', e.target.value)}
                                        type="password"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        autoComplete="current-password"
                                    />
                                    {errors.current_password && <div className="text-red-600 text-sm mt-2">{errors.current_password}</div>}
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        New Password
                                    </label>
                                    <input
                                        id="password"
                                        ref={passwordInput}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        type="password"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        autoComplete="new-password"
                                    />
                                    {errors.password && <div className="text-red-600 text-sm mt-2">{errors.password}</div>}
                                </div>

                                <div>
                                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                                        Confirm Password
                                    </label>
                                    <input
                                        id="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        type="password"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        autoComplete="new-password"
                                    />
                                    {errors.password_confirmation && <div className="text-red-600 text-sm mt-2">{errors.password_confirmation}</div>}
                                </div>

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
