import React, { useEffect, useState } from "react";
import { ParamWrapper, Parameter } from "@/components/params/Param";
import { FloatInput, IntegerInput, MultiFloatInput } from "@/components/args/NumberInput";

export default function SimParams({ onParamsChange }: { onParamsChange: (params: Record<string, unknown>) => void }) {
    const [simParams, setSimParams] = useState({
        ndim: "",
        scale: "",
        off: "",
    });

    const handleSimChange = (key: keyof typeof simParams, value: string) => {
        setSimParams((prev) => ({ ...prev, [key]: value }));
    };
    
    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         console.log("Sim parameters have changed:", simParams);
    //     }, 500); // delay 500ms
      
    //     return () => { clearTimeout(timeout); } // cleanup
    // }, [simParams]);

    useEffect(() => {
        onParamsChange(simParams);
    }, [simParams]);

    return (
        <ParamWrapper headerText="Simulation Options">
            <IntegerInput 
                label={
                    <Parameter
                        command='-ndim'
                        text='Number of dimensions to simulate.'
                    />
                }
                onIntegerChange={(value) => {handleSimChange("ndim", value.toString())}}
            />
            <MultiFloatInput 
                label={
                    <Parameter 
                        command="-scale" 
                        text="Amplitude Scaling Factors."
                    />
                }
                onFloatsChange={(value) => {handleSimChange("scale", value.toString())}}
            /> 
            <MultiFloatInput
                label={
                    <Parameter 
                        command="-off" 
                        text="Optional Frequency offset values in pts." 
                    />
                }
                onFloatsChange={(value) => {handleSimChange("off", value.toString())}}
            />
            
        </ParamWrapper>
    );
}