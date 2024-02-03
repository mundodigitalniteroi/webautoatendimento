import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IdentityComponent } from './identity.component';
import { BrMaskerModule } from 'br-mask';
import { IdenityRoutingModule } from './identity-routing.module';
import { IonMaskModule } from 'src/app/directives/ion-mask.module';

@NgModule({
  declarations: [IdentityComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    BrMaskerModule,
    ReactiveFormsModule,
    IdenityRoutingModule,
    IonMaskModule,
  ],
})
export class IdentityModule {}
