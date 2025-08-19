import { Router } from 'express';
import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;



import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import auth from '../middleware/auth.js';
import { CopySlash } from 'lucide-react';

const router = Router();

// Register
router.post('/register', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    console.log('Validation errors:', errors.array());
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    console.log('Request body:', req.body);
    const { name, email, password } = req.body;
    console.log('Registering user:', { name, email });
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      Console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    console.log('Creating new user:', { name, email });
    // Create user
    const user = new User({ name, email, password });
    console.log('Saving user to database:', user);
    await user.save();
    console.log('User created successfully:', user._id);
    // Generate JWT
    console.log('Generating JWT for user:', user._id);
    const token = sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('JWT generated:', token);

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('password').exists().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isActive) {
      return res.status(401).json({ message: 'Account is deactivated' });
    }

    // Generate JWT
    const token = sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Get current user
router.get('/me', auth, (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      createdAt: req.user.createdAt
    }
  });
});

export default router;