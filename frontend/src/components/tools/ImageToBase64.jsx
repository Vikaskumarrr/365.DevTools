import { useState } from 'react';
import { FiUpload, FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function ImageToBase64() {
    const [base64, setBase64] = useState('');
    const [imageData, setImageData] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please upload a valid image file');
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            toast.error('Image size must be less than 10MB');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setBase64(reader.result);
            setImageData({ name: file.name, size: file.size, type: file.type });
            toast.success('Image converted to Base64!');
        };
        reader.onerror = () => {
            toast.error('Failed to read image file');
        };
        reader.readAsDataURL(file);
    };

    const copy = () => {
        navigator.clipboard.writeText(base64);
        toast.success('Base64 copied!');
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Image to Base64</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Convert images to Base64 encoded strings
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
                <label className="block mb-4">
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center cursor-pointer hover:border-primary-500 transition-colors">
                        <FiUpload size={48} className="mx-auto mb-4 text-gray-400" />
                        <p className="text-lg font-medium mb-2">Click to upload image</p>
                        <p className="text-sm text-gray-500">PNG, JPG, GIF, WebP supported</p>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                </label>

                {imageData && (
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <p>File: {imageData.name}</p>
                        <p>Size: {(imageData.size / 1024).toFixed(2)} KB</p>
                        <p>Type: {imageData.type}</p>
                    </div>
                )}
            </div>

            {base64 && (
                <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg">Preview</h3>
                        </div>
                        <img src={base64} alt="Uploaded" className="max-w-full h-auto rounded" />
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg">Base64 String</h3>
                            <button onClick={copy} className="text-primary-500 hover:text-primary-600">
                                <FiCopy size={20} />
                            </button>
                        </div>
                        <textarea
                            value={base64}
                            readOnly
                            className="input-field min-h-[200px] font-mono text-xs bg-gray-50 dark:bg-gray-900"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ImageToBase64;
