import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScheduleShippingPageRoutingModule } from './schedule-shipping-routing.module';

import { ScheduleShippingPage } from './schedule-shipping.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduleShippingPageRoutingModule
  ],
  declarations: [ScheduleShippingPage]
})
export class ScheduleShippingPageModule {}
