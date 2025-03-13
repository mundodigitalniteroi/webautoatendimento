import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PlanoParcelamento } from 'src/app/interfaces/consulta.interface';
import { environment } from 'src/environments/environment.prod';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-payment-wait',
  templateUrl: './payment-wait.component.html',
  styleUrls: ['./payment-wait.component.scss'],
})
export class PaymentWaitComponent implements OnInit, OnDestroy {
  parcelaSelecionada: PlanoParcelamento;
  transactionId: string;
  urlReturnPayment = environment.urlReturnPayment;

  constructor(private router: Router) {
    this.transactionId = localStorage.getItem('current_transaction_id');
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    
  }

 

  

  goToHome() {
    this.router.navigate(['/home']);
  }
}
