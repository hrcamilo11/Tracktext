import { INotification } from '../models/Notification.ts';

export interface INotificationRepository {
  getAll(): Promise<INotification[]>;
  findById(id: string): Promise<INotification | null>;
  add(notification: INotification): Promise<INotification>;
  update(notification: INotification): Promise<INotification | null>;
  delete(id: string): Promise<void>;
}