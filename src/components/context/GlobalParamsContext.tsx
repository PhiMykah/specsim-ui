"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface GlobalParamsContextType {
  combinedParams: Record<string, unknown>;
  updateParams: (key: string, value: Record<string, unknown>) => void;
}

const GlobalParamsContext = createContext<GlobalParamsContextType | undefined>(undefined);

export const GlobalParamsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [combinedParams, setCombinedParams] = useState<Record<string, unknown>>({});

  const updateParams = useCallback((key: string, value: Record<string, unknown>) => {
    setCombinedParams((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <GlobalParamsContext.Provider value={{ combinedParams, updateParams }}>
      {children}
    </GlobalParamsContext.Provider>
  );
};

export const useGlobalParams = (): GlobalParamsContextType => {
  const context = useContext(GlobalParamsContext);
  if (!context) {
    throw new Error("useGlobalParams must be used within a GlobalParamsProvider");
  }
  return context;
};