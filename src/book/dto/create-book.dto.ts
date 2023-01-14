import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateBookDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    ISBN: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    publicationDate: Date;


    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    authorId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number;
}