import { Section, SectionHeader } from "@/components/Section";
import { FilePicker } from "@/components/file/FilePicker";
import { FloatInput, IntegerInput, MultiFloatInput, RangeFloatInput } from "@/components/args/NumberInput";
import React, { useEffect, useState } from "react";
import ParamSelection from "./args/ParamSelection";
import BooleanInput from "./args/BooleanInput";

function ParamWrapper({ children, headerText }: { children: React.ReactNode; headerText: string; }) {
    return (
        <Section>
            <SectionHeader text={headerText} />
            <div
                className={`grid gap-4 w-full`}
            >
                {children}
            </div>
        </Section>
    );
}

function Parameter({ text, command, className }: { text: string; command: string; className?: string }) {
    return (
        <div className={className ?? "flex gap-2 items-center"}>
            {text}
            <code className="bg-accent text-accent-content rounded-lg p-1 text-sm">
                {command}
            </code>
        </div>
    );
}

export function FileParams() {
    const [fileParams, setFileParams] = useState({
        tab: "",
        fid: "",
        ft1: "",
        ft2: "",
        out: "",
    });

    const handleFileChange = (key: keyof typeof fileParams, path: string) => {
        setFileParams((prev) => ({ ...prev, [key]: path }));
    };
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            console.log("File parameters have changed:", fileParams);
        }, 500); // delay 500ms
      
        return () => { clearTimeout(timeout); } // cleanup
    }, [fileParams]);
      
    return (
        <ParamWrapper headerText="File">
            <FilePicker 
                label={<Parameter command="-tab" text="Peak Table Input" />} 
                extensions={["tab"]}
                mode="load"
                onFileChange={(path) => { handleFileChange("tab", path) }}
            />
            <FilePicker 
                label={<Parameter command="-fid" text="NMRPipe-format Time-Domain Input" />} 
                extensions={["fid"]}
                mode="load"
                onFileChange={(path) => { handleFileChange("fid", path) }}
            />
            <FilePicker 
                label={<Parameter command="-ft1" text="Corresponding NMRPipe-format Interferogram Input" />} 
                extensions={["ft1"]}
                mode="load"
                onFileChange={(path) => { handleFileChange("ft1", path) }}
            />
            <FilePicker 
                label={<Parameter command="-ft2" text="Corresponding NMRPipe-format Freq-Domain Input" />} 
                extensions={["ft2"]}
                mode="load"
                onFileChange={(path) => { handleFileChange("ft2", path) }}
            />
            <FilePicker
                label={<Parameter command="-out" text="NMRPipe-format Time-Domain Output, or Keyword None" />} 
                extensions={["fid", "ft1", "ft2"]}
                mode="save"
                onFileChange={(path) => { handleFileChange("out", path) }}
                
            />
        </ParamWrapper>
    );
}

export function SimParams() {
    const [simParams, setSimParams] = useState({
        apod: "",
        scale: "",
        xOff: "",
    });

    const handleSimChange = (key: keyof typeof simParams, value: string) => {
        setSimParams((prev) => ({ ...prev, [key]: value }));
    };
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            console.log("Sim parameters have changed:", simParams);
        }, 500); // delay 500ms
      
        return () => { clearTimeout(timeout); } // cleanup
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

export function OptimizationOptions() {
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
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            console.log("Sim parameters have changed:", optParams);
        }, 500); // delay 500ms
      
        return () => { clearTimeout(timeout); } // cleanup
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

export function OptimizationParams() {
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
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            console.log("Sim parameters have changed:", optParams);
        }, 500); // delay 500ms
      
        return () => { clearTimeout(timeout); } // cleanup
    }, [optParams]);

    return (
        <ParamWrapper headerText="Optimization Parameters">
            <FloatInput 
                label={
                    <Parameter 
                        command="-initXDecay" 
                        text="Initial x-axis decay value in Hz." 
                    />
                }
                onFloatChange={(value) => {handleOptChange("initXDecay", value.toString())}}
            />
            <FloatInput 
                label={
                    <Parameter 
                        command="-initYDecay" 
                        text="Initial y-axis decay value in Hz." 
                    />
                }
                onFloatChange={(value) => {handleOptChange("initYDecay", value.toString())}}
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

export function ModelParams() {
    return (
        <ParamWrapper headerText="Model Parameters">
            <Parameter command="-eDecay" text="Exponential Decays (list of floats)." />
            <Parameter command="-eAmp" text="Exponential Amplitudes, or Keyword Auto." />
            <Parameter command="-gDecay" text="Gaussian Decays (Pts Hz ppm %%)." />
            <Parameter command="-gAmp" text="Gaussian Amplitudes, or Keyword Auto." />
            <Parameter command="-j1" text="Coupling 1 (Cosine Modulation, Pts Hz ppm %%)." />
            <Parameter command="-j2" text="Coupling 2 (Cosine Modulation, Pts Hz ppm %%)." />
            <Parameter command="-j3" text="Coupling 3 (Cosine Modulation, Pts Hz ppm %%)." />
            <Parameter command="-ePhase" text="Additional Phase for Each Exponential Signal." />
            <Parameter command="-gPhase" text="Additional Phase for Each Gaussian Signal." />
        </ParamWrapper>
    );
}

export function OtherOptions() {
    return (
        <ParamWrapper headerText="Additional Parameters" >
            <Parameter command="-ts" text="Scale Time-Domain Signal by Decay Integral." />
            <Parameter command="-nots" text="No Time-Domain Scale (Default OFF)." />
            <Parameter command="-notdd" text="Interpret Linewidth in Frequency Domain (Default OFF)." />
            <Parameter command="-tdd" text="Interpret Linewidth as Time Domain Decay (Default OFF)." />
            <Parameter command="-tdj" text="Interpret J-Modulation in Time Domain (Default OFF)." />
            <Parameter command="-notdj" text="Interpret J-Modulation in Frequency Domain (Default OFF)." />
        </ParamWrapper>
    );
}
