import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DaftarPage } from '../../pages/daftar/daftar';
import { LoginPage } from '../../pages/login/login';

/**
 * Generated class for the StartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
  }
  gotoDaftar()
  {
  	this.navCtrl.setRoot(DaftarPage);
  }
  gotoLogin()
  {
  	this.navCtrl.setRoot(LoginPage);
  }

}
