import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrMaskerModule } from 'br-mask';
import { IonicModule } from '@ionic/angular';
import { ProtocolRoutingModule } from './protocol-routing.module';
import { ProtocolComponent } from './protocol.component';
import { PrintService } from 'src/app/services/print/print.service';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

@NgModule({
  declarations: [ProtocolComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ProtocolRoutingModule,
    BrMaskerModule,
  ],
  providers: [PrintService, BluetoothSerial, Diagnostic],
})
export class ProtocolModule {}
