import { Test, TestingModule } from '@nestjs/testing';
import { BookOrderController } from './book-order.controller';
import { BookOrderService } from './book-order.service';

describe('BookCommandController', () => {
  let controller: BookOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookOrderController],
      providers: [BookOrderService],
    }).compile();

    controller = module.get<BookOrderController>(BookOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
