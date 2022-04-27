import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductSaleDto } from './dto/create-product_sale.dto';
import { UpdateProductSaleDto } from './dto/update-product_sale.dto';
import { ProductSale, ProductSaleDocument } from './schemas/product_sale.schema';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductSalesService {
  constructor(
    @InjectModel(ProductSale.name) private productSaleModel: Model<ProductSaleDocument>,
    @Inject('PRODUCT_SALES_SERVICE') private readonly client: ClientProxy,
  ) { }
  
  async onApplicationBootstrap() {
    await this.client.connect();
  }

  async create(createProductSaleDto: CreateProductSaleDto) {
    const createdProductSale = new this.productSaleModel(createProductSaleDto);
    const productSale = await createdProductSale.save();
    this.client.emit('product_sales', {
      branchOffice: process.env.DATABASE_NAME,
      ...createProductSaleDto
    }).subscribe(
      () => {
        console.log('ProductSale sent to queue', process.env.DATABASE_NAME);
      }
    );
    return productSale;
  }

  findAll(): Promise<ProductSale[]> {
    return this.productSaleModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} productSale`;
  }

  update(id: number, updateProductSaleDto: UpdateProductSaleDto) {
    return `This action updates a #${id} productSale`;
  }

  remove(id?: number) {
    if(!id)
      return this.productSaleModel.deleteMany({}).exec();
    return this.productSaleModel.findByIdAndRemove(id).exec();
  }
}
