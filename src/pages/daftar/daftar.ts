import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StartPage } from '../../pages/start/start';
import CryptoJS from 'crypto-js';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../pages/home/home';
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
  key:string;

  constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams, private http:Http) {
  	this.passType="password";
    this.key = "kotak";
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
    let hashpassword = CryptoJS.SHA256(this.password,'ricko').toString();
    let dataPOST = {
      username : btoa(this.username),
      password : hashpassword,
      namaLengkap : btoa(this.namaLengkap),
      email : btoa(this.email)
    };

    // console.log(data);
    this.storage.set("username", this.username);
    this.storage.set("password", hashpassword);

    let headers = new Headers();
    headers.append('Content-Type','application/json');
    this.http.post('http://localhost:3000/api/register', JSON.stringify(dataPOST), {headers: headers})
       .map(res => res.json())
       .subscribe(
         data=>{
           // console.log(data);
           if(data ==1)
             console.log("daftar berhasil");
           
         });
       
    this.navCtrl.setRoot(HomePage);
  }
  // submit()
  // {
  //   let hashpassword = CryptoJS.SHA256(this.password,'ricko',{ mode: CryptoJS.mode.CTR}).toString();
  //   let enUsername = CryptoJS.AES.encrypt(this.username, this.key,{ mode: CryptoJS.mode.CTR}).toString();
  //   let enNamaLengkap = CryptoJS.AES.encrypt(this.namaLengkap, this.key,{ mode: CryptoJS.mode.CTR}).toString();
  //   let enEmail = CryptoJS.AES.encrypt(this.email, this.key,{ mode: CryptoJS.mode.CTR}).toString();

  // 	let dataPOST = {
  // 		username : enUsername,
  // 		password : hashpassword,
  // 		namaLengkap :enNamaLengkap,
  // 		email : enEmail
  // 	};

  // 	// console.log(data);

  //   let headers = new Headers();
  //   headers.append('Content-Type','application/json');
  // 	this.http.post('http://localhost:3000/api/register', JSON.stringify(dataPOST), {headers: headers})
		// 	 .map(res => res.json())
		// 	 .subscribe(
		// 	 	data=>{
		// 	 		console.log(data);
		// 	 	});
  //   console.log("key : "+ this.key);
  //   console.log("username : ", enUsername);
  //   console.log("namaLengkap : ", enNamaLengkap);
  //   console.log("email : ", enEmail);
  //   console.log("password : ", hashpassword);
  //   console.log("username : "+ CryptoJS.AES.decrypt(enUsername, this.key).toString(CryptoJS.enc.Utf8));
  // }

}
