import React from "react";
import { ParamWrapper, Parameter } from "@/components/params/Param";
import { MultiFloatInput } from "@/components/args/NumberInput";
import { ParamSelection } from "@/components/args/ParamSelection";
import { useGlobalParams } from "@/components/context/GlobalParamsContext";

export default function ModelParams() {
    const { combinedParams, updateParams } = useGlobalParams();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const modelParams = combinedParams.ModelParams;

    const handleModelChange = (key: keyof typeof modelParams, value: string) => {
        updateParams("ModelParams", {[key]: value });
    };
    
    return (
        <ParamWrapper headerText="Model Parameters">
            <ParamSelection 
                label={ 
                    <Parameter 
                        command="-model" 
                        text="Optimization mode (exponential, gaussian, composite)." 
                    />
                }
                section="ModelParams"
                paramKey="model"
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
                section="ModelParams"
                paramKey="j1"
                onFloatsChange={(value) => {handleModelChange("j1", value.toString())}}
            />
            
            <MultiFloatInput 
                label={
                    <Parameter
                        command="-j2"
                        text="Coupling 2 (Cosine Modulation, Pts Hz ppm %%)."
                    />
                }
                section="ModelParams"
                paramKey="j2"
                onFloatsChange={(value) => {handleModelChange("j2", value.toString())}}
            />
            
            <MultiFloatInput
                label={
                    <Parameter 
                        command="-j3" 
                        text="Coupling 3 (Cosine Modulation, Pts Hz ppm %%)."
                    />
                }
                section="ModelParams"
                paramKey="j3"
                onFloatsChange={(value) => {handleModelChange("j3", value.toString())}}
            />
            
        </ParamWrapper>
    );
}