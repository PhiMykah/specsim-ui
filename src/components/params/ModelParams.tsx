import React, { useEffect, useState } from "react";
import { ParamWrapper, Parameter } from "@/components/params/Param";
import { MultiFloatInput } from "@/components/args/NumberInput";
import { ParamSelection } from "@/components/args/ParamSelection";

export default function ModelParams({ onParamsChange }: { onParamsChange: (params: Record<string, unknown>) => void }) {
    const [modelParams, setModelParams] = useState({
        model: "",
        j1: "",
        j2: "",
        j3: "",
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
            <ParamSelection 
                label={ 
                    <Parameter 
                        command="-model" 
                        text="Optimization mode (exponential, gaussian, composite)." 
                    />
                }
                options={["exp", "gauss", "comp"]}    
                onValueChange={(value) => {handleModelChange("model", value.toString())}}
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
            
        </ParamWrapper>
    );
}