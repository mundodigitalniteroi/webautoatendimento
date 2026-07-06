import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentWaitComponent } from './payment-wait.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentWaitComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentWaitPageRoutingModule {}
