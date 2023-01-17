import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookOrderService } from './book-order.service';
import { CreateBookOrderDto } from './dto/create-book-order.dto';
import { UpdateBookOrderDto } from './dto/update-book-order.dto';

@Controller('book-order')
export class BookOrderController {
  constructor(private readonly bookCommandService: BookOrderService) {}

  @Post()
  create(@Body() createBookCommandDto: CreateBookOrderDto) {
    return this.bookCommandService.create(createBookCommandDto);
  }

  @Get()
  findAll() {
    return this.bookCommandService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookCommandService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookCommandDto: UpdateBookOrderDto) {
    return this.bookCommandService.update(+id, updateBookCommandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookCommandService.remove(+id);
  }
}
