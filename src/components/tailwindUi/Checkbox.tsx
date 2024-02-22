import React from 'react';
import { CheckIcon } from 'lucide-react';
import classNames from 'classnames';

interface CheckboxProps {
    label?: string;
    checked?: boolean;
    onCheckedChange?: (isChecked: boolean) => void;
    disabled?: boolean;
    className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onCheckedChange, disabled, className }) => {

    return (
        <label className={classNames('inline-flex items-center', className)}>
            <input
                type="checkbox"
                className={classNames(
                    'peer h-4 w-4 absolute cursor-pointer focus:outline-none data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
                    className
                )}
                checked={checked}
                onChange={(e) => onCheckedChange?.(e.target.checked)}
                disabled={disabled}
            />
            {/* <span className={classNames('border border-secondary-foreground rounded shadow focus-visible:ring-1 focus-visible:ring-ring')}>
                <span className={classNames('hidden peer-checked:inline-block')}>
                    <CheckIcon className="h-4 w-4 text-primary-foreground" />
                </span>
            </span> */}
        </label>
    );
};

export default Checkbox;
