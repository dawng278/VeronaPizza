// backend/src/routes/authRoutes.js
const express = require('express');
const { register, login, getMe, logout } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware'); // Middleware bảo vệ route

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe); // Route ví dụ cần xác thực
router.get('/logout', protect, logout);

module.exports = router;