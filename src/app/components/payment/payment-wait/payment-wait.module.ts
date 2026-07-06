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
import { SumupIntegracaoService } from 'src/app/services/sumup-integracao/sumup-integracao.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PaymentWaitPageRoutingModule, ToolbarModule],
  declarations: [PaymentWaitComponent],
  providers: [InAppBrowser,SumupIntegracaoService,PrintService, BluetoothSerial, Diagnostic],
})
export class PaymentWaitPageModule {}
