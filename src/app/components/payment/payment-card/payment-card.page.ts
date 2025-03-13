import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CreateCheckoutRequest } from 'src/app/interfaces/sumup.interface';
import { SumupIntegracaoService } from 'src/app/services/sumup-integracao/sumup-integracao.service';
import { ConsultaState } from 'src/app/state/consulta/consulta.state';
import { ConsultaDebitoService } from 'src/app/services/consulta-debito/consulta-debito.service';
import { PlanoParcelamento } from 'src/app/interfaces/consulta.interface';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { App } from '@capacitor/app';

interface Parcela {
  numeroParcelas: string;
  valor: string;
  valorTotal: string;
}

@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.page.html',
  styleUrls: ['./payment-card.page.scss']
})

export class PaymentCardPage implements OnInit {
  credit = true;
  debito = false;
  data: CreateCheckoutRequest;
  informacaoDebito: any;
  parcelamentoDados: PlanoParcelamento[] = []
  returnUrlPayment =  environment.urlReturnPayment;
  websocket: WebSocket;
  isLoading = false;
  

  constructor(
    private store: Store, 
    private sumupIntegracaoService: SumupIntegracaoService, 
    private consultaDebitoService: ConsultaDebitoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.informacaoDebito = this.store.selectSnapshot(state => state.consulta.informacaoDebito);
    console.log("informacaoDebito", this.informacaoDebito)
    this.consultaDebitoService
    .consultarParcelamento(this.informacaoDebito.faturamento.valorFaturado, 1, localStorage.getItem('authTokenParcelas'))
    .subscribe((parcelas)=>{
      this.parcelamentoDados = parcelas;
    })

    App.addListener('appUrlOpen', (event) => {
      const url = new URL(event.url);
      console.log("Url", url)
      if (url.host === 'payment-callback' && url.protocol === 'sumupmobile:') {
        this.router.navigate(['/payment-confirmed']);
      }
    })
  }

  parcelaSelecionada: PlanoParcelamento = null; // Armazena o item selecionado

  selecionarParcela(item: PlanoParcelamento) {
    this.parcelaSelecionada = item; // Atualiza a variável com o item clicado
  }

  async pay() {
    this.isLoading = true;
    
    if (this.credit) {
      this.data = {
        total_amount: {
          value: Math.trunc(this.parcelaSelecionada.valorMensal * 100),
          currency: 'BRL',
          minor_unit: 2
        },
        installments: this.parcelaSelecionada.parcela,
        card_type: 'credit',
        description: 'Pagamento',
        return_url: `${this.returnUrlPayment}/webhook`
      }
    }
    else if (this.debito) {
      this.parcelaSelecionada = this.parcelamentoDados[11]
      this.data = {
        total_amount: {
          value: Math.trunc(this.parcelaSelecionada.valorMensal * 100),
          currency: 'BRL',
          minor_unit: 2
        },
        card_type: 'debit',
        description: 'Pagamento',
        return_url: `${this.returnUrlPayment}/webhook`
      }
    }
    
    try {
      const response = await this.sumupIntegracaoService.createCheckout(this.data, localStorage.getItem('reader_id'));
      
      if (response && response.currentStatus === "SUCCESSFUL") {
        this.router.navigate(['/payment-confirmed']);
      } else {
        console.log('Payment status:', response?.currentStatus);
      }
    } catch (error) {
      console.error('Error during payment:', error);
    } finally {
      this.isLoading = false;
    }
  }

 


  cardSelected(type) {
    if (type == 'credito') { this.credit = true; this.debito = false; }
    if (type == 'debito') { this.debito = true; this.credit = false; }
  }
}
