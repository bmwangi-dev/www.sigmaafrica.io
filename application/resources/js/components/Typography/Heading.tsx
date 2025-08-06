
import React from 'react';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
    weight?: 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
    children: React.ReactNode;
    className?: string;
}

const Heading: React.FC<HeadingProps> = ({ level = 1, size, weight = 'semibold', children, className = '', ...props }) => {
    const Tag = `h${level}` as const;

    const sizes = {
        xs: 'text-xs', // 12px
        sm: 'text-sm', // 14px
        base: 'text-base', // 16px
        lg: 'text-lg', // 18px
        xl: 'text-xl', // 20px
        '2xl': 'text-2xl', // 24px
        '3xl': 'text-3xl', // 30px
        '4xl': 'text-4xl', // 36px
        '5xl': 'text-5xl', // 48px
        '6xl': 'text-6xl', // 60px
        '7xl': 'text-7xl', // 72px
        '8xl': 'text-8xl', // 96px
        '9xl': 'text-9xl', // 128px
    };

    const weights = {
        thin: 'font-thin', // 100
        light: 'font-light', // 300
        normal: 'font-normal', // 400
        medium: 'font-medium', // 500
        semibold: 'font-semibold', // 600
        bold: 'font-bold', // 700
        extrabold: 'font-extrabold', // 800
        black: 'font-black', // 900
    };

    const sizeClass = size ? sizes[size] : '';
    const classes = `${sizeClass} ${weights[weight]} ${className}`.trim();

    return (
        <Tag className={classes} {...props}>
            {children}
        </Tag>
    );
};

export default Heading;
