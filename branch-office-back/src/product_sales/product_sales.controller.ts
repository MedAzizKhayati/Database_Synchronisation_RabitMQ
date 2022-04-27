import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductSalesService } from './product_sales.service';
import { CreateProductSaleDto } from './dto/create-product_sale.dto';
import { UpdateProductSaleDto } from './dto/update-product_sale.dto';

@Controller('product-sales')
export class ProductSalesController {
  constructor(private readonly productSalesService: ProductSalesService) {}

  @Post()
  create(@Body() createProductSaleDto: CreateProductSaleDto) {
    return this.productSalesService.create(createProductSaleDto);
  }

  @Get()
  findAll() {
    return this.productSalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productSalesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductSaleDto: UpdateProductSaleDto) {
    return this.productSalesService.update(+id, updateProductSaleDto);
  }

  @Delete(':id?')
  remove(@Param('id') id: string) {
    return this.productSalesService.remove(+id);
  }
}
