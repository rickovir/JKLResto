import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { ZomatoProvider } from '../../providers/zomato/zomato';
import { RestaurantProfilePage } from '../restaurant-profile/restaurant-profile';

/**
 * Generated class for the ModalCuisinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-cuisine',
  templateUrl: 'modal-cuisine.html',
})
export class ModalCuisinePage {
  restaurants:Array<any>;
  cuisineName:string;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, private zomatoProvider:ZomatoProvider) {
  	this.cuisineName = navParams.get("name");
  	this.restaurants = [];
  	this.loadCuisine()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalCuisinePage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  loadCuisine()
  {
  	//query search restaurant
    let req = {
      query : "",
      count: 10,
      cuisine:this.cuisineName,
      radius: 1000,
      sort:"real_distance",
      order:"asc"
    };
    // get restaurant with time out
    setTimeout(() => {
      this.zomatoProvider.getRestaurant(req).subscribe(
        data=>{
          this.restaurants = data.restaurants;
          
        });
    }, 1800);
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
