export const CATEGORIES = {
  ALL: 'All',
  DEVELOPER: 'Developer',
  DESIGN: 'Design',
  CONTENT: 'Content',
  SECURITY: 'Security',
  PRODUCTIVITY: 'Productivity',
  MATH: 'Math',
  UTILITY: 'Utility',
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
    id: 'code-editor',
    name: 'Online Code Editor',
    description: 'Write, edit, and format code with syntax highlighting',
    category: CATEGORIES.DEVELOPER,
    path: '/tools/code-editor',
    icon: '💻',
    popular: true,
  },
  {
    id: 'sql-formatter',
    name: 'SQL Formatter',
    description: 'Format and beautify SQL queries',
    category: CATEGORIES.DEVELOPER,
    path: '/tools/sql-formatter',
    icon: '🗄️',
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
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Compress images locally & privately',
    category: CATEGORIES.DESIGN,
    path: '/tools/image-compressor',
    icon: '🖼️',
    popular: true,
  },

  // CONTENT TOOLS
  {
    id: 'markdown-editor',
    name: 'Markdown Preview',
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
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert Length, Weight & Temp',
    category: CATEGORIES.UTILITY,
    path: '/tools/unit-converter',
    icon: '📏',
    popular: true,
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
