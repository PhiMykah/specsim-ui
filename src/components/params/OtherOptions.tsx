import React from "react";
import { ParamWrapper, Parameter } from "@/components/params/Param";
import BooleanInput from "@/components/args/BooleanInput";
import { useGlobalParams } from "@/components/context/GlobalParamsContext";

export default function OtherOptions() {
    const { combinedParams, updateParams } = useGlobalParams();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const otherParams = combinedParams.OtherParams;

    const handleOtherChange = (key: keyof typeof otherParams, value: string) => {
        updateParams("OtherOptions", {[key]: value });
    };
    
    return (
        <ParamWrapper headerText="Additional Parameters" >
            <BooleanInput 
                label={
                    <Parameter 
                        command="-ts/nots" 
                        text="Scale Time-Domain Signal by Decay Integral (OFF/ON)."
                    />
                }
                section="OtherOptions"
                paramKey="ts"
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
                section="OtherOptions"
                paramKey="tdd"
                onBoolChange={(value) => {handleOtherChange("notdd", (!value).toString()); handleOtherChange("tdd", value.toString())}}
            />
            <BooleanInput 
                label={
                    <Parameter 
                        command="-tdj/nottdj" 
                        text="Interpret J-Modulation in Time Domain (OFF/ON)."
                    />
                }
                section="OtherOptions"
                paramKey="tdj"
                onBoolChange={(value) => {handleOtherChange("nottdj", (!value).toString()); handleOtherChange('tdj', value.toString())}}
            />
        </ParamWrapper>
    );
}
