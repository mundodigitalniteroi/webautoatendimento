import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';
import { AddressComponent } from './address.component';
import { AddressRoutingModule } from './adress-routing.module';
import { IonMaskModule } from 'src/app/directives/ion-mask.module';

@NgModule({
  declarations: [AddressComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    BrMaskerModule,
    ReactiveFormsModule,
    AddressRoutingModule,
    IonMaskModule,
  ],
})
export class AddressModule {}
