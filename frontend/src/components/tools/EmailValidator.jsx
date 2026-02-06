import { useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

function EmailValidator() {
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(null);
    const [details, setDetails] = useState(null);

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const valid = emailRegex.test(email);
        
        const parts = email.split('@');
        const domain = parts[1] || '';
        const username = parts[0] || '';
        
        setIsValid(valid);
        setDetails({
            format: valid,
            username: username.length >= 1,
            domain: domain.includes('.'),
            length: email.length <= 254,
            specialChars: !/[<>()[\]\\,;:\s@"]/.test(username)
        });
        
        toast[valid ? 'success' : 'error'](valid ? 'Valid email!' : 'Invalid email!');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Email Validator</h1>
                <p className="text-gray-600 dark:text-gray-400">Validate email addresses</p>
            </header>
            
            <div className="space-y-6">
                <div>
                    <label className="block font-semibold mb-2">Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@domain.com"
                        className="input-field text-lg"
                        onKeyPress={(e) => e.key === 'Enter' && validateEmail()}
                    />
                </div>
                
                <button onClick={validateEmail} disabled={!email} className="btn-primary w-full">
                    Validate Email
                </button>

                {isValid !== null && (
                    <div className={`p-6 rounded-lg border-2 ${isValid ? 'bg-green-50 dark:bg-green-900/20 border-green-500' : 'bg-red-50 dark:bg-red-900/20 border-red-500'}`}>
                        <div className="flex items-center gap-3 mb-4">
                            {isValid ? (
                                <FiCheck className="text-green-500" size={32} />
                            ) : (
                                <FiX className="text-red-500" size={32} />
                            )}
                            <div>
                                <h3 className="text-xl font-bold">{isValid ? 'Valid Email' : 'Invalid Email'}</h3>
                                <p className="text-sm opacity-75">{email}</p>
                            </div>
                        </div>

                        {details && (
                            <div className="space-y-2 mt-4">
                                <h4 className="font-semibold mb-2">Validation Details:</h4>
                                {Object.entries(details).map(([key, value]) => (
                                    <div key={key} className="flex items-center gap-2">
                                        {value ? (
                                            <FiCheck className="text-green-500" size={16} />
                                        ) : (
                                            <FiX className="text-red-500" size={16} />
                                        )}
                                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default EmailValidator;
