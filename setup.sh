#!/bin/bash

# AntiGravity App - Automated Setup Script
# This script will set up the entire MERN stack project structure

echo "🚀 Starting AntiGravity App Setup..."
echo "=================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo -e "${GREEN}✓ Node.js found: $(node --version)${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo -e "${GREEN}✓ npm found: $(npm --version)${NC}"

# Working in current directory
echo ""
echo -e "${BLUE}📁 Setting up project structure in current directory...${NC}"

# Initialize git (if not already initialized)
if [ ! -d .git ]; then
  git init
  echo "✓ Git initialized"
else
  echo "✓ Git already initialized"
fi

# Create .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
package-lock.json

# Environment variables
.env
.env.local
.env.production

# Build files
dist/
build/
*.log

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Testing
coverage/
.nyc_output/
EOF

echo "✓ .gitignore created"

# ========================================
# BACKEND SETUP
# ========================================
echo ""
echo -e "${BLUE}📦 Setting up Backend...${NC}"
mkdir -p backend
cd backend

# Initialize package.json
npm init -y

# Update package.json
cat > package.json << 'EOF'
{
  "name": "antigravity-backend",
  "version": "1.0.0",
  "description": "AntiGravity Backend API",
  "main": "src/server.js",
  "type": "module",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["developer-tools", "api"],
  "author": "",
  "license": "MIT"
}
EOF

echo "✓ Backend package.json created"

# Install backend dependencies
echo -e "${YELLOW}Installing backend dependencies...${NC}"
npm install express mongoose dotenv cors bcryptjs jsonwebtoken helmet express-rate-limit morgan cookie-parser

echo -e "${YELLOW}Installing backend dev dependencies...${NC}"
npm install --save-dev nodemon

# Create backend directory structure
mkdir -p src/{config,controllers,models,routes,middleware,utils}

# Create backend files
echo "✓ Creating backend files..."

# server.js
cat > src/server.js << 'EOF'
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import blogRoutes from './routes/blogRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'AntiGravity API is running!' });
});

app.use('/api/blogs', blogRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/feedback', feedbackRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
EOF

# database.js
cat > src/config/database.js << 'EOF'
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
EOF

# errorHandler.js
cat > src/middleware/errorHandler.js << 'EOF'
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};
EOF

# Blog Model
cat > src/models/Blog.js << 'EOF'
import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: 'Admin' },
  category: { type: String, required: true },
  tags: [String],
  image: String,
  published: { type: Boolean, default: true },
  views: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);
EOF

# Blog Routes
cat > src/routes/blogRoutes.js << 'EOF'
import express from 'express';
const router = express.Router();

// Get all blogs
router.get('/', async (req, res) => {
  res.json({ message: 'Get all blogs' });
});

// Get single blog
router.get('/:slug', async (req, res) => {
  res.json({ message: 'Get single blog' });
});

export default router;
EOF

# Analytics Routes
cat > src/routes/analyticsRoutes.js << 'EOF'
import express from 'express';
const router = express.Router();

router.post('/track', async (req, res) => {
  res.json({ message: 'Track analytics' });
});

export default router;
EOF

# Feedback Routes
cat > src/routes/feedbackRoutes.js << 'EOF'
import express from 'express';
const router = express.Router();

router.post('/', async (req, res) => {
  res.json({ message: 'Submit feedback' });
});

export default router;
EOF

# Create .env
cat > .env << 'EOF'
PORT=5000
MONGODB_URI=mongodb://localhost:27017/antigravity
JWT_SECRET=your_super_secret_jwt_key_change_in_production_2024
NODE_ENV=development
CLIENT_URL=http://localhost:5173
EOF

echo -e "${GREEN}✓ Backend setup complete!${NC}"

# Go back to root
cd ..

# ========================================
# FRONTEND SETUP
# ========================================
echo ""
echo -e "${BLUE}📦 Setting up Frontend...${NC}"

# Create Vite React app
npm create vite@latest frontend -- --template react

cd frontend

# Install frontend dependencies
echo -e "${YELLOW}Installing frontend dependencies...${NC}"
npm install

