import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingCardController } from './shopping-card.controller';
import { ShoppingCardService } from './shopping-card.service';

describe('ShoppingCardController', () => {
  let controller: ShoppingCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingCardController],
      providers: [ShoppingCardService],
    }).compile();

    controller = module.get<ShoppingCardController>(ShoppingCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
