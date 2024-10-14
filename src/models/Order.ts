import { Schema, model, Document } from 'mongoose';

export interface IOrder extends Document {
  client: string;
  product: string;
  quantity: number;
  dueDate: string;
  status: string;
  progress: { [key: string]: { completed: number } };
}

const OrderSchema = new Schema<IOrder>({
  client: { type: String, required: true },
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  dueDate: { type: String, required: true },
  status: { type: String, required: true },
  progress: { 
    type: Map, 
    of: new Schema({
      completed: { type: Number, required: true }
    }), 
    required: true 
  },
});

export const Order = model<IOrder>('Order', OrderSchema);