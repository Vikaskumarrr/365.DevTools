import { Component } from 'react';
import { FiAlertTriangle, FiRefreshCw, FiHome } from 'react-icons/fi';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo
        });
        
        // Log error to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('Error caught by boundary:', error, errorInfo);
        }
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    handleGoHome = () => {
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-[#0a0a0a]">
                    <div className="max-w-md w-full text-center">
                        {/* Error Icon */}
                        <div className="mb-6 flex justify-center">
                            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                                <FiAlertTriangle 
                                    className="text-red-500 dark:text-red-400" 
                                    size={40}
                                    aria-hidden="true"
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
                            Oops! Something went wrong
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            We encountered an unexpected error. Don't worry, your data is safe and hasn't been sent anywhere.
                        </p>

                        {/* Error Details (Development only) */}
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mb-6 text-left bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
                                <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white mb-2">
                                    Error Details (Development)
                                </summary>
                                <pre className="text-xs text-red-600 dark:text-red-400 overflow-auto">
                                    {this.state.error.toString()}
                                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                                </pre>
                            </details>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={this.handleReset}
                                className="btn-primary flex items-center justify-center gap-2"
                                aria-label="Try again"
                            >
                                <FiRefreshCw size={18} aria-hidden="true" />
                                Try Again
                            </button>
                            <button
                                onClick={this.handleGoHome}
                                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                                aria-label="Go to home page"
                            >
                                <FiHome size={18} aria-hidden="true" />
                                Go Home
                            </button>
                        </div>

                        {/* Help Text */}
                        <p className="mt-6 text-sm text-gray-500 dark:text-gray-500">
                            If this problem persists, please{' '}
                            <a 
                                href="https://github.com/Vikaskumarrr/365.devTool/issues" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary-500 hover:text-primary-600 underline"
                            >
                                report it on GitHub
                            </a>
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
