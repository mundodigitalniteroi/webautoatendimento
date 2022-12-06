import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessInformationPage } from './process-information.page';
import { ProcessInformationRoutingModule } from './process-information-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ProcessInformationPage],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ProcessInformationRoutingModule
  ]
})
export class ProcessInformationModule { }
