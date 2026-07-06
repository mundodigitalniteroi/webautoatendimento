import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrMaskerModule } from 'br-mask';
import { IonicModule } from '@ionic/angular';
import { StepsPage } from './steps.page';
import { StepRoutingModule } from './steps-routing.module';
import { VerificationComponent } from './verification/verification.component';

@NgModule({
  declarations: [StepsPage, VerificationComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    StepRoutingModule,
    BrMaskerModule,
  ],
})
export class StepModule {}
