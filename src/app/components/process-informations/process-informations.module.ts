import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProcessInformationsPage } from './process-informations.page';
import { ProcessInformationsRoutingModule } from './process-informations-routing.module';
import { ToolbarModule } from '../toolbar/toolbar.module';

@NgModule({
  declarations: [ProcessInformationsPage],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ProcessInformationsRoutingModule,
    ToolbarModule,
  ],
})
export class ProcessInformationsModule {}
