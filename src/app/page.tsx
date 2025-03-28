"use client";
import { Button } from "@/components/ui/button";
import { invoke } from "@tauri-apps/api/core";
import { useCallback, useState } from "react";
import { Section, SectionHeader } from "@/components/Section";
import { FileParams, ModelParams, OptimizationOptions, OptimizationParams, OtherOptions, SimParams } from "@/components/Params";
import { ModeToggle } from "@/components/ModeToggle";

export default function Home() {
  const [greeted, setGreeted] = useState<string | null>(null);
  const greet = useCallback((): void => {
    invoke<string>("greet")
      .then((s) => {
        setGreeted(s);
      })
      .catch((err: unknown) => {
        console.error(err);
      });
  }, []); 

  return (
    <div>
      <div className="bg-base-200 relative min-h-screen">
        <div className="grid grid-rows-[20px_1fr_20px] items-center min-h-screen p-10 gap-4 sm:p-10 font-[family-name:var(--font-inter)]">
          <header className="text-4xl font-bold row-start-1 text-center">
            Spectral Simulation
          </header>
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
            <FileParams/>
            <div className="divider"></div>
            <SimParams/>
            <OptimizationOptions/>
            <OptimizationParams/>
            <ModelParams/>
            <OtherOptions/>
            <Section>
              <SectionHeader text="Actions" />
              <Button
                onClick={greet}
                title="Call &quot;greet&quot; from Rust"
              >
                Call &quot;greet&quot; from Rust
              </Button>
              <p className="break-words w-md">
                {greeted ?? "Click the button to call the Rust function"}
              </p>
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
