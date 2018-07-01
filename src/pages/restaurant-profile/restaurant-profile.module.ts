import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestaurantProfilePage } from './restaurant-profile';

@NgModule({
  declarations: [
    RestaurantProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(RestaurantProfilePage),
  ],
})
export class RestaurantProfilePageModule {}
