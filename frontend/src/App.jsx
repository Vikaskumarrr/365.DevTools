import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';

// Pages - Keep these eager loaded as they're frequently accessed
import Home from './pages/Home';
import Blog from './pages/Blog';
import About from './pages/About';

// Layout
import MainLayout from './components/layout/MainLayout';

// Loading and Error components
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';

// Lazy load all tools for better performance
const JsonFormatter = lazy(() => import('./components/tools/JsonFormatter'));
const PasswordGenerator = lazy(() => import('./components/tools/PasswordGenerator'));
const Base64Encoder = lazy(() => import('./components/tools/Base64Encoder'));
const QRCodeGenerator = lazy(() => import('./components/tools/QRCodeGenerator'));
const HashGenerator = lazy(() => import('./components/tools/HashGenerator'));
const URLEncoder = lazy(() => import('./components/tools/URLEncoder'));
const UUIDGenerator = lazy(() => import('./components/tools/UUIDGenerator'));
const TimestampConverter = lazy(() => import('./components/tools/TimestampConverter'));
const CaseConverter = lazy(() => import('./components/tools/CaseConverter'));
const JWTDecoder = lazy(() => import('./components/tools/JWTDecoder'));
const WordCounter = lazy(() => import('./components/tools/WordCounter'));
const LoremIpsum = lazy(() => import('./components/tools/LoremIpsum'));
const ColorConverter = lazy(() => import('./components/tools/ColorConverter'));
const MarkdownEditor = lazy(() => import('./components/tools/MarkdownEditor'));
const RegexTester = lazy(() => import('./components/tools/RegexTester'));
const HTMLEntities = lazy(() => import('./components/tools/HTMLEntities'));
const TextDiff = lazy(() => import('./components/tools/TextDiff'));
const ImageToBase64 = lazy(() => import('./components/tools/ImageToBase64'));
const CSVToJSON = lazy(() => import('./components/tools/CSVToJSON'));
const JSONToCSV = lazy(() => import('./components/tools/JSONToCSV'));
const RandomGenerator = lazy(() => import('./components/tools/RandomGenerator'));
const BinaryConverter = lazy(() => import('./components/tools/BinaryConverter'));
const TextManipulator = lazy(() => import('./components/tools/TextManipulator'));
const SQLFormatter = lazy(() => import('./components/tools/SQLFormatter'));
const CSSFormatter = lazy(() => import('./components/tools/CSSFormatter'));
const UnicodeConverter = lazy(() => import('./components/tools/UnicodeConverter'));
const GradientGenerator = lazy(() => import('./components/tools/GradientGenerator'));
const UnitConverter = lazy(() => import('./components/tools/UnitConverter'));
const PomodoroTimer = lazy(() => import('./components/tools/PomodoroTimer'));
const JSMinifier = lazy(() => import('./components/tools/JSMinifier'));
const HexConverter = lazy(() => import('./components/tools/HexConverter'));
const SlugGenerator = lazy(() => import('./components/tools/SlugGenerator'));
const BackslashEscape = lazy(() => import('./components/tools/BackslashEscape'));

