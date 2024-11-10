import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { UserRepository } from '../repositories/User_repository';
import { validateToken } from './authController';
import { AuthRepository } from '../repositories/AuthRepository';
import { AuthService } from '../services/AuthService';

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await userService.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error });
    }
}
export const getUserByUsername = async (req: Request, res: Response) => {
    try {
        const username = req.body.username;
        const user = await userService.getUserByUsername(username);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user by username', error });
    }
}
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const user = await authService.validateToken(req.body.token);
        if (user.role !== 'admin' && user.role !== 'employee' && user.role !== 'client') {
            res.status(500).json({ message: 'usuario no autorizado' })
            throw new Error('Unauthorized');
        }
        else {
        const users = await userService.getAllUsers();
        res.status(200).json(users);}
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
}
export const getUsersByRole = async (req: Request, res: Response) => {
    try {
        const user = await authService.validateToken(req.body.token);
        if (user.role !== 'admin') {
            res.status(500).json({ message: 'usuario no autorizado' })
            throw new Error('Unauthorized');
        }
        const role = req.body.role;
        const users = await userService.getUsersByRole(role);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users by role', error });
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        const newUser = await userService.createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        const updatedUser = await userService.updateUser(userId, userData);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.body.id;
        await userService.deleteUser(userId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
}
