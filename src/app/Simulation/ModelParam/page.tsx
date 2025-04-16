"use client";

import { SettingsPage } from "@/components/Section";
import ModelParams from "@/components/params/ModelParams";
import { useCallback, useState } from "react";

export default function Page() {
  const [combinedParams, setCombinedParams] = useState<Record<string, unknown>>({});
  
    const updateParams = useCallback((key: string, value: Record<string, unknown>) => {
      setCombinedParams((prev) => ({ ...prev, [key]: value }));
    }, []);
    
    return (
      <SettingsPage>
        <ModelParams onParamsChange={(value) => { updateParams("modelParams", value); }} />
      </SettingsPage>
    );
  }