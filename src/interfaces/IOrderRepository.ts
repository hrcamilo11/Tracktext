import { IOrder } from '../models/Order';

export interface IOrderRepository {
  getAll(): Promise<IOrder[]>;
  findById(id: string): Promise<IOrder | null>;
  add(order: IOrder): Promise<IOrder>;
  update(order: IOrder): Promise<IOrder | null>;
  delete(id: string): Promise<void>;
}