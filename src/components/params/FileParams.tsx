"use client";

import { FilePicker } from "@/components/file/FilePicker";
import React, { useEffect, useState } from "react";
import { ParamWrapper, Parameter } from "@/components/params/Param";

export default function FileParams({ onParamsChange }: { onParamsChange: (params: Record<string, unknown>) => void }) {
    const [fileParams, setFileParams] = useState({
        tab: "",
        fid: "",
        ft1: "",
        ft2: "",
        out: "",
        apod: "",
        basis: "",
    });

    const handleFileChange = (key: keyof typeof fileParams, path: string) => {
        setFileParams((prev) => ({ ...prev, [key]: path }));
    };
    
    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         console.log("File parameters have changed:", fileParams);
    //     }, 500); // delay 500ms
      
    //     return () => { clearTimeout(timeout); } // cleanup
    // }, [fileParams]);
    
    useEffect(() => {
        onParamsChange(fileParams);
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
            <FilePicker
                label={ 
                    <Parameter 
                        command="-apod" 
                        text="Optional NMRPipe-format Apodization Profile." 
                    /> 
                }
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
                mode='save-directory'
                onFileChange={(path) => {handleFileChange("basis", path)}}
            />
        </ParamWrapper>
    );
}