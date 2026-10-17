import jwt from 'jsonwebtoken';
import { ENV_VAR } from '../config/envVars.js';


export const generateTokenAndSetCookie = (userId ,res) => { 
    const token = jwt.sign({ id: userId }, ENV_VAR.JWT_SECRET, { expiresIn: '15d' });
    res.cookie('jwt-davidflix', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true,
        secure: Env_VAR.NODE_ENV === 'development', 
        sameSite: 'strict', // Adjust based on your requirements
    });
    return token;
}
