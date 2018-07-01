import { Component } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import { ZomatoProvider } from '../../providers/zomato/zomato';
import { ModalSearchPage } from '../modal-search/modal-search';
import { ModalCuisinePage } from '../modal-cuisine/modal-cuisine';
import { RestaurantProfilePage } from '../restaurant-profile/restaurant-profile';

import { Observable } from 'rxjs/Rx';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	cuisines:Array<string>;
  restaurants:Array<any>;

  constructor(public navCtrl: NavController, private zomatoProvider:ZomatoProvider, public modalCtrl:ModalController) {
    this.cuisines = [];
  	this.zomatoProvider.findUserLocation();
  	// this.loadCuisines();
   //  this.loadRestaurant();
    this.loadNearby();
  }

  openSearch()
  {
    let modal = this.modalCtrl.create(ModalSearchPage,null);
    modal.present();
  }
  openCuisine(name)
  {
    let modal = this.modalCtrl.create(ModalCuisinePage,{name : name});
    modal.present();
  }

  loadNearby()
  {
    // get restaurant with time out
    setTimeout(() => {
      this.zomatoProvider.getNearby().subscribe(
        data=>{
          this.restaurants = data.nearby_restaurants;
          this.cuisines = data.popularity.top_cuisines;
        });
    }, 1800);
  }

  randomNumber(length)
  {
    return Math.floor(Math.random() * length);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.cuisines = [];
      this.restaurants = [];
      this.loadNearby();
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  levelLike(level)
  {
    if(level < 2.8)
    {
      return "sad";
    }
    else{
      return "happy";
    }
  }
  goToDetail(restId)
  {
    this.navCtrl.push(RestaurantProfilePage,{restId : restId});
  }
}
