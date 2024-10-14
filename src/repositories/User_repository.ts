import { IUserRepository } from '../interfaces/IUserRepository.ts';
import { User, IUser } from '../models/User.ts';
import { Document, Types } from 'mongoose';

export class UserRepository implements IUserRepository {

    public async getAll(): Promise<IUser[]> {
        return await User.find().exec();
    }

    public async findById(id: string): Promise<IUser | null> {
        return await User.findById(id).exec();
    }

    public async findByUsername(username: string): Promise<IUser | null> {
        return await User.findOne({ username }).exec();
    }

    async add(user: IUser): Promise<IUser> {
        const newUser = new User(user);
        return await newUser.save();
    }

    async update(user: IUser): Promise<IUser | null> {
        return await User.findByIdAndUpdate(user._id, user, { new: true }).exec();
    }

    async delete(id: string): Promise<void> {
        await User.findByIdAndDelete(id).exec();
    }
}