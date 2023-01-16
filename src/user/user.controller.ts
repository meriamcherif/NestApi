import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {User} from "./entities/user.entity";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @ApiBearerAuth()
    @ApiCreatedResponse({description: 'The user has been successfully created.', type: User})
    @ApiOkResponse({description: 'User already exist.', type: User})
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    @ApiBearerAuth()
    @ApiOkResponse({description: 'The user has been successfully retrieved.', type: User})
    findById(@Param('id') id: string) {
        return this.userService.findById(+id);
    }

    @Get(':username')
    @ApiBearerAuth()
    @ApiOkResponse({description: 'The user has been successfully retrieved.', type: User})
    findByUsername(@Param('username') username: string) {
        return this.userService.findByUsername(username);
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
