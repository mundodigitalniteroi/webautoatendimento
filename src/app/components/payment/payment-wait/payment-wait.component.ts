import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PlanoParcelamento } from 'src/app/interfaces/consulta.interface';
import { environment } from 'src/environments/environment.prod';
import * as signalR from '@microsoft/signalr';
import { SignalRService } from 'src/app/services/signalr/signalr.service';

@Component({
  selector: 'app-payment-wait',
  templateUrl: './payment-wait.component.html',
  styleUrls: ['./payment-wait.component.scss'],
})
export class PaymentWaitComponent implements OnInit, OnDestroy {
  parcelaSelecionada: PlanoParcelamento;
  transactionId: string;
  urlReturnPayment = environment.urlReturnPayment;

  constructor(private signalRService: SignalRService, private router: Router) {
  }

  ngOnInit() {
    this.signalRService.paymentStatus$.subscribe((payload) => {
      console.log("payload", payload.status)
      if (payload.status.toLowerCase() === 'successful') {
        this.router.navigate(['/payment-confirmed']);
      }
    })
  }

  ngOnDestroy() {

  }





  goToHome() {
    this.router.navigate(['/home']);
  }
}
