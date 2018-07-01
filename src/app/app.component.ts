import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { TabsPage } from '../pages/tabs/tabs';
import { StartPage } from '../pages/start/start';
// import { ModalSearchPage } from '../pages/modal-search/modal-search';
// import { SpeechPage } from '../pages/speech/speech';
// import { HomePage } from '../pages/home/home';
// import { RestaurantProfilePage } from '../pages/restaurant-profile/restaurant-profile';
// import { LoginPage } from '../pages/login/login';
// import { DaftarPage } from '../pages/daftar/daftar';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = StartPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
