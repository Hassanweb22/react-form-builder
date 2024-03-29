import * as React from 'react';
import classNames from 'classnames';



export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {

        const textareaClasses = classNames(
            'flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className,
        )

        return (
            <textarea
                className={textareaClasses}
                ref={ref}
                {...props}
            />
        );
    },
);

export default Textarea;
