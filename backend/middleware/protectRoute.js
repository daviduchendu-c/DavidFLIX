import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';
import { ENV_VAR } from '../config/envVars.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies['jwt-davidflix'];

        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized - No token provided' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, ENV_VAR.JWT_SECRET);
        } catch {
            return res.status(401).json({ success: false, message: 'Unauthorized - Invalid token' });
        }

        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error occurred in protectRoute middleware:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
