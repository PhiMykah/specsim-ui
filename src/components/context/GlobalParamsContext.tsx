"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

interface GlobalParamsContextType {
  combinedParams: Record<string, Record<string, unknown>>;
  updateParams: (section: string, params: Record<string, unknown>) => void;
}

const emptyParams = {
  File: {
    tab: "",
    fid: "",
    ft1: "",
    ft2: "",
    out: "",
    apod: "",
    basis: "",
    res: "",
  },
  SimOptions: {
    ndim: "",
    scale: "",
    off: "",
  },
  OptOptions: {
    rx1: "",
    rxn: "",
    mode: "",
    trials: "",
    maxFail: "",
    iseed: "",
    verb: "",
    noverb: "",
    report: "",
    freq: "",
    step: "",
  },
  OptParams: {
    initXDecay: "",
    initYDecay: "",
    xP0: "",
    xP1: "",
    yP0: "",
    yP1: "",
    xDecayBounds: "",
    yDecayBounds: "",
    ampBounds: "",
    p0Bounds: "",
    p1Bounds: "",
  },
  ModelParams: {
    model: "",
    j1: "",
    j2: "",
    j3: "",
  },
  OtherParams: {
    ts: "",
    nots: "",
    notdd: "",
    tdd: "",
    nottdj: "",
    tdj: "",
  },
};

const GlobalParamsContext = createContext<GlobalParamsContextType | undefined>(undefined);

export const GlobalParamsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize combinedParams with data from localStorage or fallback to emptyParams
  const [combinedParams, setCombinedParams] = useState<Record<string, Record<string, unknown>>>(() => {
    const savedParams = localStorage.getItem("optimizationParams");
    if (savedParams) {
      try {
        return JSON.parse(savedParams);
      } catch (error) {
        console.error("Failed to parse saved optimization parameters:", error);
        return emptyParams;
      }
    }
    return emptyParams;
  });

  // Save data to localStorage whenever combinedParams changes
  useEffect(() => {
    localStorage.setItem("optimizationParams", JSON.stringify(combinedParams));
  }, [combinedParams]);

  const updateParams = useCallback((section: string, params: Record<string, unknown>) => {
    setCombinedParams((prev) => ({ ...prev, [section]: { ...prev[section], ...params } }));
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