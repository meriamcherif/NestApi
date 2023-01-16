import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ApiBearerAuth, ApiOkResponse} from '@nestjs/swagger';
import {User} from "./entities/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }


    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.email = createUserDto.email;
        user.password = createUserDto.password;
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;
        return await this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    @ApiBearerAuth()
    @ApiOkResponse({description: 'The user has been successfully retrieved.', type: User})
    async findById(id: number): Promise<User> {
        return await this.userRepository.findOneBy({id: id});
    }

    @ApiBearerAuth()
    @ApiOkResponse({description: 'The user has been successfully retrieved.', type: User})
    async findByUsername(username: string): Promise<User> {
        return await this.userRepository.findOneBy({username: username});
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findById(id);
        user.email = updateUserDto.email;
        user.firstName = updateUserDto.firstName;
        user.lastName = updateUserDto.lastName;
        user.password = updateUserDto.password;
        return await this.userRepository.save(user);
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.softDelete(id);
    }
}
