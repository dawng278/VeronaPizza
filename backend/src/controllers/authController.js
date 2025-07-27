// backend/src/controllers/authController.js
const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler'); // Import asyncHandler
const jwt = require('jsonwebtoken'); // Đảm bảo bạn đã import jwt ở đây

// ==========================================================
// HÀM TIỆN ÍCH: sendTokenResponse
// Đảm bảo hàm này được định nghĩa TRƯỚC các hàm controller sử dụng nó.
// ==========================================================
const sendTokenResponse = (user, statusCode, res) => {
    // Gọi phương thức từ User model
    const token = user.getSignedJwtToken();

    // Các tùy chọn cookie (tùy chọn)
    const options = {
        // Đảm bảo process.env.JWT_EXPIRE_COOKIE đã được định nghĩa trong .env và là một số
        expires: new Date(Date.now() + process.env.JWT_EXPIRE_COOKIE * 24 * 60 * 60 * 1000),
        httpOnly: true // Cookie chỉ có thể truy cập bằng HTTP(S) request, không phải JavaScript của trình duyệt
    };

    // Chỉ sử dụng secure cookies trong production (khi có HTTPS)
    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
};


// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    // Tạo người dùng mới
    const user = await User.create({
        name,
        email,
        password,
        role // Lấy role từ body, hoặc sẽ là undefined nếu không có (và mongoose sẽ dùng default 'user')
    });

    sendTokenResponse(user, 201, res); // Gọi hàm sendTokenResponse
});


// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Kiểm tra email và password có được gửi lên không
    if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Please enter an email and password' });
    }

    // Tìm người dùng theo email (và select cả password)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Kiểm tra mật khẩu
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    sendTokenResponse(user, 200, res); // Gọi hàm sendTokenResponse
});

// @desc    Get current logged in user (protected route example)
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
    // req.user được thêm vào bởi middleware xác thực
    const user = await User.findById(req.user.id).select('-password'); // Không trả về mật khẩu
    res.status(200).json({
        success: true,
        data: user
    });
});

// @desc    Log user out / clear cookie
// @route   GET /api/auth/logout
// @access  Private
exports.logout = asyncHandler((req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000), // Hết hạn sau 10 giây
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        data: {}
    });
});