/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from '../products/products.entity';
import { BaseEntity } from '../common/entities/base.entity';

@Entity('inventory')
export class Inventory extends BaseEntity {

  @OneToOne(() => Product, { eager: true })
  @JoinColumn()
  product: Product;

  @Column({ default: 0 })
  quantity: number;

  @Column({ default: 'IN_STOCK' })
  status: 'IN_STOCK' | 'OUT_OF_STOCK';
}
