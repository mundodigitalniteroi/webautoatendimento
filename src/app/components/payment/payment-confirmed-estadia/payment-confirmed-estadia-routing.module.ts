import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentConfirmedEstadiaPage } from './payment-confirmed-estadia.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentConfirmedEstadiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentConfirmedEstadiaPageRoutingModule {}
