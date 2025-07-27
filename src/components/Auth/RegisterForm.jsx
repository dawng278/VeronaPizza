// frontend/src/components/Auth/RegisterForm.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth

const RegisterForm = ({ onClose, onSwitchToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const { register, isAuthenticated, loading, error } = useAuth();

    // Tự động đóng form và chuyển hướng nếu đăng ký thành công
    useEffect(() => {
        if (isAuthenticated) {
            onClose(); // Đóng modal
            // navigate('/'); // Nếu bạn muốn chuyển hướng sau khi đăng ký
        }
    }, [isAuthenticated, onClose]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage('');

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        const result = await register(name, email, password);

        if (result.success) {
            setMessage('Registration successful!');
            // onClose() sẽ được gọi bởi useEffect
        } else {
            setMessage(error || result.error || 'Registration failed. Please try again.');
        }
    };

    return (
        // Overlay background
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center" onClick={onClose}>
            {/* Modal Content */}
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl" aria-label="Close registration form">&times;</button>
                <h2 className="text-3xl font-bold text-center text-[#B61E01] mb-6">Register</h2>

                {message && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{message}</div>}
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

                <form onSubmit={submitHandler} className="space-y-5">
                    <div>
                        <label htmlFor="register-name" className="block text-gray-700 text-sm font-medium mb-2">Name</label>
                        <input
                            type="text"
                            id="register-name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            autoComplete="name"
                        />
                    </div>
                    <div>
                        <label htmlFor="register-email" className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
                        <input
                            type="email"
                            id="register-email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div>
                        <label htmlFor="register-password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            id="register-password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                    </div>
                    <div>
                        <label htmlFor="register-confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">Confirm Password</label>
                        <input
                            type="password"
                            id="register-confirmPassword"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#FF9800] text-white py-3 rounded-md font-semibold text-lg hover:bg-[#E08F00] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <div className="mt-6 text-center text-gray-600">
                    Already have an account? {' '}
                    <button onClick={onSwitchToLogin} className="text-[#B61E01] hover:underline font-medium">Login</button>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;