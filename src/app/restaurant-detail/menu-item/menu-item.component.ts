import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from './menu-item.model';
import { trigger, state, style, transition, animate } from '@angular/animations'

@Component({
  selector: 'ma-menu-item',
  templateUrl: './menu-item.component.html',
  animations: [
    trigger('menuItemAppeared', [
      state('ready', style({
        opacity: 1
      })),
      transition('void => ready', [
        style({
          opacity: 0,
          transform: 'translateY(-20px)'
        }),
        animate('300ms 0s ease-in')
      ]),
    ])
  ]
})
export class MenuItemComponent implements OnInit {

  menuItemState = 'ready'
  
  @Input() menuItem: MenuItem | undefined
  @Output() add = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  emitAddEvent(){
    this.add.emit(this.menuItem)
  }

}
