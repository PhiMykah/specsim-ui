import React, { useContext } from 'react';
import { useGlobalParams } from "@/components/context/GlobalParamsContext";

interface BooleanInputProps {
    label: string | React.ReactNode;
    section: string;
    paramKey: string;
    onBoolChange?: (value: boolean) => void;
}

export function BooleanInput({ label, section, paramKey, onBoolChange }: BooleanInputProps) {
    const { combinedParams, updateParams } = useGlobalParams();

    const value = Boolean(combinedParams[section]?.[paramKey]);

    const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.checked;
        if (onBoolChange) onBoolChange(newValue);
        updateParams(section, { [paramKey]: newValue });
        console.log(`Updated ${section}.${paramKey}:`, newValue); // Log updated value
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
}

export default BooleanInput;