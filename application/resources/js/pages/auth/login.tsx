import { useState, FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthCardLayout from '@/layouts/auth/auth-card-layout';
import UnauthenticatedLayout from '@/layouts/UnauthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import type { CheckedState } from "@radix-ui/react-checkbox";
import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface LoginPageProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginPageProps) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<{
        email: string;
        password: string;
        remember: CheckedState;
    }>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <UnauthenticatedLayout>
            <Head title="Log in" />
            <AuthCardLayout
                title="Welcome back"
                description="Sign in to continue your journey with Sigma Africa"
            >
                <form onSubmit={submit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-[var(--color-sigma-blue)] font-medium">
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full border border-[var(--color-primary)] focus:ring-2 focus:ring-white"
                            autoComplete="username"
                            placeholder="Enter your email"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        {errors.email && (
                            <div className="text-sm text-red-600">{errors.email}</div>
                        )}
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-[var(--color-sigma-blue)] font-medium">
                            Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={data.password}
                                className="block w-full pr-10 border border-[var(--color-primary)] focus:ring-2 focus:ring-white"
                                autoComplete="current-password"
                                placeholder="Enter your password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOffIcon className="h-5 w-5 text-[var(--color-primary)]" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-[var(--color-primary)]" />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <div className="text-sm text-red-600">{errors.password}</div>
                        )}
                    </div>

                    {/* Remember + Forgot */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remember"
                                checked={data.remember}
                                onCheckedChange={(checked) => setData('remember', checked)}
                            />
                            <Label htmlFor="remember" className="text-sm text-[var(--color-sigma-blue)]">
                                Remember me
                            </Label>
                        </div>

                        {canResetPassword && (
                            <Link
                                href="/forgot-password"
                                className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-migenta)] transition-colors"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-[var(--color-primary)] text-white font-semibold py-2 rounded-lg shadow-md cursor-pointer"
                        disabled={processing}
                    >
                        {processing ? 'Signing in...' : 'Sign in'}
                    </Button>

                    <div className="text-center text-sm text-gray-600">
                        Need an account?{' '}
                        <span className="text-[var(--color-migenta)] font-medium">
                            Contact your administrator
                        </span>
                        <div className="mt-1 text-xs text-gray-500">
                            Accounts are created and managed by administrators
                        </div>
                    </div>
                </form>
            </AuthCardLayout>
        </UnauthenticatedLayout>
    );
}
