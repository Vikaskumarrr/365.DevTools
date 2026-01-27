import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';

// Pages
import Home from './pages/Home';
import Blog from './pages/Blog';
import About from './pages/About';

// Tools
import {
  JsonFormatter,
  PasswordGenerator,
  Base64Encoder,
  QRCodeGenerator,
  HashGenerator,
  URLEncoder,
  UUIDGenerator,
  TimestampConverter,
  CaseConverter,
  JWTDecoder,
  WordCounter,
  LoremIpsum,
  ColorConverter,
  MarkdownEditor,
  RegexTester,
  HTMLEntities,
  TextDiff,
  ImageToBase64,
  CSVToJSON,
  JSONToCSV,
  RandomGenerator,
  BinaryConverter,
  TextManipulator,
  SQLFormatter,
  CSSFormatter,
  UnicodeConverter,
  GradientGenerator,
  UnitConverter,
  PomodoroTimer,
  JSMinifier,
  HexConverter,
  SlugGenerator,
  BackslashEscape,
} from './components/tools';

// Layout
import MainLayout from './components/layout/MainLayout';

import './index.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="blog" element={<Blog />} />
            <Route path="about" element={<About />} />

            {/* Tools Routes */}
            <Route path="tools/json-formatter" element={<JsonFormatter />} />
            <Route path="tools/password-generator" element={<PasswordGenerator />} />
            <Route path="tools/base64-encoder" element={<Base64Encoder />} />
            <Route path="tools/qr-generator" element={<QRCodeGenerator />} />
            <Route path="tools/hash-generator" element={<HashGenerator />} />
            <Route path="tools/url-encoder" element={<URLEncoder />} />
            <Route path="tools/uuid-generator" element={<UUIDGenerator />} />
            <Route path="tools/timestamp-converter" element={<TimestampConverter />} />
            <Route path="tools/case-converter" element={<CaseConverter />} />
            <Route path="tools/jwt-decoder" element={<JWTDecoder />} />
            <Route path="tools/word-counter" element={<WordCounter />} />
            <Route path="tools/lorem-ipsum" element={<LoremIpsum />} />
            <Route path="tools/color-converter" element={<ColorConverter />} />
            <Route path="tools/markdown-editor" element={<MarkdownEditor />} />
            <Route path="tools/regex-tester" element={<RegexTester />} />
            <Route path="tools/html-entities" element={<HTMLEntities />} />
            <Route path="tools/text-diff" element={<TextDiff />} />
            <Route path="tools/image-to-base64" element={<ImageToBase64 />} />
            <Route path="tools/csv-to-json" element={<CSVToJSON />} />
            <Route path="tools/json-to-csv" element={<JSONToCSV />} />
            <Route path="tools/random-generator" element={<RandomGenerator />} />
            <Route path="tools/binary-converter" element={<BinaryConverter />} />
            <Route path="tools/text-manipulator" element={<TextManipulator />} />
            <Route path="tools/sql-formatter" element={<SQLFormatter />} />
            <Route path="tools/css-formatter" element={<CSSFormatter />} />
            <Route path="tools/unicode-converter" element={<UnicodeConverter />} />
            <Route path="tools/gradient-generator" element={<GradientGenerator />} />
            <Route path="tools/unit-converter" element={<UnitConverter />} />
            <Route path="tools/pomodoro-timer" element={<PomodoroTimer />} />
            <Route path="tools/js-minifier" element={<JSMinifier />} />
            <Route path="tools/hex-converter" element={<HexConverter />} />
            <Route path="tools/slug-generator" element={<SlugGenerator />} />
            <Route path="tools/backslash-escape" element={<BackslashEscape />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
