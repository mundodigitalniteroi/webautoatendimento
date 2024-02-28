import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { HomeRoutingModule } from './home-routing.module';
// import { DocumentScanner } from '@ionic-native/document-scanner/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule, HomeRoutingModule],
  declarations: [HomePage],
  providers: [Diagnostic],
})
export class HomeModule {}
