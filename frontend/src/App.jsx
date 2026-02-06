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

// AI Tools
const AITextSummarizer = lazy(() => import('./components/tools/AITextSummarizer'));
const AICodeExplainer = lazy(() => import('./components/tools/AICodeExplainer'));
const AIRegexGenerator = lazy(() => import('./components/tools/AIRegexGenerator'));
const AIJSONGenerator = lazy(() => import('./components/tools/AIJSONGenerator'));
const AISQLGenerator = lazy(() => import('./components/tools/AISQLGenerator'));
const AIWritingAssistant = lazy(() => import('./components/tools/AIWritingAssistant'));

// New Tools - Developer
const XMLFormatter = lazy(() => import('./components/tools/XMLFormatter'));
const YAMLValidator = lazy(() => import('./components/tools/YAMLValidator'));
const HTMLFormatter = lazy(() => import('./components/tools/HTMLFormatter'));
const JSONToXML = lazy(() => import('./components/tools/JSONToXML'));
const XMLToJSON = lazy(() => import('./components/tools/XMLToJSON'));
const CronExpression = lazy(() => import('./components/tools/CronExpression'));
const APITester = lazy(() => import('./components/tools/APITester'));
const JSONDiff = lazy(() => import('./components/tools/JSONDiff'));

// New Tools - Security
const BcryptGenerator = lazy(() => import('./components/tools/BcryptGenerator'));
const HMACGenerator = lazy(() => import('./components/tools/HMACGenerator'));
const RSAKeyGenerator = lazy(() => import('./components/tools/RSAKeyGenerator'));

// New Tools - Design
const ColorPalette = lazy(() => import('./components/tools/ColorPalette'));
const ContrastChecker = lazy(() => import('./components/tools/ContrastChecker'));
const SVGOptimizer = lazy(() => import('./components/tools/SVGOptimizer'));
const CSSMinifier = lazy(() => import('./components/tools/CSSMinifier'));
const BoxShadowGenerator = lazy(() => import('./components/tools/BoxShadowGenerator'));

// New Tools - Content
const HTMLToMarkdown = lazy(() => import('./components/tools/HTMLToMarkdown'));
const MarkdownToHTML = lazy(() => import('./components/tools/MarkdownToHTML'));
const TextToSpeech = lazy(() => import('./components/tools/TextToSpeech'));
const DuplicateRemover = lazy(() => import('./components/tools/DuplicateRemover'));

// New Tools - Converter
const RomanNumeral = lazy(() => import('./components/tools/RomanNumeral'));
const TemperatureConverter = lazy(() => import('./components/tools/TemperatureConverter'));
const CurrencyConverter = lazy(() => import('./components/tools/CurrencyConverter'));
const NumberBaseConverter = lazy(() => import('./components/tools/NumberBaseConverter'));

