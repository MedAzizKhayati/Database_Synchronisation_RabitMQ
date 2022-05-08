import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductSaleDto } from './dto/create-product_sale.dto';
import { UpdateProductSaleDto } from './dto/update-product_sale.dto';
import { ProductSale, ProductSaleDocument } from './schemas/product_sale.schema';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductSalesService {
  private connected = false;
  constructor(
    @InjectModel(ProductSale.name) private productSaleModel: Model<ProductSaleDocument>,
    @Inject('PRODUCT_SALES_SERVICE') private readonly client: ClientProxy,
  ) { }

  async onApplicationBootstrap() {
    try {
      await this.client.connect();
      this.connected = true;
    } catch (error) {
      console.error('Cannot connect to queue');
    }
  }

  async synchronizeById(id: string) {
    const productSale = await this.productSaleModel.findById(id).exec();
    if (!productSale || productSale.synchronized) return { synchronized: false };
    try {
      await this.synchronize_(productSale);
    } catch (error) {

    }
    return { synchronized: true };
  }

  async synchronize() {
    const productSales = await this.productSaleModel.find({ syncrhonized: false || undefined }).exec();
    productSales.forEach(async (productSale) => {
      try {
        await this.synchronize_(productSale);
      } catch (error) {

      }
    })
    return { synchronized: productSales.length };
  }
  async synchronize_(productSale: any) {
    if (!this.connected) await this.client.connect();
    this.connected = true;
    this.client.emit('product_sales', {
      branchOffice: process.env.DATABASE_NAME,
      ...productSale._doc,
      id: productSale._id,
    }).subscribe(
      async () => {
        productSale.synchronized = true;
        await productSale.save();
        console.log('ProductSale sent to queue', process.env.DATABASE_NAME);
      }
    );
  }
  async create(createProductSaleDto: CreateProductSaleDto) {
    const createdProductSale = new this.productSaleModel(createProductSaleDto);
    const productSale = await createdProductSale.save();
    return productSale;
  }

  findAll(): Promise<ProductSale[]> {
    return this.productSaleModel.find().exec();
  }

  findOne(id: string) {
    return this.productSaleModel.findById(id).exec();
  }

  update(id: string, updateProductSaleDto: UpdateProductSaleDto) {    
    return this.productSaleModel
      .findByIdAndUpdate(id, { ...updateProductSaleDto, synchronized: false }, { new: true })
      .exec();
  }

  remove(id?: string) {
    if (!id)
      return this.productSaleModel.deleteMany({}).exec();
    return this.productSaleModel.findByIdAndRemove(id).exec();
  }
}
