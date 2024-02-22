import * as React from 'react';
import classNames from 'classnames';



export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {

        const inputClasses = classNames(
            'flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground hover:border-ring focus-visible:border-primary focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
            className,
        )

        return (
            <input
                type={type}
                className={inputClasses}
                ref={ref}
                {...props}
            />
        );
    },
);

export default Input;
