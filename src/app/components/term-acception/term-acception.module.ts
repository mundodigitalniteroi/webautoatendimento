import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermAcceptionPageRoutingModule } from './term-acception-routing.module';

import { TermAcceptionPage } from './term-acception.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermAcceptionPageRoutingModule
  ],
  declarations: [TermAcceptionPage]
})
export class TermAcceptionPageModule {}
