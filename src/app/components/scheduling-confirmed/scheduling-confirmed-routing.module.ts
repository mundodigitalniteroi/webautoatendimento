import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulingConfirmedPage } from './scheduling-confirmed.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulingConfirmedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulingConfirmedPageRoutingModule {}
