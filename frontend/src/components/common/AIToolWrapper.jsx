import { useState, useMemo, useCallback } from 'react';
import { FiKey, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import { AIToolProvider, useAITool } from '../../context/AIToolContext';
import APIKeySettings from './APIKeySettings';
import apiKeyManager from '../../services/apiKeyManager';

/**
 * AI Tool Wrapper Higher-Order Component
 * 
 * Wraps AI tool components to provide:
 * - API key configuration check on mount
 * - API key setup prompt if not configured
 * - AI context provision to wrapped tools
 * - Loading and error state handling
 * 
 * Validates: Requirements 1.1, 9.4
 * 
 * @param {Object} props - Component props
 * @param {string} props.toolName - Name of the AI tool being wrapped
 * @param {string} [props.requiredProvider] - Specific provider required (optional)
 * @param {React.ReactNode} props.children - The AI tool component to wrap
 */
function AIToolWrapperContent({ toolName, requiredProvider, children }) {
    const aiContext = useAITool();
    const { isLoading, error, clearError } = aiContext;
    
    const [showSettings, setShowSettings] = useState(false);
    // Track a refresh key to force re-computation of isKeyConfigured
    const [refreshKey, setRefreshKey] = useState(0);

    /**
     * Check if the required API key is configured
     * If requiredProvider is specified, check for that specific provider
     * Otherwise, check if any provider is configured
     * Uses useMemo to compute synchronously during render
     */
    const isKeyConfigured = useMemo(() => {
        // refreshKey is used to trigger re-computation when settings change
        void refreshKey;
        
        if (requiredProvider) {
            // Check for specific provider
            return apiKeyManager.hasKey(requiredProvider);
        } else {
            // Check if any provider is configured
            const configuredProviders = apiKeyManager.getConfiguredProviders();
            return configuredProviders.length > 0;
        }
    }, [requiredProvider, refreshKey]);

    /**
     * Handle settings close - trigger refresh of configuration check
     */
    const handleSettingsClose = useCallback(() => {
        setShowSettings(false);
        // Increment refresh key to trigger re-computation of isKeyConfigured
        setRefreshKey(prev => prev + 1);
    }, []);

    /**
     * Handle configure button click
     */
    const handleConfigureClick = useCallback(() => {
        setShowSettings(true);
    }, []);

    // Show settings panel if user requested it
    if (showSettings) {
        return (
            <div className="max-w-2xl mx-auto p-6">
                <APIKeySettings onClose={handleSettingsClose} />
            </div>
        );
    }

    // Show API key setup prompt if not configured
    if (!isKeyConfigured) {
        return (
            <div className="flex items-center justify-center min-h-[400px] p-6">
                <div className="max-w-md w-full text-center">
                    {/* Icon */}
                    <div className="mx-auto w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-6">
                        <FiKey className="w-10 h-10 text-primary-500" aria-hidden="true" />
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        API Key Required
                    </h2>
                    
                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {requiredProvider ? (
                            <>
                                The <strong>{toolName}</strong> requires a{' '}
                                <strong className="capitalize">{requiredProvider}</strong> API key to function.
                                Please configure your API key to continue.
                            </>
                        ) : (
                            <>
                                The <strong>{toolName}</strong> requires an AI provider API key to function.
                                Please configure at least one API key to continue.
                            </>
                        )}
                    </p>
                    
                    {/* Security notice */}
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl mb-6 text-left">
                        <div className="flex items-start space-x-3">
                            <span className="text-blue-500 mt-0.5">🔒</span>
                            <div className="text-sm">
                                <p className="font-medium text-blue-800 dark:text-blue-300">
                                    Your keys stay private
                                </p>
                                <p className="text-blue-600 dark:text-blue-400 mt-1">
                                    API keys are stored locally in your browser and never sent to our servers.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Configure button */}
                    <button
                        onClick={handleConfigureClick}
                        className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                        aria-label="Configure API key"
                    >
                        <FiKey className="w-5 h-5" aria-hidden="true" />
                        <span>Configure API Key</span>
                    </button>
                </div>
            </div>
        );
    }

    // Show error state if there's an error from AI context
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px] p-6">
                <div className="max-w-md w-full text-center">
                    {/* Error icon */}
                    <div className="mx-auto w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
                        <FiAlertCircle className="w-10 h-10 text-red-500" aria-hidden="true" />
                    </div>
                    
                    {/* Error title */}
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {error.type === 'auth' ? 'Authentication Error' : 'Something Went Wrong'}
                    </h2>
                    
                    {/* Error message */}
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {error.message || 'An unexpected error occurred. Please try again.'}
                    </p>
                    
                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        {error.type === 'auth' && (
                            <button
                                onClick={handleConfigureClick}
                                className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                                aria-label="Update API key"
                            >
                                <FiKey className="w-5 h-5" aria-hidden="true" />
                                <span>Update API Key</span>
                            </button>
                        )}
                        
                        {error.retryable && (
                            <button
                                onClick={clearError}
                                className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                                aria-label="Try again"
                            >
                                <FiRefreshCw className="w-5 h-5" aria-hidden="true" />
                                <span>Try Again</span>
                            </button>
                        )}
                        
                        {!error.retryable && error.type !== 'auth' && (
                            <button
                                onClick={clearError}
                                className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                                aria-label="Dismiss error"
                            >
                                <span>Dismiss</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Show loading overlay if AI operation is in progress
    if (isLoading) {
        return (
            <div className="relative">
                {/* Render children with loading overlay */}
                <div className="opacity-50 pointer-events-none">
                    {children}
                </div>
                
                {/* Loading overlay */}
                <div 
                    className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-900/50"
                    role="status"
                    aria-live="polite"
                    aria-label="Processing AI request"
                >
                    <div className="flex flex-col items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                        <div className="relative w-12 h-12">
                            <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">
                            Processing...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Render children with AI context available
    return children;
}

/**
 * AI Tool Wrapper Component
 * 
 * Wraps the content component with AIToolProvider to ensure context is available.
 * This is the main export that should be used to wrap AI tool components.
 * 
 * @param {Object} props - Component props
 * @param {string} props.toolName - Name of the AI tool being wrapped
 * @param {string} [props.requiredProvider] - Specific provider required (optional)
 * @param {React.ReactNode} props.children - The AI tool component to wrap
 */
function AIToolWrapper({ toolName, requiredProvider, children }) {
    return (
        <AIToolProvider>
            <AIToolWrapperContent 
                toolName={toolName} 
                requiredProvider={requiredProvider}
            >
                {children}
            </AIToolWrapperContent>
        </AIToolProvider>
    );
}

export default AIToolWrapper;
