// backend/src/utils/jwt.js
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
    // Provide default values if environment variables are not set
    const jwtSecret = process.env.JWT_SECRET || 'your-default-secret-key';
    const jwtExpire = process.env.JWT_EXPIRE || '30d';

    return jwt.sign(
        { id, role }, 
        jwtSecret, 
        {
            expiresIn: jwtExpire,
        }
    );
};

module.exports = generateToken;