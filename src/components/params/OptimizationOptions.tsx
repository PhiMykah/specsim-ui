import React, { useEffect, useState } from "react";
import { ParamWrapper, Parameter } from "@/components/params/Param";
import { FloatInput, IntegerInput, MultiFloatInput } from "@/components/args/NumberInput";
import ParamSelection from "@/components/args/ParamSelection";
import BooleanInput from "@/components/args/BooleanInput";

export default function OptimizationOptions({ onParamsChange }: { onParamsChange: (params: Record<string, unknown>) => void }) {
    const [optParams, setOptParams] = useState({
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
    });

    const handleOptChange = (key: keyof typeof optParams, value: string | string[]) => {
        setOptParams((prev) => ({ ...prev, [key]: value }));
    };
    
    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         console.log("Sim parameters have changed:", optParams);
    //     }, 500); // delay 500ms
      
    //     return () => { clearTimeout(timeout); } // cleanup
    // }, [optParams]);

    useEffect(() => {
        onParamsChange(optParams);
    }, [optParams]);
    
    return (
        <ParamWrapper headerText="Optimization Options">
            <FloatInput 
                label={
                    <Parameter 
                        command="-rx1" 
                        text="First Point Location for Calculating Residual." 
                    />
                }
                onFloatChange={(value) => {handleOptChange('rx1', value.toString())}}
            />
            <FloatInput 
                label={
                    <Parameter 
                        command="-rxn" 
                        text="Last Point Location for Calculating Residual."
                    />
                }
                onFloatChange={(value) => {handleOptChange('rxn', value.toString())}}
            />
            <ParamSelection 
                label={ 
                    <Parameter 
                        command="-mode" 
                        text="Optimization mode (lsq, basin, minimize, brute)." 
                    />
                }
                options={["lsq", "basin", "minimize", "brute"]}    
                onValueChange={(value) => {handleOptChange("mode", value.toString())}}
            />
            
            <IntegerInput 
                label={
                    <Parameter 
                        command="-trials" 
                        text="Number of Optimization Trials." 
                    />
                }
                onIntegerChange={(value) => {handleOptChange("trials", value.toString())}}
                positiveOnly={true}
            />
            
            <IntegerInput 
                label={
                    <Parameter 
                        command="-maxFail" 
                        text="Max Optimization Fails Before Quitting." 
                    />
                }
                onIntegerChange={(value) => {handleOptChange("maxFail", value.toString())}}
                positiveOnly={true}
            />
            
            <IntegerInput
                label={
                    <Parameter 
                        command="-iseed" 
                        text="Random Number Seed."
                    />
                }
                onIntegerChange={(value) => {handleOptChange("iseed", value.toString())}}
            />
            
            <BooleanInput 
                label={
                    <Parameter 
                        command="-verb" 
                        text="Verbose Mode (OFF/ON)." 
                    />
                }
                onBoolChange={(value) => {handleOptChange("noverb", (!value).toString()); handleOptChange("verb", value.toString())}}
            />


            <BooleanInput 
                label={
                    <Parameter 
                        command="-report"
                        text="Report Mode (OFF/ON)." 
                    />
                }
                onBoolChange={(value) => {handleOptChange("report", value.toString())}}
            />
            
            <MultiFloatInput 
                label={
                    <Parameter 
                        command="-freq" 
                        text="Frequency Positions (list of floats)." 
                    />
                }
                onFloatsChange={(value) => {handleOptChange("freq", value.toString())}}
            />
            

            <FloatInput 
                label = {
                    <Parameter 
                        command="-step"
                        text="Step-size for optimizations that require step-size (e.g. basin)."
                    />
                }
                onFloatChange={(value) => {handleOptChange("step", value.toString())}}
            />
            
        </ParamWrapper>
    );
}
