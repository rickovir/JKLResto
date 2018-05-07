import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import CryptoJS from 'crypto-js';
import { StartPage } from '../../pages/start/start';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  passType:string;
  username:string;
  password:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:Http) {
  	this.passType="password";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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
  login()
  {
    let hashpassword = CryptoJS.SHA256(this.password,'ricko').toString();
    let dataPOST = {
      username : btoa(this.username),
      password : hashpassword
    };

    // console.log(data);

    let headers = new Headers();
    headers.append('Content-Type','application/json');
        this.http.post('http://localhost:3000/api/auth', JSON.stringify(dataPOST), {headers: headers})
       .map(res => res.json())
       .subscribe(
         data=>{
           console.log(data);
           // if(data ==1)
           //   console.log("login berhasil");
           
         });
  }
}
