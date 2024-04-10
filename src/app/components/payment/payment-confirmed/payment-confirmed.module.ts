import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentConfirmedPageRoutingModule } from './payment-confirmed-routing.module';

import { PaymentConfirmedPage } from './payment-confirmed.page';
import { ToolbarModule } from '../../toolbar/toolbar.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PaymentConfirmedPageRoutingModule, ToolbarModule],
  declarations: [PaymentConfirmedPage],
})
export class PaymentConfirmedPageModule {}
