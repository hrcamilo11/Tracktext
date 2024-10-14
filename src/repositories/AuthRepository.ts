import { IAuthRepository } from '../interfaces/IAuthRepository';
import { UserRepository } from './User_repository';
import { User, IUser } from '../models/User';

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
}