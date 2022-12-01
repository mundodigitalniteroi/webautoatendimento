import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StepsPage } from './steps.page';
import { StepRoutingModule } from './steps-routing.module';
import { AddressComponent } from './address/address.component';
import { IdentityComponent } from './identity/identity.component';
import { VerificationComponent } from './verification/verification.component';



@NgModule({
  declarations: [StepsPage, AddressComponent, IdentityComponent, VerificationComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    StepRoutingModule
  ]
})
export class StepModule { }
