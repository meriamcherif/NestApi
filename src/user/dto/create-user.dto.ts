import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'johndoe'})
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({example: 'John'})
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty({example: 'Doe'})
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @ApiProperty({example: 'john.doe@example.com'})
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}
