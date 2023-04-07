import { Entity, Column, PrimaryGeneratedColumn,OneToMany } from 'typeorm';
import {Item} from './item.model';
import "reflect-metadata"



@Entity("carts")
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalPrice: number;

  @Column()
  totalQuantity: number;

  @OneToMany(()=>Item, product=>product.cart)
  products:Item[]
}