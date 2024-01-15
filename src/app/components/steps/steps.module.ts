import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrMaskerModule } from 'br-mask';
import { IonicModule } from '@ionic/angular';
import { StepsPage } from './steps.page';
import { StepRoutingModule } from './steps-routing.module';
import { AddressComponent } from './address/address.component';
import { IdentityComponent } from './identity/identity.component';
import { VerificationComponent } from './verification/verification.component';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';



@NgModule({
  declarations: [StepsPage, AddressComponent, IdentityComponent, VerificationComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    StepRoutingModule,
    BrMaskerModule
  ],
  providers:[AtendimentoService]
})
export class StepModule { }
