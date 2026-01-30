import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';

function MIMETypeLookup() {
    const [search, setSearch] = useState('');
    const [result, setResult] = useState(null);

    const mimeTypes = {
        // Images
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'svg': 'image/svg+xml',
        'webp': 'image/webp',
        'ico': 'image/x-icon',
        
        // Documents
        'pdf': 'application/pdf',
        'doc': 'application/msword',
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'xls': 'application/vnd.ms-excel',
        'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'ppt': 'application/vnd.ms-powerpoint',
        'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        
        // Text
        'txt': 'text/plain',
        'html': 'text/html',
        'css': 'text/css',
        'js': 'text/javascript',
        'json': 'application/json',
        'xml': 'application/xml',
        'csv': 'text/csv',
        
        // Audio
        'mp3': 'audio/mpeg',
        'wav': 'audio/wav',
        'ogg': 'audio/ogg',
        
        // Video
        'mp4': 'video/mp4',
        'webm': 'video/webm',
        'avi': 'video/x-msvideo',
        
        // Archives
        'zip': 'application/zip',
        'rar': 'application/x-rar-compressed',
        '7z': 'application/x-7z-compressed',
        'tar': 'application/x-tar',
        'gz': 'application/gzip',
    };

    const lookup = () => {
        if (!search.trim()) {
            toast.error('Please enter a file extension');
            return;
        }

        const ext = search.toLowerCase().replace('.', '');
        const mime = mimeTypes[ext];

        if (mime) {
            setResult({ extension: ext, mimeType: mime });
            toast.success('MIME type found!');
        } else {
            setResult({ extension: ext, mimeType: 'Not found' });
            toast.error('MIME type not found');
        }
    };

    const commonTypes = [
        { ext: 'jpg', mime: 'image/jpeg' },
        { ext: 'png', mime: 'image/png' },
        { ext: 'pdf', mime: 'application/pdf' },
        { ext: 'json', mime: 'application/json' },
        { ext: 'mp4', mime: 'video/mp4' },
        { ext: 'zip', mime: 'application/zip' },
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    MIME Type Lookup
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Find MIME types for file extensions
                </p>
            </header>

            <div className="space-y-6">
                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <label htmlFor="search" className="block font-medium mb-2">
                        File Extension
                    </label>
                    <div className="flex gap-3">
                        <input
                            id="search"
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="jpg, pdf, mp4..."
                            className="input-field flex-1"
                            onKeyPress={(e) => e.key === 'Enter' && lookup()}
                        />
                        <button onClick={lookup} className="btn-primary flex items-center gap-2">
                            <FiSearch />
                            Lookup
                        </button>
                    </div>
                </section>

                {result && (
                    <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold mb-4">Result</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                <span className="text-gray-600 dark:text-gray-400">Extension</span>
                                <span className="font-medium">.{result.extension}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-gray-600 dark:text-gray-400">MIME Type</span>
                                <span className="font-mono font-medium">{result.mimeType}</span>
                            </div>
                        </div>
                    </section>
                )}

                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold mb-4">Common MIME Types</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {commonTypes.map((type) => (
                            <button
                                key={type.ext}
                                onClick={() => {
                                    setSearch(type.ext);
                                    setResult({ extension: type.ext, mimeType: type.mime });
                                }}
                                className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <p className="font-medium">.{type.ext}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                                    {type.mime}
                                </p>
                            </button>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default MIMETypeLookup;
