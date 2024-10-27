import { IUser } from '../models/User.ts';

export interface IAuthRepository {
  findByUsername(username: string): Promise<IUser | null>;
  createUser(user: IUser): Promise<IUser>;
  findById(id: string): Promise<IUser | null>;
}