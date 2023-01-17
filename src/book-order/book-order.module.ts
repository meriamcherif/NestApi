import { Module } from '@nestjs/common';
import { BookOrderService } from './book-order.service';
import { BookOrderController } from './book-order.controller';

@Module({
  controllers: [BookOrderController],
  providers: [BookOrderService]
})
export class BookOrderModule {}
