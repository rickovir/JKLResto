var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var ZomatoProvider = /** @class */ (function () {
    function ZomatoProvider(http, geolocation, storage) {
        this.http = http;
        this.geolocation = geolocation;
        this.storage = storage;
        console.log('Hello ZomatoProvider Provider');
        this.isLocationSet = false;
        this.key = "b08aaa8db1edad720230603d039f8cd2";
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('user-key', this.key);
        this.location = {
            latitude: -6.77,
            longitude: 106.25
        };
    }
    ZomatoProvider.prototype.findUserLocation = function () {
        var _this = this;
        var options = {
            enableHighAccuracy: true
        };
        this.geolocation.getCurrentPosition(options).then(function (position) {
            _this.location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            _this.isLocationSet = true;
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    };
    ZomatoProvider.prototype.getLocation = function () {
        return this.location;
    };
    ZomatoProvider.prototype.getCuisines = function () {
        if (!this.isLocationSet)
            this.findUserLocation();
        var url = "https://developers.zomato.com/api/v2.1/cuisines?city_id=74&lat=" + this.location.latitude + "&lon=" + this.location.longitude;
        console.log(url);
        return this.http.get(url, { headers: this.headers })
            .map(function (res) { return res.json(); })
            .catch(function (err) {
            return Observable.throw(err.json());
        });
    };
    ZomatoProvider.prototype.saveCuisinesStorage = function (value) {
        this.storage.set('cuisines', value);
    };
    ZomatoProvider.prototype.getCuisinesStorage = function () {
        return this.storage.get('cuisines');
    };
    ZomatoProvider.prototype.getRestaurant = function (req) {
        if (!this.isLocationSet)
            this.findUserLocation();
        // req -> query, count, cuisine
        var url = "https://developers.zomato.com/api/v2.1/search?entity_id=74&entity_type=city&q=" + req.query + "&count=" + req.count + "&lat=" + this.location.latitude + "&lon=" + this.location.longitude + "&radius=" + req.radius + "&cuisines=" + req.cuisine + "&sort=" + req.sort + "&order=" + req.order;
        console.log(url);
        return this.http.get(url, { headers: this.headers })
            .map(function (res) { return res.json(); })
            .catch(function (err) {
            return Observable.throw(err.json());
        });
    };
    ZomatoProvider.prototype.getNearby = function () {
        if (!this.isLocationSet)
            this.findUserLocation();
        // req -> query, count, cuisine
        var url = "https://developers.zomato.com/api/v2.1/geocode?lat=" + this.location.latitude + "&lon=" + this.location.longitude;
        console.log(url);
        return this.http.get(url, { headers: this.headers })
            .map(function (res) { return res.json(); })
            .catch(function (err) {
            return Observable.throw(err.json());
        });
    };
    ZomatoProvider.prototype.getDetail = function (resId) {
        if (!this.isLocationSet)
            this.findUserLocation();
        // req -> query, count, cuisine
        var url = "https://developers.zomato.com/api/v2.1/restaurant?res_id=" + resId;
        console.log(url);
        return this.http.get(url, { headers: this.headers })
            .map(function (res) { return res.json(); })
            .catch(function (err) {
            return Observable.throw(err.json());
        });
    };
    ZomatoProvider.prototype.getReviewers = function (resId) {
        if (!this.isLocationSet)
            this.findUserLocation();
        // req -> query, count, cuisine
        var url = "https://developers.zomato.com/api/v2.1/reviews?res_id=" + resId + "&count=5";
        console.log(url);
        return this.http.get(url, { headers: this.headers })
            .map(function (res) { return res.json(); })
            .catch(function (err) {
            return Observable.throw(err.json());
        });
    };
    ZomatoProvider.prototype.distance = function (lat1, lon1, lat2, lon2, unit) {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
            dist = dist * 1.609344;
        }
        if (unit == "N") {
            dist = dist * 0.8684;
        }
        return dist;
    };
    ZomatoProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http,
            Geolocation,
            Storage])
    ], ZomatoProvider);
    return ZomatoProvider;
}());
export { ZomatoProvider };
//# sourceMappingURL=zomato.js.map