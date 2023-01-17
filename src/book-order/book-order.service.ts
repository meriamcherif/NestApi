import { Injectable } from '@nestjs/common';
import { CreateBookOrderDto } from './dto/create-book-order.dto';
import { UpdateBookOrderDto } from './dto/update-book-order.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {ShoppingCard} from "../shopping-card/entities/shopping-card.entity";
import {Repository} from "typeorm";
import {UserService} from "../user/user.service";
import {BookOrder} from "./entities/book-order.entity";
import {BookService} from "../book/book.service";

@Injectable()
export class BookOrderService {
  constructor(        @InjectRepository(BookOrder)
                      private readonly bookOrderRepository: Repository<BookOrder>,
                      private readonly bookService: BookService,
                      ) {
  }
  async create(createBookOrderDto: CreateBookOrderDto): Promise<BookOrder> {
    const bookOrder = new BookOrder();
    bookOrder.book = await this.bookService.findById(createBookOrderDto.bookId);
    bookOrder.quantity = createBookOrderDto.quantity;
    return await this.bookOrderRepository.save(bookOrder);
  }

  findAll() {
    return `This action returns all bookCommand`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookCommand`;
  }

  update(id: number, updateBookOrderDto: UpdateBookOrderDto) {
    return `This action updates a #${id} bookCommand`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookCommand`;
  }
}
