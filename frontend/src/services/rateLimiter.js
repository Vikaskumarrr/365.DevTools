/**
 * Rate Limiter Service
 * 
 * Client-side rate limiting to prevent excessive API usage.
 * Tracks requests and tokens per minute window, provides usage statistics,
 * and manages cooldown periods.
 * 
 * Validates: Requirements 10.1, 10.2, 10.3, 10.4, 10.6
 */

const STORAGE_KEY = 'ai_tools_usage';

// Default rate limit configuration
const DEFAULT_CONFIG = {
  maxRequestsPerMinute: 20,
  maxTokensPerMinute: 40000,
  cooldownMs: 60000, // 1 minute cooldown
  warningThreshold: 0.8, // 80% of limit triggers warning
  tokenWarningThreshold: 10000, // Warn if single request exceeds this
};

/**
 * Get the current timestamp in milliseconds
 * @returns {number} Current timestamp
 */
const now = () => Date.now();

/**
 * Get the default usage storage structure
 * @returns {Object} Default usage storage object
 */
const getDefaultStorage = () => ({
  version: 1,
  session: {
    startTime: now(),
    requests: 0,
    tokens: 0,
  },
  history: {
    totalRequests: 0,
    totalTokens: 0,
    byTool: {},
  },
  rateLimit: {
    requestsThisMinute: 0,
    tokensThisMinute: 0,
    minuteStartTime: now(),
  },
});

/**
 * Get stored usage data from localStorage
 * @returns {Object} The stored usage object or default structure
 */
const getStoredUsage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return getDefaultStorage();
    }
    const parsed = JSON.parse(stored);
    // Validate structure
    if (!parsed.version || !parsed.session || !parsed.history || !parsed.rateLimit) {
      return getDefaultStorage();
    }
    return parsed;
  } catch (error) {
    console.error('Error reading usage data from localStorage:', error);
    return getDefaultStorage();
  }
};

/**
 * Save usage data to localStorage
 * @param {Object} usage - The usage object to store
 */
const saveUsage = (usage) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
  } catch (error) {
    console.error('Error saving usage data to localStorage:', error);
  }
};

/**
 * Check if the current minute window has expired and reset if needed
 * @param {Object} usage - The usage object
 * @returns {Object} Updated usage object
 */
const checkAndResetMinuteWindow = (usage) => {
  const currentTime = now();
  const minuteElapsed = currentTime - usage.rateLimit.minuteStartTime;
  
  if (minuteElapsed >= DEFAULT_CONFIG.cooldownMs) {
    // Reset the minute window
    usage.rateLimit.requestsThisMinute = 0;
    usage.rateLimit.tokensThisMinute = 0;
    usage.rateLimit.minuteStartTime = currentTime;
  }
  
  return usage;
};

/**
 * Check if a request can be made based on rate limits
 * @param {number} estimatedTokens - Estimated tokens for the request
 * @returns {boolean} True if the request can be made
 */
export const canMakeRequest = (estimatedTokens = 0) => {
  let usage = getStoredUsage();
  usage = checkAndResetMinuteWindow(usage);
  saveUsage(usage);
  
  const { requestsThisMinute, tokensThisMinute } = usage.rateLimit;
  
  // Check if adding this request would exceed limits
  const wouldExceedRequests = requestsThisMinute >= DEFAULT_CONFIG.maxRequestsPerMinute;
  const wouldExceedTokens = (tokensThisMinute + estimatedTokens) > DEFAULT_CONFIG.maxTokensPerMinute;
  
  return !wouldExceedRequests && !wouldExceedTokens;
};

/**
 * Record a completed request with token usage
 * @param {number} tokensUsed - Number of tokens used in the request
 * @param {string} [toolName] - Optional name of the tool that made the request
 */
export const recordRequest = (tokensUsed = 0, toolName = null) => {
  let usage = getStoredUsage();
  usage = checkAndResetMinuteWindow(usage);
  
  // Update rate limit counters
  usage.rateLimit.requestsThisMinute += 1;
  usage.rateLimit.tokensThisMinute += tokensUsed;
  
  // Update session counters
  usage.session.requests += 1;
  usage.session.tokens += tokensUsed;
  
  // Update history counters
  usage.history.totalRequests += 1;
  usage.history.totalTokens += tokensUsed;
  
  // Update per-tool counters if tool name provided
  if (toolName) {
    if (!usage.history.byTool[toolName]) {
      usage.history.byTool[toolName] = { requests: 0, tokens: 0 };
    }
    usage.history.byTool[toolName].requests += 1;
    usage.history.byTool[toolName].tokens += tokensUsed;
  }
  
  saveUsage(usage);
};

