import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from "class-validator";

export class UpdateShoppingCardDto {
    @ApiProperty()
    @IsNotEmpty()
    booksId: number[];
}
