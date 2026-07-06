import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryPage } from './query.page';
import { QueryRoutingModule } from './query-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultaDebitoService } from 'src/app/services/consulta-debito/consulta-debito.service';
import { ToolbarModule } from '../toolbar/toolbar.module';

@NgModule({
  declarations: [QueryPage],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    QueryRoutingModule,
    ReactiveFormsModule,
    ToolbarModule,
  ],
  providers: [ConsultaDebitoService],
})
export class QueryModule {}
