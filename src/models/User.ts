import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
  email: string;
  phone: number;
  role: 'admin' | 'employee' | 'client';
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true },
  role: { type: String, required: true, enum: ['admin', 'employee', 'client'] },
});

export const User = model<IUser>('User', UserSchema);
  