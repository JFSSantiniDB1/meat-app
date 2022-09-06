import { HttpClient, HttpHeaders } from "@angular/common/http"
import { MEAT_API } from "../app.api";
import { ErrorHandler } from '../app.error-handler'
import { catchError, map, Observable } from "rxjs"
import { CartItem } from "../restaurant-detail/shopping-cart/cart-item.model"
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service"
import { Injectable } from "@angular/core";
import { Order } from "./order.model";

@Injectable()
export class OrderService {

    constructor(private cartService: ShoppingCartService, private http: HttpClient){}

  itemsValue(): number {
    return this.cartService.total()
  }

  cartItems(): CartItem[]{
    return this.cartService.items
  }

  increaseQty(item: CartItem){
    this.cartService.increaseQty(item)
  }

  decreaseQty(item: CartItem){
    this.cartService.decreaseQty(item)
  }

  remove(item: CartItem){
    this.cartService.removeItem(item)
  }

  clear(){
    this.cartService.clear()
  }

  checkOrder(order: Order): Observable<string> {
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    return this.http.post(
        `${MEAT_API}/orders/`,
        order,
        {headers}
        )
        .pipe(map((resp: any) => {
          return JSON.stringify(resp.id)
        }), catchError(ErrorHandler.handleError))
  }
}