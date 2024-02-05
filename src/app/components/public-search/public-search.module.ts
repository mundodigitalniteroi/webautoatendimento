import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicSearchPage } from './public-search.page';
import { PublicSearchRoutingModule } from './public-search-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultaDebitoService } from 'src/app/services/consulta-debito/consulta-debito.service';
import { ToolbarModule } from '../toolbar/toolbar.module';

@NgModule({
  declarations: [PublicSearchPage],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    PublicSearchRoutingModule,
    ReactiveFormsModule,
    ToolbarModule,
  ],
  providers: [ConsultaDebitoService],
})
export class PublicSearchModule {}
