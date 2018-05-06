import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StartPage } from '../../pages/start/start';
import CryptoJS from 'crypto-js';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the DaftarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-daftar',
  templateUrl: 'daftar.html',
})
export class DaftarPage {
  passType:string;
  username:string;
  email:string;
  namaLengkap:string;
  password:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:Http) {
  	this.passType="password";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DaftarPage');
  }

  lihatPass()
  {
  	if(this.passType == "password")
  	{
  		this.passType = "text";
  	}
  	else
  	{
  		this.passType = "password";
  	}
  }

  gotoStart()
  {
  	this.navCtrl.setRoot(StartPage);
  }

  submit()
  {
  	let data = {
  		username : this.username,
  		password : this.password,
  		namaLengkap :this.namaLengkap,
  		email : this.email
  	};
  	// let chiper = CryptoJS.AES.encrypt('rickovirnanda','satu');
  	// console.log(chiper.toString());
  	// let plain = CryptoJS.AES.decrypt(chiper.toString(),'satu');
  	// console.log(plain.toString(CryptoJS.enc.Utf8));
  	console.log(data);
  	this.http.post('http://localhost:3000/api/test',JSON.stringify(data))
			 .map(res => res.json())
			 .subscribe(
			 	d=>{
			 		console.log(d);
			 	});

  }

}
