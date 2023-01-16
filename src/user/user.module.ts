import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {AuthorModule} from "../author/author.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";

@Module({
    imports: [AuthorModule, TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {
}
