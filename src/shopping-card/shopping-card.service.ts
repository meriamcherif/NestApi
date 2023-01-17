import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateShoppingCardDto} from './dto/create-shopping-card.dto';
import {UpdateShoppingCardDto} from './dto/update-shopping-card.dto';
import {ShoppingCard} from "./entities/shopping-card.entity";
import {Repository} from "typeorm";
import {UserService} from "../user/user.service";
import {InjectRepository} from "@nestjs/typeorm";
import {BookOrderService} from "../book-order/book-order.service";

@Injectable()
export class ShoppingCardService {

    constructor(
        @InjectRepository(ShoppingCard)
        private readonly shoppingCardRepository: Repository<ShoppingCard>,
        private readonly userService: UserService,
        private readonly bookOrderService: BookOrderService,
    ) {
    }

    async create(createShoppingCardDto: CreateShoppingCardDto): Promise<ShoppingCard> {
        const shoppingCard = new ShoppingCard();
        try {
            const user = await this.userService.findById(createShoppingCardDto.userId);
            shoppingCard.user = user;
        } catch (e) {
            throw new NotFoundException(`User with id ${createShoppingCardDto.userId} not found`);
        }

        for (const newBookOrder of createShoppingCardDto.orders) {
            try {
                await this.bookOrderService.create({...newBookOrder, shoppingCardId: shoppingCard.id});
            } catch (e) {
                throw new Error(e.message);
            }
        }
        return await this.shoppingCardRepository.save(shoppingCard);
    }

    findAll() {
        return `This action returns all shoppingCard`;
    }

    findOne(id
                :
                number
    ) {
        return `This action returns a #${id} shoppingCard`;
    }

    update(id
               :
               number, updateShoppingCardDto
               :
               UpdateShoppingCardDto
    ) {
        return `This action updates a #${id} shoppingCard`;
    }

    remove(id
               :
               number
    ) {
        return `This action removes a #${id} shoppingCard`;
    }
}
