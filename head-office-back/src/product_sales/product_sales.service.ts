import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductSaleDto } from './dto/create-product_sale.dto';
import { UpdateProductSaleDto } from './dto/update-product_sale.dto';
import { ProductSale } from './entities/product_sale.entity';

@Injectable()
export class ProductSalesService {
  constructor(
    @InjectRepository(ProductSale)
    private readonly productSaleRepository: Repository<ProductSale>,
  ) { }

  async syncrhonize(updateProductSaleDto: UpdateProductSaleDto) {
    const sale = await this.productSaleRepository.findOne({
      id: updateProductSaleDto.id,
      branchOffice: updateProductSaleDto.branchOffice
    });
    if (sale) return this.update(sale.id, updateProductSaleDto);
    return this.create(updateProductSaleDto);
  }

  create(createProductSaleDto: UpdateProductSaleDto) {
    const productSale = this.productSaleRepository.create(createProductSaleDto);
    return this.productSaleRepository.save(productSale);
  }

  findAll() {
    return this.productSaleRepository.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} productSale`;
  }

  update(id: string, updateProductSaleDto: UpdateProductSaleDto) {
    return `This action updates a #${id} productSale`;
  }

  remove(id?: string) {
    if (!id)
      return this.productSaleRepository.delete({});
    return this.productSaleRepository.delete(id);
  }
}
