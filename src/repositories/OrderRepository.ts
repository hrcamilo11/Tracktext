import { IOrderRepository } from '../interfaces/IOrderRepository';
import { Order, IOrder } from '../models/Order';

export class OrderRepository implements IOrderRepository {
  async getAll(): Promise<IOrder[]> {
    return await Order.find().exec();
  }

  async findById(id: string): Promise<IOrder | null> {
    return await Order.findById(id).exec();
  }

  async add(order: IOrder): Promise<IOrder> {
    const newOrder = new Order(order);
    return await newOrder.save();
  }

  async update(order: IOrder): Promise<IOrder | null> {
    return await Order.findByIdAndUpdate(order._id, order, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await Order.findByIdAndDelete(id).exec();
  }
}