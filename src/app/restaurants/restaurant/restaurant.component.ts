import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from './restaurant.model';
import { trigger, state, style, transition, animate } from '@angular/animations'

@Component({
  selector: 'ma-restaurant',
  templateUrl: './restaurant.component.html',
  animations: [
    trigger('restaurantAppeared', [
      state('ready', style({
        opacity: 1
      })),
      transition('void => ready', [
        style({
          opacity: 0,
          transform: 'translateX(-30px)'
        }),
        animate('300ms 0s ease-in-out')
      ]),
    ])
  ]
})
export class RestaurantComponent implements OnInit {

  restaurantState = 'ready'

  @Input() restaurant: Restaurant | undefined

  constructor() { }

  ngOnInit(): void {
  }

}
