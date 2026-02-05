/**
 * API Key Manager Service
 * 
 * Handles secure storage and retrieval of user API keys for AI providers.
 * Keys are stored in localStorage with the key 'ai_tools_api_keys'.
 * 
 * Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5
 */

const STORAGE_KEY = 'ai_tools_api_keys';

// Supported AI providers
const SUPPORTED_PROVIDERS = ['openai', 'anthropic', 'google'];

// Key format validation patterns for each provider
const KEY_PATTERNS = {
  openai: /^sk-[a-zA-Z0-9]{20,}$/,
  anthropic: /^sk-ant-[a-zA-Z0-9-]{20,}$/,
  google: /^[a-zA-Z0-9_-]{20,}$/,
};

/**
 * Get all stored API keys from localStorage
 * @returns {Object} The stored keys object or empty object
 */
const getStoredKeys = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return {};
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error reading API keys from localStorage:', error);
    return {};
  }
};

/**
 * Save API keys to localStorage
 * @param {Object} keys - The keys object to store
 */
const saveKeys = (keys) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
  } catch (error) {
    console.error('Error saving API keys to localStorage:', error);
  }
};

/**
 * Store an API key for a provider
 * @param {string} provider - The provider name (openai, anthropic, google)
 * @param {string} key - The API key to store
 */
export const setKey = (provider, key) => {
  if (!provider || typeof provider !== 'string') {
    throw new Error('Provider must be a non-empty string');
  }
  if (!key || typeof key !== 'string') {
    throw new Error('Key must be a non-empty string');
  }
  
  const normalizedProvider = provider.toLowerCase();
  const keys = getStoredKeys();
  
  keys[normalizedProvider] = {
    key: key,
    addedAt: Date.now(),
  };
  
  saveKeys(keys);
};

/**
 * Retrieve an API key for a provider
 * @param {string} provider - The provider name
 * @returns {string|null} The API key or null if not found
 */
export const getKey = (provider) => {
  if (!provider || typeof provider !== 'string') {
    return null;
  }
  
  const normalizedProvider = provider.toLowerCase();
  const keys = getStoredKeys();
  
  if (keys[normalizedProvider] && keys[normalizedProvider].key) {
    return keys[normalizedProvider].key;
  }
  
  return null;
};

/**
 * Remove an API key for a provider
 * @param {string} provider - The provider name
 */
export const removeKey = (provider) => {
  if (!provider || typeof provider !== 'string') {
    return;
  }
  
  const normalizedProvider = provider.toLowerCase();
  const keys = getStoredKeys();
  
  if (keys[normalizedProvider]) {
    delete keys[normalizedProvider];
    saveKeys(keys);
  }
};

/**
 * Check if a key exists for a provider
 * @param {string} provider - The provider name
 * @returns {boolean} True if a key exists for the provider
 */
export const hasKey = (provider) => {
  if (!provider || typeof provider !== 'string') {
    return false;
  }
  
  const normalizedProvider = provider.toLowerCase();
  const keys = getStoredKeys();
  
  return !!(keys[normalizedProvider] && keys[normalizedProvider].key);
};

/**
 * Get masked version of key (last 4 chars visible)
 * All preceding characters are replaced with asterisks.
 * @param {string} provider - The provider name
 * @returns {string|null} The masked key or null if not found
 */
export const getMaskedKey = (provider) => {
  const key = getKey(provider);
  
  if (!key) {
    return null;
  }
  
  if (key.length <= 4) {
    return key;
  }
  
  const maskedLength = key.length - 4;
  const masked = '*'.repeat(maskedLength) + key.slice(-4);
  
  return masked;
};

/**
 * Validate key format for a provider (basic validation)
 * @param {string} provider - The provider name
 * @param {string} key - The API key to validate
 * @returns {boolean} True if the key format is valid
 */
export const validateKeyFormat = (provider, key) => {
  if (!provider || typeof provider !== 'string') {
    return false;
  }
  if (!key || typeof key !== 'string') {
    return false;
  }
  
  const normalizedProvider = provider.toLowerCase();
  const pattern = KEY_PATTERNS[normalizedProvider];
  
  // If no pattern defined for provider, accept any non-empty string
  if (!pattern) {
    return key.length > 0;
  }
  
  return pattern.test(key);
};

/**
 * Get all configured providers (providers that have keys stored)
 * @returns {string[]} Array of provider names that have keys configured
 */
export const getConfiguredProviders = () => {
  const keys = getStoredKeys();
  return Object.keys(keys).filter(provider => keys[provider] && keys[provider].key);
};

/**
 * Get list of all supported providers
 * @returns {string[]} Array of supported provider names
 */
export const getSupportedProviders = () => {
  return [...SUPPORTED_PROVIDERS];
};

/**
 * Get the timestamp when a key was added
 * @param {string} provider - The provider name
 * @returns {number|null} The timestamp or null if not found
 */
export const getKeyAddedAt = (provider) => {
  if (!provider || typeof provider !== 'string') {
    return null;
  }
  
  const normalizedProvider = provider.toLowerCase();
  const keys = getStoredKeys();
  
  if (keys[normalizedProvider] && keys[normalizedProvider].addedAt) {
    return keys[normalizedProvider].addedAt;
  }
  
  return null;
};

// Default export as an object with all methods
const apiKeyManager = {
  setKey,
  getKey,
  removeKey,
  hasKey,
  getMaskedKey,
  validateKeyFormat,
  getConfiguredProviders,
  getSupportedProviders,
  getKeyAddedAt,
};

export default apiKeyManager;
