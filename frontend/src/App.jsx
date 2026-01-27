import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Pages
import Home from './pages/Home';

// Tools
import {
  JsonFormatter,
  PasswordGenerator,
  Base64Encoder,
  QRCodeGenerator,
  HashGenerator,
} from './components/tools';

// Layout
import MainLayout from './components/layout/MainLayout';

import './index.css';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />

          {/* Tools Routes */}
          <Route path="tools/json-formatter" element={<JsonFormatter />} />
          <Route path="tools/password-generator" element={<PasswordGenerator />} />
          <Route path="tools/base64-encoder" element={<Base64Encoder />} />
          <Route path="tools/qr-generator" element={<QRCodeGenerator />} />
          <Route path="tools/hash-generator" element={<HashGenerator />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
