import bcryptjs from 'bcryptjs';
import User from '../model/user.model.js';
import { generateTokenAndSetCookie } from '../utils/generateToken.js';

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

        const PROFILE_PIC = ["/avatar1.svg","/avatar2.svg","/avatar3.svg"];

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
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }
     const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ success: false, message: 'Invalid Credentials ' });
  }
  const isPasswordCorrect = await bcryptjs.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ success: false, message: 'Invalid Credentials ' });
  }
  generateTokenAndSetCookie(user._id, res);
  res.status(200).json({ success: true, user: { ...user._doc, password: "" } });

  
} catch (error) {
    console.error('Error occurred while logging in:', error.message);
    res.status(500).json({ success: false, message: 'Error occurred while logging in' });
  }
}

export async function logout(req, res) {
    try {
        res.clearCookie('jwt-davidflix');
        res.status(200).json({ success: true, message: 'Logged out successfully' });  

    }catch (error) {
        console.error('Error occurred while logging out:', error.message);
        res.status(500).json({ success: false, message: 'Error occurred while logging out' });
    }}

export async function authCheck(req, res) {
    try {
        res.status(200).json({ success: true, user: req.user });
    } catch (error) {
        console.error('Error occurred while checking auth:', error.message);
        res.status(500).json({ success: false, message: 'Error occurred while checking auth' });
    }
}
