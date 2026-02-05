/**
 * AI Service Layer
 * 
 * Provides a unified interface for communicating with different LLM providers.
 * Supports OpenAI, Anthropic, and Google AI with response normalization.
 * 
 * Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 11.1, 11.2, 11.3, 11.4, 11.5, 11.6
 */

import apiKeyManager from './apiKeyManager.js';

// ============================================================================
// Error Handling and Retry Configuration
// ============================================================================

/**
 * Retry configuration for exponential backoff
 * Validates: Requirements 2.3, 11.5
 */
const retryConfig = {
  maxRetries: 3,
  baseDelayMs: 1000,
  maxDelayMs: 10000,
  retryableErrors: ['network', 'rate_limit'],
  
  /**
   * Calculate delay for a given retry attempt using exponential backoff with jitter
   * @param {number} attempt - The current retry attempt (0-indexed)
   * @returns {number} - Delay in milliseconds
   */
  getDelay(attempt) {
    // Exponential backoff with jitter
    const delay = Math.min(
      this.baseDelayMs * Math.pow(2, attempt),
      this.maxDelayMs
    );
    // Add random jitter (0-1000ms) to prevent thundering herd
    return delay + Math.random() * 1000;
  },
  
  /**
   * Check if an error type is retryable
   * @param {string} errorType - The error type to check
   * @returns {boolean} - Whether the error is retryable
   */
  isRetryable(errorType) {
    return this.retryableErrors.includes(errorType);
  }
};

/**
 * User-friendly error messages for each error type
 * Validates: Requirements 11.1, 11.2, 11.3, 11.4
 */
const errorMessages = {
  auth: {
    message: 'Authentication failed. Please check your API key.',
    action: 'Verify your API key is correct and has not expired.',
    retryable: false
  },
  rate_limit: {
    message: 'Rate limit exceeded. Please wait before trying again.',
    action: 'Wait a moment and try again, or reduce request frequency.',
    retryable: true
  },
  network: {
    message: 'Network error. Please check your connection.',
    action: 'Check your internet connection and try again.',
    retryable: true
  },
  invalid_input: {
    message: 'Invalid input. Please check your text and try again.',
    action: 'Review your input for any formatting issues.',
    retryable: false
  },
  context_length: {
    message: 'Input exceeds maximum length. Please shorten your text.',
    action: 'Reduce the length of your input text.',
    retryable: false
  },
  unknown: {
    message: 'An unexpected error occurred. Please try again.',
    action: 'Try again or contact support if the issue persists.',
    retryable: false
  }
};

/**
 * Get user-friendly error information for an error type
 * @param {string} errorType - The error type
 * @returns {object} - Error message information
 */
function getErrorInfo(errorType) {
  return errorMessages[errorType] || errorMessages.unknown;
}

/**
 * Create a standardized AIError object
 * Validates: Requirements 2.4, 11.1, 11.2, 11.3
 * @param {string} type - Error type (auth, rate_limit, network, invalid_input, context_length, unknown)
 * @param {string} message - Error message
 * @param {boolean} retryable - Whether the error is retryable
 * @param {number} [retryAfter] - Optional time to wait before retrying (in ms)
 * @returns {object} - Standardized AIError object
 */
function createAIError(type, message, retryable, retryAfter = undefined) {
  const validTypes = ['auth', 'rate_limit', 'network', 'invalid_input', 'context_length', 'unknown'];
  const errorType = validTypes.includes(type) ? type : 'unknown';
  const errorInfo = getErrorInfo(errorType);
  
  return {
    type: errorType,
    message: message || errorInfo.message,
    retryable: typeof retryable === 'boolean' ? retryable : errorInfo.retryable,
    retryAfter,
    action: errorInfo.action
  };
}

/**
 * Log error to console with structured format
 * Validates: Requirements 11.6
 * @param {string} context - Context where error occurred
 * @param {object} error - Error object
 * @param {object} [details] - Additional details
 */
