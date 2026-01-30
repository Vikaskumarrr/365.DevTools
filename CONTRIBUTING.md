# Contributing to 365.DevTools 🛠️

Thank you for your interest in contributing to 365.DevTools! We're excited to have you join our community of developers building privacy-focused, client-side tools.

## 🌟 Ways to Contribute

- 🐛 Report bugs and issues
- 💡 Suggest new tools or features
- 📝 Improve documentation
- 🎨 Enhance UI/UX design
- 🔧 Add new developer tools
- ⚡ Optimize performance
- 🧪 Write tests

## 🚀 Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR-USERNAME/365.devTool.git
cd 365.devTool
```

### 2. Set Up Development Environment

```bash
# Install dependencies
npm run install-all

# Set up environment variables (see README.md)
# Create backend/.env and frontend/.env

# Start development servers
npm start
```

### 3. Create a Branch

```bash
# Create a new branch for your feature/fix
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

## 📋 Development Guidelines

### Code Style

- **JavaScript/React**: Follow existing code patterns
- **Components**: Use functional components with hooks
- **Styling**: Use Tailwind CSS utility classes
- **Formatting**: Code will be formatted automatically (if ESLint/Prettier is configured)

### Component Structure

When adding a new tool, follow this structure:

```jsx
// frontend/src/components/tools/YourTool.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function YourTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleProcess = () => {
    try {
      // Your tool logic here
      setOutput(result);
      toast.success('Success!');
    } catch (error) {
      toast.error('Error: ' + error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6"
    >
      {/* Your tool UI */}
    </motion.div>
  );
}
```

### Adding a New Tool

1. Create component in `frontend/src/components/tools/`
2. Add export to `frontend/src/components/tools/index.js`
3. Add tool metadata to `frontend/src/utils/toolsList.js`
4. Add route in `frontend/src/App.jsx`
5. Test thoroughly in browser

### Commit Messages

Write clear, descriptive commit messages:

```bash
# Good examples
git commit -m "Add CSV to JSON converter tool"
git commit -m "Fix Base64 decoder padding issue"
git commit -m "Improve mobile responsiveness for QR generator"
git commit -m "Update README with deployment instructions"

# Use prefixes
feat: Add new feature
fix: Bug fix
docs: Documentation changes
style: Code style/formatting
refactor: Code refactoring
perf: Performance improvements
test: Adding tests
chore: Maintenance tasks
```

## 🧪 Testing

Before submitting your PR:

1. **Test your changes** in multiple browsers (Chrome, Firefox, Safari)
2. **Test responsive design** on mobile, tablet, and desktop
3. **Verify dark mode** works correctly
4. **Check console** for errors or warnings
5. **Test edge cases** and error handling

## 📤 Submitting Changes

### 1. Push Your Changes

```bash
git add .
git commit -m "Your descriptive commit message"
git push origin feature/your-feature-name
```

### 2. Create a Pull Request

1. Go to your fork on GitHub
2. Click "Compare & pull request"
3. Fill out the PR template with:
   - **Description**: What does this PR do?
   - **Motivation**: Why is this change needed?
   - **Testing**: How did you test it?
   - **Screenshots**: If UI changes, include before/after images

### 3. PR Review Process

- Maintainers will review your PR
- Address any requested changes
- Once approved, your PR will be merged!

## 🐛 Reporting Bugs

When reporting bugs, please include:

- **Description**: Clear description of the issue
- **Steps to Reproduce**: How to trigger the bug
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Browser/OS**: Your environment details
- **Screenshots**: If applicable

## 💡 Suggesting Features

We love new ideas! When suggesting features:

- Check if it already exists or was suggested
- Explain the use case and benefits
- Consider if it fits the project's privacy-first philosophy
- Describe how it might work

## 📜 Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Trolling or insulting remarks
- Publishing others' private information
- Any conduct inappropriate in a professional setting

## 🎯 Priority Areas

We're especially interested in contributions for:

- 🔧 New developer tools (parsers, validators, generators)
- ⚡ Performance optimizations (Web Workers, lazy loading)
- 🎨 UI/UX improvements
- 📱 Mobile experience enhancements
- ♿ Accessibility improvements
- 🧪 Test coverage
- 📖 Documentation and tutorials

## 💬 Questions?

- Open an issue for questions
- Check existing issues and PRs first
- Be patient and respectful

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for making 365.DevTools better! 🙌**

Every contribution, no matter how small, helps make developer tools more accessible and privacy-focused.
