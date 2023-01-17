import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber} from "class-validator";
import {NewBookOrderDto} from "../../book-order/dto/new-book-order.dto";
import {IsNewBookOrderDto} from "../../validators/is-new-book-order-dto.decorator";

export class CreateShoppingCardDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @ApiProperty()
    @IsNotEmpty()
    // @IsNewBookOrderDto()
    orders: NewBookOrderDto[];
}
