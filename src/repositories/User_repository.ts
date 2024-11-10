import { IUserRepository } from '../interfaces/IUserRepository';
import { User, IUser } from '../models/User';


export class UserRepository implements IUserRepository {

    public async findByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email }).exec();
    }

    public async getAll(): Promise<IUser[]> {
        return await User.find().exec();
    }

    public async findById(id: string): Promise<IUser | null> {
        return await User.findById(id).exec();
    }

    public async findByUsername(username: string): Promise<IUser | null> {
        return await User.findOne({ username }).exec();
    }

    public async findByRole(role: string): Promise<IUser[] | null> {
        return await User.find({ role }).exec();
    }

    async add(user: IUser): Promise<IUser> {
        const newUser = new User(user);
        return await newUser.save();
    }

    async update(id:string,user: IUser): Promise<IUser | null> {
        return await User.findByIdAndUpdate(id, user, { new: true }).exec();
    }

    async delete(id: string): Promise<void> {
        await User.findByIdAndDelete(id).exec();
    }
}