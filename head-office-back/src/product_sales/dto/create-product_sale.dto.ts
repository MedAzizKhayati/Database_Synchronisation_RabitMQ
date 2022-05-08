import { IsNotEmpty } from 'class-validator';
export class CreateProductSaleDto {
    @IsNotEmpty()
    id: string;
    date: Date;
    region: string;
    product: string;
    quanity: number;
    cost: number;
    amount: number;
    tax: number;
    total: number;
    branchOffice: string;
}
