"use client";

import { FilePicker } from "@/components/file/FilePicker";
import React from "react";
import { ParamWrapper, Parameter } from "@/components/params/Param";
import { useGlobalParams } from "@/components/context/GlobalParamsContext";

export default function FileParams() {
    const { combinedParams, updateParams } = useGlobalParams();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fileParams = combinedParams.File;

    const handleFileChange = (key: keyof typeof fileParams, path: string) => {
        updateParams("File", { [key]: path });
    };

    return (
        <ParamWrapper headerText="File">
            <FilePicker 
                label={<Parameter command="-tab" text="Peak Table Input" />}
                section="File" 
                paramKey="tab"
                extensions={["tab"]}
                mode="load"
                onFileChange={(path) => { handleFileChange("tab", path) }}
            />
            <FilePicker 
                label={<Parameter command="-fid" text="NMRPipe-format Time-Domain Input" />}
                section="File" 
                paramKey="fid"
                extensions={["fid"]}
                mode="load"
                onFileChange={(path) => { handleFileChange("fid", path) }}
            />
            <FilePicker 
                label={<Parameter command="-ft1" text="Corresponding NMRPipe-format Interferogram Input" />} 
                section="File" 
                paramKey="ft1"
                extensions={["ft1"]}
                mode="load"
                onFileChange={(path) => { handleFileChange("ft1", path) }}
            />
            <FilePicker 
                label={<Parameter command="-ft2" text="Corresponding NMRPipe-format Freq-Domain Input" />} 
                section="File" 
                paramKey="ft2"
                extensions={["ft2"]}
                mode="load"
                onFileChange={(path) => { handleFileChange("ft2", path) }}
            />
            <FilePicker
                label={<Parameter command="-out" text="NMRPipe-format Time-Domain Output, or Keyword None" />} 
                section="File" 
                paramKey="out"
                extensions={["fid", "ft1", "ft2"]}
                mode="save"
                onFileChange={(path) => { handleFileChange("out", path) }}
                
            />
            <FilePicker
                label={ 
                    <Parameter 
                        command="-apod" 
                        text="Optional NMRPipe-format Apodization Profile." 
                    /> 
                }
                section="File" 
                paramKey="apod"
                mode='load'
                onFileChange={(path) => {handleFileChange("apod", path)}}
            />
            <FilePicker
                label={
                    <Parameter 
                        command="-basis"
                        text="Save Each Peak in a Basis Set, Designate the Folder Path"
                    />
                }
                section="File" 
                paramKey="basis"
                mode='save-directory'
                onFileChange={(path) => {handleFileChange("basis", path)}}
            />
            <FilePicker
                label={ 
                    <Parameter 
                        command="-res" 
                        text="Optional NMRPipe-format Time-Domain Residual" 
                    /> 
                }
                section="File" 
                paramKey="res"
                mode='load'
                onFileChange={(path) => {handleFileChange("res", path)}}
            />
        </ParamWrapper>
    );
}