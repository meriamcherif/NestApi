import { PartialType } from '@nestjs/swagger';
import { CreateShoppingCardDto } from './create-shopping-card.dto';

export class UpdateShoppingCardDto extends PartialType(CreateShoppingCardDto) {}
