import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PixPage } from './pix.page';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PixRoutingModule } from './pix-routing.module';



@NgModule({
  declarations: [PixPage],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    PixRoutingModule

  ]
})
export class PixModule{}
