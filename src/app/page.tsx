"use client";
import { Button } from "@/components/ui/button";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { invoke } from "@tauri-apps/api/core";
import { redirect } from "next/navigation";
import { useCallback, useState } from "react";


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
    redirect("/Simulation/File")
  );
}

{/* <div>
      <Section>
        <Button onClick={handleSubmit} title="Submit Parameters" className="w-full">
          Submit Parameters
        </Button>
      </Section>
    </div>
*/}