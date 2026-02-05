import { useState, useEffect } from 'react';
import { FiKey, FiTrash2, FiEye, FiEyeOff, FiCheck, FiAlertCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import apiKeyManager from '../../services/apiKeyManager';

/**
 * Provider display configuration
 */
const PROVIDER_CONFIG = {
  openai: {
    name: 'OpenAI',
    description: 'GPT-4, GPT-3.5 Turbo',
    placeholder: 'sk-...',
    icon: '🤖',
  },
  anthropic: {
    name: 'Anthropic',
    description: 'Claude 3, Claude 2',
    placeholder: 'sk-ant-...',
    icon: '🧠',
  },
  google: {
    name: 'Google AI',
    description: 'Gemini Pro, PaLM',
    placeholder: 'AIza...',
    icon: '✨',
  },
};

/**
 * Individual provider key row component
 */
function ProviderKeyRow({ provider, config, hasKey, maskedKey, onSave, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setError('');
    
    if (!keyInput.trim()) {
      setError('API key cannot be empty');
      return;
    }

    // Validate key format
    if (!apiKeyManager.validateKeyFormat(provider, keyInput)) {
      setError(`Invalid ${config.name} API key format`);
      return;
    }

    setIsLoading(true);
    try {
      await onSave(provider, keyInput);
      setKeyInput('');
      setIsEditing(false);
      toast.success(`${config.name} API key saved successfully!`);
    } catch (err) {
      setError(err.message || 'Failed to save API key');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete your ${config.name} API key?`)) {
      try {
        await onDelete(provider);
        toast.success(`${config.name} API key deleted`);
      } catch (err) {
        toast.error('Failed to delete API key');
      }
    }
  };

  const handleCancel = () => {
    setKeyInput('');
    setError('');
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-2xl" aria-hidden="true">{config.icon}</span>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {config.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {config.description}
            </p>
          </div>
        </div>
        
        {hasKey && !isEditing && (
          <span className="flex items-center space-x-1 text-xs font-medium px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
            <FiCheck size={12} aria-hidden="true" />
            <span>Configured</span>
          </span>
        )}
      </div>

      <div className="mt-4">
        {hasKey && !isEditing ? (
          /* Display masked key with delete option */
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FiKey className="text-gray-400" size={16} aria-hidden="true" />
              <code className="text-sm font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                {maskedKey}
              </code>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm text-primary-500 hover:text-primary-600 font-medium transition-colors"
                aria-label={`Update ${config.name} API key`}
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                aria-label={`Delete ${config.name} API key`}
                title="Delete API key"
              >
                <FiTrash2 size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : (
          /* Input form for new/updated key */
          <div className="space-y-3">
            <div className="relative">
              <label htmlFor={`api-key-${provider}`} className="sr-only">
                Enter {config.name} API key
              </label>
              <input
                id={`api-key-${provider}`}
                type={showKey ? 'text' : 'password'}
                value={keyInput}
                onChange={(e) => {
                  setKeyInput(e.target.value);
                  setError('');
                }}
                onKeyDown={handleKeyDown}
                placeholder={config.placeholder}
                className={`w-full px-4 py-2 pr-10 bg-gray-50 dark:bg-gray-800 border rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm ${
                  error 
                    ? 'border-red-500 dark:border-red-500' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? `error-${provider}` : undefined}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label={showKey ? 'Hide API key' : 'Show API key'}
              >
                {showKey ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>

            {error && (
              <div 
                id={`error-${provider}`}
                role="alert"
                className="flex items-center space-x-2 text-sm text-red-500"
              >
                <FiAlertCircle size={14} aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <button
                onClick={handleSave}
                disabled={!keyInput.trim() || isLoading}
                className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Saving...' : 'Save Key'}
              </button>
              {(hasKey || isEditing) && (
                <button
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * API Key Settings Component
 * 
 * Displays a form for managing API keys for AI providers.
 * Shows masked keys for configured providers and allows adding/deleting keys.
 * 
 * Validates: Requirements 1.1, 1.5, 1.6, 1.7
 */
function APIKeySettings({ onClose }) {
  const [providers, setProviders] = useState([]);
  const [configuredProviders, setConfiguredProviders] = useState([]);

  // Load provider data on mount
  useEffect(() => {
    const supportedProviders = apiKeyManager.getSupportedProviders();
    setProviders(supportedProviders);
    setConfiguredProviders(apiKeyManager.getConfiguredProviders());
  }, []);

  const handleSaveKey = (provider, key) => {
    apiKeyManager.setKey(provider, key);
    setConfiguredProviders(apiKeyManager.getConfiguredProviders());
  };

  const handleDeleteKey = (provider) => {
    apiKeyManager.removeKey(provider);
    setConfiguredProviders(apiKeyManager.getConfiguredProviders());
  };

  const configuredCount = configuredProviders.length;
  const totalCount = providers.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <FiKey className="text-primary-500" aria-hidden="true" />
            <span>API Key Settings</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Configure your AI provider API keys to use AI-powered tools.
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Close settings"
          >
            ✕
          </button>
        )}
      </div>

      {/* Status summary */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            API Keys Configured
          </span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {configuredCount} / {totalCount}
          </span>
        </div>
        <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-500 rounded-full transition-all duration-300"
            style={{ width: `${totalCount > 0 ? (configuredCount / totalCount) * 100 : 0}%` }}
            role="progressbar"
            aria-valuenow={configuredCount}
            aria-valuemin={0}
            aria-valuemax={totalCount}
            aria-label={`${configuredCount} of ${totalCount} API keys configured`}
          />
        </div>
      </div>

      {/* Security notice */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
        <div className="flex items-start space-x-3">
          <span className="text-blue-500 mt-0.5">🔒</span>
          <div className="text-sm">
            <p className="font-medium text-blue-800 dark:text-blue-300">
              Your keys are stored locally
            </p>
            <p className="text-blue-600 dark:text-blue-400 mt-1">
              API keys are stored in your browser's local storage and never sent to our servers. 
              All AI requests are made directly from your browser to the provider's API.
            </p>
          </div>
        </div>
      </div>

      {/* Provider list */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Supported Providers
        </h3>
        <div className="space-y-3">
          {providers.map((provider) => {
            const config = PROVIDER_CONFIG[provider] || {
              name: provider,
              description: 'AI Provider',
              placeholder: 'Enter API key...',
              icon: '🔑',
            };
            const hasKey = configuredProviders.includes(provider);
            const maskedKey = hasKey ? apiKeyManager.getMaskedKey(provider) : null;

            return (
              <ProviderKeyRow
                key={provider}
                provider={provider}
                config={config}
                hasKey={hasKey}
                maskedKey={maskedKey}
                onSave={handleSaveKey}
                onDelete={handleDeleteKey}
              />
            );
          })}
        </div>
      </div>

      {/* Help text */}
      <div className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
        <p>
          <strong>Need an API key?</strong> Visit the provider's website to create one:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>
            <a 
              href="https://platform.openai.com/api-keys" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-600 hover:underline"
            >
              OpenAI API Keys
            </a>
          </li>
          <li>
            <a 
              href="https://console.anthropic.com/settings/keys" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-600 hover:underline"
            >
              Anthropic API Keys
            </a>
          </li>
          <li>
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-600 hover:underline"
            >
              Google AI API Keys
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default APIKeySettings;
