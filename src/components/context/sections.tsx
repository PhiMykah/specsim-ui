'use client'; 

import FileParams from "@/components/params/FileParams";
import SimParams from "@/components/params/SimParams";
import OptimizationOptions from "@/components/params/OptimizationOptions";
import OptimizationParams from "@/components/params/OptimizationParams";
import ModelParams from "@/components/params/ModelParams";
import OtherOptions from "@/components/params/OtherOptions";


export const sections = {
    File: {
        title: "File Parameters",
        component: FileParams,
    },
    SimOptions: {
        title: "Simulation Options",
        component: SimParams
    },
    OptOptions: {
        title: "Optimization Options",
        component: OptimizationOptions,
    },
    OptParams: {
        title: "Optimization Parameters",
        component: OptimizationParams,
    },
    ModelParams: {
        title: "Model Parameters",
        component: ModelParams,
    },
    OtherParams: {
        title: "Additional Parameters",
        component: OtherOptions,
    },
}
