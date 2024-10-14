import { IUser } from '../models/User';

export interface IUserRepository {
    getAll(): Promise<IUser[]>;
    findById(id: string): Promise<IUser | null>;
    findByUsername(username: string): Promise<IUser | null>;
    add(user: IUser): Promise<IUser>;
    update(user: IUser): Promise<IUser | null>;
    delete(id: string): Promise<void>;
}