// New Tools - Utility
const BarcodeGenerator = lazy(() => import('./components/tools/BarcodeGenerator'));
const IPLookup = lazy(() => import('./components/tools/IPLookup'));
const UserAgentParser = lazy(() => import('./components/tools/UserAgentParser'));
const MIMETypeLookup = lazy(() => import('./components/tools/MIMETypeLookup'));
const EmailValidator = lazy(() => import('./components/tools/EmailValidator'));
const CreditCardValidator = lazy(() => import('./components/tools/CreditCardValidator'));

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
              <Route path="tools/json-formatter" element={<Suspense fallback={<LoadingSpinner />}><JsonFormatter /></Suspense>} />
              <Route path="tools/password-generator" element={<Suspense fallback={<LoadingSpinner />}><PasswordGenerator /></Suspense>} />
              <Route path="tools/base64-encoder" element={<Suspense fallback={<LoadingSpinner />}><Base64Encoder /></Suspense>} />
              <Route path="tools/qr-generator" element={<Suspense fallback={<LoadingSpinner />}><QRCodeGenerator /></Suspense>} />
              <Route path="tools/hash-generator" element={<Suspense fallback={<LoadingSpinner />}><HashGenerator /></Suspense>} />
              <Route path="tools/url-encoder" element={<Suspense fallback={<LoadingSpinner />}><URLEncoder /></Suspense>} />
              <Route path="tools/uuid-generator" element={<Suspense fallback={<LoadingSpinner />}><UUIDGenerator /></Suspense>} />
              <Route path="tools/timestamp-converter" element={<Suspense fallback={<LoadingSpinner />}><TimestampConverter /></Suspense>} />
              <Route path="tools/case-converter" element={<Suspense fallback={<LoadingSpinner />}><CaseConverter /></Suspense>} />
              <Route path="tools/jwt-decoder" element={<Suspense fallback={<LoadingSpinner />}><JWTDecoder /></Suspense>} />
              <Route path="tools/word-counter" element={<Suspense fallback={<LoadingSpinner />}><WordCounter /></Suspense>} />
              <Route path="tools/lorem-ipsum" element={<Suspense fallback={<LoadingSpinner />}><LoremIpsum /></Suspense>} />
              <Route path="tools/color-converter" element={<Suspense fallback={<LoadingSpinner />}><ColorConverter /></Suspense>} />
              <Route path="tools/markdown-editor" element={<Suspense fallback={<LoadingSpinner />}><MarkdownEditor /></Suspense>} />
              <Route path="tools/regex-tester" element={<Suspense fallback={<LoadingSpinner />}><RegexTester /></Suspense>} />
              <Route path="tools/html-entities" element={<Suspense fallback={<LoadingSpinner />}><HTMLEntities /></Suspense>} />
              <Route path="tools/text-diff" element={<Suspense fallback={<LoadingSpinner />}><TextDiff /></Suspense>} />
              <Route path="tools/image-to-base64" element={<Suspense fallback={<LoadingSpinner />}><ImageToBase64 /></Suspense>} />
              <Route path="tools/csv-to-json" element={<Suspense fallback={<LoadingSpinner />}><CSVToJSON /></Suspense>} />
              <Route path="tools/json-to-csv" element={<Suspense fallback={<LoadingSpinner />}><JSONToCSV /></Suspense>} />
              <Route path="tools/random-generator" element={<Suspense fallback={<LoadingSpinner />}><RandomGenerator /></Suspense>} />
              <Route path="tools/binary-converter" element={<Suspense fallback={<LoadingSpinner />}><BinaryConverter /></Suspense>} />
              <Route path="tools/text-manipulator" element={<Suspense fallback={<LoadingSpinner />}><TextManipulator /></Suspense>} />
              <Route path="tools/sql-formatter" element={<Suspense fallback={<LoadingSpinner />}><SQLFormatter /></Suspense>} />
              <Route path="tools/css-formatter" element={<Suspense fallback={<LoadingSpinner />}><CSSFormatter /></Suspense>} />
              <Route path="tools/unicode-converter" element={<Suspense fallback={<LoadingSpinner />}><UnicodeConverter /></Suspense>} />
              <Route path="tools/gradient-generator" element={<Suspense fallback={<LoadingSpinner />}><GradientGenerator /></Suspense>} />
              <Route path="tools/unit-converter" element={<Suspense fallback={<LoadingSpinner />}><UnitConverter /></Suspense>} />
              <Route path="tools/pomodoro-timer" element={<Suspense fallback={<LoadingSpinner />}><PomodoroTimer /></Suspense>} />
              <Route path="tools/js-minifier" element={<Suspense fallback={<LoadingSpinner />}><JSMinifier /></Suspense>} />
              <Route path="tools/hex-converter" element={<Suspense fallback={<LoadingSpinner />}><HexConverter /></Suspense>} />
              <Route path="tools/slug-generator" element={<Suspense fallback={<LoadingSpinner />}><SlugGenerator /></Suspense>} />
              <Route path="tools/backslash-escape" element={<Suspense fallback={<LoadingSpinner />}><BackslashEscape /></Suspense>} />

              {/* AI Tools Routes */}
              <Route path="tools/ai-text-summarizer" element={<Suspense fallback={<LoadingSpinner />}><AITextSummarizer /></Suspense>} />
              <Route path="tools/ai-code-explainer" element={<Suspense fallback={<LoadingSpinner />}><AICodeExplainer /></Suspense>} />
              <Route path="tools/ai-regex-generator" element={<Suspense fallback={<LoadingSpinner />}><AIRegexGenerator /></Suspense>} />
              <Route path="tools/ai-json-generator" element={<Suspense fallback={<LoadingSpinner />}><AIJSONGenerator /></Suspense>} />
              <Route path="tools/ai-sql-generator" element={<Suspense fallback={<LoadingSpinner />}><AISQLGenerator /></Suspense>} />
              <Route path="tools/ai-writing-assistant" element={<Suspense fallback={<LoadingSpinner />}><AIWritingAssistant /></Suspense>} />

              {/* New Tools - Developer */}
              <Route path="tools/xml-formatter" element={<Suspense fallback={<LoadingSpinner />}><XMLFormatter /></Suspense>} />
              <Route path="tools/yaml-validator" element={<Suspense fallback={<LoadingSpinner />}><YAMLValidator /></Suspense>} />
              <Route path="tools/html-formatter" element={<Suspense fallback={<LoadingSpinner />}><HTMLFormatter /></Suspense>} />
              <Route path="tools/json-to-xml" element={<Suspense fallback={<LoadingSpinner />}><JSONToXML /></Suspense>} />
              <Route path="tools/xml-to-json" element={<Suspense fallback={<LoadingSpinner />}><XMLToJSON /></Suspense>} />
              <Route path="tools/cron-expression" element={<Suspense fallback={<LoadingSpinner />}><CronExpression /></Suspense>} />
              <Route path="tools/api-tester" element={<Suspense fallback={<LoadingSpinner />}><APITester /></Suspense>} />
              <Route path="tools/json-diff" element={<Suspense fallback={<LoadingSpinner />}><JSONDiff /></Suspense>} />

              {/* New Tools - Security */}
              <Route path="tools/bcrypt-generator" element={<Suspense fallback={<LoadingSpinner />}><BcryptGenerator /></Suspense>} />
              <Route path="tools/hmac-generator" element={<Suspense fallback={<LoadingSpinner />}><HMACGenerator /></Suspense>} />
              <Route path="tools/rsa-key-generator" element={<Suspense fallback={<LoadingSpinner />}><RSAKeyGenerator /></Suspense>} />

              {/* New Tools - Design */}
              <Route path="tools/color-palette" element={<Suspense fallback={<LoadingSpinner />}><ColorPalette /></Suspense>} />
              <Route path="tools/contrast-checker" element={<Suspense fallback={<LoadingSpinner />}><ContrastChecker /></Suspense>} />
              <Route path="tools/svg-optimizer" element={<Suspense fallback={<LoadingSpinner />}><SVGOptimizer /></Suspense>} />
              <Route path="tools/css-minifier" element={<Suspense fallback={<LoadingSpinner />}><CSSMinifier /></Suspense>} />
              <Route path="tools/box-shadow-generator" element={<Suspense fallback={<LoadingSpinner />}><BoxShadowGenerator /></Suspense>} />

              {/* New Tools - Content */}
              <Route path="tools/html-to-markdown" element={<Suspense fallback={<LoadingSpinner />}><HTMLToMarkdown /></Suspense>} />
              <Route path="tools/markdown-to-html" element={<Suspense fallback={<LoadingSpinner />}><MarkdownToHTML /></Suspense>} />
              <Route path="tools/text-to-speech" element={<Suspense fallback={<LoadingSpinner />}><TextToSpeech /></Suspense>} />
              <Route path="tools/duplicate-remover" element={<Suspense fallback={<LoadingSpinner />}><DuplicateRemover /></Suspense>} />

              {/* New Tools - Converter */}
              <Route path="tools/roman-numeral" element={<Suspense fallback={<LoadingSpinner />}><RomanNumeral /></Suspense>} />
              <Route path="tools/temperature-converter" element={<Suspense fallback={<LoadingSpinner />}><TemperatureConverter /></Suspense>} />
              <Route path="tools/currency-converter" element={<Suspense fallback={<LoadingSpinner />}><CurrencyConverter /></Suspense>} />
              <Route path="tools/number-base-converter" element={<Suspense fallback={<LoadingSpinner />}><NumberBaseConverter /></Suspense>} />

              {/* New Tools - Utility */}
              <Route path="tools/barcode-generator" element={<Suspense fallback={<LoadingSpinner />}><BarcodeGenerator /></Suspense>} />
              <Route path="tools/ip-lookup" element={<Suspense fallback={<LoadingSpinner />}><IPLookup /></Suspense>} />
              <Route path="tools/user-agent-parser" element={<Suspense fallback={<LoadingSpinner />}><UserAgentParser /></Suspense>} />
              <Route path="tools/mime-type-lookup" element={<Suspense fallback={<LoadingSpinner />}><MIMETypeLookup /></Suspense>} />
              <Route path="tools/email-validator" element={<Suspense fallback={<LoadingSpinner />}><EmailValidator /></Suspense>} />
              <Route path="tools/credit-card-validator" element={<Suspense fallback={<LoadingSpinner />}><CreditCardValidator /></Suspense>} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
