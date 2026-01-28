function LoadingSpinner() {
    return (
        <div 
            className="flex items-center justify-center min-h-[400px]"
            role="status"
            aria-live="polite"
            aria-label="Loading tool"
        >
            <div className="flex flex-col items-center gap-4">
                {/* Spinner */}
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-800 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                
                {/* Loading text */}
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                    Loading tool...
                </p>
            </div>
        </div>
    );
}

export default LoadingSpinner;
