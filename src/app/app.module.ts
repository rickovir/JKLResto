import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StartPage } from '../pages/start/start';
import { LoginPage } from '../pages/login/login';
import { DaftarPage } from '../pages/daftar/daftar';
import { ModalSearchPage } from '../pages/modal-search/modal-search';
import { ModalCuisinePage } from '../pages/modal-cuisine/modal-cuisine';
import { RestaurantProfilePage } from '../pages/restaurant-profile/restaurant-profile';
import { SpeechPage } from '../pages/speech/speech';

import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ZomatoProvider } from '../providers/zomato/zomato';

import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    StartPage,
    LoginPage,
    DaftarPage,
    SpeechPage,
    ModalSearchPage,
    ModalCuisinePage,
    RestaurantProfilePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    StartPage,
    LoginPage,
    SpeechPage,
    DaftarPage,
    ModalSearchPage,
    ModalCuisinePage,
    RestaurantProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SpeechRecognition,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    ZomatoProvider
  ]
})
export class AppModule {}
