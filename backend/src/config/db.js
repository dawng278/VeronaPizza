// backend/src/config/db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Load biến môi trường từ .env

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // Các tùy chọn này không còn cần thiết với Mongoose 6.0+
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true, // Deprecated
            // useFindAndModify: false // Deprecated
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Thoát ứng dụng nếu kết nối thất bại
    }
};

module.exports = connectDB;