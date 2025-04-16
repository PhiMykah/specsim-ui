"use client";

import { SettingsPage } from "@/components/Section";
import { useCallback, useState } from "react";
import OptimizationOptions from "@/components/params/OptimizationOptions";

export default function Page() {
  const [combinedParams, setCombinedParams] = useState<Record<string, unknown>>({});
  
    const updateParams = useCallback((key: string, value: Record<string, unknown>) => {
      setCombinedParams((prev) => ({ ...prev, [key]: value }));
    }, []);
    
    return (
      <SettingsPage>
        <OptimizationOptions onParamsChange={(value) => { updateParams("optimizationOptions", value); }} />
      </SettingsPage>
    );
  }