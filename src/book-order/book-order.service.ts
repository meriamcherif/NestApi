import { Injectable } from '@nestjs/common';
import { CreateBookOrderDto } from './dto/create-book-order.dto';
import { UpdateBookOrderDto } from './dto/update-book-order.dto';

@Injectable()
export class BookOrderService {
  create(createBookCommandDto: CreateBookOrderDto) {
    return 'This action adds a new bookCommand';
  }

  findAll() {
    return `This action returns all bookCommand`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookCommand`;
  }

  update(id: number, updateBookCommandDto: UpdateBookOrderDto) {
    return `This action updates a #${id} bookCommand`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookCommand`;
  }
}
