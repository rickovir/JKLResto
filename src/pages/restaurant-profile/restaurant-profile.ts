import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ZomatoProvider } from '../../providers/zomato/zomato';

/**
 * Generated class for the RestaurantProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-restaurant-profile',
  templateUrl: 'restaurant-profile.html',
})
export class RestaurantProfilePage {
	loaded:boolean;
	detail:boolean;
	detailProfile:any;
	reviewers:Array<any>;
	restId:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private zomatoProvider:ZomatoProvider) {
  	this.detail = null;
  	this.detailProfile = null;
  	this.reviewers = [];
    console.log(this.navParams.get('restId'));
  	this.restId = this.navParams.get('restId');
    this.loadRestaurant();
  	this.loaded=false;
  	this.loadReviewers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantProfilePage');
  }

  showDetail()
  {
  	if(this.detail == true)
  		this.detail = false;
  	else
  		this.detail = true;
  }

  loadRestaurant(){
  	    // get restaurant with time out
    setTimeout(() => {
      this.zomatoProvider.getDetail(this.restId).subscribe(
        data=>{
          this.detailProfile = data;
          console.log(this.detailProfile);
          this.loaded = true;
        });
    }, 2000);
  }

  loadReviewers()
  {
    setTimeout(() => {
      this.zomatoProvider.getReviewers(this.restId).subscribe(
        data=>{
          this.reviewers = data.user_reviews;
          console.log(this.reviewers);
        });
    }, 1800);
  }
  starRating(nilai):string
  {
  	return ((nilai/5)*100).toString();
  }
  goBack()
  {
  	this.navCtrl.pop();
  }
  getDistance(lat, long)
  {
    let locationNow = this.zomatoProvider.getLocation();
    let distance = this.zomatoProvider.distance(lat,long,locationNow.latitude,locationNow.longitude,"");
    return (Math.floor(distance*1000)).toString();
  }
}
