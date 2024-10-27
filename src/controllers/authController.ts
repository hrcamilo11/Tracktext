import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService.ts';
import { AuthRepository } from '../repositories/AuthRepository.ts';

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);


export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    
    const token = await authService.login(username, password);
    res.json({ token });

  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const register = async (req: Request, res: Response) => {
  const { username, password, email, phone, role } = req.body;
  console.log(username);
  console.log(password);
  console.log(email);
  console.log(phone); 
  console.log(role);
  console.log(req.body);
  try {
    const user = await authService.register(username, password, email, phone, role);
    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
  
};

export const validateToken = async (req: Request, res: Response) => {
  const token = req.body.token;
  try {
    const user = await authService.validateToken(token);
    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};