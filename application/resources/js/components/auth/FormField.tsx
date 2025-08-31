import { ReactNode } from 'react';
import { Label } from '@/components/ui/label';

interface FormFieldProps {
    id: string;
    label: string;
    error?: string;
    required?: boolean;
    children: ReactNode;
}

export default function FormField({ id, label, error, required = false, children }: FormFieldProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            {children}
            {error && (
                <div className="text-sm text-red-600">{error}</div>
            )}
        </div>
    );
}
