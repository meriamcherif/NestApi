import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags} from "@nestjs/swagger";
import {User} from "./entities/user.entity";

@Controller('user')
@ApiTags('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @ApiCreatedResponse({description: 'The user has been successfully created.', type: User})
    @ApiOkResponse({description: 'User already exist.', type: User})
    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        const user = (await this.userService.search({username: createUserDto.username}))[0];
        console.log(user);
        if (user) {
            return user;
        }
        return await this.userService.create(createUserDto);
    }

    @ApiBearerAuth()
    @ApiCreatedResponse({description: 'The users has been successfully retrieved.', type: User})
    @ApiOkResponse({description: 'User already exist.', type: User})
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get('search')
    @ApiOkResponse({description: 'The user has been successfully retrieved.', type: [User]})
    @ApiQuery({name: 'username', required: false})
    @ApiQuery({name: 'firstName', required: false})
    @ApiQuery({name: 'lastName', required: false})
    @ApiQuery({name: 'email', required: false})
    async search(
        @Query('username') username?: string,
        @Query('firstName') firstName?: string,
        @Query('lastName') lastName?: string,
        @Query('email') email?: string,
    ): Promise<User[]> {
        return this.userService.search({username, firstName, lastName, email});
    }

    @Get(':id')
    @ApiBearerAuth()
    @ApiOkResponse({description: 'The user has been successfully retrieved.', type: User})
    findById(@Param('id') id: string) {
        return this.userService.findById(+id);
    }


    @Patch(':id')
    @ApiBearerAuth()
    @ApiOkResponse({description: 'The user has been successfully updated.', type: User})
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
