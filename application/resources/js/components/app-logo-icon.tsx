import { cn } from '@/lib/utils';

interface AppLogoIconProps {
    className?: string;
}

export default function AppLogoIcon({ className }: AppLogoIconProps) {
    return (
        <svg 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className={cn("h-6 w-6", className)}
        >
            <path d="M12 2L2 7L12 12L22 7L12 2Z" />
            <path d="M2 17L12 22L22 17" />
            <path d="M2 12L12 17L22 12" />
        </svg>
    );
}
