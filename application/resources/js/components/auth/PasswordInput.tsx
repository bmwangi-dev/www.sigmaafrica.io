import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface PasswordInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    autoComplete?: string;
    error?: string;
    required?: boolean;
}

export default function PasswordInput({
    id,
    label,
    value,
    onChange,
    placeholder,
    autoComplete,
    error,
    required = false,
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <div className="relative">
                <Input
                    id={id}
                    type={showPassword ? 'text' : 'password'}
                    name={id}
                    value={value}
                    className="block w-full pr-10"
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    required={required}
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
            {error && (
                <div className="text-sm text-red-600">{error}</div>
            )}
        </div>
    );
}
