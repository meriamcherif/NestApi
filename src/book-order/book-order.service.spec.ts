import { Test, TestingModule } from '@nestjs/testing';
import { BookOrderService } from './book-order.service';

describe('BookCommandService', () => {
  let service: BookOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookOrderService],
    }).compile();

    service = module.get<BookOrderService>(BookOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
