import { useState, FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthCardLayout from '@/layouts/auth/auth-card-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface RegisterPageProps {
    departments: App.DataTransferObjects.DepartmentData[];
    roles: Record<string, string>;
}

export default function Register({ departments, roles }: RegisterPageProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
        department_id: '',
        phone_number: '',
        date_of_birth: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const availableRoles = Object.fromEntries(
        Object.entries(roles).filter(([key]) => ['student', 'technical_mentor'].includes(key))
    );

    return (
        <AuthCardLayout
            title="Create your account"
            description="Join Sigma Africa and start your learning journey"
        >
            <Head title="Register" />

            <form onSubmit={submit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={data.name}
                            className="block w-full"
                            autoComplete="name"
                            placeholder="Enter your full name"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        {errors.name && (
                            <div className="text-sm text-red-600">{errors.name}</div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full"
                            autoComplete="username"
                            placeholder="Enter your email address"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        {errors.email && (
                            <div className="text-sm text-red-600">{errors.email}</div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone_number">Phone Number (Optional)</Label>
                        <Input
                            id="phone_number"
                            type="tel"
                            name="phone_number"
                            value={data.phone_number}
                            className="block w-full"
                            autoComplete="tel"
                            placeholder="Enter your phone number"
                            onChange={(e) => setData('phone_number', e.target.value)}
                        />
                        {errors.phone_number && (
                            <div className="text-sm text-red-600">{errors.phone_number}</div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="date_of_birth">Date of Birth (Optional)</Label>
                        <Input
                            id="date_of_birth"
                            type="date"
                            name="date_of_birth"
                            value={data.date_of_birth}
                            className="block w-full"
                            onChange={(e) => setData('date_of_birth', e.target.value)}
                        />
                        {errors.date_of_birth && (
                            <div className="text-sm text-red-600">{errors.date_of_birth}</div>
                        )}
                    </div>
                </div>

                {/* Role and Department */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(availableRoles).map(([value, label]) => (
                                    <SelectItem key={value} value={value}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.role && (
                            <div className="text-sm text-red-600">{errors.role}</div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select value={data.department_id} onValueChange={(value) => setData('department_id', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select your department" />
                            </SelectTrigger>
                            <SelectContent>
                                {departments.map((department) => (
                                    <SelectItem key={department.id} value={department.id.toString()}>
                                        {department.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.department_id && (
                            <div className="text-sm text-red-600">{errors.department_id}</div>
                        )}
                    </div>
                </div>

                {/* Password Fields */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={data.password}
                                className="block w-full pr-10"
                                autoComplete="new-password"
                                placeholder="Create a password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOffIcon className="h-4 w-4 text-gray-400" />
                                ) : (
                                    <EyeIcon className="h-4 w-4 text-gray-400" />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <div className="text-sm text-red-600">{errors.password}</div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                        <div className="relative">
                            <Input
                                id="password_confirmation"
                                type={showPasswordConfirmation ? 'text' : 'password'}
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="block w-full pr-10"
                                autoComplete="new-password"
                                placeholder="Confirm your password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                            >
                                {showPasswordConfirmation ? (
                                    <EyeOffIcon className="h-4 w-4 text-gray-400" />
                                ) : (
                                    <EyeIcon className="h-4 w-4 text-gray-400" />
                                )}
                            </button>
                        </div>
                        {errors.password_confirmation && (
                            <div className="text-sm text-red-600">{errors.password_confirmation}</div>
                        )}
                    </div>
                </div>

                <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={processing}
                >
                    {processing ? 'Creating account...' : 'Create account'}
                </Button>

                <div className="text-center text-sm">
                    Already have an account?{' '}
                    <Link
                        href={route('login')}
                        className="text-primary hover:underline font-medium"
                    >
                        Sign in
                    </Link>
                </div>
            </form>
        </AuthCardLayout>
    );
}
