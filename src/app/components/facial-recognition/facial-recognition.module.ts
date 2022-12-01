import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FacialRecognitionRoutingModule } from './facial-recognition-routing.module';
import { FacialRecognitionPage } from './facial-recognition.page';



@NgModule({
  declarations: [FacialRecognitionPage],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    FacialRecognitionRoutingModule
  ]
})
export class FacialRecognitionModule { }
