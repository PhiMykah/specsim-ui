import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
    Form, 
    FormControl,
    FormField,
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";

interface ParamSelectionProps {
    label: string | React.ReactNode
    options: string[];
    onValueChange?: (value:string) => void;
}

export function ParamSelection({ label, options, onValueChange }: ParamSelectionProps) {
    const optionsSchema = z.object({
        selectedOption: z
            .string()
            .refine((val) => val === "" || options.includes(val), {
                message: "Please select a valid option from the dropdown or leave it empty.",
            }),
    });

    const form = useForm<z.infer<typeof optionsSchema>>({
        resolver: zodResolver(optionsSchema),
        defaultValues: {
            selectedOption: "",
        },
    });

    const handleOptionSelect = (option: string) => {
        form.setValue("selectedOption", option);
        void form.handleSubmit(onSubmit)();
        form.clearErrors("selectedOption");
    };

    function onSubmit(data : z.infer<typeof optionsSchema>) {
        if(onValueChange) onValueChange(data.selectedOption);
    }
    return (
        <Form {...form}>
            <FormLabel>{label}</FormLabel>
            <form 
                onChange={(e) => {
                e.preventDefault();
                void form.handleSubmit(onSubmit)();
                }}
                className="flex flex-col gap-3"
            >
                <FormField
                control={form.control}
                name="selectedOption"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormControl>
                            <Input
                                placeholder="Type or select an option"
                                {...field}
                                value={field.value}
                                title={field.value}
                            >
                            </Input>
                        </FormControl>
                        <FormMessage className="text-red-500" />
                    </FormItem>
                )}
                />
                {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button className="px-4 py-2 rounded text-primary-content">Select Option</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-base-100">
                        {options.map((option) => (
                            <DropdownMenuItem key={option} onClick={() => { handleOptionSelect(option); }}>
                                {option}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </form>
        </Form>
    );
};

export default ParamSelection;