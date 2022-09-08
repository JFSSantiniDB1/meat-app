import { Injectable } from "@angular/core";
import { NotificationService } from "src/app/shared/messages/notification.service";
import { MenuItem } from "../menu-item/menu-item.model";
import { CartItem } from "./cart-item.model";

@Injectable()
export class ShoppingCartService {
    items: CartItem[] = []

    constructor(private notificationService: NotificationService){}

    addItem(item: MenuItem){
        let foundItem = this.items?.find((mItem) => mItem.menuItem.id == item.id)
        if(foundItem){
            this.increaseQty(foundItem)
        } else{
            this.items?.push(new CartItem(item))
        }
        this.notificationService.notify(`Item ${item.name} adicionado com sucesso!`)
    }

    increaseQty(item: CartItem){
        item.quantity = item.quantity + 1
    }

    decreaseQty(item: CartItem){
        item.quantity = item.quantity - 1
        if(item.quantity === 0)
            this.removeItem(item)
    }

    removeItem(item: CartItem){
        this.items?.splice(this.items.indexOf(item),1)
        this.notificationService.notify(`Item ${item.menuItem.name} removido com sucesso!`)
    }

    clear(){
        this.items = []
    }
    
    total(): number{
        return this.items?.map(x => x.value())
        .reduce((a, b) => a + b, 0) ?? 0
    }
}