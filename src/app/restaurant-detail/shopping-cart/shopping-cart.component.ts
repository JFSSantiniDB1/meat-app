import { Component, OnInit } from '@angular/core';
import { CartItem } from './cart-item.model';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'ma-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  items(): CartItem[] | undefined {
      return this.shoppingCartService.items
  }

  total(): number {
    return this.shoppingCartService.total()
  }

  addItem(item: any): void{
    this.shoppingCartService.addItem(item);
  }

  removeItem(item: any): void{
    this.shoppingCartService.removeItem(item);
  }

  clear(): void {
    this.shoppingCartService.clear()
  }
}
