import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PaymentCardPage } from './payment-card.page';
import { PaymentCardRoutingModule } from './payment-card-routing.module';
import { SumupIntegracaoService } from 'src/app/services/sumup-integracao/sumup-integracao.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  declarations: [PaymentCardPage],
  imports: [
    CommonModule,
    PaymentCardRoutingModule,
    IonicModule,
    FormsModule,
  ],
  providers:[InAppBrowser,SumupIntegracaoService]
})
export class PaymentCardModule { }
