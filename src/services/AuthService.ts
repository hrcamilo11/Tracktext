import { IAuthRepository } from '../interfaces/IAuthRepository';
import { IUser, User } from '../models/User';
import bcrypt from 'bcryptjs';

import crypto from 'crypto-js';


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

    const SECRET_KEY = 'clavecita';
    const decryptedBytes = crypto.AES.decrypt(user.password, SECRET_KEY);
    const decryptedPassword = decryptedBytes.toString(crypto.enc.Utf8);
    console.log(decryptedPassword);
    const isPasswordValid = decryptedPassword === password;
    if (!isPasswordValid) {
      throw new Error('Contraseña incorrecta');
    }

    const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, 'clavesita', { expiresIn: '1h' });
    return token;
  }

  async register( username:string, password:string, email:string, phone:string, role:'admin' | 'employee' | 'client'): Promise<IUser> {
    const SECRET_KEY = process.env.SECRET_KEY || 'clavecita'; // Asegúrate de configurar una clave en un entorno seguro
    if (!username || !password || !email || !phone) {
      throw new Error('No se permiten campos nulos');
    }
  
    // Verificar si el usuario ya existe antes de registrarlo
    const existingUser = await this.authRepository.findByUsername(username);
    if (existingUser) {
      throw new Error('El usuario ya existe');
    }
  
    // Encriptar la contraseña
    const encryptedPassword = crypto.AES.encrypt(password, SECRET_KEY).toString();
  
    // Crear una instancia del modelo User de Mongoose
    const user = new User({
      username,
      password: encryptedPassword,
      email,
      phone,
      role,
    });
      
  
    return await this.authRepository.createUser(user);
  }
  async validateToken(token: string) {
    try {
      const decoded = jwt.verify(token, 'clavesita') as { id: string };
      const user = await this.authRepository.findById(decoded.id);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      return user;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error('Token inválido');
  }
}
  
}
