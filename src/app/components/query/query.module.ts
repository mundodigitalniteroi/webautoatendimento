import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryPage } from './query.page';
import { QueryRoutingModule } from './query-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultaDebitoService } from 'src/app/services/consulta-debito/consulta-debito.service';


@NgModule({
  declarations: [QueryPage],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    QueryRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ConsultaDebitoService]
})
export class QueryModule { }
