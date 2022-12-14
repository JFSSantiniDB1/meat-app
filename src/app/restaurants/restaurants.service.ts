import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http'
import { Restaurant } from "./restaurant/restaurant.model";
import { MEAT_API } from "../app.api";
import { Observable } from "rxjs/internal/Observable";
import { MenuItem } from "../restaurant-detail/menu-item/menu-item.model";

@Injectable()
export class RestaurantsService {

    constructor(private http: HttpClient) {}

    getRestaurants(search?: string): Observable<Restaurant[]> {
        let params!: HttpParams

        if(search){
            params = new HttpParams().set('q', search)
        }

        return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params: params})
    }

    getRestaurantById(id: string): Observable<Restaurant> {
        return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
    }

    getReviewsByIdRestaurant(id: string): Observable<Restaurant>{
        return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}/reviews`)
    }

    getMenuByIdRestaurant(id: string): Observable<MenuItem[]>{
        return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`)
    }
}