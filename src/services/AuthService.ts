import { IAuthRepository } from '../interfaces/IAuthRepository.ts';
import { IUser, User } from '../models/User.ts';
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

export class AuthService {
  private authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

    async login(username: string, password: string): Promise<string | null> {
    const user = await this.authRepository.findByUsername(username);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Contraseña incorrecta');
    }

    const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, 'clavesita', { expiresIn: '1h' });
    return token;
  }

  async register( username:string, password:string, email:string, phone:string, role:'admin' | 'employee' | 'client'): Promise<IUser> {
    if (!username || !password || !email || !phone) {
        throw new Error('No se permiten campos nulos');
      }
  
      // Verificar si el usuario ya existe antes de registrarlo
      const existingUser = await this.authRepository.findByUsername(username);
      if (existingUser) {
        throw new Error('El usuario ya existe');
      }
  
      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Crear una instancia del modelo User de Mongoose
      const user = new User({
        username,
        password: hashedPassword,
        email,
        phone,
        role,
      });
  
    return await this.authRepository.createUser(user);
  }
}
