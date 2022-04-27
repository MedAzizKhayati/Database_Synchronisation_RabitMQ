import { Module } from '@nestjs/common';
import { ProductSalesService } from './product_sales.service';
import { ProductSalesController } from './product_sales.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSale, ProductSaleSchema } from './schemas/product_sale.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProductSale.name,
        schema: ProductSaleSchema
      }
    ]),
    ClientsModule.register([
      {
        name: 'PRODUCT_SALES_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'product_sales',
          queueOptions: {
            durable: true,
          },
        }
      }
    ])
  ],
  controllers: [ProductSalesController],
  providers: [ProductSalesService]
})
export class ProductSalesModule { }
