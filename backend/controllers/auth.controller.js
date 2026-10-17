import bcryptjs from 'bcryptjs';
import User from '../model/User.model.js';

export async function signup(req, res) {
    try{
        const { username, email, password } = req.body || {};
         
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide username, email, and password' });
        }
        const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailregex.test(email)) {
            return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
        }
        const existingUserByEmail = await User.findOne({ email: email });
        if (existingUserByEmail) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }
        const existingUserByUsername = await User.findOne({ username: username });
        if (existingUserByUsername) {
            return res.status(400).json({ success: false, message: 'Username already exists' });
        }

        const PROFILE_PIC = ["/avatar1.png","/avatar2.png","/avatar3.png"];

        const image = PROFILE_PIC[Math.floor(Math.random() * PROFILE_PIC.length)];

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            image
        });

            generateTokenAndSetCookie(newUser._id, res);
           await newUser.save();
           res.status(201).json({ success: true, user: { ...newUser._doc, password: "" } });
    
    }
    catch(error) {
        console.error('Error occurred while signing up:', error.message);
        res.status(500).json({ success: false, message: 'Error occurred while signing up' });
    }
}
export async function login(req, res) {
    res.send('login route');
}
export async function logout(req, res) {
    res.send('logout route');
}
