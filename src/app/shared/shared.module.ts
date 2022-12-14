import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OrderService } from "../order/order.service";
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { RestaurantsService } from "../restaurants/restaurants.service";
import { InputComponent } from "./input/input.component";
import { RadioComponent } from "./radio/radio.component";
import { RatingComponent } from "./rating/rating.component";
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NotificationService } from "./messages/notification.service";
import { LoginService } from "../security/login/login.service";
import { LoggedInGuard } from "../security/loggedin.guard";
import { LeaveOrderGuard } from "../order/leave-order.guard";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "../security/auth.interceptor";


@NgModule({
    declarations: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent],
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    exports: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent, 
        FormsModule, ReactiveFormsModule, CommonModule]
})
export class SharedModule {
    static forRoot(): any {
        return {
            ngModule: SharedModule,
            providers: [ShoppingCartService, RestaurantsService,
                 OrderService, NotificationService, LoginService,
                 LoggedInGuard, LeaveOrderGuard,
                 {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
                ]
        }
    }
}