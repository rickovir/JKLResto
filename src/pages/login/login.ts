import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import CryptoJS from 'crypto-js';
import { StartPage } from '../../pages/start/start';
import { HomePage } from '../../pages/home/home';
import { Storage } from '@ionic/storage';

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

  constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams, private http:Http) {
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
    headers.set('Content-Type','application/json');

       //  // this.http.post('http://localhost:3000/api/auth', JSON.stringify(dataPOST), {headers: headers})
       //  this.http.post('http://192.168.1.5:3000/api/auth', JSON.stringify(dataPOST), {headers: headers})
       // .map(res => res.json())
       // .subscribe(
       //   data=>{
       //     console.log(data);
       //     if(data.enter =="Y")
       //     {
       //       console.log("login berhasil");
       //       this.navCtrl.setRoot(HomePage);
       //     }
           
       //   });
       let status:number = 0;
       this.storage.get("username").then(
         (data) =>{
           if(data == this.username)
             status++;
         });
       this.storage.get("password").then(
         (data) =>{
           if(data == hashpassword)
             status++;
         });
       
       if(status == 2)
       {
          this.navCtrl.setRoot(HomePage);
          console.log("login berhasil");
       }
       else
          console.log("login gagal");
  }
}
