import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const userSchema = new Schema({ name: { type: String, required: true, trim: true }, email: { type: String, unique: true, sparse: true, lowercase: true, trim: true }, username: { type: String, unique: true, required: true, lowercase: true, trim: true }, passwordHash: { type: String, required: true }, passwordResetTokenHash: String, passwordResetExpiresAt: Date, role: { type: String, enum: ['admin', 'doctor', 'receptionist', 'pharmacist'], default: 'receptionist' }, active: { type: Boolean, default: true } }, { timestamps: true });
const patientSchema = new Schema({ name: { type: String, required: true, trim: true }, age: { type: Number, min: 0 }, gender: { type: String, enum: ['female', 'male', 'other'], default: 'other' }, phone: { type: String, trim: true }, address: String }, { timestamps: true });
const tokenSchema = new Schema({ patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true }, tokenNumber: { type: Number, required: true }, status: { type: String, enum: ['waiting', 'in-progress', 'done'], default: 'waiting' }, date: { type: Date, default: Date.now } }, { timestamps: true });
const visitSchema = new Schema({ patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true }, doctorId: { type: Schema.Types.ObjectId, ref: 'User' }, notes: String, diagnosis: String, date: { type: Date, default: Date.now } }, { timestamps: true });
const prescriptionSchema = new Schema({ visitId: { type: Schema.Types.ObjectId, ref: 'Visit', required: true }, medicines: [{ name: String, dosage: String, duration: String }], instructions: String, date: { type: Date, default: Date.now } }, { timestamps: true });
const billSchema = new Schema({ patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true }, visitId: { type: Schema.Types.ObjectId, ref: 'Visit' }, feeAmount: { type: Number, min: 0, required: true }, paymentMethod: { type: String, enum: ['cash', 'card', 'transfer'], default: 'cash' }, date: { type: Date, default: Date.now } }, { timestamps: true });
const stockSchema = new Schema({ medicineName: { type: String, required: true, trim: true }, batchNo: { type: String, required: true }, expiryDate: { type: Date, required: true }, quantity: { type: Number, min: 0, default: 0 }, reorderLevel: { type: Number, min: 0, default: 10 }, purchasePrice: { type: Number, min: 0, default: 0 }, salePrice: { type: Number, min: 0, default: 0 } }, { timestamps: true });
const stockTransactionSchema = new Schema({ stockId: { type: Schema.Types.ObjectId, ref: 'Stock', required: true }, type: { type: String, enum: ['in', 'out'], required: true }, quantity: { type: Number, min: 1, required: true }, reference: String, date: { type: Date, default: Date.now } }, { timestamps: true });

export const User = model('User', userSchema);
export const Patient = model('Patient', patientSchema);
export const Token = model('Token', tokenSchema);
export const Visit = model('Visit', visitSchema);
export const Prescription = model('Prescription', prescriptionSchema);
export const Bill = model('Bill', billSchema);
export const Stock = model('Stock', stockSchema);
export const StockTransaction = model('StockTransaction', stockTransactionSchema);
