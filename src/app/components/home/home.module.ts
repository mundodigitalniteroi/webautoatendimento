import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { HomeRoutingModule } from './home-routing.module';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SumupIntegracaoService } from 'src/app/services/sumup-integracao/sumup-integracao.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, IonicModule,HttpClientModule, FormsModule, HomeRoutingModule],
  declarations: [HomePage],
  providers: [Diagnostic,InAppBrowser,SumupIntegracaoService],
})
export class HomeModule {}
