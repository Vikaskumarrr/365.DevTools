import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to use Web Workers
 * @param {string} workerPath - Path to the worker file
 * @returns {Object} - { postMessage, isReady, error }
 */
function useWebWorker(workerPath) {
    const workerRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const [error, setError] = useState(null);
    const callbacksRef = useRef(new Map());

    useEffect(() => {
        // Create worker
        try {
            workerRef.current = new Worker(workerPath);

            // Handle messages from worker
            workerRef.current.onmessage = (event) => {
                const { ready, success, result, error: workerError, type } = event.data;

                if (ready) {
                    setIsReady(true);
                    return;
                }

                // Execute callback if exists
                const callback = callbacksRef.current.get(type);
                if (callback) {
                    if (success) {
                        callback.resolve(result);
                    } else {
                        callback.reject(new Error(workerError));
                    }
                    callbacksRef.current.delete(type);
                }
            };

            // Handle worker errors
            workerRef.current.onerror = (err) => {
                console.error('Worker error:', err);
                setError(err.message);
            };
        } catch (err) {
            console.error('Failed to create worker:', err);
            setError(err.message);
        }

        // Cleanup
        return () => {
            if (workerRef.current) {
                workerRef.current.terminate();
            }
        };
    }, [workerPath]);

    /**
     * Post message to worker and return a promise
     * @param {Object} message - Message to send to worker
     * @returns {Promise} - Promise that resolves with worker result
     */
    const postMessage = (message) => {
        return new Promise((resolve, reject) => {
            if (!workerRef.current) {
                reject(new Error('Worker not initialized'));
                return;
            }

            if (!isReady) {
                reject(new Error('Worker not ready'));
                return;
            }

            // Store callback
            callbacksRef.current.set(message.type, { resolve, reject });

            // Send message to worker
            workerRef.current.postMessage(message);

            // Set timeout to prevent hanging
            setTimeout(() => {
                if (callbacksRef.current.has(message.type)) {
                    callbacksRef.current.delete(message.type);
                    reject(new Error('Worker timeout'));
                }
            }, 30000); // 30 second timeout
        });
    };

    return {
        postMessage,
        isReady,
        error
    };
}

export default useWebWorker;
