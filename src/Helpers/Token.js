const jwt = require('jsonwebtoken');

// Function to generate a JWT token
function generateToken(user) {
    const payload = {
        ID: user.ID,
        email: user.email,
        role: user.role
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { generateToken, verifyToken };