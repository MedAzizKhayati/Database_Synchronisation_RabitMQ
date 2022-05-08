import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateProductSaleDto } from './create-product_sale.dto';

export class UpdateProductSaleDto extends PartialType(CreateProductSaleDto) {
    @IsNotEmpty()
    id: string;
}
