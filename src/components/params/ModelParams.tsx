import React, { useEffect, useState } from "react";
import { ParamWrapper, Parameter } from "@/components/params/Param";
import { MultiFloatInput } from "@/components/args/NumberInput";

export default function ModelParams({ onParamsChange }: { onParamsChange: (params: Record<string, unknown>) => void }) {
    const [modelParams, setModelParams] = useState({
        eDecay: "",
        eAmp: "",
        gDecay: "",
        gAmp: "",
        j1: "",
        j2: "",
        j3: "",
        ePhase: "",
        gPhase: "",
    })

    const handleModelChange = (key: keyof typeof modelParams, value: string) => {
        setModelParams((prev) => ({ ...prev, [key]: value }));
    };
    
    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         console.log("Sim parameters have changed:", modelParams);
    //     }, 500); // delay 500ms
      
    //     return () => { clearTimeout(timeout); } // cleanup
    // }, [modelParams]);

    useEffect(() => {
        onParamsChange(modelParams);
    }, [modelParams]);
    
    return (
        <ParamWrapper headerText="Model Parameters">
            <MultiFloatInput 
                label={
                    <Parameter 
                        command="-eDecay" 
                        text="Exponential Decays (list of floats)."
                    />
                }
                onFloatsChange={(value) => {handleModelChange("eDecay", value.toString())}}
            />
            <MultiFloatInput
                label={
                    <Parameter 
                        command="-eAmp"
                        text="Exponential Amplitudes" 
                    />
                }
                onFloatsChange={(value) => {handleModelChange("eAmp", value.toString())}}
            />
            <MultiFloatInput 
                label={
                    <Parameter 
                        command="-gDecay" 
                        text="Gaussian Decays (Pts Hz ppm %%)."
                    />
                }
                onFloatsChange={(value) => {handleModelChange("gDecay", value.toString())}}
            />
            <MultiFloatInput 
                label={
                    <Parameter 
                        command="-gAmp" 
                        text="Gaussian Amplitudes, or Keyword Auto."
                    />
                }
                onFloatsChange={(value) => {handleModelChange("gAmp", value.toString())}}
            />
            
            <MultiFloatInput 
                label={
                    <Parameter
                        command="-j1"
                        text="Coupling 1 (Cosine Modulation, Pts Hz ppm %%)."
                    />
                }
                onFloatsChange={(value) => {handleModelChange("j1", value.toString())}}
            />
            
            <MultiFloatInput 
                label={
                    <Parameter
                        command="-j2"
                        text="Coupling 2 (Cosine Modulation, Pts Hz ppm %%)."
                    />
                }
                onFloatsChange={(value) => {handleModelChange("j2", value.toString())}}
            />
            
            <MultiFloatInput
                label={
                    <Parameter 
                        command="-j3" 
                        text="Coupling 3 (Cosine Modulation, Pts Hz ppm %%)."
                    />
                }
                onFloatsChange={(value) => {handleModelChange("j3", value.toString())}}
            />
            
            <MultiFloatInput 
                label={
                    <Parameter 
                        command="-ePhase"
                        text="Additional Phase for Each Exponential Signal."
                    />
                }
                onFloatsChange={(value) => {handleModelChange("ePhase", value.toString())}}
            />
            
            <MultiFloatInput 
                label={
                    <Parameter 
                        command="-gPhase"
                        text="Additional Phase for Each Gaussian Signal."
                    />
                }
                onFloatsChange={(value) => {handleModelChange("gPhase", value.toString())}}
            />
            
        </ParamWrapper>
    );
}