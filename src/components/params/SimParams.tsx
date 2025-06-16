import React from "react";
import { ParamWrapper, Parameter } from "@/components/params/Param";
import { IntegerInput, MultiFloatInput } from "@/components/args/NumberInput";
import { useGlobalParams } from "@/components/context/GlobalParamsContext";

export default function SimParams() {
    const { combinedParams, updateParams } = useGlobalParams();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const simParams = combinedParams.SimOptions;

    const handleSimChange = (key: keyof typeof simParams, value: string) => {
        updateParams("SimOptions", { [key]: value });
    };

    return (
        <ParamWrapper headerText="Simulation Options">
            <IntegerInput 
                label={
                    <Parameter
                        command='-ndim'
                        text='Number of dimensions to simulate.'
                    />
                }
                section="SimOptions"
                paramKey="ndim"
            />
            <MultiFloatInput 
                label={
                    <Parameter 
                        command="-scale" 
                        text="Amplitude Scaling Factors."
                    />
                }
                section="SimOptions"
                paramKey="scale"
                onFloatsChange={(value) => {handleSimChange("scale", value.toString())}}
            /> 
            <MultiFloatInput
                label={
                    <Parameter 
                        command="-off" 
                        text="Optional Frequency offset values in pts." 
                    />
                }
                section="SimOptions"
                paramKey="off"
                onFloatsChange={(value) => {handleSimChange("off", value.toString())}}
            />
            
        </ParamWrapper>
    );
}