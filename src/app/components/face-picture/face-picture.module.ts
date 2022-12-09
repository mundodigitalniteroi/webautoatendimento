import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacePicturePageRoutingModule } from './face-picture-routing.module';

import { FacePicturePage } from './face-picture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacePicturePageRoutingModule
  ],
  declarations: [FacePicturePage]
})
export class FacePicturePageModule {}
