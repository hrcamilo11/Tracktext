import { IAuthRepository } from '../interfaces/IAuthRepository.ts';
import { UserRepository } from './User_repository.ts';
import { User, IUser } from '../models/User.ts';

export class AuthRepository implements IAuthRepository {
    private userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository();
      }
  async findByUsername(username: string): Promise<IUser | null> {
    return await this.userRepository.findByUsername(username);
  }

  async createUser(user: IUser): Promise<IUser> {
    const newUser = new User(user);
    return await this.userRepository.add(newUser);
  }
  async findById(id: string): Promise<IUser | null>{
    return await this.userRepository.findById(id);
  };
}