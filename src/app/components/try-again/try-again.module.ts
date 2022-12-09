import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TryAgainPageRoutingModule } from './try-again-routing.module';

import { TryAgainPage } from './try-again.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TryAgainPageRoutingModule
  ],
  declarations: [TryAgainPage]
})
export class TryAgainPageModule {}
