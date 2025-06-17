"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"
import { useSharedData } from "@/components/context/SharedDataContext";
import { invoke } from '@tauri-apps/api/core';
import { listen } from "@tauri-apps/api/event";

export default function PlotPage() {
  const { flattenedParams } = useSharedData();
  const [progress, setProgress] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleRunOptimization = async () => {
    setProgress(0); // Reset progress
    setResult(null); // Clear previous result

    // Listen for progress updates from the backend
    const unlisten = await listen<number>("optimization-progress", (event) => {
      setProgress(event.payload); // Update progress
    });

    try {
      // Invoke the Rust command to run the optimization
      const optimizationResult = await invoke<string>("run_optimization");
      setResult(optimizationResult); // Set the final result
    } catch (error) {
      console.error("Error running optimization:", error);
    } finally {
      unlisten(); // Stop listening for progress updates
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 p-10">
        <header className="text-4xl font-bold row-start-1 text-center">
            Run Optimization
        </header>
        <pre className="bg-base-300 p-4 rounded w-full max-w-2xl overflow-auto max-h-64">
            {JSON.stringify(flattenedParams, null, 2)}
        </pre>
        <Button
            onClick={handleRunOptimization}
            className="bg-primary text-primary-content px-4 py-2 rounded"
        >
            Run Optimization
        </Button>
        {progress !== null && (
            <div className="w-1/2 rounded-full h-2 mt-4 mx-auto">
              <Progress value={progress} className=""/>
              <p className="text-center mt-2 text-primary-content">{progress}%</p>
            </div>
        )}
        {result && (
            <div className="bg-success text-success-content p-4 rounded w-full max-w-2xl mt-4">
                <h2 className="text-xl font-bold">Simulation Result</h2>
                <p>{result}</p>
            </div>
        )}
    </div>
  );
}