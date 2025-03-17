import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PaymentConfirmedPageRoutingModule } from './payment-confirmed-routing.module';
import { PaymentConfirmedPage } from './payment-confirmed.page';
import { ToolbarModule } from '../../toolbar/toolbar.module';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { PrintService } from 'src/app/services/print/print.service';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { SumupIntegracaoService } from 'src/app/services/sumup-integracao/sumup-integracao.service';
import { ConsultaDebitoService } from 'src/app/services/consulta-debito/consulta-debito.service';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PaymentConfirmedPageRoutingModule, ToolbarModule],
  declarations: [PaymentConfirmedPage],
  providers: [PrintService,SumupIntegracaoService,ConsultaDebitoService, BluetoothSerial, Diagnostic],
})
export class PaymentConfirmedPageModule {}
