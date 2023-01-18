import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseInterceptors
} from '@nestjs/common';
import {ShoppingCardService} from './shopping-card.service';
import {CreateShoppingCardDto} from './dto/create-shopping-card.dto';
import {UpdateShoppingCardDto} from './dto/update-shopping-card.dto';
import {ApiTags} from "@nestjs/swagger";

@Controller('shopping-card')
@ApiTags('shopping-cards')
export class ShoppingCardController {
    constructor(private readonly shoppingCardService: ShoppingCardService) {
    }

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    create(@Body() createShoppingCardDto: CreateShoppingCardDto) {
        return this.shoppingCardService.create(createShoppingCardDto);
    }

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    findAll() {
        return this.shoppingCardService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.shoppingCardService.findById(+id);
    }

    @Patch(':id/add-book')
    @UseInterceptors(ClassSerializerInterceptor)
    addBooks(@Param('id') id: string, @Body() updateShoppingCardDto: UpdateShoppingCardDto) {
        return this.shoppingCardService.addBooksToShoppingCard(+id, updateShoppingCardDto.booksId);
    }

    @Patch(':id/order')
    @UseInterceptors(ClassSerializerInterceptor)
    async order(@Param('id') id: string) {
        return await this.shoppingCardService.order(+id);
    }

    @Patch(':id/cancel')
    @UseInterceptors(ClassSerializerInterceptor)
    cancel(@Param('id') id: string) {
        return this.shoppingCardService.cancel(+id);
    }

    @Delete(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    async remove(@Param('id') id: string) {
        return await this.shoppingCardService.remove(+id);
    }
}
