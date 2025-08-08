import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    fullWidth?: boolean;
    loading?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    children,
    fullWidth = false,
    loading = false,
    disabled,
    className = '',
    onClick,
    ...props
}) => {
    const isDisabled = disabled || loading;

    return (
        <button
            type="button"
            className={`font-semibold px-4 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center ${fullWidth ? 'w-full' : 'w-fit'} ${className}`}
            disabled={isDisabled}
            onClick={(e) => {
                if (!isDisabled && onClick) onClick(e);
            }}
            aria-disabled={isDisabled}
            {...props}
        >
            {loading && (
                <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}
            {children}
        </button>
    );
};


export default PrimaryButton;
