import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrMaskerModule } from 'br-mask';
import { IonicModule } from '@ionic/angular';
import { CompleteRoutingModule } from './complete-routing.module';
import { CompleteComponent } from './complete.component';





@NgModule({
  declarations: [CompleteComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CompleteRoutingModule,
    BrMaskerModule
  ]
})
export class CompleteModule { }
