"use client";

import { open, save } from "@tauri-apps/plugin-dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useGlobalParams } from "@/components/context/GlobalParamsContext";

function shortenPath(path: string, maxStart = 2, maxEnd = 3) {
  const parts = path.split(/[/\\]/);
  if (parts.length <= maxStart + maxEnd) return path;

  const isWindows = path.includes(":");
  const driveOrRoot = isWindows ? (parts.shift() ?? "") + "/" : "/";

  const start = parts.slice(0, maxStart);
  const end = parts.slice(-maxEnd);

  return `${driveOrRoot}${start.join("/")}/.../${end.join("/")}`;
}

const FormSchema = z.object({
  filePath: z.string(),
});

interface FilePickerProps {
    label: string | React.ReactNode;
    section: string;
    paramKey: string;
    extensions?: string[];
    mode: "load" | "save" | "save-directory";
    onFileChange?: (filePath: string) => void;
}

export function FilePicker({
  label,
  section,
  paramKey,
  extensions,
  mode,
  onFileChange,
}: FilePickerProps) {
    const { combinedParams, updateParams } = useGlobalParams();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
        filePath: String(combinedParams[section]?.[paramKey]) || "",
        },
    });

    const { setValue } = form;

    async function handleDialog() {
    try {
        let selectedFile: string | null = null;

        if (mode === "load") {
            const result = await open({
                multiple: false,
                filters: [
                {
                    name: "NMRPipe Tab File",
                    extensions: extensions ?? ["*"],
                },
                ],
            });
            selectedFile = typeof result === "string" ? result : null;
        } else if ( mode === "save" ) {
            const result = await save({
                filters: [
                {
                    name: "Simulation Optimization Output",
                    extensions: extensions ?? ["*"],
                },
                ],
            });
            selectedFile = result;
        }
        else {
            const result = await open({
                directory: true,
                multiple: false,
            })
            selectedFile = typeof result === "string" ? result : null;
        }

        if (selectedFile) {
        setValue("filePath", selectedFile);
        if (onFileChange) onFileChange(selectedFile);
        }
    } catch (error) {
        console.error("File dialog error:", error);
    }
    }

    function onSubmit(data: z.infer<typeof FormSchema>) {
        if (onFileChange) onFileChange(data.filePath);
        updateParams(section, { [paramKey]: data.filePath }); // Update globalParams
        console.log(`Updated ${section}.${paramKey}:`, data.filePath ); // Log updated value
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
            name="filePath"
            render={({ field }) => (
                <FormItem className="w-full">
                    <FormControl>
                        <Input
                            placeholder="Enter a file..."
                            {...field}
                            value={shortenPath(field.value)}
                            title={field.value}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <Button className="text-primary-content" type="button" onClick={() => void handleDialog()}>
                Browse
            </Button>
        </form>
    </Form>
    );
}

export function useDebugDebounce(value: unknown, delay = 500, debugMessage = "Debug:") {
    const timeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        clearTimeout(timeout.current as NodeJS.Timeout | undefined);
        timeout.current = setTimeout(() => {
            console.log(debugMessage, value);
        }, delay);

        return () => { clearTimeout(timeout.current as NodeJS.Timeout | undefined); };
    }, [value, delay, debugMessage]);
}