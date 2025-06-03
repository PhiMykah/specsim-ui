import React, { useEffect, useState } from "react";
import { ParamWrapper, Parameter } from "@/components/params/Param";
import { FloatInput, MultiFloatInput, RangeFloatInput } from "@/components/args/NumberInput";
import { SectionHeader } from "@/components/Section";

export default function OptimizationParams({ onParamsChange }: { onParamsChange: (params: Record<string, unknown>) => void }) {
    const [optParams, setOptParams] = useState({
        initXDecay: "",
        initYDecay: "",
        xP0: "",
        xP1: "",
        yP0: "",
        yP1: "",
        xDecayBounds: "",
        yDecayBounds: "",
        ampBounds: "",
        p0Bounds: "",
        p1Bounds: "",
    })

    const handleOptChange = (key: keyof typeof optParams, value: string) => {
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
        <ParamWrapper headerText="Optimization Parameters">
            <MultiFloatInput 
                label={
                    <Parameter 
                        command="-initXDecay" 
                        text="Initial x-axis decay value in Hz." 
                    />
                }
                onFloatsChange={(value) => {handleOptChange("initXDecay", value.toString())}}
            />
            <MultiFloatInput 
                label={
                    <Parameter 
                        command="-initYDecay" 
                        text="Initial y-axis decay value in Hz." 
                    />
                }
                onFloatsChange={(value) => {handleOptChange("initYDecay", value.toString())}}
            />
            <FloatInput 
                label={
                    <Parameter 
                        command="-xP0" 
                        text="Zero Order Phase of All Signals for x-axis." 
                    />
                }
                onFloatChange={(value) => {handleOptChange("xP0", value.toString())}}
            />
            <FloatInput 
                label={
                    <Parameter 
                        command="-xP1" 
                        text="First Order Phase of All Signals for x-axis." 
                    />
                }
                onFloatChange={(value) => {handleOptChange("xP1", value.toString())}}
            />
            <FloatInput 
                label={
                    <Parameter 
                        command="-yP0" 
                        text="Zero Order Phase of All Signals for y-axis." 
                    />
                }
                onFloatChange={(value) => {handleOptChange("yP0", value.toString())}}
            />
            <FloatInput 
                label={
                    <Parameter 
                        command="-yP1" 
                        text="First Order Phase of All Signals for y-axis." 
                    />
                }
                onFloatChange={(value) => {handleOptChange("yP1", value.toString())}}
            />
            <SectionHeader text="Bounds Options" />
            <RangeFloatInput
                label={
                    <Parameter 
                        command="-xDecayBounds" 
                        text="Lower and upper bounds for x-decay in Hz." 
                    />
                }
                onRangeChange={({lower, upper}) => {handleOptChange("xDecayBounds", `${lower.toString()}, ${upper.toString()}`)}}
            />
            <RangeFloatInput 
                label={
                    <Parameter 
                        command="-yDecayBounds" 
                        text="Lower and upper bounds for y-decay in Hz." 
                    />
                }
                onRangeChange={({lower, upper}) => {handleOptChange("yDecayBounds", `${lower.toString()}, ${upper.toString()}`)}}
            />
            <RangeFloatInput 
                label={
                    <Parameter 
                        command="-ampBounds" 
                        text="Lower and upper bounds for amplitude." 
                    />
                }
                onRangeChange={({lower, upper}) => {handleOptChange("ampBounds", `${lower.toString()}, ${upper.toString()}`)}}
            />
            <RangeFloatInput 
                label={
                    <Parameter 
                        command="-p0Bounds" 
                        text="Lower and upper bounds for p0 phase correction." 
                    />
                }
                onRangeChange={({lower, upper}) => {handleOptChange("p0Bounds", `${lower.toString()}, ${upper.toString()}`)}}
            />
            <RangeFloatInput 
                label={
                    <Parameter 
                        command="-p1Bounds" 
                        text="Lower and upper bounds for p1 phase correction." 
                    />
                }
                onRangeChange={({lower, upper}) => {handleOptChange("p1Bounds", `${lower.toString()}, ${upper.toString()}`)}}
            />
        </ParamWrapper>
    );
}