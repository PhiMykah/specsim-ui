"use client";

import { SettingsPage } from "@/components/Section";
import OptimizationParams from "@/components/params/OptimizationParams";
import { useCallback, useState } from "react";

export default function Page() {
  const [combinedParams, setCombinedParams] = useState<Record<string, unknown>>({});
  
    const updateParams = useCallback((key: string, value: Record<string, unknown>) => {
      setCombinedParams((prev) => ({ ...prev, [key]: value }));
    }, []);
    
    return (
      <SettingsPage>
              <OptimizationParams onParamsChange={(value) => { updateParams("optimizationParams", value); }} />
      </SettingsPage>
    );
  }