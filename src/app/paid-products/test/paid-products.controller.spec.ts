import { Test, TestingModule } from '@nestjs/testing';
import { PaidProductsController } from '../paid-products.controller';
import { PaidProductsService } from '../paid-products.service';

describe('PaidProductsController', () => {
  let controller: PaidProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaidProductsController],
      providers: [PaidProductsService],
    }).compile();

    controller = module.get<PaidProductsController>(PaidProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
