import { IUser } from '../models/User';

export interface IAuthRepository {
  findByUsername(username: string): Promise<IUser | null>;
  createUser(user: IUser): Promise<IUser>;
  findById(id: string): Promise<IUser | null>;
}