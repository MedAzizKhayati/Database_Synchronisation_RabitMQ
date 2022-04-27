import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSalesModule } from './product_sales/product_sales.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'head_office',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
      keepConnectionAlive : true,
    }),
    ProductSalesModule,
  ],
})
export class AppModule { }
