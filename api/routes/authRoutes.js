import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  
  const emailInput = (email || '').trim().toLowerCase();
  const adminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: 'Authentication service not configured' });
  }

  if (adminEmail && adminPassword && emailInput === adminEmail && password === adminPassword) {
    const token = jwt.sign({ email: emailInput }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.json({ token });
  }
  
  res.status(401).json({ message: 'Invalid credentials' });
});

export default router;
