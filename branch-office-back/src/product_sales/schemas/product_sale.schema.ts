import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductSaleDocument = ProductSale & Document;

@Schema()
export class ProductSale {
    @Prop()
    date: Date;

    @Prop()
    region: string;

    @Prop()
    product: string;

    @Prop()
    quanity: number;

    @Prop()
    cost: number;

    @Prop()
    amount: number;

    @Prop()
    tax: number;

    @Prop()
    total: number;
}

export const ProductSaleSchema = SchemaFactory.createForClass(ProductSale);