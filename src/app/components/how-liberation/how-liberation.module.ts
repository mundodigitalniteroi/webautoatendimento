import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HowLiberationRoutingModule } from './how-liberation-routing.module';
import { HowLiberationPage } from './how-liberation.page';



@NgModule({
  declarations: [HowLiberationPage],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    HowLiberationRoutingModule
  ]
})
export class HowLiberationModule { }
