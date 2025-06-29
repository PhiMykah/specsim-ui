import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useGlobalParams } from "@/components/context/GlobalParamsContext";

/* -------------------------------------------------------------------------- */
/*                                    Float                                   */
/* -------------------------------------------------------------------------- */

const floatInputSchema = z.object({
    floatValue: z.coerce.number()
});

interface FloatInputProps {
    label: string | React.ReactNode;
    section: string; // Section name for globalParams
    paramKey: string; // Key for the parameter in the section
}

export function FloatInput({
    label,
    section,
    paramKey,
}: FloatInputProps) {
    const { combinedParams, updateParams } = useGlobalParams(); // Access globalParams
    const form = useForm<z.infer<typeof floatInputSchema>>({
        resolver: zodResolver(floatInputSchema),
        defaultValues: {
            floatValue: Number(combinedParams[section][paramKey]) || 0,
        },
    });

    function onSubmit(data: z.infer<typeof floatInputSchema>) {
        updateParams(section, { [paramKey]: data.floatValue });
        console.log(`Updated ${section}.${paramKey}:`, data.floatValue); // Log updated value
    }

    return (
        <Form {...form}>
            <FormLabel>{label}</FormLabel>
            <form
                onChange={(e) => {
                    e.preventDefault();
                    void form.handleSubmit(onSubmit)();
                }}
                className="flex gap-2 items-center w-full"
            >
                <FormField
                    control={form.control}
                    name="floatValue"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input
                                    placeholder="Enter a float..."
                                    {...field}
                                    value={field.value}
                                    onChange={(e) => {
                                        const rawValue = e.target.value;

                                        // Allow empty string (clearing the field)
                                        if (rawValue === "") {
                                            field.onChange(rawValue);
                                            return;
                                        }

                                        // Allow "-" as an intermediate state
                                        if (rawValue === "-") {
                                            field.onChange(rawValue);
                                            return;
                                        }

                                        // Allow "-0" as an intermediate state
                                        if (rawValue === "-0") {
                                            field.onChange(rawValue);
                                            return;
                                        }

                                        // Allow positive and negative numbers followed by a decimal point
                                        if (/^-?\d+\.\d*$/.test(rawValue)) {
                                            field.onChange(rawValue);
                                            return;
                                        }

                                        // Allow "." or "-." as an intermediate state
                                        if (rawValue === "." || rawValue === "-.") {
                                            field.onChange(rawValue);
                                            return;
                                        }

                                        // Convert valid numeric strings to numbers
                                        const numericValue = Number(rawValue);
                                        if (!isNaN(numericValue)) {
                                            field.onChange(numericValue);
                                        }
                                    }}
                                    title={String(field.value)}
                                />
                            </FormControl>
                            <FormMessage className="text-error" />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}

/* -------------------------------------------------------------------------- */
/*                                   Integer                                  */
/* -------------------------------------------------------------------------- */

const integerInputSchema = z.object({
    integerValue: z.coerce.number().int()
});

interface IntegerInputProps {
    label: string | React.ReactNode;
    section: string; // Section name for globalParams
    paramKey: string; // Key for the parameter in the section
    positiveOnly?: boolean; // New prop to restrict input to positive integers
}

export function IntegerInput({
    label,
    section,
    paramKey,
    positiveOnly = false, // Default to false
}: IntegerInputProps) {
    const { combinedParams, updateParams } = useGlobalParams(); // Access globalParams
    const form = useForm<z.infer<typeof integerInputSchema>>({
        resolver: zodResolver(integerInputSchema),
        defaultValues: {
            integerValue: Number(combinedParams[section][paramKey]) || 0,
        },
    });

    function onSubmit(data: z.infer<typeof integerInputSchema>) {
        updateParams(section, { [paramKey]: data.integerValue }); // Update globalParams
        console.log(`Updated ${section}.${paramKey}:`, data.integerValue); // Log updated value
    }

    return (
        <Form {...form}>
            <FormLabel>{label}</FormLabel>
            <form
                onChange={(e) => {
                    e.preventDefault();
                    void form.handleSubmit(onSubmit)();
                }}
                className="flex gap-2 items-center w-full"
            >
                <FormField
                    control={form.control}
                    name="integerValue"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input
                                    placeholder="Enter an integer..."
                                    {...field}
                                    value={field.value}
                                    onChange={(e) => {
                                        const rawValue = e.target.value;

                                        // Allow empty string (clearing the field)
                                        if (rawValue === "") {
                                            field.onChange(rawValue);
                                            return;
                                        }

                                        // Allow "-" as an intermediate state (only if positiveOnly is false)
                                        if (!positiveOnly && rawValue === "-") {
                                            field.onChange(rawValue);
                                            return;
                                        }

                                        // Convert valid numeric strings to integers
                                        const numericValue = Number(rawValue);
                                        if (
                                            !isNaN(numericValue) &&
                                            Number.isInteger(numericValue) &&
                                            (!positiveOnly || numericValue >= 0) // Enforce positivity if positiveOnly is true
                                        ) {
                                            field.onChange(numericValue);
                                        }
                                    }}
                                    title={String(field.value)}
                                />
                            </FormControl>
                            <FormMessage className="text-error" />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}

/* -------------------------------------------------------------------------- */
/*                               MultiFloatInput                              */
/* -------------------------------------------------------------------------- */

interface MultiFloatInputProps {
    label: string | React.ReactNode;
    section: string;
    paramKey: string;
    onFloatsChange?: (values: number[]) => void;
}

export function MultiFloatInput({
    label,
    section,
    paramKey,
    onFloatsChange,
}: MultiFloatInputProps) {
    const { combinedParams, updateParams } = useGlobalParams(); // Access globalParams
    const [floats, setFloats] = React.useState<number[]>(
        Array.isArray(combinedParams[section][paramKey])
          ? combinedParams[section][paramKey]
          : []);    
    const [currentInput, setCurrentInput] = React.useState<string>("");

    const addFloat = () => {
        const numericValue = Number(currentInput);
        if (!isNaN(numericValue)) {
            const updatedFloats = [...floats, numericValue];
            setFloats(updatedFloats);
            if (onFloatsChange) onFloatsChange(updatedFloats);
            updateParams(section, { [paramKey]: updatedFloats }); // Update globalParams
            console.log(`Updated ${section}.${paramKey} with new value:`, numericValue); // Log updated value
            setCurrentInput("");
        }
    };

    const removeFloat = (index: number) => {
        const updatedFloats = floats.filter((_, i) => i !== index);
        setFloats(updatedFloats);
        if (onFloatsChange) onFloatsChange(updatedFloats);
        updateParams(section, { [paramKey]: updatedFloats }); // Update globalParams
        console.log(`Updated ${section}.${paramKey}:`, updatedFloats); // Log updated value
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            <label>{label}</label>
            <div className="flex gap-2 items-center">
                <Input
                    placeholder="Enter a float..."
                    value={currentInput}
                    onChange={(e) => {
                        const rawValue = e.target.value;

                        // Allow empty string (clearing the field)
                        if (rawValue === "") {
                            setCurrentInput(rawValue);
                            return;
                        }

                        // Allow "-" as an intermediate state
                        if (rawValue === "-") {
                            setCurrentInput(rawValue);
                            return;
                        }

                        // Allow "-0" as an intermediate state
                        if (rawValue === "-0") {
                            setCurrentInput(rawValue);
                            return;
                        }

                        // Allow positive and negative numbers followed by a decimal point
                        if (/^-?\d+\.\d*$/.test(rawValue)) {
                            setCurrentInput(rawValue);
                            return;
                        }

                        // Allow "." or "-." as an intermediate state
                        if (rawValue === "." || rawValue === "-.") {
                            setCurrentInput(rawValue);
                            return;
                        }

                        // Convert valid numeric strings to numbers
                        const numericValue = Number(rawValue);
                        if (!isNaN(numericValue)) {
                            setCurrentInput(rawValue);
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            addFloat();
                        }
                    }}
                />
                <button
                    type="button"
                    onClick={addFloat}
                    className="bg-primary text-primary-content px-3 py-1 rounded"
                >
                    Add
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {(Array.isArray(combinedParams[section][paramKey]) ? combinedParams[section][paramKey] : floats).map((float, index) => (
                    <div
                        key={index}
                        className="flex indicator justify-between items-center bg-base-100 p-2 rounded"
                    >
                        <span>{float}</span>
                        <button
                            type="button"
                            onClick={() => { removeFloat(index) }}
                            className="text-error indicator-item"
                        >
                            x
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                              RangeFloatInput                               */
/* -------------------------------------------------------------------------- */

interface RangeFloatInputProps {
    label: string | React.ReactNode;
    section: string;
    paramKey: string;
    onRangeChange?: (range: { lower: number; upper: number }) => void;
}

export function RangeFloatInput({
    label,
    section,
    paramKey,
    onRangeChange,
}: RangeFloatInputProps) {
    const { combinedParams, updateParams } = useGlobalParams();
    // Load initial values from global params if available
    const initialRange = (combinedParams[section][paramKey] ?? {}) as { lower?: number; upper?: number };
    const [lower, setLower] = React.useState<string>(
        initialRange.lower !== undefined ? String(initialRange.lower) : ""
    );
    const [upper, setUpper] = React.useState<string>(
        initialRange.upper !== undefined ? String(initialRange.upper) : ""
    );

    const handleLowerChange = (value: string) => {
        setLower(value);

        const lowerValue = Number(value);
        const upperValue = Number(upper);

        if (!isNaN(lowerValue) && !isNaN(upperValue) && lowerValue < upperValue) {
            if (onRangeChange) onRangeChange({ lower: lowerValue, upper: upperValue });
            updateParams(section, { [paramKey]: [lowerValue, upperValue] });
            console.log(`Updated ${section}.${paramKey} lower:`, lowerValue); // Log updated value
        }
    };

    const handleUpperChange = (value: string) => {
        setUpper(value);

        const lowerValue = Number(lower);
        const upperValue = Number(value);

        if (!isNaN(lowerValue) && !isNaN(upperValue) && lowerValue < upperValue) {
            if (onRangeChange) onRangeChange({ lower: lowerValue, upper: upperValue });
            updateParams(section, { [paramKey]: [lowerValue, upperValue] });
            console.log(`Updated ${section}.${paramKey} upper:`, upperValue); // Log updated value
        }
    };

    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="font-medium text-primary-content">{label}</label>
            <div className="flex gap-2 items-center">
                <Input
                    placeholder="Lower number"
                    value={lower}
                    onChange={(e) => {
                        const rawValue = e.target.value;

                        // Allow empty string (clearing the field)
                        if (rawValue === "") {
                            setLower(rawValue);
                            return;
                        }

                        // Allow "-" as an intermediate state
                        if (rawValue === "-") {
                            setLower(rawValue);
                            return;
                        }

                        // Allow "-0" as an intermediate state
                        if (rawValue === "-0") {
                            setLower(rawValue);
                            return;
                        }

                        // Allow valid numeric strings
                        const numericValue = Number(rawValue);
                        if (!isNaN(numericValue)) {
                            handleLowerChange(rawValue);
                        }
                    }}
                />
                <Input
                    placeholder="Higher number"
                    value={upper}
                    onChange={(e) => {
                        const rawValue = e.target.value;

                        // Allow empty string (clearing the field)
                        if (rawValue === "") {
                            setUpper(rawValue);
                            return;
                        }

                        // Allow "-" as an intermediate state
                        if (rawValue === "-") {
                            setUpper(rawValue);
                            return;
                        }

                        // Allow "-0" as an intermediate state
                        if (rawValue === "-0") {
                            setUpper(rawValue);
                            return;
                        }

                        // Allow valid numeric strings
                        const numericValue = Number(rawValue);
                        if (!isNaN(numericValue)) {
                            handleUpperChange(rawValue);
                        }
                    }}
                />
            </div>
            {lower !== "" && upper !== "" && Number(lower) >= Number(upper) && (
                <div className="text-error text-sm">
                    The higher number must be greater than the lower number.
                </div>
            )}
        </div>
    );
}