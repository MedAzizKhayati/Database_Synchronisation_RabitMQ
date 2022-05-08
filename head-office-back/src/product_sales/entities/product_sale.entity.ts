import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class ProductSale {
    @PrimaryColumn()
    id: string;

    @Column()
    date: Date;

    @Column()
    region: string;

    @Column()
    product: string;

    @Column()
    quanity: number;

    @Column()
    cost: number;

    @Column()
    amount: number;

    @Column()
    tax: number;

    @Column()
    total: number;
    
    @PrimaryColumn()
    branchOffice: string;
}