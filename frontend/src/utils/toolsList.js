export const CATEGORIES = {
    ALL: 'All',
    DEVELOPER: 'Developer',
    DESIGN: 'Design',
    CONTENT: 'Content',
    SECURITY: 'Security',
    PRODUCTIVITY: 'Productivity',
    UTILITY: 'Utility',
    CONVERTER: 'Converter',
    AI: 'AI',
};

export const toolsList = [
    // DEVELOPER TOOLS
    {
        id: 'json-formatter',
        name: 'JSON Formatter',
        description: 'Format, validate & beautify JSON instantly',
        category: CATEGORIES.DEVELOPER,
        path: '/tools/json-formatter',
        icon: '{}',
        popular: true,
    },
    {
        id: 'base64-encoder',
        name: 'Base64 Encoder',
        description: 'Encode and decode Base64 strings',
        category: CATEGORIES.DEVELOPER,
        path: '/tools/base64-encoder',
        icon: '⚡',
        popular: true,
    },
    {
        id: 'url-encoder',
        name: 'URL Encoder',
        description: 'Encode and decode URLs safely',
        category: CATEGORIES.DEVELOPER,
        path: '/tools/url-encoder',
        icon: '🔗',
        popular: true,
    },
    {
        id: 'jwt-decoder',
        name: 'JWT Decoder',
        description: 'Decode and inspect JSON Web Tokens',
        category: CATEGORIES.DEVELOPER,
        path: '/tools/jwt-decoder',
        icon: '🔐',
        popular: true,
    },
    {
        id: 'regex-tester',
        name: 'Regex Tester',
        description: 'Test regular expressions in real-time',
        category: CATEGORIES.DEVELOPER,
        path: '/tools/regex-tester',
        icon: '.*',
        popular: true,
    },
    {
        id: 'uuid-generator',
        name: 'UUID Generator',
        description: 'Generate random UUIDs/GUIDs instantly',
        category: CATEGORIES.DEVELOPER,
        path: '/tools/uuid-generator',
        icon: '🆔',
        popular: true,
    },
    {
        id: 'sql-formatter',
        name: 'SQL Formatter',
        description: 'Format and beautify SQL queries',
        category: CATEGORIES.DEVELOPER,
        path: '/tools/sql-formatter',
        icon: '🗄️',
        popular: true,
    },
    {
        id: 'timestamp-converter',
        name: 'Timestamp Tool',
        description: 'Convert Unix timestamps to human dates',
        category: CATEGORIES.DEVELOPER,
        path: '/tools/timestamp-converter',
        icon: '⏰',
        popular: true,
    },
    {
        id: 'case-converter',
        name: 'Case Converter',
        description: 'Camel, snake, kebab & pascal case',
        category: CATEGORIES.DEVELOPER,
        path: '/tools/case-converter',
        icon: 'Aa',
        popular: true,
    },
    {
        id: 'html-entities',
        name: 'HTML Entities',
        description: 'Encode and decode HTML entities',
        category: CATEGORIES.DEVELOPER,
        path: '/tools/html-entities',
        icon: '🏷️',
    },
    {
        id: 'css-formatter',
        name: 'CSS Formatter',
        description: 'Format and minify CSS stylesheets',
        category: CATEGORIES.DEVELOPER,
        path: '/tools/css-formatter',
        icon: '🎨',
    },
    {
        id: 'js-minifier',
        name: 'JavaScript Minifier',
        description: 'Minify JavaScript code',
        category: CATEGORIES.DEVELOPER,
        path: '/tools/js-minifier',
        icon: '📦',
    },
    {
        id: 'slug-generator',
        name: 'Slug Generator',
        description: 'Generate URL-friendly slugs',
        category: CATEGORIES.DEVELOPER,
        path: '/tools/slug-generator',
        icon: '🔤',
    },
    {
        id: 'backslash-escape',
        name: 'Backslash Escape',
        description: 'Escape/unescape special characters',
        category: CATEGORIES.DEVELOPER,
        path: '/tools/backslash-escape',
        icon: '\\',
    },

    // SECURITY TOOLS
    {
        id: 'password-generator',
        name: 'Password Generator',
        description: 'Create secure, random passwords',
        category: CATEGORIES.SECURITY,
        path: '/tools/password-generator',
        icon: '🔑',
        popular: true,
    },
    {
        id: 'hash-generator',
        name: 'Hash Generator',
        description: 'Generate MD5, SHA-1, SHA-256 hashes',
        category: CATEGORIES.SECURITY,
        path: '/tools/hash-generator',
        icon: '#',
        popular: true,
    },

    // DESIGN TOOLS
    {
        id: 'color-converter',
        name: 'Color Converter',
        description: 'Convert Hex, RGB, HSL and CMYK',
        category: CATEGORIES.DESIGN,
        path: '/tools/color-converter',
        icon: '🎨',
        popular: true,
    },
    {
        id: 'gradient-generator',
        name: 'Gradient Generator',
        description: 'Create beautiful CSS gradients',
        category: CATEGORIES.DESIGN,
        path: '/tools/gradient-generator',
        icon: '🌈',
        popular: true,
    },
    {
        id: 'image-to-base64',
        name: 'Image to Base64',
        description: 'Convert images to Base64 strings',
        category: CATEGORIES.DESIGN,
        path: '/tools/image-to-base64',
        icon: '🖼️',
    },

    // CONTENT TOOLS
    {
        id: 'markdown-editor',
        name: 'Markdown Editor',
        description: 'Real-time Markdown editor and preview',
        category: CATEGORIES.CONTENT,
        path: '/tools/markdown-editor',
        icon: '📝',
        popular: true,
    },
    {
        id: 'lorem-ipsum',
        name: 'Lorem Ipsum',
        description: 'Generate placeholder text for designs',
        category: CATEGORIES.CONTENT,
        path: '/tools/lorem-ipsum',
        icon: '📄',
        popular: true,
    },
    {
        id: 'word-counter',
        name: 'Word Counter',
        description: 'Count words, characters & reading time',
        category: CATEGORIES.CONTENT,
        path: '/tools/word-counter',
        icon: '📊',
        popular: true,
    },
    {
        id: 'text-diff',
        name: 'Text Diff',
        description: 'Compare two texts and see differences',
        category: CATEGORIES.CONTENT,
        path: '/tools/text-diff',
        icon: '🔀',
    },

    // CONVERTER TOOLS
    {
        id: 'csv-to-json',
        name: 'CSV to JSON',
        description: 'Convert CSV data to JSON format',
        category: CATEGORIES.CONVERTER,
        path: '/tools/csv-to-json',
        icon: '📊',
    },
    {
        id: 'json-to-csv',
        name: 'JSON to CSV',
        description: 'Convert JSON array to CSV format',
        category: CATEGORIES.CONVERTER,
        path: '/tools/json-to-csv',
        icon: '📋',
    },
    {
        id: 'binary-converter',
        name: 'Binary Converter',
        description: 'Convert text to binary and vice versa',
        category: CATEGORIES.CONVERTER,
        path: '/tools/binary-converter',
        icon: '💾',
    },
    {
        id: 'hex-converter',
        name: 'Hex Converter',
        description: 'Convert text to hexadecimal',
        category: CATEGORIES.CONVERTER,
        path: '/tools/hex-converter',
        icon: '🔢',
    },
    {
        id: 'unicode-converter',
        name: 'Unicode Converter',
        description: 'Convert text to Unicode escape sequences',
        category: CATEGORIES.CONVERTER,
        path: '/tools/unicode-converter',
        icon: '🌐',
    },
    {
        id: 'unit-converter',
        name: 'Unit Converter',
        description: 'Convert Length, Weight & Temperature',
        category: CATEGORIES.UTILITY,
        path: '/tools/unit-converter',
        icon: '📏',
        popular: true,
    },

    // UTILITY TOOLS
    {
        id: 'qr-generator',
        name: 'QR Code Generator',
        description: 'Generate QR codes for URLs and text',
        category: CATEGORIES.UTILITY,
        path: '/tools/qr-generator',
        icon: '📱',
        popular: true,
    },
    {
        id: 'random-generator',
        name: 'Random Generator',
        description: 'Generate random numbers or strings',
        category: CATEGORIES.UTILITY,
        path: '/tools/random-generator',
        icon: '🎲',
    },
    {
        id: 'text-manipulator',
        name: 'Text Manipulator',
        description: 'Various text transformation tools',
        category: CATEGORIES.UTILITY,
        path: '/tools/text-manipulator',
        icon: '✂️',
    },

    // PRODUCTIVITY
    {
        id: 'pomodoro-timer',
        name: 'Pomodoro Timer',
        description: 'Focus timer for productivity',
        category: CATEGORIES.PRODUCTIVITY,
        path: '/tools/pomodoro-timer',
        icon: '⏲️',
    },

    // AI TOOLS
    {
        id: 'ai-text-summarizer',
        name: 'AI Text Summarizer',
        description: 'Summarize long text using AI',
        category: CATEGORIES.AI,
        path: '/tools/ai-text-summarizer',
        icon: '🤖',
        popular: true,
        requiresApiKey: true,
        aiProvider: 'any',
    },
    {
        id: 'ai-code-explainer',
        name: 'AI Code Explainer',
        description: 'Get explanations for code snippets',
        category: CATEGORIES.AI,
        path: '/tools/ai-code-explainer',
        icon: '💡',
        popular: true,
        requiresApiKey: true,
        aiProvider: 'any',
    },
    {
        id: 'ai-regex-generator',
        name: 'AI Regex Generator',
        description: 'Generate regex patterns from descriptions',
        category: CATEGORIES.AI,
        path: '/tools/ai-regex-generator',
        icon: '🔍',
        popular: true,
        requiresApiKey: true,
        aiProvider: 'any',
    },
    {
        id: 'ai-json-generator',
        name: 'AI JSON Generator',
        description: 'Generate JSON structures from descriptions',
        category: CATEGORIES.AI,
        path: '/tools/ai-json-generator',
        icon: '📋',
        popular: true,
        requiresApiKey: true,
        aiProvider: 'any',
    },
    {
        id: 'ai-sql-generator',
        name: 'AI SQL Generator',
        description: 'Generate SQL queries from descriptions',
        category: CATEGORIES.AI,
        path: '/tools/ai-sql-generator',
        icon: '🗃️',
        popular: true,
        requiresApiKey: true,
        aiProvider: 'any',
    },
    {
        id: 'ai-writing-assistant',
        name: 'AI Writing Assistant',
        description: 'Improve your technical writing',
        category: CATEGORIES.AI,
        path: '/tools/ai-writing-assistant',
        icon: '✍️',
        popular: true,
        requiresApiKey: true,
        aiProvider: 'any',
    },
];

// Helper functions
export const getToolById = (id) => {
    return toolsList.find((tool) => tool.id === id);
};

export const getToolsByCategory = (category) => {
    if (category === CATEGORIES.ALL) return toolsList;
    return toolsList.filter((tool) => tool.category === category);
};

export const getPopularTools = () => {
    return toolsList.filter((tool) => tool.popular);
};

export const searchTools = (query) => {
    const lowerQuery = query.toLowerCase();
    return toolsList.filter(
        (tool) =>
            tool.name.toLowerCase().includes(lowerQuery) ||
            tool.description.toLowerCase().includes(lowerQuery)
    );
};

/**
 * Get all AI tools
 * @returns {Array} AI tools
 */
export const getAITools = () => {
    return toolsList.filter((tool) => tool.category === CATEGORIES.AI);
};

/**
 * Get tools that require API keys
 * @returns {Array} Tools requiring API keys
 */
export const getToolsRequiringApiKey = () => {
    return toolsList.filter((tool) => tool.requiresApiKey === true);
};
