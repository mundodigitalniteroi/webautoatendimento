import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PlanoParcelamento } from 'src/app/interfaces/consulta.interface';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-payment-wait',
  templateUrl: './payment-wait.component.html',
  styleUrls: ['./payment-wait.component.scss'],
})
export class PaymentWaitComponent implements OnInit, OnDestroy {
  parcelaSelecionada: PlanoParcelamento;
  tipoPagamento: string;
  websocket: WebSocket;
  transactionId: string;
  webhookCheckInterval: any;
  urlReturnPayment = environment.urlReturnPayment;

  constructor(private router: Router) {
    this.transactionId = localStorage.getItem('current_transaction_id');
  }

  ngOnInit() {
    this.webhookCheckInterval = setInterval(() => {
      this.checkWebhookStatus();
    }, 3000);
  }

  ngOnDestroy() {
    if (this.webhookCheckInterval) {
      clearInterval(this.webhookCheckInterval);
    }
  }

  async checkWebhookStatus() {
    try {
      const response = await fetch(`${this.urlReturnPayment}/webhooks`);
      const data = await response.json();
      
      if (data && Array.isArray(data) && data.length > 0) {
        // Pegar o webhook mais recente
        const latestWebhook = data[data.length - 1];
        
        console.log('Último webhook recebido:', latestWebhook);
        
        // Verificar se o webhook corresponde ao transaction ID atual
        if (latestWebhook.payload && 
            latestWebhook.payload.client_transaction_id === this.transactionId) {
          
          if (latestWebhook.payload.status === 'successful') {
            // Navegar para a tela de confirmação
            clearInterval(this.webhookCheckInterval);
            this.router.navigate(['/payment-confirmed']);
          } 
          // else if (latestWebhook.payload.status === 'failed') {
          //   // Navegar para uma tela de erro
          //   this.router.navigate(['/payment-failed']);
          //   clearInterval(this.webhookCheckInterval);
          // }
        }
      }
    } catch (error) {
      console.error('Erro ao verificar status do webhook:', error);
    }
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
