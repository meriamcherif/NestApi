import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber} from "class-validator";
import {NewBookOrderDto} from "./new-book-order.dto";

export class CreateBookOrderDto extends NewBookOrderDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    shoppingCardId: number;
}
