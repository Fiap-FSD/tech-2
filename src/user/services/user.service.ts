import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async createUser(createUserDto: CreateUserDto) {
        const { email,name,password,role } = createUserDto;

        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new ConflictException('Este email já está em uso!');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        return this.userRepository.create({
            email,
            name,
            password: hashedPassword,
            role,
        });
    }

    async findByEmail(email: string) {
        return this.userRepository.findByEmail(email);
    }

}
