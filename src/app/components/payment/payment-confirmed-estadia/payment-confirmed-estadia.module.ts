import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PaymentConfirmedEstadiaPageRoutingModule } from './payment-confirmed-estadia-routing.module';
import { PaymentConfirmedEstadiaPage } from './payment-confirmed-estadia.page';
import { ToolbarModule } from '../../toolbar/toolbar.module';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { PrintService } from 'src/app/services/print/print.service';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PaymentConfirmedEstadiaPageRoutingModule, ToolbarModule],
  declarations: [PaymentConfirmedEstadiaPage],
  providers: [PrintService, BluetoothSerial, Diagnostic],
})
export class PaymentConfirmedEstadiaPageModule {}
