import { INotificationRepository } from '../interfaces/INotificationRepository.ts';
import { Notification, INotification } from '../models/Notification.ts';

export class NotificationRepository implements INotificationRepository {
  async getAll(): Promise<INotification[]> {
    return await Notification.find().exec();
  }

  async findById(id: string): Promise<INotification | null> {
    return await Notification.findById(id).exec();
  }

  async add(notification: INotification): Promise<INotification> {
    const newNotification = new Notification(notification);
    return await newNotification.save();
  }

  async update(notification: INotification): Promise<INotification | null> {
    return await Notification.findByIdAndUpdate(notification._id, notification, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await Notification.findByIdAndDelete(id).exec();
  }
}