/**
 * Get current usage statistics
 * @returns {Object} Usage statistics object
 */
export const getUsageStats = () => {
  let usage = getStoredUsage();
  usage = checkAndResetMinuteWindow(usage);
  saveUsage(usage);
  
  return {
    requestsThisMinute: usage.rateLimit.requestsThisMinute,
    tokensThisMinute: usage.rateLimit.tokensThisMinute,
    totalRequests: usage.history.totalRequests,
    totalTokens: usage.history.totalTokens,
    lastRequestTime: usage.rateLimit.minuteStartTime,
  };
};

/**
 * Get time until next request is allowed (0 if allowed now)
 * @returns {number} Milliseconds until next request allowed
 */
export const getWaitTime = () => {
  let usage = getStoredUsage();
  const currentTime = now();
  const minuteElapsed = currentTime - usage.rateLimit.minuteStartTime;
  
  // If minute window has passed, no wait needed
  if (minuteElapsed >= DEFAULT_CONFIG.cooldownMs) {
    return 0;
  }
  
  // Check if we're at the limit
  const { requestsThisMinute, tokensThisMinute } = usage.rateLimit;
  const atRequestLimit = requestsThisMinute >= DEFAULT_CONFIG.maxRequestsPerMinute;
  const atTokenLimit = tokensThisMinute >= DEFAULT_CONFIG.maxTokensPerMinute;
  
  if (atRequestLimit || atTokenLimit) {
    // Return time remaining in the current minute window
    return DEFAULT_CONFIG.cooldownMs - minuteElapsed;
  }
  
  return 0;
};

/**
 * Reset all usage statistics
 */
export const resetStats = () => {
  const freshUsage = getDefaultStorage();
  saveUsage(freshUsage);
};

/**
 * Check if approaching rate limit (warning threshold)
 * @returns {boolean} True if approaching the rate limit
 */
export const isApproachingLimit = () => {
  let usage = getStoredUsage();
  usage = checkAndResetMinuteWindow(usage);
  
  const { requestsThisMinute, tokensThisMinute } = usage.rateLimit;
  
  const requestRatio = requestsThisMinute / DEFAULT_CONFIG.maxRequestsPerMinute;
  const tokenRatio = tokensThisMinute / DEFAULT_CONFIG.maxTokensPerMinute;
  
  return requestRatio >= DEFAULT_CONFIG.warningThreshold || 
         tokenRatio >= DEFAULT_CONFIG.warningThreshold;
};

/**
 * Check if a request would exceed token warning threshold
 * @param {number} estimatedTokens - Estimated tokens for the request
 * @returns {boolean} True if the request would trigger a cost warning
 */
export const wouldExceedTokenWarning = (estimatedTokens) => {
  return estimatedTokens > DEFAULT_CONFIG.tokenWarningThreshold;
};

/**
 * Estimate tokens for a given text
 * Uses a simple approximation: ~4 characters per token for English text
 * @param {string} text - The text to estimate tokens for
 * @returns {number} Estimated token count
 */
export const estimateTokens = (text) => {
  if (!text || typeof text !== 'string') {
    return 0;
  }
  // Rough estimation: ~4 characters per token for English
  return Math.ceil(text.length / 4);
};

/**
 * Get the current rate limit configuration
 * @returns {Object} Rate limit configuration
 */
export const getConfig = () => ({
  ...DEFAULT_CONFIG,
});

/**
 * Get detailed usage breakdown by tool
 * @returns {Object} Usage breakdown by tool
 */
export const getUsageByTool = () => {
  const usage = getStoredUsage();
  return { ...usage.history.byTool };
};

/**
 * Get session statistics
 * @returns {Object} Session statistics
 */
export const getSessionStats = () => {
  const usage = getStoredUsage();
  return {
    startTime: usage.session.startTime,
    requests: usage.session.requests,
    tokens: usage.session.tokens,
    duration: now() - usage.session.startTime,
  };
};

/**
 * Reset session statistics (keeps history)
 */
export const resetSession = () => {
  const usage = getStoredUsage();
  usage.session = {
    startTime: now(),
    requests: 0,
    tokens: 0,
  };
  saveUsage(usage);
};

// Default export as an object with all methods
const rateLimiter = {
  canMakeRequest,
  recordRequest,
  getUsageStats,
  getWaitTime,
  resetStats,
  isApproachingLimit,
  wouldExceedTokenWarning,
  estimateTokens,
  getConfig,
  getUsageByTool,
  getSessionStats,
  resetSession,
};

export default rateLimiter;
