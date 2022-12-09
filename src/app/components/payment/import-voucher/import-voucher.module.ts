import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportVoucherPage } from './import-voucher.page';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ImportVoucherRoutingModule } from './import-voucher-routing.module';



@NgModule({
  declarations: [ImportVoucherPage],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ImportVoucherRoutingModule
  ]
})
export class ImportVoucherModule { }
