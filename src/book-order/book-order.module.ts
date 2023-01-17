import {Module} from '@nestjs/common';
import {BookOrderService} from './book-order.service';
import {BookOrderController} from './book-order.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {BookOrder} from "./entities/book-order.entity";
import {BookModule} from "../book/book.module";

@Module({
    imports: [TypeOrmModule.forFeature([BookOrder]), BookModule],
    controllers: [BookOrderController],
    providers: [BookOrderService],
    exports: [BookOrderService]
})
export class BookOrderModule {
}
