import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService.ts';
import { User } from '../models/User.ts';

const authService = new AuthService({
  findByUsername: async (username: string) => User.findOne({ username }),
  createUser: async (userData: any) => new User(userData).save(),
});

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const token = await authService.login(username, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const register = async (req: Request, res: Response) => {
  const { username, password, email, phone, role } = req.body;
  try {
    const user = await authService.register(username, password, email, phone, role);
    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};