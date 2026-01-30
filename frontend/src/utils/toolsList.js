export const CATEGORIES = {
    ALL: 'All',
    DEVELOPER: 'Developer',
    DESIGN: 'Design',
    CONTENT: 'Content',
    SECURITY: 'Security',
    PRODUCTIVITY: 'Productivity',
    UTILITY: 'Utility',
    CONVERTER: 'Converter',
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

    // NEW TOOLS - 30 Additional Tools

    // DEVELOPER TOOLS (Additional)
    {
        id: 'xml-formatter',
        name: 'XML Formatter',
        description: 'Format and validate XML documents',
        category: CATEGORIES.DEVELOPER,
        path: '/tools/xml-formatter',
        icon: '📄',
    },
    {
        id: 'yaml-validator',
        name: 'YAML Validator',
        description: 'Validate and format YAML files',
        category: CATEGORIES.DEVELOPER,
        path: '/tools/yaml-validator',
        icon: '📋',
    },
    {
        id: 'html-formatter',
        name: 'HTML Formatter',
        description: 'Format and beautify HTML code',
        category: CATEGORIES.DEVELOPER,
        path: '/tools/html-formatter',
        icon: '🌐',
    },
    {
        id: 'json-to-xml',
        name: 'JSON to XML',
        description: 'Convert JSON to XML format',
        category: CATEGORIES.CONVERTER,
        path: '/tools/json-to-xml',
        icon: '🔄',
    },
    {
        id: 'xml-to-json',
        name: 'XML to JSON',
        description: 'Convert XML to JSON format',
        category: CATEGORIES.CONVERTER,
        path: '/tools/xml-to-json',
        icon: '🔄',
    },
    {
        id: 'cron-expression',
        name: 'Cron Expression',
        description: 'Generate and explain cron expressions',
        category: CATEGORIES.DEVELOPER,
        path: '/tools/cron-expression',
        icon: '⏱️',
    },
    {
        id: 'api-tester',
        name: 'API Tester',
        description: 'Test REST APIs with custom requests',
        category: CATEGORIES.DEVELOPER,
        path: '/tools/api-tester',
        icon: '🔌',
    },
    {
        id: 'json-diff',
        name: 'JSON Diff',
        description: 'Compare two JSON objects',
        category: CATEGORIES.DEVELOPER,
        path: '/tools/json-diff',
        icon: '🔍',
    },

    // SECURITY TOOLS (Additional)
    {
        id: 'bcrypt-generator',
        name: 'Bcrypt Generator',
        description: 'Generate and verify bcrypt hashes',
        category: CATEGORIES.SECURITY,
        path: '/tools/bcrypt-generator',
        icon: '🔒',
    },
    {
        id: 'hmac-generator',
        name: 'HMAC Generator',
        description: 'Generate HMAC signatures',
        category: CATEGORIES.SECURITY,
        path: '/tools/hmac-generator',
        icon: '🔐',
    },
    {
        id: 'rsa-key-generator',
        name: 'RSA Key Generator',
        description: 'Generate RSA public/private key pairs',
        category: CATEGORIES.SECURITY,
        path: '/tools/rsa-key-generator',
        icon: '🔑',
    },

    // DESIGN TOOLS (Additional)
    {
        id: 'color-palette',
        name: 'Color Palette',
        description: 'Generate color palettes from images',
        category: CATEGORIES.DESIGN,
        path: '/tools/color-palette',
        icon: '🎨',
    },
    {
        id: 'contrast-checker',
        name: 'Contrast Checker',
        description: 'Check WCAG color contrast ratios',
        category: CATEGORIES.DESIGN,
        path: '/tools/contrast-checker',
        icon: '👁️',
    },
    {
        id: 'svg-optimizer',
        name: 'SVG Optimizer',
        description: 'Optimize and minify SVG files',
        category: CATEGORIES.DESIGN,
        path: '/tools/svg-optimizer',
        icon: '🖼️',
    },
    {
        id: 'css-minifier',
        name: 'CSS Minifier',
        description: 'Minify CSS for production',
        category: CATEGORIES.DESIGN,
        path: '/tools/css-minifier',
        icon: '📦',
    },
    {
        id: 'box-shadow-generator',
        name: 'Box Shadow Generator',
        description: 'Create CSS box shadows visually',
        category: CATEGORIES.DESIGN,
        path: '/tools/box-shadow-generator',
        icon: '📦',
    },

    // CONTENT TOOLS (Additional)
    {
        id: 'html-to-markdown',
        name: 'HTML to Markdown',
        description: 'Convert HTML to Markdown',
        category: CATEGORIES.CONTENT,
        path: '/tools/html-to-markdown',
        icon: '📝',
    },
    {
        id: 'markdown-to-html',
        name: 'Markdown to HTML',
        description: 'Convert Markdown to HTML',
        category: CATEGORIES.CONTENT,
        path: '/tools/markdown-to-html',
        icon: '🌐',
    },
    {
        id: 'text-to-speech',
        name: 'Text to Speech',
        description: 'Convert text to speech audio',
        category: CATEGORIES.CONTENT,
        path: '/tools/text-to-speech',
        icon: '🔊',
    },
    {
        id: 'duplicate-remover',
        name: 'Duplicate Remover',
        description: 'Remove duplicate lines from text',
        category: CATEGORIES.CONTENT,
        path: '/tools/duplicate-remover',
        icon: '🗑️',
    },

    // CONVERTER TOOLS (Additional)
    {
        id: 'roman-numeral',
        name: 'Roman Numeral',
        description: 'Convert numbers to Roman numerals',
        category: CATEGORIES.CONVERTER,
        path: '/tools/roman-numeral',
        icon: 'Ⅰ',
    },
    {
        id: 'temperature-converter',
        name: 'Temperature Converter',
        description: 'Convert Celsius, Fahrenheit, Kelvin',
        category: CATEGORIES.CONVERTER,
        path: '/tools/temperature-converter',
        icon: '🌡️',
    },
    {
        id: 'currency-converter',
        name: 'Currency Converter',
        description: 'Convert between currencies',
        category: CATEGORIES.CONVERTER,
        path: '/tools/currency-converter',
        icon: '💱',
    },
    {
        id: 'number-base-converter',
        name: 'Number Base Converter',
        description: 'Convert between number bases',
        category: CATEGORIES.CONVERTER,
        path: '/tools/number-base-converter',
        icon: '🔢',
    },

    // UTILITY TOOLS (Additional)
    {
        id: 'barcode-generator',
        name: 'Barcode Generator',
        description: 'Generate various barcode formats',
        category: CATEGORIES.UTILITY,
        path: '/tools/barcode-generator',
        icon: '📊',
    },
    {
        id: 'ip-lookup',
        name: 'IP Lookup',
        description: 'Get information about IP addresses',
        category: CATEGORIES.UTILITY,
        path: '/tools/ip-lookup',
        icon: '🌐',
    },
    {
        id: 'user-agent-parser',
        name: 'User Agent Parser',
        description: 'Parse and analyze user agent strings',
        category: CATEGORIES.UTILITY,
        path: '/tools/user-agent-parser',
        icon: '🖥️',
    },
    {
        id: 'mime-type-lookup',
        name: 'MIME Type Lookup',
        description: 'Find MIME types for file extensions',
        category: CATEGORIES.UTILITY,
        path: '/tools/mime-type-lookup',
        icon: '📁',
    },
    {
        id: 'email-validator',
        name: 'Email Validator',
        description: 'Validate email addresses',
        category: CATEGORIES.UTILITY,
        path: '/tools/email-validator',
        icon: '📧',
    },
    {
        id: 'credit-card-validator',
        name: 'Credit Card Validator',
        description: 'Validate credit card numbers',
        category: CATEGORIES.UTILITY,
        path: '/tools/credit-card-validator',
        icon: '💳',
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
