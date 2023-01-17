import { PartialType } from '@nestjs/swagger';
import { CreateBookOrderDto } from './create-book-order.dto';

export class UpdateBookOrderDto extends PartialType(CreateBookOrderDto) {}
