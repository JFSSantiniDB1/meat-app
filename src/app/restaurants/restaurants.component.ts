import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';

@Component({
  selector: 'ma-restaurants',
  templateUrl: './restaurants.component.html'
})
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[] = []

  constructor(private restaurantsServices: RestaurantsService) { }

  ngOnInit(): void {
    this.restaurantsServices.getRestaurants()
      .subscribe(restaurants => this.restaurants = restaurants);
  }

}
