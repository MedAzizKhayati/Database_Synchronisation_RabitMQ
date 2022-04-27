import { Module } from '@nestjs/common';
import { ProductSalesService } from './product_sales.service';
import { ProductSalesController } from './product_sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSale } from './entities/product_sale.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductSale]),
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
export class ProductSalesModule {}
