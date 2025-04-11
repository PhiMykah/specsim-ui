import React, { useEffect, useState } from "react";
import { ParamWrapper, Parameter } from "@/components/params/Param";
import BooleanInput from "@/components/args/BooleanInput";

export default function OtherOptions({ onParamsChange }: { onParamsChange: (params: Record<string, unknown>) => void }) {
    const [otherParams, setOtherParams] = useState({
        ts: "",
        nots: "",
        notdd: "",
        tdd: "",
        nottdj: "",
        tdj: "",
    })

    const handleOtherChange = (key: keyof typeof otherParams, value: string) => {
        setOtherParams((prev) => ({ ...prev, [key]: value }));
    };
    
    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         console.log("Sim parameters have changed:", otherParams);
    //     }, 500); // delay 500ms
      
    //     return () => { clearTimeout(timeout); } // cleanup
    // }, [otherParams]);

    useEffect(() => {
        onParamsChange(otherParams);
    }, [otherParams]);

    return (
        <ParamWrapper headerText="Additional Parameters" >
            <BooleanInput 
                label={
                    <Parameter 
                        command="-ts/nots" 
                        text="Scale Time-Domain Signal by Decay Integral (OFF/ON)."
                    />
                }
                onBoolChange={(value) => {handleOtherChange("nots", (!value).toString()); handleOtherChange("ts", value.toString())}}
            />
            <BooleanInput 
                label={
                    <Parameter 
                        command="-tdd/notdd" 
                        text="Interpret Linewidth as Frequency Domain or Time Domain Decay (Frequency/Time)."
                        className="flex flex-wrap text-wrap gap-2 items-center"
                    />
                }
                onBoolChange={(value) => {handleOtherChange("notdd", (!value).toString()); handleOtherChange("tdd", value.toString())}}
            />
            <BooleanInput 
                label={
                    <Parameter 
                        command="-tdj/nottdj" 
                        text="Interpret J-Modulation in Time Domain (OFF/ON)."
                    />
                }
                onBoolChange={(value) => {handleOtherChange("nottdj", (!value).toString()); handleOtherChange('tdj', value.toString())}}
            />
        </ParamWrapper>
    );
}
