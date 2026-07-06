import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrMaskerModule } from 'br-mask';
import { IonicModule } from '@ionic/angular';
import { CompleteRoutingModule } from './complete-routing.module';
import { CompleteComponent } from './complete.component';
import { PrintService } from 'src/app/services/print/print.service';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

@NgModule({
  declarations: [CompleteComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CompleteRoutingModule,
    BrMaskerModule,
  ],
  providers: [PrintService, BluetoothSerial, Diagnostic],
})
export class CompleteModule {}
