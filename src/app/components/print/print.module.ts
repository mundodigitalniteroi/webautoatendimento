import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrintPage } from './print.page';
import { IonicStorageModule } from '@ionic/storage';
import { PrintService } from 'src/app/services/print/print.service';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: PrintPage,
      },
    ]),
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
  ],
  declarations: [PrintPage],
  providers: [PrintService, BluetoothSerial, Diagnostic],
})
export class PrintPageModule {}
