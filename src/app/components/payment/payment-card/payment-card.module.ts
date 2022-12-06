import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PaymentCardPage } from './payment-card.page';
import { PaymentCardRoutingModule } from './payment-card-routing.module';



@NgModule({
  declarations: [PaymentCardPage],
  imports: [
    CommonModule,
    PaymentCardRoutingModule,
    IonicModule,
    FormsModule,
  ]
})
export class PaymentCardModule { }