npm install react-router-dom axios framer-motion react-icons
npm install @monaco-editor/react react-syntax-highlighter
npm install react-hot-toast react-helmet-async
npm install zustand prismjs qrcode
npm install date-fns crypto-js file-saver
npm install html2canvas uuid

# Install Tailwind CSS
echo -e "${YELLOW}Installing Tailwind CSS...${NC}"
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Configure Tailwind
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
EOF

# Update index.css
cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100;
  }
}

@layer components {
  .tool-card {
    @apply bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow p-6;
  }
  
  .btn-primary {
    @apply bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors;
  }
  
  .input-field {
    @apply w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500;
  }
}
EOF

# Create frontend directory structure
mkdir -p src/{components/{common,layout,tools},pages,hooks,utils,services,store,assets,styles}

# Create basic App.jsx
cat > src/App.jsx << 'EOF'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import './index.css';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
EOF

# Create Home page
mkdir -p src/pages
cat > src/pages/Home.jsx << 'EOF'
import { useState } from 'react';

function Home() {
  return (
    <div className="min-h-screen">
      <header className="bg-white dark:bg-gray-800 shadow">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary-500">AntiGravity</h1>
            <div className="space-x-4">
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-primary-500">Tools</a>
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-primary-500">Blog</a>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">Developer Tools That Just Work</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Fast, beautiful, and privacy-focused tools for developers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {['JSON Formatter', 'Base64 Encoder', 'Password Generator', 'QR Code Generator', 'Hash Generator', 'UUID Generator'].map((tool) => (
            <div key={tool} className="tool-card">
              <h3 className="text-xl font-semibold mb-2">{tool}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Tool description goes here
              </p>
              <button className="btn-primary">Open Tool</button>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © 2026 AntiGravity. Built with ❤️
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
EOF

# Create .env
cat > .env << 'EOF'
VITE_API_URL=http://localhost:5000/api
EOF

echo -e "${GREEN}✓ Frontend setup complete!${NC}"

# Go back to root
cd ..

# ========================================
# ROOT SETUP
# ========================================
echo ""
echo -e "${BLUE}📦 Setting up root package.json...${NC}"

# Create root package.json
cat > package.json << 'EOF'
{
  "name": "antigravity-app",
  "version": "1.0.0",
  "description": "Developer tools platform",
  "scripts": {
    "start": "concurrently \"npm run server\" \"npm run client\"",
    "server": "cd backend && npm run dev",
    "client": "cd frontend && npm run dev",
    "build": "cd frontend && npm run build",
    "install-all": "npm install && cd backend && npm install && cd ../frontend && npm install && cd .."
  },
  "keywords": [],
  "author": "",
  "license": "MIT"
}
EOF

npm install --save-dev concurrently

# Create README
cat > README.md << 'EOF'
# AntiGravity - Developer Tools Platform

A comprehensive collection of 90+ developer tools built with MERN stack.

## Quick Start

```bash
# Install all dependencies
npm run install-all

# Run both frontend and backend
npm start
```

## Features

- 90+ developer tools
- Privacy-focused (client-side processing)
- No signup required
- Fast and beautiful UI
- Dark mode support
- Blog system
- Analytics

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **Deployment**: Vercel (Frontend), Render (Backend)

## Development

```bash
# Backend only
npm run server

# Frontend only
npm run client
```

## Build

```bash
npm run build
```

## Environment Variables

### Backend (.env)
- PORT=5000
- MONGODB_URI=your_mongodb_uri
- JWT_SECRET=your_secret
- CLIENT_URL=http://localhost:5173

### Frontend (.env)
- VITE_API_URL=http://localhost:5000/api

## License

MIT
EOF

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✓ Setup Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo ""
echo "1. Update MongoDB URI in backend/.env"
echo "2. Run 'npm start' to start both servers"
echo "3. Frontend: http://localhost:5173"
echo "4. Backend: http://localhost:5000"
echo ""
echo -e "${YELLOW}To start development:${NC}"
echo "  npm start"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
