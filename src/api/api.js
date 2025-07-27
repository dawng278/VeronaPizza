// frontend/src/api/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api', // Đảm bảo URL backend của bạn đúng
    headers: {
        'Content-Type': 'application/json',
    },
});

// Thêm interceptor để xử lý lỗi xác thực hoặc refresh token
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        // Ví dụ: xử lý lỗi 401 (Unauthorized)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            // Ở đây bạn có thể thử refresh token nếu có cơ chế đó
            // Hoặc đơn giản là đăng xuất người dùng
            // window.location.href = '/login'; // Chuyển hướng đến trang đăng nhập
        }
        return Promise.reject(error);
    }
);

export default api;