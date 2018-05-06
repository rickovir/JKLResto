import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
}
