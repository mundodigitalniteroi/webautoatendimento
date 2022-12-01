import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicSearchPage } from './public-search.page';
import { PublicSearchRoutingModule } from './public-search-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [PublicSearchPage],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    PublicSearchRoutingModule
  ]
})
export class PublicSearchModule { }
