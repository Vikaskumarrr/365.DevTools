// Hash Worker - Handles cryptographic hash generation off the main thread
// Note: This uses the Web Crypto API which is available in workers

self.addEventListener('message', async (event) => {
    const { type, data } = event.data;

    try {
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(data);

        switch (type) {
            case 'sha256':
                const sha256Buffer = await crypto.subtle.digest('SHA-256', dataBuffer);
                const sha256Hash = bufferToHex(sha256Buffer);
                self.postMessage({
                    success: true,
                    result: sha256Hash,
                    type: 'sha256'
                });
                break;

            case 'sha512':
                const sha512Buffer = await crypto.subtle.digest('SHA-512', dataBuffer);
                const sha512Hash = bufferToHex(sha512Buffer);
                self.postMessage({
                    success: true,
                    result: sha512Hash,
                    type: 'sha512'
                });
                break;

            case 'sha1':
                const sha1Buffer = await crypto.subtle.digest('SHA-1', dataBuffer);
                const sha1Hash = bufferToHex(sha1Buffer);
                self.postMessage({
                    success: true,
                    result: sha1Hash,
                    type: 'sha1'
                });
                break;

            case 'all':
                // Generate all hashes at once
                const [sha1Buf, sha256Buf, sha512Buf] = await Promise.all([
                    crypto.subtle.digest('SHA-1', dataBuffer),
                    crypto.subtle.digest('SHA-256', dataBuffer),
                    crypto.subtle.digest('SHA-512', dataBuffer)
                ]);

                self.postMessage({
                    success: true,
                    result: {
                        sha1: bufferToHex(sha1Buf),
                        sha256: bufferToHex(sha256Buf),
                        sha512: bufferToHex(sha512Buf)
                    },
                    type: 'all'
                });
                break;

            default:
                self.postMessage({
                    success: false,
                    error: 'Unknown hash type'
                });
        }
    } catch (error) {
        self.postMessage({
            success: false,
            error: error.message,
            type: type
        });
    }
});

// Helper function to convert ArrayBuffer to hex string
function bufferToHex(buffer) {
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

// Handle worker initialization
self.postMessage({ ready: true });
