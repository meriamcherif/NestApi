import { Injectable } from '@nestjs/common';
import { CreateShoppingCardDto } from './dto/create-shopping-card.dto';
import { UpdateShoppingCardDto } from './dto/update-shopping-card.dto';

@Injectable()
export class ShoppingCardService {
  create(createShoppingCardDto: CreateShoppingCardDto) {
    return 'This action adds a new shoppingCard';
  }

  findAll() {
    return `This action returns all shoppingCard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shoppingCard`;
  }

  update(id: number, updateShoppingCardDto: UpdateShoppingCardDto) {
    return `This action updates a #${id} shoppingCard`;
  }

  remove(id: number) {
    return `This action removes a #${id} shoppingCard`;
  }
}
