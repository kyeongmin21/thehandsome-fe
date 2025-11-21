import React from "react";

export default function LoadingSpinner({ size = "w-6 h-6", thickness = "border-2", fullScreen = false }) {
    const containerClass = fullScreen
        ? "fixed inset-0 flex items-center justify-center bg-black/10 z-50"
        : "inline-flex";

    return (
        <div className={containerClass}>
            <div className={`animate-spin rounded-full border-solid border-current border-r-transparent ${size} ${thickness}`}
                role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}
