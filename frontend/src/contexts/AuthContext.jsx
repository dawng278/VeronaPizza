import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Set base URL for axios
    const API_BASE_URL = 'http://localhost:5000/api/auth';

    const register = async (name, email, password) => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.post(`${API_BASE_URL}/register`, {
                name,
                email,
                password
            });

            if (response.data.success) {
                setUser(response.data.user);
                setIsAuthenticated(true);
                // localStorage.setItem('token', response.data.token); // <--- LƯU Ý: Frontend lưu token vào localStorage
                return { success: true };
            }
        } catch (error) {
            console.error('Registration failed:', error.response?.data?.message || error.message);
            setError(error.response?.data?.message || 'Registration failed');
            return { success: false, error: error.response?.data?.message || 'Registration failed' };
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.post(`${API_BASE_URL}/login`, {
                email,
                password
            });

            if (response.data.success) {
                setUser(response.data.user);
                setIsAuthenticated(true);
                // localStorage.setItem('token', response.data.token); // <--- LƯU Ý: Frontend lưu token vào localStorage
                return { success: true };
            }
        } catch (error) {
            console.error('Login failed:', error.response?.data?.message || error.message);
            setError(error.response?.data?.message || 'Login failed');
            return { success: false, error: error.response?.data?.message || 'Login failed' };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${API_BASE_URL}/logout`);
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
            // localStorage.removeItem('token'); // <--- LƯU Ý: Xóa token từ localStorage
        }
    };

    // <--- THÊM useEffect để load user khi component mount
    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token'); // Lấy token từ localStorage
            if (token) {
                // Đặt header Authorization cho Axios nếu bạn sử dụng nó
                // axios.defaults.headers.common['x-auth-token'] = token;

                // Hoặc nếu bạn muốn backend đọc token từ cookie,
                // thì bạn sẽ không cần phải gửi nó trong header ở đây,
                // nhưng bạn cần một cách để fetch user info từ backend.
                // Đối với route /me, backend của bạn đang lấy token từ cookie (req.cookies.token)

                try {
                    setLoading(true);
                    const res = await axios.get(`${API_BASE_URL}/me`, { withCredentials: true }); // quan trọng: gửi cookie
                    if (res.data.success) {
                        setUser(res.data.user);
                        setIsAuthenticated(true);
                    }
                } catch (err) {
                    console.error('Failed to load user:', err.response?.data?.message || err.message);
                    setUser(null);
                    setIsAuthenticated(false);
                    localStorage.removeItem('token'); // Xóa token nếu nó không hợp lệ
                } finally {
                    setLoading(false);
                }
            }
        };

        loadUser();
    }, []); // Chạy một lần khi component mount

    const value = {
        user,
        loading,
        error,
        isAuthenticated,
        register,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};