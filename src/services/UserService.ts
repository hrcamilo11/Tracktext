import { IUserRepository } from "../interfaces/IUserRepository";

export class UserService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    };

    async getUsersByRole(role: string) {
        if (role === 'admin' || role === 'employee' || role === 'client') {
            return await this.userRepository.findByRole(role);
        } else {
            throw new Error('Usuario no encontrado');
        };

    }
    async getUserById(id: string) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return this.userRepository.findById(id);

    }



    async getUserByUsername(username: string) {
        const user = await this.userRepository.findByUsername(username);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
    }
    async getAllUsers() {
        try {
            return await this.userRepository.getAll();
        } catch (error) {
            throw new Error('Error al obtener los usuarios');
        }
    }
    async createUser(user: any) {

        const existingUserByUsername = await this.userRepository.findByUsername(user.username);
        if (existingUserByUsername) {
            throw new Error('El nombre de usuario ya está en uso');
        }

        const existingUserByEmail = await this.userRepository.findByEmail(user.email);
        if (existingUserByEmail) {
            throw new Error('El correo electrónico ya está en uso');
        }
        return await this.userRepository.add(user);
    }

    async deleteUser(id: string) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return await this.userRepository.delete(id);
    }

    async updateUser(id: string, user: any) {
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            throw new Error('Usuario no encontrado');
        }
        return await this.userRepository.update(id, user);
    }
}