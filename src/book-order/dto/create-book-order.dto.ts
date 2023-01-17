import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber} from "class-validator";

export class CreateBookOrderDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    bookId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}
