"use client";
import React from "react";
import { ReactNode } from "react";


// Example data: Replace with your optimization spectrum data
const spectrumData = Array.from({ length: 500 }, (_, i) => ({
    x: i,
    y: Math.exp(-((i - 250) ** 2) / (2 * 40 ** 2)) + 0.1 * Math.random(),
}));

const width = 600;
const height = 300;
const margin = { top: 20, right: 20, bottom: 40, left: 50 };

function getXScale(data: typeof spectrumData) {
    const minX = Math.min(...data.map((d) => d.x));
    const maxX = Math.max(...data.map((d) => d.x));
    return (x: number) =>
        margin.left +
        ((x - minX) / (maxX - minX)) * (width - margin.left - margin.right);
}

function getYScale(data: typeof spectrumData) {
    const minY = Math.min(...data.map((d) => d.y));
    const maxY = Math.max(...data.map((d) => d.y));
    return (y: number) =>
        height -
        margin.bottom -
        ((y - minY) / (maxY - minY)) * (height - margin.top - margin.bottom);
}

export default function PlotPage() {
    const xScale = getXScale(spectrumData);
    const yScale = getYScale(spectrumData);

    // Generate SVG path for the spectrum
    const pathData = spectrumData
        .map((d, i) =>
            i === 0
                ? `M ${xScale(d.x)},${yScale(d.y)}`
                : `L ${xScale(d.x)},${yScale(d.y)}`
        )
        .join(" ");

    return (
        <div style={{ padding: 24 }}>
            <h1>Optimization Spectrum</h1>
            <svg width={width} height={height} style={{ border: "1px solid #ccc" }}>
                {/* X axis */}
                <line
                    x1={margin.left}
                    y1={height - margin.bottom}
                    x2={width - margin.right}
                    y2={height - margin.bottom}
                    stroke="#333"
                />
                {/* Y axis */}
                <line
                    x1={margin.left}
                    y1={margin.top}
                    x2={margin.left}
                    y2={height - margin.bottom}
                    stroke="#333"
                />
                {/* Spectrum path */}
                <path d={pathData} fill="none" stroke="#1976d2" strokeWidth={2} />
                {/* X axis label */}
                <text
                    x={width / 2}
                    y={height - 5}
                    textAnchor="middle"
                    fontSize={14}
                    fill="#333"
                >
                    Frequency (a.u.)
                </text>
                {/* Y axis label */}
                <text
                    x={15}
                    y={height / 2}
                    textAnchor="middle"
                    fontSize={14}
                    fill="#333"
                    transform={`rotate(-90 15,${height / 2})`}
                >
                    Intensity (a.u.)
                </text>
            </svg>
        </div>
    );
}