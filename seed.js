import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from './models/index.js';

await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/clinic_pharmacy');
const username = process.argv[2] || 'admin'; const password = process.argv[3] || 'ChangeMe123!';
await User.updateOne({ username }, { $set: { name: 'Clinic Admin', username, role: 'admin', passwordHash: await bcrypt.hash(password, 12), active: true } }, { upsert: true });
console.log(`Admin ready. Username: ${username}. Change the password after first login.`);
await mongoose.disconnect();
