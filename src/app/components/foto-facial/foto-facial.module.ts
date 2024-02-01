import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FotoFacialPage } from './foto-facial.page';
import { FotoFacialRoutingModule } from './foto-facial-routing.module';



@NgModule({
  declarations: [FotoFacialPage],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    FotoFacialRoutingModule
  ],
  providers:[]
})
export class FotoFacialModule { }
