import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleShippingPage } from './schedule-shipping.page';

const routes: Routes = [
  {
    path: '',
    component: ScheduleShippingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleShippingPageRoutingModule {}
