import { Module } from '@nestjs/common';
import { ShoppingCardService } from './shopping-card.service';
import { ShoppingCardController } from './shopping-card.controller';

@Module({
  controllers: [ShoppingCardController],
  providers: [ShoppingCardService]
})
export class ShoppingCardModule {}
