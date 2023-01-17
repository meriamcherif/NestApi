import {Module} from '@nestjs/common';
import {ShoppingCardService} from './shopping-card.service';
import {ShoppingCardController} from './shopping-card.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ShoppingCard} from "./entities/shopping-card.entity";
import {UserModule} from "../user/user.module";
import {BookOrderModule} from "../book-order/book-order.module";

@Module({
    imports: [TypeOrmModule.forFeature([ShoppingCard]),
    UserModule, BookOrderModule],
    controllers: [ShoppingCardController],
    providers: [ShoppingCardService],
    exports: [ShoppingCardService]
})
export class ShoppingCardModule {
}
