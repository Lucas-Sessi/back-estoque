import { Test, TestingModule } from '@nestjs/testing';
import { PaidProductsService } from '../paid-products.service';

describe('PaidProductsService', () => {
  let service: PaidProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaidProductsService],
    }).compile();

    service = module.get<PaidProductsService>(PaidProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
