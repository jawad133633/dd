import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export async function requireAuth(req, res, next) {
  try {
    const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
    if (!token) return res.status(401).json({ message: 'Please sign in' });
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-only-change-this-secret');
    const user = await User.findById(payload.sub).select('-passwordHash');
    if (!user?.active) return res.status(401).json({ message: 'Account is inactive' });
    req.user = user;
    next();
  } catch { res.status(401).json({ message: 'Session expired. Please sign in again.' }); }
}

export const allowRoles = (...roles) => (req, res, next) => roles.includes(req.user?.role) ? next() : res.status(403).json({ message: 'You do not have access to this action' });
