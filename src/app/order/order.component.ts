import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { RadioOption } from '../shared/radio/radio-option.model';
import { Order, OrderItem } from './order.model';
import { OrderService } from './order.service';

@Component({
  selector: 'ma-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  numberPattern = /^[0-9]*$/

  orderForm!: FormGroup;

  delivery: number = 8

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON', checked: true},
    {label: 'Cartão de Débito', value: 'DEB', checked: false},
    {label: 'Cartão Refeição', value: 'REF', checked: false}
  ]

  constructor(private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder) { }

    ngOnInit() {
      this.orderForm = this.formBuilder.group({
        name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
        email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
        emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
        address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
        number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
        optionalAddress: this.formBuilder.control(''),
        paymentOption: this.formBuilder.control('', [Validators.required])
      }, {validator: OrderComponent.equalsTo})
    }

    static equalsTo(group: AbstractControl): {[key:string]: boolean} {
      const email = group.get('email')
      const emailConfirmation = group.get('emailConfirmation')
      if(!email || !emailConfirmation){
        return {}
      }
      if(email.value !== emailConfirmation.value){
        return {emailsNotMatch:true}
      }
      return {}
    }

    itemsValue(): number {
      return this.orderService.itemsValue()
    }
  
    cartItems(): CartItem[] {
      return this.orderService.cartItems()
    }
  
    increaseQty(item: CartItem){
      this.orderService.increaseQty(item)
    }
  
    decreaseQty(item: CartItem){
      this.orderService.decreaseQty(item)
    }
  
    remove(item: CartItem){
      this.orderService.remove(item)
    }
  
    checkOrder(order: Order){
      order.orderItems = this.cartItems()
          .map((item:CartItem) => new OrderItem(item.quantity, item.menuItem.id))
          
      this.orderService.checkOrder(order)
        .subscribe( (orderId: string) => {
          console.log(`Compra concluída: ${orderId}`)
          this.router.navigate(['/order-summary'])
          this.orderService.clear()
      })

      console.log(order)
    }
}
