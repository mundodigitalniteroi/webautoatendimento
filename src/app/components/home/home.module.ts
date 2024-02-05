import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule, HomeRoutingModule],
  declarations: [HomePage],
})
export class HomeModule {}
