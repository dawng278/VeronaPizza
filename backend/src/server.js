// backend/src/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

dotenv.config({ path: './.env' });
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Import Auth Routes
const authRoutes = require('./routes/authRoutes');

// Mount routes
console.log('Mounting /api/auth routes...');
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Thêm route test tạm thời để kiểm tra base path /api/
app.get('/api/test', (req, res) => {
    res.status(200).json({ message: 'Test route works!' });
});
console.log('Mounted /api/test route.');

app.use(errorHandler);

const PORT = process.env.PORT || 5000; // Default to 5000 if not set
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`MongoDB Connected: ${process.env.MONGO_URI}`);
    console.log(`JWT_SECRET loaded: ${!!process.env.JWT_SECRET}`);
});