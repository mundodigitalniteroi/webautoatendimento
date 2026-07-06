import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PaymentPage } from './payment.page';
import { PaymentRoutingModule } from './payment-routing.module';
import { ToolbarModule } from '../toolbar/toolbar.module';

@NgModule({
  declarations: [PaymentPage],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    PaymentRoutingModule,
    ToolbarModule,
  ],
})
export class PaymentModule {}
