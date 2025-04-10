import React from 'react';

interface BooleanInputProps {
    label: string | React.ReactNode;
    value?: boolean;
    onBoolChange?: (value: boolean) => void;
}

export function BooleanInput({ label, value, onBoolChange }: BooleanInputProps) {
    const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onBoolChange) onBoolChange(event.target.checked);
    };

    return (
        <div className="flex items-center justify-between">
            <label>{label}</label>
            <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={value}
                onChange={handleToggle}
            />
        </div>
    );
};

export default BooleanInput;