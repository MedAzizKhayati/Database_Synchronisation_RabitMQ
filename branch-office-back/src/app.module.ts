import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSalesModule } from './product_sales/product_sales.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb+srv://admin:admin@cluster0.9qemw.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`),
    ProductSalesModule,
  ],
})
export class AppModule {}