function logError(context, error, details = {}) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    context,
    error: {
      type: error.type || 'unknown',
      message: error.message || 'Unknown error',
      retryable: error.retryable || false
    },
    ...details
  };
  
  console.error(`[AI Service Error] ${context}:`, logEntry);
}

/**
 * Sleep for a specified duration
 * @param {number} ms - Duration in milliseconds
 * @returns {Promise} - Promise that resolves after the duration
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================================================
// Provider Adapters
// ============================================================================

/**
 * OpenAI Provider Adapter
 */
const openaiAdapter = {
  name: 'openai',
  baseUrl: 'https://api.openai.com/v1/chat/completions',
  models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo'],
  defaultModel: 'gpt-4o-mini',

  formatRequest(request, model) {
    const messages = [];
    
    if (request.systemPrompt) {
      messages.push({ role: 'system', content: request.systemPrompt });
    }
    
    messages.push({ role: 'user', content: request.prompt });

    return {
      model: model || this.defaultModel,
      messages,
      max_tokens: request.maxTokens || 1024,
      temperature: request.temperature ?? 0.7,
      stream: request.stream || false,
    };
  },

  parseResponse(response) {
    const choice = response.choices?.[0];
    const content = choice?.message?.content || choice?.delta?.content || '';
    
    return {
      content,
      tokensUsed: {
        prompt: response.usage?.prompt_tokens || 0,
        completion: response.usage?.completion_tokens || 0,
        total: response.usage?.total_tokens || 0,
      },
      model: response.model || this.defaultModel,
      provider: this.name,
    };
  },

  parseError(error, statusCode) {
    const errorMap = {
      401: { type: 'auth', message: 'Invalid API key. Please check your OpenAI API key.', retryable: false },
      403: { type: 'auth', message: 'Access denied. Please verify your API key permissions.', retryable: false },
      429: { type: 'rate_limit', message: 'Rate limit exceeded. Please wait before trying again.', retryable: true },
      500: { type: 'network', message: 'OpenAI server error. Please try again.', retryable: true },
      503: { type: 'network', message: 'OpenAI service unavailable. Please try again later.', retryable: true },
    };

    if (errorMap[statusCode]) {
      return errorMap[statusCode];
    }

    // Parse error from response body
    if (error?.error?.type === 'invalid_request_error') {
      if (error.error.code === 'context_length_exceeded') {
        return { type: 'context_length', message: 'Input exceeds maximum context length.', retryable: false };
      }
      return { type: 'invalid_input', message: error.error.message || 'Invalid request.', retryable: false };
    }

    return { type: 'unknown', message: error?.error?.message || 'An unexpected error occurred.', retryable: false };
  },

  getAuthHeader(apiKey) {
    return { 'Authorization': `Bearer ${apiKey}` };
  },
};

/**
 * Anthropic Provider Adapter
 */
