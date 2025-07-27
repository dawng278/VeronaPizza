// backend/src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware để bảo vệ các tuyến đường (yêu cầu token hợp lệ)
exports.protect = async (req, res, next) => {
    let token;

    // Kiểm tra Header Authorization
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // Định dạng: "Bearer TOKEN_STRING"
        token = req.headers.authorization.split(' ')[1];
    }
    // Bạn cũng có thể kiểm tra token trong cookie nếu bạn lưu nó ở đó
    // else if (req.cookies.token) {
    //     token = req.cookies.token;
    // }

    // Đảm bảo token tồn tại
    if (!token) {
        return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
    }

    try {
        // Xác thực token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // console.log(decoded); // Để debug: xem thông tin giải mã từ token

        // Gắn người dùng vào request để các route sau có thể sử dụng
        req.user = await User.findById(decoded.id);

        next();
    } catch (error) {
        console.error('Token verification error:', error.message);
        res.status(401).json({ success: false, error: 'Not authorized to access this route' });
    }
};

// Middleware để kiểm tra vai trò người dùng (phân quyền)
// Ví dụ: authorize(['admin', 'publisher'])
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                error: `User role ${req.user.role} is not authorized to access this route`
            });
        }
        next();
    };
};