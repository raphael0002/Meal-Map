const jwt = require('jsonwebtoken');

const generateSendToken = (user, role, statusCode,res) => {
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE });

    res.status(statusCode).json({
        success: true,
        token,
        data: {
            user,
            role,
        }
    });

};

module.exports = generateSendToken;