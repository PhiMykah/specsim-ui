"use client";
import { Button } from "@/components/ui/button";
import { useGlobalParams } from "@/components/context/GlobalParamsContext";
import { useSharedData } from "@/components/context/SharedDataContext";
import { useRouter } from "next/navigation";
import { sections } from "@/components/context/sections";
import { ChevronLeft } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export default function Home() {
  const { combinedParams } = useGlobalParams();
  const { setFlattenedParams } = useSharedData();
  const router = useRouter();
  const { open } = useSidebar(); // <-- Get sidebar open state

  const handleSubmit = () => {
    try {
      console.log("Combined Parameters:", combinedParams);
      const flattenedParams = Object.entries(combinedParams).reduce<Record<string, unknown>>((acc, [key, value]) => {
        if (typeof value === "object") {
          Object.entries(value).forEach(([nestedKey, nestedValue]) => {
            acc[nestedKey] = nestedValue;
          });
        } else {
          acc[key] = value;
        }
        return acc;
      }, {});

      console.log("Flattened Parameters:", flattenedParams);

      // Store flattenedParams in the context
      setFlattenedParams(flattenedParams);

      // Navigate to the plot page
      router.push("/Plot");

    } catch(error) {
      console.error("Error submitting parameters:", error);
    }
  };

  const handleGoBack = () => {
    const sectionKeys = Object.keys(sections); // Get an array of section keys
    const lastIndex = sectionKeys.length - 1; // Find the last section index
    const previousSection = sectionKeys[lastIndex] as keyof typeof sections; // Get the key of the previous section
    router.push(`/Simulation/${previousSection}`); // Navigate to the previous section
  };

  // Set maxWidth based on sidebar state
    const maxWidth = open
      ? "calc(100vw - var(--sidebar-width) - 2rem)" // 2rem for padding/margin
      : "calc(100vw - 2rem)";

  return (
    <div
      className="flex flex-col gap-3 p-10 mx-auto transition-all duration-300 overflow-x-hidden"
      style={{ maxWidth }}
    >
      <header className="text-4xl font-bold row-start-1 text-center">
        Submit Parameters
      </header>
      <pre className="bg-base-300 p-4 rounded w-full max-w-full overflow-auto">
        {JSON.stringify(
          {
            ...combinedParams,
            File: combinedParams.File,
            SimOptions: combinedParams.SimOptions,
            OptOptions: combinedParams.OptOptions,
            OptParams: combinedParams.OptParams,
            ModelParams: combinedParams.ModelParams,
            OtherParams: combinedParams.OtherParams,
          },
          null,
          2
        )}
      </pre>
      <div className="sticky bottom-0 bg-base-100 z-10 p-4 shadow-md">
        <div className="flex items-center"> 
          <Button onClick={handleSubmit} className="mr-2 text-primary-content">
            Submit
          </Button>
          <Button onClick={handleGoBack} size='icon' className="text-primary-content">
            <ChevronLeft />
          </Button>
        </div>
      </div>
    </div>
  );
}
