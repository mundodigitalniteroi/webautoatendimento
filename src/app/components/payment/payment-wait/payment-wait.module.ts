import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ToolbarModule } from '../../toolbar/toolbar.module';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { PrintService } from 'src/app/services/print/print.service';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { PaymentWaitPageRoutingModule } from './payment-wait-routing.module';
import { PaymentWaitComponent } from './payment-wait.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PaymentWaitPageRoutingModule, ToolbarModule],
  declarations: [PaymentWaitComponent],
  providers: [PrintService, BluetoothSerial, Diagnostic],
})
export class PaymentWaitPageModule {}
