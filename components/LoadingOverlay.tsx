import React from 'react';

const LoadingOverlay = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#663820] border-t-transparent"></div>
                <p className="text-xl font-medium text-white font-serif">Synthesizing your book...</p>
            </div>
        </div>
    );
};

export default LoadingOverlay;
