import React from "react";
import { ParamWrapper, Parameter } from "@/components/params/Param";
import { FloatInput, MultiFloatInput, RangeFloatInput } from "@/components/args/NumberInput";
import { SectionHeader } from "@/components/Section";
import { useGlobalParams } from "@/components/context/GlobalParamsContext";

export default function OptimizationParams() {
    const { combinedParams, updateParams } = useGlobalParams();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const optParams = combinedParams.OptParams;

    const handleOptChange = (key: keyof typeof optParams, value: string | string[]) => {
        updateParams("OptParams", { [key]: value });
    };
    
    const handleOptChangeRange = (key: keyof typeof optParams, lower : number, upper : number) => {
        updateParams("OptParams", { [key]: [lower, upper]})
    }

    return (
        <ParamWrapper headerText="Optimization Parameters">
            <MultiFloatInput 
                label={
                    <Parameter 
                        command="-initXDecay" 
                        text="Initial x-axis decay value in Hz." 
                    />
                }
                section="OptParams"
                paramKey="initXDecay"
                onFloatsChange={(value) => {handleOptChange("initXDecay", value.toString())}}
            />
            <MultiFloatInput 
                label={
                    <Parameter 
                        command="-initYDecay" 
                        text="Initial y-axis decay value in Hz." 
                    />
                }
                section="OptParams"
                paramKey="initYDecay"
                onFloatsChange={(value) => {handleOptChange("initYDecay", value.toString())}}
            />
            <FloatInput 
                label={
                    <Parameter 
                        command="-xP0" 
                        text="Zero Order Phase of All Signals for x-axis." 
                    />
                }
                section="OptParams"
                paramKey="xP0"
            />
            <FloatInput 
                label={
                    <Parameter 
                        command="-xP1" 
                        text="First Order Phase of All Signals for x-axis." 
                    />
                }
                section="OptParams"
                paramKey="xP1"
            />
            <FloatInput 
                label={
                    <Parameter 
                        command="-yP0" 
                        text="Zero Order Phase of All Signals for y-axis." 
                    />
                }
                section="OptParams"
                paramKey="yP0"
            />
            <FloatInput 
                label={
                    <Parameter 
                        command="-yP1" 
                        text="First Order Phase of All Signals for y-axis." 
                    />
                }
                section="OptParams"
                paramKey="yP1"
            />
            <SectionHeader text="Bounds Options" />
            <RangeFloatInput
                label={
                    <Parameter 
                        command="-xDecayBounds" 
                        text="Lower and upper bounds for x-decay in Hz." 
                    />
                }
                section="OptParams"
                paramKey="xDecayBounds"
                onRangeChange={({lower, upper}) => {handleOptChangeRange("xDecayBounds", lower, upper)}}
            />
            <RangeFloatInput 
                label={
                    <Parameter 
                        command="-yDecayBounds" 
                        text="Lower and upper bounds for y-decay in Hz." 
                    />
                }
                section="OptParams"
                paramKey="yDecayBounds"
                onRangeChange={({lower, upper}) => {handleOptChangeRange("yDecayBounds", lower, upper)}}
            />
            <RangeFloatInput 
                label={
                    <Parameter 
                        command="-ampBounds" 
                        text="Lower and upper bounds for amplitude." 
                    />
                }
                section="OptParams"
                paramKey="ampBounds"
                onRangeChange={({lower, upper}) => {handleOptChangeRange("ampBounds", lower, upper)}}
            />
            <RangeFloatInput 
                label={
                    <Parameter 
                        command="-p0Bounds" 
                        text="Lower and upper bounds for p0 phase correction." 
                    />
                }
                section="OptParams"
                paramKey="p0Bounds"
                onRangeChange={({lower, upper}) => {handleOptChangeRange("p0Bounds", lower, upper)}}
            />
            <RangeFloatInput 
                label={
                    <Parameter 
                        command="-p1Bounds" 
                        text="Lower and upper bounds for p1 phase correction." 
                    />
                }
                section="OptParams"
                paramKey="p1Bounds"
                onRangeChange={({lower, upper}) => {handleOptChangeRange("p1Bounds", lower, upper)}}
            />
        </ParamWrapper>
    );
}