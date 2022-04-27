import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductSale {
    @PrimaryGeneratedColumn('uuid')
    id: number;

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

    @Column()
    branchOffice: string;
}