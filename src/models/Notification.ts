import { Schema, model, Document } from 'mongoose';

export interface INotification extends Document {
  _id: string;
  type: 'password_change' | 'order_delayed' | 'unassigned_order';
  message: string;
  createdAt: Date;
  read: boolean;
}

const NotificationSchema = new Schema<INotification>({
  type: { type: String, required: true, enum: ['password_change', 'order_delayed', 'unassigned_order'] },
  message: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  read: { type: Boolean, required: true, default: false },
});

export const Notification = model<INotification>('Notification', NotificationSchema);