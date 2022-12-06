import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentCardPage } from './payment-card.page';



const routes: Routes = [
  {
    path: '',
    component: PaymentCardPage,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentCardRoutingModule {}
