import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findOneByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async findOneById(id: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id } });
    }

    // Need to explicitly select password for login validation
    async findOneByEmailWithPassword(email: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password', 'role', 'fullName']
        });
    }

    async create(userData: Partial<User>): Promise<User> {
        console.log('[UsersService] Creating user:', userData.email);
        try {
            const newUser = this.usersRepository.create(userData);
            const savedUser = await this.usersRepository.save(newUser);
            console.log('[UsersService] User created successfully:', savedUser.id);
            return savedUser;
        } catch (error) {
            console.error('[UsersService] Failed to create user:', error);
            throw error;
        }
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find({
            select: ['id', 'email', 'fullName', 'role', 'createdAt']
        });
    }

    async updateProfile(id: string, updateData: Partial<User>): Promise<User | null> {
        console.log('[UsersService] Updating profile for user:', id);
        try {
            await this.usersRepository.update(id, updateData);
            const updated = await this.usersRepository.findOne({ where: { id } });
            console.log('[UsersService] Profile updated successfully');
            return updated;
        } catch (error) {
            console.error('[UsersService] Failed to update profile:', error);
            throw error;
        }
    }
}
