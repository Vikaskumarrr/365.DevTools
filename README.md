# 365.DevTools 🛠️

A beautiful, privacy-focused collection of 33+ developer tools that run entirely in your browser. Fast, free, and always private.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61dafb.svg)
![Vite](https://img.shields.io/badge/Vite-7-646cff.svg)

## ✨ Features

- 🚀 **33+ Developer Tools** - JSON formatter, Base64 encoder, QR generator, and more
- 🔒 **100% Private** - All processing happens in your browser, data never leaves your device
- ⚡ **Lightning Fast** - Built with React + Vite for optimal performance
- 🎨 **Beautiful UI** - Modern design with Tailwind CSS and Framer Motion animations
- 🌙 **Dark Mode** - Easy on the eyes, day or night
- 📱 **Responsive** - Works perfectly on mobile, tablet, and desktop
- 🆓 **Always Free** - No signup, no limits, no tracking

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/365.devTool.git
cd 365.devTool
```

2. **Install dependencies**
```bash
# Install all dependencies (frontend + backend)
npm run install-all

# Or install separately
cd frontend && npm install
cd ../backend && npm install
```

3. **Set up environment variables**

**Backend** - Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

**Frontend** - Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

4. **Run the application**
```bash
# Run both frontend and backend
npm start

# Or run separately
npm run server  # Backend only
npm run client  # Frontend only
```

5. **Open your browser**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 🛠️ Available Tools

### Developer Tools
- JSON Formatter & Validator
- Base64 Encoder/Decoder
- URL Encoder/Decoder
- JWT Decoder
- Hash Generator (MD5, SHA-1, SHA-256, SHA-512)
- UUID Generator
- QR Code Generator
- Color Picker & Converter
- And many more...

### Design Tools
- Lorem Ipsum Generator
- Gradient Generator
- Image Compressor

### Productivity
- Pomodoro Timer
- Markdown Editor
- Text Case Converter

## 🏗️ Tech Stack

**Frontend:**
- React 19
- Vite 7
- Tailwind CSS 3
- Framer Motion
- React Router
- React Hot Toast

**Backend:**
- Node.js
- Express
- MongoDB
- JWT Authentication

## 📦 Build for Production

```bash
# Build frontend
cd frontend
npm run build

# Build output will be in frontend/dist
```

## 🚢 Deployment

### Deploy Frontend to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Deploy Backend

Recommended platforms:
- Vercel (Serverless)
- Railway
- Render
- Heroku

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ by developers, for developers
- Inspired by the need for fast, private, client-side tools
- Special thanks to the open-source community

## 📧 Contact

Have questions or suggestions? Feel free to open an issue!

---

**⭐ If you find this project useful, please consider giving it a star!**
