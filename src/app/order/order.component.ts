import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { LoginService } from '../security/login/login.service';
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

  orderId!: string

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON', checked: true},
    {label: 'Cartão de Débito', value: 'DEB', checked: false},
    {label: 'Cartão Refeição', value: 'REF', checked: false}
  ]

  constructor(private orderService: OrderService,
    private router: Router,
    private loginService: LoginService,
    private formBuilder: FormBuilder) { }

    ngOnInit() {
      this.orderForm = new FormGroup({
        name: new FormControl(this.loginService.user?.name, {
          validators: [Validators.required, Validators.minLength(5)]
        }),
        email: new FormControl(this.loginService.user?.email, {
          validators: [Validators.required, Validators.pattern(this.emailPattern)]
        }),
        emailConfirmation: new FormControl(this.loginService.user?.email, {
          validators: [Validators.required, Validators.pattern(this.emailPattern)]
        }),
        address: new FormControl('', {
          validators: [Validators.required, Validators.minLength(5)]
        }),
        number: new FormControl('', {
          validators: [Validators.required, Validators.pattern(this.numberPattern)]
        }),
        optionalAddress: new FormControl(''),
        paymentOption: new FormControl('', {
          validators: [Validators.required]
        })
      }, {
            validators: [OrderComponent.equalsTo], 
            updateOn: 'change'
          }
      )
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
  
    isOrderCompleted(): boolean {
      return this.orderId != undefined;
    }

    checkOrder(order: Order){
      order.orderItems = this.cartItems()
          .map((item:CartItem) => new OrderItem(item.quantity, item.menuItem.id))
          
      this.orderService.checkOrder(order)
        .subscribe( (orderId: string) => {
          this.orderId = orderId;
          this.router.navigate(['/order-summary'])
          this.orderService.clear()
      })

    }
}
