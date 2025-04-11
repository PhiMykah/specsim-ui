import React, { useEffect, useState } from "react";
import { ParamWrapper, Parameter } from "@/components/params/Param";
import ParamSelection from "@/components/args/ParamSelection";
import { FloatInput } from "@/components/args/NumberInput";

export default function SimParams({ onParamsChange }: { onParamsChange: (params: Record<string, unknown>) => void }) {
    const [simParams, setSimParams] = useState({
        apod: "",
        scale: "",
        xOff: "",
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
            <ParamSelection 
                label={ 
                    <Parameter 
                        command="-apod" 
                        text="Optional NMRPipe-format Apodization Profile.  " 
                        className="p-1 text-center"
                    /> 
                }
                options={["Option 1", "Option 2", "Option 3"]}    
                onValueChange={(value) => {handleSimChange("apod", value.toString())}}
            />
            <FloatInput 
                label={
                    <Parameter 
                        command="-scale" 
                        text="Amplitude Scaling Factor.  " 
                        className="p-1 text-center whitespace-nowrap" 
                    />
                }
                onFloatChange={(value) => {handleSimChange("scale", value.toString())}}
            /> 
            <FloatInput 
                label={
                    <Parameter 
                        command="-xOff" 
                        text="Optional Frequency offset value in pts.  "
                        className="p-1 text-center whitespace-nowrap" 
                    />
                }
                onFloatChange={(value) => {handleSimChange("xOff", value.toString())}}
            />
            
        </ParamWrapper>
    );
}