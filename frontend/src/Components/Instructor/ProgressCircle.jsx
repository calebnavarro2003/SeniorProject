import React from "react";

const CircularProgressBar = ({ value, size = 120 }) => {
    const newVal = value / 100; // Edits values since they're currently being calculated as whole numbers not decimals.
    const strokeWidth = size * 0.15; // Stroke scales with size
    const radius = (size - strokeWidth) / 2; // Ensure circle fits
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(Math.max(newVal, 0), 1) * circumference; // Clamp value between 0 and 1

    // Determine the progress color
    const getColor = () => {
        if (newVal < 0.6) return "#FF746C"; // Red
        if (newVal < 0.8) return "#FFEE8C"; // Yellow
        return "#82EBD1"; // Green
    };

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Background Circle */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#ddd"
                strokeWidth={strokeWidth}
            />
            
            {/* Progress Circle */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={getColor()}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={circumference - progress}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`} // Rotates the circle so it starts from the top
            />
            
            {/* Text Percentage (Properly Centered) */}
            <text
                x="50%"
                y="50%"
                dy="0.35em"  // Adjusts vertical alignment
                textAnchor="middle"
                fontSize={size * 0.15}
                fontWeight="bold"
                fill="#333"
            >
                {Math.round(newVal * 100)}%
            </text>
        </svg>
    );
};

export default CircularProgressBar;