const anthropicAdapter = {
  name: 'anthropic',
  baseUrl: 'https://api.anthropic.com/v1/messages',
  models: ['claude-3-5-sonnet-20241022', 'claude-3-5-haiku-20241022', 'claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307'],
  defaultModel: 'claude-3-5-haiku-20241022',

  formatRequest(request, model) {
    const body = {
      model: model || this.defaultModel,
      max_tokens: request.maxTokens || 1024,
      messages: [{ role: 'user', content: request.prompt }],
    };

    if (request.systemPrompt) {
      body.system = request.systemPrompt;
    }

    if (request.stream) {
      body.stream = true;
    }

    return body;
  },

  parseResponse(response) {
    // Handle streaming delta
    if (response.type === 'content_block_delta') {
      return {
        content: response.delta?.text || '',
        tokensUsed: { prompt: 0, completion: 0, total: 0 },
        model: this.defaultModel,
        provider: this.name,
      };
    }

    // Handle message_start for streaming
    if (response.type === 'message_start') {
      return {
        content: '',
        tokensUsed: {
          prompt: response.message?.usage?.input_tokens || 0,
          completion: 0,
          total: response.message?.usage?.input_tokens || 0,
        },
        model: response.message?.model || this.defaultModel,
        provider: this.name,
      };
    }

    // Handle message_delta for final usage
    if (response.type === 'message_delta') {
      return {
        content: '',
        tokensUsed: {
          prompt: 0,
          completion: response.usage?.output_tokens || 0,
          total: response.usage?.output_tokens || 0,
        },
        model: this.defaultModel,
        provider: this.name,
      };
    }

    // Handle full response
    const content = response.content?.[0]?.text || '';
    
    return {
      content,
      tokensUsed: {
        prompt: response.usage?.input_tokens || 0,
        completion: response.usage?.output_tokens || 0,
        total: (response.usage?.input_tokens || 0) + (response.usage?.output_tokens || 0),
      },
      model: response.model || this.defaultModel,
      provider: this.name,
    };
  },

  parseError(error, statusCode) {
    const errorMap = {
      401: { type: 'auth', message: 'Invalid API key. Please check your Anthropic API key.', retryable: false },
      403: { type: 'auth', message: 'Access denied. Please verify your API key permissions.', retryable: false },
      429: { type: 'rate_limit', message: 'Rate limit exceeded. Please wait before trying again.', retryable: true },
      529: { type: 'rate_limit', message: 'Anthropic API is overloaded. Please try again later.', retryable: true },
      500: { type: 'network', message: 'Anthropic server error. Please try again.', retryable: true },
    };

    if (errorMap[statusCode]) {
      return errorMap[statusCode];
    }

    if (error?.error?.type === 'invalid_request_error') {
      return { type: 'invalid_input', message: error.error.message || 'Invalid request.', retryable: false };
    }

    return { type: 'unknown', message: error?.error?.message || 'An unexpected error occurred.', retryable: false };
  },

  getAuthHeader(apiKey) {
    return {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    };
  },
};

/**
 * Google AI Provider Adapter
 */
const googleAdapter = {
  name: 'google',
  baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
  models: ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-1.0-pro'],
  defaultModel: 'gemini-1.5-flash',

  getEndpoint(model, apiKey, stream = false) {
    const action = stream ? 'streamGenerateContent' : 'generateContent';
    return `${this.baseUrl}/${model}:${action}?key=${apiKey}`;
  },

  formatRequest(request) {
    const contents = [];
    
    if (request.systemPrompt) {
      contents.push({
        role: 'user',
        parts: [{ text: request.systemPrompt }],
      });
      contents.push({
        role: 'model',
        parts: [{ text: 'Understood. I will follow these instructions.' }],
      });
    }
    
    contents.push({
      role: 'user',
      parts: [{ text: request.prompt }],
    });

    return {
      contents,
      generationConfig: {
        maxOutputTokens: request.maxTokens || 1024,
        temperature: request.temperature ?? 0.7,
      },
    };
  },

  parseResponse(response) {
    // Handle streaming response
    if (response.candidates?.[0]?.content?.parts) {
      const content = response.candidates[0].content.parts
        .map(part => part.text || '')
        .join('');
      
      return {
        content,
        tokensUsed: {
          prompt: response.usageMetadata?.promptTokenCount || 0,
          completion: response.usageMetadata?.candidatesTokenCount || 0,
          total: response.usageMetadata?.totalTokenCount || 0,
        },
        model: this.defaultModel,
        provider: this.name,
      };
    }

    return {
      content: '',
      tokensUsed: { prompt: 0, completion: 0, total: 0 },
      model: this.defaultModel,
      provider: this.name,
    };
  },

  parseError(error, statusCode) {
    const errorMap = {
      400: { type: 'invalid_input', message: 'Invalid request. Please check your input.', retryable: false },
      403: { type: 'auth', message: 'Invalid API key. Please check your Google AI API key.', retryable: false },
      429: { type: 'rate_limit', message: 'Quota exceeded. Please wait before trying again.', retryable: true },
      500: { type: 'network', message: 'Google AI server error. Please try again.', retryable: true },
    };

    if (errorMap[statusCode]) {
      return errorMap[statusCode];
    }

    if (error?.error?.message?.includes('API key')) {
      return { type: 'auth', message: 'Invalid API key. Please check your Google AI API key.', retryable: false };
    }

    return { type: 'unknown', message: error?.error?.message || 'An unexpected error occurred.', retryable: false };
  },

  getAuthHeader() {
    // Google AI uses API key in URL, not header
    return {};
  },
};

