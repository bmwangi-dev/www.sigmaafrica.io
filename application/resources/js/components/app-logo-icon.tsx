import { cn } from '@/lib/utils';

interface AppLogoIconProps {
    className?: string;
}

export default function AppLogoIcon({ className }: AppLogoIconProps) {
    return (
        <img
            src="/sigma-logo.webp"
            alt="Sigma Africa"
            className={cn("h-8 w-auto", className)}
        />
    );
}
