import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import {Cart } from './cart.model';

@Entity("items")
export class Item {
  @PrimaryColumn()
  cartId: number;

  @PrimaryColumn()
  productId: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Cart, cart => cart.products)
  cart: Cart;
}