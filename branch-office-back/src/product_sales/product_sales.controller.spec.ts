import { Test, TestingModule } from '@nestjs/testing';
import { ProductSalesController } from './product_sales.controller';
import { ProductSalesService } from './product_sales.service';

describe('ProductSalesController', () => {
  let controller: ProductSalesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductSalesController],
      providers: [ProductSalesService],
    }).compile();

    controller = module.get<ProductSalesController>(ProductSalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
