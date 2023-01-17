import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber} from "class-validator";
import {CreateShoppingCardDto} from "../../shopping-card/dto/create-shopping-card.dto";

export class NewBookOrderDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    bookId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}
