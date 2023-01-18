import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from "./entities/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        if ((await this.search({username: createUserDto.username})).length > 0) {
            throw new BadRequestException(`User with username ${createUserDto.username} already exists`);
        }
        if ((await this.search({username: createUserDto.email})).length > 0) {
            throw new BadRequestException(`User with email ${createUserDto.email} already exists`);
        }

        const user = new User();
        user.username = createUserDto.username;
        user.email = createUserDto.email;
        user.password = createUserDto.password;
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;

        return await this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findById(id: number): Promise<User> {
        const user = (await this.userRepository.find({where: {id: id}}))[0];
        if (user == null) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }


    async search(options: { username?: string, firstName?: string; lastName?: string; email?: string }): Promise<User[]> {
        const queryBuilder = this.userRepository.createQueryBuilder('user');
        if (options.username) {
            queryBuilder.andWhere('user.username LIKE :username', {username: `%${options.username}%`});
        }
        if (options.firstName) {
            queryBuilder.andWhere('user.firstName LIKE :firstName', {firstName: `%${options.firstName}%`});
        }
        if (options.lastName) {
            queryBuilder.andWhere('user.lastName LIKE :lastName', {lastName: `%${options.lastName}%`});
        }
        if (options.email) {
            queryBuilder.andWhere('user.email LIKE :email', {email: `%${options.email}%`});
        }
        return queryBuilder.getMany();
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findById(id);
        if (updateUserDto.email) {
            user.email = updateUserDto.email;
        }
        if (updateUserDto.password) {
            user.password = updateUserDto.password;
        }
        if (updateUserDto.firstName) {
            user.firstName = updateUserDto.firstName;
        }
        if (updateUserDto.lastName) {
            user.lastName = updateUserDto.lastName;
        }
        await this.userRepository.save(user);
        return await this.findById(id);
    }

    async remove(id: number): Promise<User> {
        const user = await this.findById(id);
        await this.userRepository.softRemove(user);
        return user;
    }
}
