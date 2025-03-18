import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PlanoParcelamento } from 'src/app/interfaces/consulta.interface';
import { environment } from 'src/environments/environment.prod';
import * as signalR from '@microsoft/signalr';
import { SignalRService } from 'src/app/services/signalr/signalr.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment-wait',
  templateUrl: './payment-wait.component.html',
  styleUrls: ['./payment-wait.component.scss'],
})
export class PaymentWaitComponent implements OnInit, OnDestroy {
  parcelaSelecionada: PlanoParcelamento;
  transactionId: string;
  urlReturnPayment = environment.urlApiAtendimento;
  private subscription: Subscription;

  constructor(private signalRService: SignalRService, private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.signalRService.paymentStatus$.subscribe(async (payload) => {
      console.log("payload", payload.status)
      if (payload.status.toLowerCase() === 'successful') {
        try {
          // Opcional: aguardar um pequeno delay
          await new Promise(resolve => setTimeout(resolve, 100));
          await this.router.navigate(['/payment-confirmed']);
        } catch (error) {
          console.error('Erro na navegação:', error);
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }





  goToHome() {
    this.router.navigate(['/home']);
  }
}
