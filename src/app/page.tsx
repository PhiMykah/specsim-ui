"use client";
import { Button } from "@/components/ui/button";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { invoke } from "@tauri-apps/api/core";
import { useGlobalParams } from "@/components/context/GlobalParamsContext";
import { useRouter } from "next/navigation";
import { sections } from "@/components/context/sections";
import { ChevronLeft } from "lucide-react";

export default function Home() {
  const { combinedParams } = useGlobalParams();
  const router = useRouter();

  const handleSubmit = () => {
    console.log("Combined Parameters:", combinedParams);
    const flattenedParams = Object.entries(combinedParams).reduce<Record<string, unknown>>((acc, [key, value]) => {
      if (typeof value === "object" && value !== null) {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          acc[nestedKey] = nestedValue;
        });
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});

    console.log("Flattened Parameters:", flattenedParams);
  };

  const handleGoBack = () => {
    const sectionKeys = Object.keys(sections); // Get an array of section keys
    const lastIndex = sectionKeys.length - 1; // Find the last section index
    const previousSection = sectionKeys[lastIndex] as keyof typeof sections; // Get the key of the previous section
    router.push(`/Simulation/${previousSection}`); // Navigate to the previous section
  };

  return (
    <div className="flex flex-col gap-3 p-10">
      <header className="text-4xl font-bold row-start-1 text-center">
        Submit Parameters
      </header>
      <pre className="bg-base-300 p-4 rounded">
        {JSON.stringify(
          {
            ...combinedParams,
            File: combinedParams.File || {},
            SimOptions: combinedParams.SimOptions || {},
            OptOptions: combinedParams.OptOptions || {},
            OptParams: combinedParams.OptParams || {},
            ModelParams: combinedParams.ModelParams || {},
            OtherParams: combinedParams.OtherParams || {},
          },
          null,
          2
        )}
      </pre>
      <div className="sticky bottom-0 bg-base-100 z-10 p-4 shadow-md">
        <div className="flex items-center"> 
          <Button onClick={handleSubmit} className="mr-2">
            Submit
          </Button>
          <Button onClick={handleGoBack} size='icon' className="">
            <ChevronLeft />
          </Button>
        </div>
      </div>
    </div>
  );
}
