import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulingConfirmedPageRoutingModule } from './scheduling-confirmed-routing.module';

import { SchedulingConfirmedPage } from './scheduling-confirmed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulingConfirmedPageRoutingModule
  ],
  declarations: [SchedulingConfirmedPage]
})
export class SchedulingConfirmedPageModule {}