// Provider registry
const providers = {
  openai: openaiAdapter,
  anthropic: anthropicAdapter,
  google: googleAdapter,
};

// ============================================================================
// AI Service Class
// ============================================================================

class AIService {
  constructor() {
    this.currentProvider = 'openai';
    this.currentModel = null;
    this.abortController = null;
  }

  /**
   * Get the adapter for the current provider
   */
  getAdapter() {
    return providers[this.currentProvider] || providers.openai;
  }

  /**
   * Get the API key for the current provider
   */
  getApiKey() {
    return apiKeyManager.getKey(this.currentProvider);
  }

  /**
   * Check if the current provider is available (has valid key)
   */
  isAvailable() {
    return apiKeyManager.hasKey(this.currentProvider);
  }

  /**
   * Get current provider name
   */
  getProvider() {
    return this.currentProvider;
  }

  /**
   * Set preferred provider
   */
  setProvider(provider) {
    if (providers[provider]) {
      this.currentProvider = provider;
      this.currentModel = null;
    }
  }

  /**
   * Get current model
   */
  getModel() {
    return this.currentModel || this.getAdapter().defaultModel;
  }

  /**
   * Set preferred model
   */
  setModel(model) {
    const adapter = this.getAdapter();
    if (adapter.models.includes(model)) {
      this.currentModel = model;
    }
  }

  /**
   * Get available models for current provider
   */
  getAvailableModels() {
    return this.getAdapter().models;
  }

  /**
   * Estimate tokens for a given text
   * Uses a simple approximation: ~4 characters per token for English text
   */
  estimateTokens(text) {
    if (!text || typeof text !== 'string') {
      return 0;
    }
    // Rough estimation: ~4 characters per token for English
    // This is a simplification; actual tokenization varies by model
    return Math.ceil(text.length / 4);
  }

  /**
   * Cancel an ongoing request
   */
  cancel() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  /**
   * Send a prompt and get a response with retry logic
   * Validates: Requirements 2.3, 2.4, 11.1, 11.2, 11.3, 11.4, 11.5, 11.6
   */
  async complete(request) {
    const adapter = this.getAdapter();
    const apiKey = this.getApiKey();

    if (!apiKey) {
      const error = createAIError(
        'auth',
        `No API key configured for ${this.currentProvider}. Please add your API key in settings.`,
        false
      );
      logError(`complete [${adapter.name}]`, error, { reason: 'missing_api_key' });
      throw error;
    }

    // Create abort controller for cancellation
    this.abortController = new AbortController();

    const model = this.currentModel || adapter.defaultModel;
    const formattedRequest = adapter.formatRequest(request, model);

    // Build URL (Google uses different URL structure)
    let url = adapter.baseUrl;
    if (adapter.name === 'google') {
      url = adapter.getEndpoint(model, apiKey, false);
    }

    const headers = {
      'Content-Type': 'application/json',
      ...adapter.getAuthHeader(apiKey),
    };

    let lastError = null;
    
    try {
      // Retry loop with exponential backoff
      for (let attempt = 0; attempt <= retryConfig.maxRetries; attempt++) {
        try {
          // If this is a retry, wait with exponential backoff
          if (attempt > 0) {
            const delay = retryConfig.getDelay(attempt - 1);
            console.log(`[AI Service] Retry attempt ${attempt}/${retryConfig.maxRetries} after ${Math.round(delay)}ms delay`);
            await sleep(delay);
          }

          const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(formattedRequest),
            signal: this.abortController.signal,
          });

          if (!response.ok) {
            const errorBody = await response.json().catch(() => ({}));
            const parsedError = adapter.parseError(errorBody, response.status);
            
            // Extract retry-after header if present (for rate limits)
            const retryAfterHeader = response.headers.get('retry-after');
            if (retryAfterHeader) {
              parsedError.retryAfter = parseInt(retryAfterHeader, 10) * 1000; // Convert to ms
            }
            
            // Create standardized error
            const aiError = createAIError(
              parsedError.type,
              parsedError.message,
              parsedError.retryable,
              parsedError.retryAfter
            );
            
            logError(`complete [${adapter.name}]`, aiError, { 
              statusCode: response.status,
              attempt: attempt + 1,
              maxRetries: retryConfig.maxRetries + 1
            });
            
            lastError = aiError;
            
            // Check if we should retry
            if (retryConfig.isRetryable(aiError.type) && attempt < retryConfig.maxRetries) {
              continue; // Try again
            }
            
            throw aiError;
          }

          const data = await response.json();
          return adapter.parseResponse(data);
          
        } catch (error) {
          // Handle abort - don't retry
          if (error.name === 'AbortError') {
            const abortError = createAIError('network', 'Request was cancelled.', false);
            logError(`complete [${adapter.name}]`, abortError, { reason: 'aborted' });
            throw abortError;
          }

          // Re-throw if already a standardized AIError
          if (error.type && error.action) {
            throw error;
          }

          // Handle network errors (fetch failures)
          const networkError = createAIError(
            'network',
            'Network error. Please check your connection and try again.',
            true
          );
          
          logError(`complete [${adapter.name}]`, networkError, { 
            originalError: error.message,
            attempt: attempt + 1,
            maxRetries: retryConfig.maxRetries + 1
          });
          
          lastError = networkError;
          
          // Check if we should retry network errors
          if (retryConfig.isRetryable('network') && attempt < retryConfig.maxRetries) {
            continue; // Try again
          }
          
          throw networkError;
        }
      }
      
