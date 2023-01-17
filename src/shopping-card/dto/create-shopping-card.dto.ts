import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber} from "class-validator";
import {CreateBookOrderDto} from "../../book-order/dto/create-book-order.dto";

export class CreateShoppingCardDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @ApiProperty()
    @IsNotEmpty()
    orders: CreateBookOrderDto[];
}
