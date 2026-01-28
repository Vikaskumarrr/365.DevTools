import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerServiceWorker, setupInstallPrompt } from './utils/registerServiceWorker'

// Register Service Worker for offline support
registerServiceWorker();

// Setup PWA install prompt
setupInstallPrompt();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
