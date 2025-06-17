"use client";

import React, { createContext, useContext, useState } from "react";

interface SharedDataContextType {
  flattenedParams: Record<string, unknown> | null;
  setFlattenedParams: (params: Record<string, unknown>) => void;
}

const SharedDataContext = createContext<SharedDataContextType | undefined>(undefined);

export const SharedDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flattenedParams, setFlattenedParams] = useState<Record<string, unknown> | null>(null);

  return (
    <SharedDataContext.Provider value={{ flattenedParams, setFlattenedParams }}>
      {children}
    </SharedDataContext.Provider>
  );
};

export const useSharedData = (): SharedDataContextType => {
  const context = useContext(SharedDataContext);
  if (!context) {
    throw new Error("useSharedData must be used within a SharedDataProvider");
  }
  return context;
};