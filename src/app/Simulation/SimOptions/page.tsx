"use client";

import { SettingsPage } from "@/components/Section";
import SimParams from "@/components/params/SimParams";
import { useCallback, useState } from "react";

export default function Page() {
  const [combinedParams, setCombinedParams] = useState<Record<string, unknown>>({});
  
    const updateParams = useCallback((key: string, value: Record<string, unknown>) => {
      setCombinedParams((prev) => ({ ...prev, [key]: value }));
    }, []);
    
    return (
      <SettingsPage>
        <SimParams onParamsChange={(value) => { updateParams("simParams", value); }} />
      </SettingsPage>
    );
  }