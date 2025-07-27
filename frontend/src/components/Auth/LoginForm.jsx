// frontend/src/components/Auth/LoginForm.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth

const LoginForm = ({ onClose, onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const { login, isAuthenticated, loading, error } = useAuth();

    // Tự động đóng form và chuyển hướng nếu đăng nhập thành công
    useEffect(() => {
        if (isAuthenticated) {
            onClose(); // Đóng modal
            // navigate('/'); // Nếu bạn muốn chuyển hướng sau khi đăng nhập, hãy dùng useNavigate trong component cha
        }
    }, [isAuthenticated, onClose]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage('');

        const result = await login(email, password);

        if (result.success) {
            setMessage('Login successful!');
            // onClose() sẽ được gọi bởi useEffect
        } else {
            setMessage(error || result.error || 'Login failed. Please check your credentials.');
        }
    };

    return (
        // Overlay background
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center" onClick={onClose}>
            {/* Modal Content */}
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl" aria-label="Close login form">&times;</button>
                <h2 className="text-3xl font-bold text-center text-[#B61E01] mb-6">Login</h2>

                {message && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{message}</div>}
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

                <form onSubmit={submitHandler} className="space-y-5">
                    <div>
                        <label htmlFor="login-email" className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
                        <input
                            type="email"
                            id="login-email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div>
                        <label htmlFor="login-password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            id="login-password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#FF9800] text-white py-3 rounded-md font-semibold text-lg hover:bg-[#E08F00] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        disabled={loading}
                    >
                        {loading ? 'Logging In...' : 'Login'}
                    </button>
                </form>

                <div className="mt-6 text-center text-gray-600">
                    New Customer? {' '}
                    <button onClick={onSwitchToRegister} className="text-[#B61E01] hover:underline font-medium">Register</button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;