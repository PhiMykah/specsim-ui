"use client";
import { Button } from "@/components/ui/button";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { invoke } from "@tauri-apps/api/core";
import { useCallback, useState } from "react";
import { Section } from "@/components/Section";
import { ModeToggle } from "@/components/ModeToggle";
import FileParams from "@/components/params/FileParams";
import SimParams from "@/components/params/SimParams";
import OptimizationOptions from "@/components/params/OptimizationOptions";
import OptimizationParams from "@/components/params/OptimizationParams";
import ModelParams from "@/components/params/ModelParams";
import OtherOptions from "@/components/params/OtherOptions";

export default function Home() {
  // const [greeted, setGreeted] = useState<string | null>(null);
  const [combinedParams, setCombinedParams] = useState<Record<string, unknown>>({});

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
    // invoke("submit_params", { params: combinedParams })
    //   .then((response) => {
    //     console.log("Response from Rust:", response);
    //   })
    //   .catch((err: unknown) => {
    //     console.error("Error submitting parameters:", err);
    //   });
  };

  const updateParams = useCallback((key: string, value: Record<string, unknown>) => {
    setCombinedParams((prev) => ({ ...prev, [key]: value }));
  }, []);

  // const greet = useCallback((): void => {
  //   invoke<string>("greet")
  //     .then((s) => {
  //       setGreeted(s);
  //     })
  //     .catch((err: unknown) => {
  //       console.error(err);
  //     });
  // }, []); 

  return (
    <div>
      <div className="bg-base-200 relative min-h-screen">
        <div className="grid grid-rows-[20px_1fr_20px] items-center min-h-screen p-10 gap-4 sm:p-10 font-[family-name:var(--font-inter)]">
          <header className="text-4xl font-bold row-start-1 text-center">
            Spectral Simulation
          </header>
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
            <FileParams onParamsChange={(value) => { updateParams("fileParams", value); }} />
            <div className="divider"></div>
            <SimParams onParamsChange={(value) => { updateParams("simParams", value); }} />
            <div className="divider"></div>
            <OptimizationOptions onParamsChange={(value) => { updateParams("optimizationOptions", value); }} />
            <div className="divider"></div>
            <OptimizationParams onParamsChange={(value) => { updateParams("optimizationParams", value); }} />
            <div className="divider"></div>
            <ModelParams onParamsChange={(value) => { updateParams("modelParams", value); }} />
            <div className="divider"></div>
            <OtherOptions onParamsChange={(value) => { updateParams("otherOptions", value); }} />
            <div className="divider"></div>
            <Section>
              <Button onClick={handleSubmit} title="Submit Parameters" className="w-full">
                Submit Parameters
              </Button>
            </Section>
          </main>
        </div>
      </div>
      <div className="fixed bottom-6 right-6 z-50">
        <ModeToggle/>
      </div>
    </div>
  );
}
