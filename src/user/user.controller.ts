import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { classToPlain } from 'class-transformer';
import { UserSubscribeDto } from './dto/subscribe-user.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: User,
  })
  @ApiOkResponse({ description: 'User already exist.', type: User })
  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = (
      await this.userService.search({ username: createUserDto.username })
    )[0];
    if (user) {
      return user;
    }
    return await this.userService.create(createUserDto);
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'The users has been successfully retrieved.',
    type: User,
  })
  @ApiOkResponse({ description: 'User already exist.', type: User })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('search')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({
    description: 'The user has been successfully retrieved.',
    type: [User],
  })
  @ApiQuery({ name: 'username', required: false })
  @ApiQuery({ name: 'firstName', required: false })
  @ApiQuery({ name: 'lastName', required: false })
  @ApiQuery({ name: 'email', required: false })
  async search(
    @Query('username') username?: string,
    @Query('firstName') firstName?: string,
    @Query('lastName') lastName?: string,
    @Query('email') email?: string,
  ): Promise<User[]> {
    return this.userService.search({ username, firstName, lastName, email });
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'The user has been successfully retrieved.',
    type: User,
  })
  findById(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'The user has been successfully updated.',
    type: User,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post()
  register(@Body() userData: UserSubscribeDto): Promise<Partial<User>> {
    return this.userService.register(userData);
  }

  @Post('login')
  login(@Body() credentials: LoginCredentialsDto) {
    return this.userService.login(credentials);
  }
}
