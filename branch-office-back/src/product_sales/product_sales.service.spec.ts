import { Test, TestingModule } from '@nestjs/testing';
import { ProductSalesService } from './product_sales.service';

describe('ProductSalesService', () => {
  let service: ProductSalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductSalesService],
    }).compile();

    service = module.get<ProductSalesService>(ProductSalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
