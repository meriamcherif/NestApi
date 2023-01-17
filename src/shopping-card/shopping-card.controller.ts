import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShoppingCardService } from './shopping-card.service';
import { CreateShoppingCardDto } from './dto/create-shopping-card.dto';
import { UpdateShoppingCardDto } from './dto/update-shopping-card.dto';

@Controller('shopping-card')
export class ShoppingCardController {
  constructor(private readonly shoppingCardService: ShoppingCardService) {}

  @Post()
  create(@Body() createShoppingCardDto: CreateShoppingCardDto) {
    return this.shoppingCardService.create(createShoppingCardDto);
  }

  @Get()
  findAll() {
    return this.shoppingCardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shoppingCardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShoppingCardDto: UpdateShoppingCardDto) {
    return this.shoppingCardService.update(+id, updateShoppingCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shoppingCardService.remove(+id);
  }
}
