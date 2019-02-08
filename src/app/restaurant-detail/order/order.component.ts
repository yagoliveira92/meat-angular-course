import { Component, OnInit } from '@angular/core';
import {RadioOption} from '../../shared/radio/radio-option.model';
import {OrderService} from './order-items/order.service';
import {CartItem} from '../shopping-cart/cart-item.model';
import {Order, OrderItem} from './order.model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {

  delivery = 8;

  paymentOption: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão Refeição', value: 'REF'},
  ];
  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  cartItem(): CartItem[] {
    return this.orderService.cartItems();
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this.orderService.remove(item);
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItem()
      .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id));
    this.orderService.checkOrder(order)
      .subscribe( (orderId: string) => {
        console.log(`Compra Concluída: ${orderId}`);
        this.orderService.clear();
      });
    console.log(order);
  }

}