      // If we get here, all retries failed
      throw lastError;
    } finally {
      this.abortController = null;
    }
  }

  /**
   * Send a prompt with streaming response and retry logic
   * Validates: Requirements 2.3, 2.4, 2.5, 11.1, 11.2, 11.3, 11.4, 11.5, 11.6
   */
  async streamComplete(request, onChunk) {
    const adapter = this.getAdapter();
    const apiKey = this.getApiKey();

    if (!apiKey) {
      const error = createAIError(
        'auth',
        `No API key configured for ${this.currentProvider}. Please add your API key in settings.`,
        false
      );
      logError(`streamComplete [${adapter.name}]`, error, { reason: 'missing_api_key' });
      throw error;
    }

    // Create abort controller for cancellation
    this.abortController = new AbortController();

    const model = this.currentModel || adapter.defaultModel;
    const formattedRequest = adapter.formatRequest({ ...request, stream: true }, model);

    // Build URL
    let url = adapter.baseUrl;
    if (adapter.name === 'google') {
      url = adapter.getEndpoint(model, apiKey, true);
    }

    const headers = {
      'Content-Type': 'application/json',
      ...adapter.getAuthHeader(apiKey),
    };

    let fullContent = '';
    let totalTokens = { prompt: 0, completion: 0, total: 0 };
    let lastError = null;

    try {
      // Retry loop with exponential backoff (only for initial connection)
      for (let attempt = 0; attempt <= retryConfig.maxRetries; attempt++) {
        try {
          // If this is a retry, wait with exponential backoff
          if (attempt > 0) {
            const delay = retryConfig.getDelay(attempt - 1);
            console.log(`[AI Service] Stream retry attempt ${attempt}/${retryConfig.maxRetries} after ${Math.round(delay)}ms delay`);
            await sleep(delay);
            // Reset content for retry
            fullContent = '';
            totalTokens = { prompt: 0, completion: 0, total: 0 };
          }

          const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(formattedRequest),
            signal: this.abortController.signal,
          });

          if (!response.ok) {
            const errorBody = await response.json().catch(() => ({}));
            const parsedError = adapter.parseError(errorBody, response.status);
            
            // Extract retry-after header if present
            const retryAfterHeader = response.headers.get('retry-after');
            if (retryAfterHeader) {
              parsedError.retryAfter = parseInt(retryAfterHeader, 10) * 1000;
            }
            
            const aiError = createAIError(
              parsedError.type,
              parsedError.message,
              parsedError.retryable,
              parsedError.retryAfter
            );
            
            logError(`streamComplete [${adapter.name}]`, aiError, { 
              statusCode: response.status,
              attempt: attempt + 1,
              maxRetries: retryConfig.maxRetries + 1
            });
            
            lastError = aiError;
            
            // Check if we should retry
            if (retryConfig.isRetryable(aiError.type) && attempt < retryConfig.maxRetries) {
              continue;
            }
            
            throw aiError;
          }

          const reader = response.body.getReader();
          const decoder = new TextDecoder();

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            
            // Parse SSE events
            const lines = chunk.split('\n');
            for (const line of lines) {
              if (!line.trim()) continue;

              // Handle different streaming formats
              if (adapter.name === 'google') {
                // Google returns JSON array chunks
                try {
                  // Remove leading comma if present
                  const cleanLine = line.replace(/^,?\s*/, '').replace(/^\[/, '').replace(/\]$/, '');
                  if (cleanLine && cleanLine.startsWith('{')) {
                    const data = JSON.parse(cleanLine);
                    const parsed = adapter.parseResponse(data);
                    if (parsed.content) {
                      fullContent += parsed.content;
                      onChunk(parsed.content);
                    }
                    if (parsed.tokensUsed.total > 0) {
                      totalTokens = parsed.tokensUsed;
                    }
                  }
                } catch {
                  // Skip malformed JSON chunks
                }
              } else if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') continue;

                try {
                  const parsed = JSON.parse(data);
                  const result = adapter.parseResponse(parsed);
                  
                  if (result.content) {
                    fullContent += result.content;
                    onChunk(result.content);
                  }

                  // Update token counts
                  if (result.tokensUsed.prompt > 0) {
                    totalTokens.prompt = result.tokensUsed.prompt;
                  }
                  if (result.tokensUsed.completion > 0) {
                    totalTokens.completion = result.tokensUsed.completion;
                  }
                  if (result.tokensUsed.total > 0) {
                    totalTokens.total = result.tokensUsed.total;
                  }
                } catch {
                  // Skip malformed JSON
                }
              }
            }
          }

          // Calculate total if not provided
          if (totalTokens.total === 0) {
            totalTokens.total = totalTokens.prompt + totalTokens.completion;
          }

          return {
            content: fullContent,
            tokensUsed: totalTokens,
            model,
            provider: adapter.name,
          };
          
        } catch (error) {
          // Handle abort - don't retry
          if (error.name === 'AbortError') {
            const abortError = createAIError('network', 'Request was cancelled.', false);
            logError(`streamComplete [${adapter.name}]`, abortError, { reason: 'aborted' });
            throw abortError;
          }

          // Re-throw if already a standardized AIError
          if (error.type && error.action) {
            throw error;
          }

          // Handle network errors
          const networkError = createAIError(
            'network',
            'Network error during streaming. Please check your connection and try again.',
            true
          );
          
          logError(`streamComplete [${adapter.name}]`, networkError, { 
            originalError: error.message,
            attempt: attempt + 1,
            maxRetries: retryConfig.maxRetries + 1
          });
          
          lastError = networkError;
          
          // Check if we should retry
          if (retryConfig.isRetryable('network') && attempt < retryConfig.maxRetries) {
            continue;
          }
          
          throw networkError;
        }
      }
      
      // If we get here, all retries failed
      throw lastError;
    } finally {
      this.abortController = null;
    }
  }
}

// ============================================================================
// Exports
// ============================================================================

// Export provider adapters for testing
export const providerAdapters = {
  openai: openaiAdapter,
  anthropic: anthropicAdapter,
  google: googleAdapter,
};

// Export error handling utilities
export { 
  retryConfig, 
  errorMessages, 
  getErrorInfo, 
  createAIError, 
  logError 
};

// Export singleton instance
const aiService = new AIService();
export default aiService;

// Export class for testing
export { AIService };
