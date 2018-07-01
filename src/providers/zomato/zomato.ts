import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ZomatoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ZomatoProvider {
  
  private location:{
  	latitude:number,
  	longitude:number
  };
  private isLocationSet:boolean;
  private key:any;
  private headers:any;

  constructor(public http: Http, 
              private geolocation:Geolocation,
              private storage: Storage) {
    console.log('Hello ZomatoProvider Provider');
    this.isLocationSet = false;
    this.key = "f00036da67d79db8bb00f776c55768f8";
    this.headers = new Headers();
    this.headers.append('Content-Type','application/json');
    this.headers.append('user-key', this.key);

    this.location = {
      latitude:-6.77,
      longitude:106.25
    }
  }

  public findUserLocation()
  {
  	let options ={
  		enableHighAccuracy: true
  	}
  	
  	this.geolocation.getCurrentPosition(options).then((position) => {

      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      this.isLocationSet = true;

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  public getLocation()
  {
    return this.location;
  }

  public getCuisines()
  {
    if(!this.isLocationSet)
      this.findUserLocation();
    
    let url = `https://developers.zomato.com/api/v2.1/cuisines?city_id=74&lat=${this.location.latitude}&lon=${this.location.longitude}`;
    console.log(url);
    return this.http.get(url,{headers:this.headers})
                    .map(res => res.json())
                    .catch((err:Response) => {
                        return Observable.throw(err.json());
                    });
  }

  public saveCuisinesStorage(value)
  {
    this.storage.set('cuisines', value);
  }
  public getCuisinesStorage()
  {
    return this.storage.get('cuisines');
  }
  public getRestaurant(req)
  {
    if(!this.isLocationSet)
      this.findUserLocation();
      // req -> query, count, cuisine
    let url = `https://developers.zomato.com/api/v2.1/search?entity_id=74&entity_type=city&q=${req.query}&count=${req.count}&lat=${this.location.latitude}&lon=${this.location.longitude}&radius=${req.radius}&cuisines=${req.cuisine}&sort=${req.sort}&order=${req.order}`;
    console.log(url);
    return this.http.get(url,{headers:this.headers})
                    .map(res => res.json())
                    .catch((err:Response) => {
                        return Observable.throw(err.json());
                    });
  }
  public getNearby()
  {
    if(!this.isLocationSet)
      this.findUserLocation();
      // req -> query, count, cuisine
    let url = `https://developers.zomato.com/api/v2.1/geocode?lat=${this.location.latitude}&lon=${this.location.longitude}`;
    console.log(url);
    return this.http.get(url,{headers:this.headers})
                    .map(res => res.json())
                    .catch((err:Response) => {
                        return Observable.throw(err.json());
                    });
  }

  public getDetail(resId)
  {
    if(!this.isLocationSet)
      this.findUserLocation();
      // req -> query, count, cuisine
    let url = `https://developers.zomato.com/api/v2.1/restaurant?res_id=${resId}`;
    console.log(url);
    return this.http.get(url,{headers:this.headers})
                    .map(res => res.json())
                    .catch((err:Response) => {
                        return Observable.throw(err.json());
                    });
  }
  public getReviewers(resId)
  {
    if(!this.isLocationSet)
      this.findUserLocation();
      // req -> query, count, cuisine
    let url = `https://developers.zomato.com/api/v2.1/reviews?res_id=${resId}&count=5`;
    console.log(url);
    return this.http.get(url,{headers:this.headers})
                    .map(res => res.json())
                    .catch((err:Response) => {
                        return Observable.throw(err.json());
                    });
  }

  public distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { 
      dist = dist * 1.609344 
    }
    if (unit=="N") {
      dist = dist * 0.8684 
    }
    return dist
  }
}