import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="blog" element={<Blog />} />
              <Route path="about" element={<About />} />

            {/* Tools Routes - Wrapped in Suspense for lazy loading */}
            <Route path="tools/json-formatter" element={
              <Suspense fallback={<LoadingSpinner />}>
                <JsonFormatter />
              </Suspense>
            } />
            <Route path="tools/password-generator" element={
              <Suspense fallback={<LoadingSpinner />}>
                <PasswordGenerator />
              </Suspense>
            } />
            <Route path="tools/base64-encoder" element={
              <Suspense fallback={<LoadingSpinner />}>
                <Base64Encoder />
              </Suspense>
            } />
            <Route path="tools/qr-generator" element={
              <Suspense fallback={<LoadingSpinner />}>
                <QRCodeGenerator />
              </Suspense>
            } />
            <Route path="tools/hash-generator" element={
              <Suspense fallback={<LoadingSpinner />}>
                <HashGenerator />
              </Suspense>
            } />
            <Route path="tools/url-encoder" element={
              <Suspense fallback={<LoadingSpinner />}>
                <URLEncoder />
              </Suspense>
            } />
            <Route path="tools/uuid-generator" element={
              <Suspense fallback={<LoadingSpinner />}>
                <UUIDGenerator />
              </Suspense>
            } />
            <Route path="tools/timestamp-converter" element={
              <Suspense fallback={<LoadingSpinner />}>
                <TimestampConverter />
              </Suspense>
            } />
            <Route path="tools/case-converter" element={
              <Suspense fallback={<LoadingSpinner />}>
                <CaseConverter />
              </Suspense>
            } />
            <Route path="tools/jwt-decoder" element={
              <Suspense fallback={<LoadingSpinner />}>
                <JWTDecoder />
              </Suspense>
            } />
            <Route path="tools/word-counter" element={
              <Suspense fallback={<LoadingSpinner />}>
                <WordCounter />
              </Suspense>
            } />
            <Route path="tools/lorem-ipsum" element={
              <Suspense fallback={<LoadingSpinner />}>
                <LoremIpsum />
              </Suspense>
            } />
            <Route path="tools/color-converter" element={
              <Suspense fallback={<LoadingSpinner />}>
                <ColorConverter />
              </Suspense>
            } />
            <Route path="tools/markdown-editor" element={
              <Suspense fallback={<LoadingSpinner />}>
                <MarkdownEditor />
              </Suspense>
            } />
            <Route path="tools/regex-tester" element={
              <Suspense fallback={<LoadingSpinner />}>
                <RegexTester />
              </Suspense>
            } />
            <Route path="tools/html-entities" element={
              <Suspense fallback={<LoadingSpinner />}>
                <HTMLEntities />
              </Suspense>
            } />
            <Route path="tools/text-diff" element={
              <Suspense fallback={<LoadingSpinner />}>
                <TextDiff />
              </Suspense>
            } />
            <Route path="tools/image-to-base64" element={
              <Suspense fallback={<LoadingSpinner />}>
                <ImageToBase64 />
              </Suspense>
            } />
            <Route path="tools/csv-to-json" element={
              <Suspense fallback={<LoadingSpinner />}>
                <CSVToJSON />
              </Suspense>
            } />
            <Route path="tools/json-to-csv" element={
              <Suspense fallback={<LoadingSpinner />}>
                <JSONToCSV />
              </Suspense>
            } />
            <Route path="tools/random-generator" element={
              <Suspense fallback={<LoadingSpinner />}>
                <RandomGenerator />
              </Suspense>
            } />
            <Route path="tools/binary-converter" element={
              <Suspense fallback={<LoadingSpinner />}>
                <BinaryConverter />
              </Suspense>
            } />
            <Route path="tools/text-manipulator" element={
              <Suspense fallback={<LoadingSpinner />}>
                <TextManipulator />
              </Suspense>
            } />
            <Route path="tools/sql-formatter" element={
              <Suspense fallback={<LoadingSpinner />}>
                <SQLFormatter />
              </Suspense>
            } />
            <Route path="tools/css-formatter" element={
              <Suspense fallback={<LoadingSpinner />}>
                <CSSFormatter />
              </Suspense>
            } />
            <Route path="tools/unicode-converter" element={
              <Suspense fallback={<LoadingSpinner />}>
                <UnicodeConverter />
              </Suspense>
            } />
            <Route path="tools/gradient-generator" element={
              <Suspense fallback={<LoadingSpinner />}>
                <GradientGenerator />
              </Suspense>
            } />
            <Route path="tools/unit-converter" element={
              <Suspense fallback={<LoadingSpinner />}>
                <UnitConverter />
              </Suspense>
            } />
            <Route path="tools/pomodoro-timer" element={
              <Suspense fallback={<LoadingSpinner />}>
                <PomodoroTimer />
              </Suspense>
            } />
            <Route path="tools/js-minifier" element={
              <Suspense fallback={<LoadingSpinner />}>
                <JSMinifier />
              </Suspense>
            } />
            <Route path="tools/hex-converter" element={
              <Suspense fallback={<LoadingSpinner />}>
                <HexConverter />
              </Suspense>
            } />
            <Route path="tools/slug-generator" element={
              <Suspense fallback={<LoadingSpinner />}>
                <SlugGenerator />
              </Suspense>
            } />
            <Route path="tools/backslash-escape" element={
              <Suspense fallback={<LoadingSpinner />}>
                <BackslashEscape />
              </Suspense>
            } />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
