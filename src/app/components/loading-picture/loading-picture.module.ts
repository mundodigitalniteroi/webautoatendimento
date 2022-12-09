import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadingPicturePageRoutingModule } from './loading-picture-routing.module';

import { LoadingPicturePage } from './loading-picture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingPicturePageRoutingModule
  ],
  declarations: [LoadingPicturePage]
})
export class LoadingPicturePageModule {}
