import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import aiService from '../services/aiService.js';
import apiKeyManager from '../services/apiKeyManager.js';
import rateLimiter from '../services/rateLimiter.js';

/**
 * AI Tool Context
 * 
 * Provides aiService, apiKeyManager, and rateLimiter to child components.
 * Tracks loading state and errors for AI operations.
 * 
 * Validates: Requirements 1.7, 2.1
 */

const AIToolContext = createContext(null);

/**
 * AI Tool Provider Component
 * 
 * Wraps the application or AI tool components to provide access to AI services.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export function AIToolProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Clear the current error state
     * Validates: Requirements 1.7
     */
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    /**
     * Set an error state
     * @param {Object} err - AIError object with type, message, retryable, action
     */
    const setAIError = useCallback((err) => {
        setError(err);
    }, []);

    /**
     * Set loading state
     * @param {boolean} loading - Whether an operation is in progress
     */
    const setLoadingState = useCallback((loading) => {
        setIsLoading(loading);
    }, []);

    /**
     * Check if any AI provider is configured with an API key
     * @returns {boolean} True if at least one provider has a key configured
     */
    const isConfigured = useMemo(() => {
        const configuredProviders = apiKeyManager.getConfiguredProviders();
        return configuredProviders.length > 0;
    }, []);

    /**
     * Context value containing all AI tool services and state
     */
    const contextValue = useMemo(() => ({
        // Services
        aiService,
        apiKeyManager,
        rateLimiter,
        
        // State
        isConfigured,
        isLoading,
        error,
        
        // Actions
        clearError,
        setError: setAIError,
        setLoading: setLoadingState,
    }), [isConfigured, isLoading, error, clearError, setAIError, setLoadingState]);

    return (
        <AIToolContext.Provider value={contextValue}>
            {children}
        </AIToolContext.Provider>
    );
}

/**
 * Custom hook to access the AI Tool context
 * 
 * @returns {Object} AI Tool context value containing:
 *   - aiService: AI Service instance for making API calls
 *   - apiKeyManager: API Key Manager for managing provider keys
 *   - rateLimiter: Rate Limiter for tracking usage
 *   - isConfigured: Boolean indicating if any provider is configured
 *   - isLoading: Boolean indicating if an operation is in progress
 *   - error: Current AIError object or null
 *   - clearError: Function to clear the current error
 *   - setError: Function to set an error
 *   - setLoading: Function to set loading state
 * 
 * @throws {Error} If used outside of AIToolProvider
 */
export function useAITool() {
    const context = useContext(AIToolContext);
    if (!context) {
        throw new Error('useAITool must be used within AIToolProvider');
    }
    return context;
}

export default AIToolContext;
