import { Section, SectionHeader } from "@/components/Section";
import { FilePicker } from "@/components/FilePicker";
import { useEffect, useState } from "react";

function ParamWrapper({ children, headerText }: { children: React.ReactNode; headerText: string }) {
    return (
        <Section>
            <SectionHeader text={headerText} />
            <div className="grid gap-4 w-full">
                {children}
            </div>
        </Section>
    );
}

function Parameter({ text, command } : { text: string, command : string}) {
    return (
        <div className="flex gap-2 items-center">
            {text}
            <code className="bg-accent text-accent-content rounded-lg p-1 text-sm">
                {command}
            </code>
        </div>
    )
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
    return (
        <ParamWrapper headerText="Simulation Options">
            <Parameter command="-apod" text="Optional NMRPipe-format Apodization Profile." />
            <Parameter command="-scale" text="Amplitude Scaling Factor." />
            <Parameter command="-xOff" text="Optional Frequency offset value in pts." />
        </ParamWrapper>
    );
}

export function OptimizationOptions() {
    return (
        <ParamWrapper headerText="Optimization Options">
            <Parameter command="-rx1" text="First Point Location for Calculating Residual." />
            <Parameter command="-rxn" text="Last Point Location for Calculating Residual." />
            <Parameter command="-mode" text="Optimization mode (lsq, basin, minimize, brute)." />
            <Parameter command="-trials" text="Number of Optimization Trials." />
            <Parameter command="-maxFail" text="Max Optimization Fails Before Quitting." />
            <Parameter command="-iseed" text="Random Number Seed." />
            <Parameter command="-verb" text="Verbose Mode ON (Default OFF)." />
            <Parameter command="-noverb" text="Verbose Mode OFF." />
            <Parameter command="-report" text="Report Mode ON." />
            <Parameter command="-freq" text="Frequency Positions (list of floats)." />
            <Parameter command="-step" text="Step-size for optimizations that require step-size (e.g. basin)." />
        </ParamWrapper>
    );
}

export function OptimizationParams() {
    return (
        <ParamWrapper headerText="Optimization Parameters">
            <Parameter command="-initXDecay" text="Initial x-axis decay value in Hz." />
            <Parameter command="-initYDecay" text="Initial y-axis decay value in Hz." />
            <Parameter command="-xP0" text="Zero Order Phase of All Signals for x-axis." />
            <Parameter command="-xP1" text="First Order Phase of All Signals for x-axis." />
            <Parameter command="-yP0" text="Zero Order Phase of All Signals for y-axis." />
            <Parameter command="-yP1" text="First Order Phase of All Signals for y-axis." />
            <SectionHeader text="Bounds Options" />
            <Parameter command="-xDecayBounds" text="Lower and upper bounds for x-decay in Hz." />
            <Parameter command="-yDecayBounds" text="Lower and upper bounds for y-decay in Hz." />
            <Parameter command="-ampBounds" text="Lower and upper bounds for amplitude." />
            <Parameter command="-p0Bounds" text="Lower and upper bounds for p0 phase correction." />
            <Parameter command="-p1Bounds" text="Lower and upper bounds for p1 phase correction." />
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
