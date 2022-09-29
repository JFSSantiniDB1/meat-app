import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { switchMap, debounceTime, distinctUntilChanged, catchError, from } from 'rxjs';

@Component({
  selector: 'ma-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', [
        animate('250ms 0s ease-in-out')
      ]),
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden'
  restaurants: Restaurant[] = []

  searchForm!: FormGroup
  searchControl!: FormControl

  constructor(private restaurantsServices: RestaurantsService,
              private fb: FormBuilder) { }

  ngOnInit(): void {

    this.searchControl = this.fb.control('')

    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(searchTerm => this.restaurantsServices.getRestaurants(searchTerm)
                              .pipe(catchError(() => from([])))
                            )
      )
       .subscribe(restaurants => this.restaurants = restaurants)

    this.restaurantsServices.getRestaurants()
      .subscribe(restaurants => this.restaurants = restaurants);
  }

  filteredRestaurants(){
    return this.restaurants
    // .filter(x => x.name.includes('Ice'))
  }

  toggleSearch(){
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }

}
