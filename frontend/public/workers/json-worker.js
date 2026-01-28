// JSON Worker - Handles heavy JSON operations off the main thread

self.addEventListener('message', (event) => {
    const { type, data, indentSize } = event.data;

    try {
        let result;

        switch (type) {
            case 'format':
                // Parse and format JSON
                const parsed = JSON.parse(data);
                result = JSON.stringify(parsed, null, indentSize || 2);
                self.postMessage({
                    success: true,
                    result,
                    type: 'format'
                });
                break;

            case 'minify':
                // Parse and minify JSON
                const parsedMin = JSON.parse(data);
                result = JSON.stringify(parsedMin);
                self.postMessage({
                    success: true,
                    result,
                    type: 'minify'
                });
                break;

            case 'validate':
                // Just validate JSON
                JSON.parse(data);
                self.postMessage({
                    success: true,
                    valid: true,
                    type: 'validate'
                });
                break;

            case 'prettify':
                // Format with custom indentation
                const parsedPretty = JSON.parse(data);
                result = JSON.stringify(parsedPretty, null, indentSize || 2);
                self.postMessage({
                    success: true,
                    result,
                    type: 'prettify'
                });
                break;

            default:
                self.postMessage({
                    success: false,
                    error: 'Unknown operation type'
                });
        }
    } catch (error) {
        // Send error back to main thread
        self.postMessage({
            success: false,
            error: error.message,
            type: type
        });
    }
});

// Handle worker initialization
self.postMessage({ ready: true });
