import React from "react";
import { ParamWrapper, Parameter } from "@/components/params/Param";
import { FloatInput, IntegerInput, MultiFloatInput } from "@/components/args/NumberInput";
import ParamSelection from "@/components/args/ParamSelection";
import BooleanInput from "@/components/args/BooleanInput";
import { useGlobalParams } from "@/components/context/GlobalParamsContext";

export default function OptimizationOptions() {
    const { combinedParams, updateParams } = useGlobalParams();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const optParams = combinedParams.OptOptions;

    const handleOptChange = (key: keyof typeof optParams, value: string | string[]) => {
        updateParams("OptOptions", { [key]: value });
    };
    
    return (
        <ParamWrapper headerText="Optimization Options">
            <FloatInput 
                label={
                    <Parameter 
                        command="-rx1" 
                        text="First Point Location for Calculating Residual." 
                    />
                }
                section="OptOptions"
                paramKey="rx1"
            />
            <FloatInput 
                label={
                    <Parameter 
                        command="-rxn" 
                        text="Last Point Location for Calculating Residual."
                    />
                }
                section="OptOptions"
                paramKey="rxn"
            />
            <ParamSelection 
                label={ 
                    <Parameter 
                        command="-mode" 
                        text="Optimization mode (lsq, basin, minimize, brute, danneal)." 
                    />
                }
                section="OptOptions"
                paramKey="mode"
                options={["lsq", "basin", "minimize", "brute", "danneal"]}    
                onValueChange={(value) => {handleOptChange("mode", value.toString())}}
            />
            
            <IntegerInput 
                label={
                    <Parameter 
                        command="-trials" 
                        text="Number of Optimization Trials." 
                    />
                }
                section="OptOptions"
                paramKey="trials"
                positiveOnly={true}
            />
            
            <IntegerInput 
                label={
                    <Parameter 
                        command="-maxFail" 
                        text="Max Optimization Fails Before Quitting." 
                    />
                }
                section="OptOptions"
                paramKey="maxFail"
                positiveOnly={true}
            />
            
            <IntegerInput
                label={
                    <Parameter 
                        command="-iseed" 
                        text="Random Number Seed."
                    />
                }
                section="OptOptions"
                paramKey="iseed"
            />
            
            <BooleanInput 
                label={
                    <Parameter 
                        command="-verb" 
                        text="Verbose Mode (OFF/ON)." 
                    />
                }
                section="OptOptions"
                paramKey="verb"
                onBoolChange={(value) => {handleOptChange("noverb", (!value).toString()); handleOptChange("verb", value.toString())}}
            />


            <BooleanInput 
                label={
                    <Parameter 
                        command="-report"
                        text="Report Mode (OFF/ON)." 
                    />
                }
                section="OptOptions"
                paramKey="report"
                onBoolChange={(value) => {handleOptChange("report", value.toString())}}
            />
            
            <MultiFloatInput 
                label={
                    <Parameter 
                        command="-freq" 
                        text="Frequency Positions (list of floats)." 
                    />
                }
                section="OptOptions"
                paramKey="freq"
                onFloatsChange={(value) => {handleOptChange("freq", value.toString())}}
            />
            

            <FloatInput 
                label = {
                    <Parameter 
                        command="-step"
                        text="Step-size for optimizations that require step-size (e.g. basin)."
                    />
                }
                section="OptOptions"
                paramKey="step"
            />
            
        </ParamWrapper>
    );
}
