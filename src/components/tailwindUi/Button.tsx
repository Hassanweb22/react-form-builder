// components/Button.tsx

import React from 'react';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    size?: 'sm' | 'default' | 'lg' | 'icon';
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    className?: string;
    disabled?: boolean;
}


const Button = React.forwardRef<any, ButtonProps>((
    {
        children,
        size = 'default',
        variant = 'default',
        disabled = false,
        className,
        ...props
    },
    ref
) => {

    const buttonVariants = classNames(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
        {
            'bg-primary text-primary-foreground shadow hover:bg-primary/90': variant === 'default',
            'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90': variant === 'destructive',
            'border bg-transparent shadow-sm hover:bg-secondary hover:text-secondary-foreground': variant === 'outline',
            'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80': variant === 'secondary',
            'hover:bg-secondary hover:text-secondary-foreground': variant === 'ghost',
            'text-primary underline-offset-4 hover:underline': variant === 'link',

            'h-9 px-4 py-2': size === 'default',
            'h-8 rounded-md px-3 text-xs': size === 'sm',
            'h-10 rounded-md px-8': size === 'lg',
            'h-9 w-9': size === 'icon',
        },
    );

    const buttonClasses = classNames(
        buttonVariants,
        className
    );

    return (
        <button className={buttonClasses} disabled={disabled}  {...props} ref={ref}>
            {children}
        </button>
    );
});

export default Button;
