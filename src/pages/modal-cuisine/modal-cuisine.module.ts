import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalCuisinePage } from './modal-cuisine';

@NgModule({
  declarations: [
    ModalCuisinePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalCuisinePage),
  ],
})
export class ModalCuisinePageModule {}
