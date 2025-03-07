import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CreateCheckoutRequest } from 'src/app/interfaces/sumup.interface';
import { SumupIntegracaoService } from 'src/app/services/sumup-integracao/sumup-integracao.service';
import { ConsultaState } from 'src/app/state/consulta/consulta.state';

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
  credit = false;
  debito = false;
  data: CreateCheckoutRequest;
  parcelas: Parcela[] =
    [
      { numeroParcelas: '12x', valor: 'R$ 34,17', valorTotal: 'R$ 410,00' },
      { numeroParcelas: '11x', valor: 'R$ 37,27', valorTotal: 'R$ 410,00' },
      { numeroParcelas: '10x', valor: 'R$ 41,00', valorTotal: 'R$ 410,00' },
      { numeroParcelas: '9x', valor: 'R$ 45,56', valorTotal: 'R$ 410,00' },
      { numeroParcelas: '8x', valor: 'R$ 51,25', valorTotal: 'R$ 410,00' },
      { numeroParcelas: '7x', valor: 'R$ 58,57', valorTotal: 'R$ 410,00' },
      { numeroParcelas: '6x', valor: 'R$ 68,33', valorTotal: 'R$ 410,00' },
      { numeroParcelas: '5x', valor: 'R$ 82,00', valorTotal: 'R$ 410,00' },
      { numeroParcelas: '4x', valor: 'R$ 102,50', valorTotal: 'R$ 410,00' },
      { numeroParcelas: '3x', valor: 'R$ 136,67', valorTotal: 'R$ 410,00' },
      { numeroParcelas: '2x', valor: 'R$ 205,00', valorTotal: 'R$ 410,00' },
      { numeroParcelas: '1x', valor: 'R$ 410,00', valorTotal: 'R$ 410,00' },
    ]

  constructor(private store: Store,private sumupIntegracaoService: SumupIntegracaoService) { }

  ngOnInit(): void {
    const informacaoDebito = this.store.selectSnapshot(state => state.consulta.informacaoDebito);
  }

  parcelaSelecionada: Parcela = null; // Armazena o item selecionado

  selecionarParcela(item: Parcela) {
    this.parcelaSelecionada = item; // Atualiza a variável com o item clicado
    console.log('Parcela selecionada:', this.parcelaSelecionada); // Para depuração
  }

  async pay() {
    if (this.credit) {
      this.data = {
        total_amount: {
          value: Math.trunc(Number(this.parcelaSelecionada.valor.split(' ')[1].replace(',', '.')) * 100),
          currency: 'BRL',
          minor_unit: 2
        },
        installments: Number(this.parcelaSelecionada.numeroParcelas.replace('x', '')),
        card_type: 'credit',
        description: 'Pagamento',
        return_url: 'https://4f29-2804-d41-ab26-9900-f462-4f16-6010-6b29.ngrok-free.app/webhook'
      }
    }
    else if (this.debito) {
      this.data = {
        total_amount: {
          value: Math.trunc(Number(this.parcelas[0].valorTotal.split(' ')[1].replace(',', '.')) * 100),
          currency: 'BRL',
          minor_unit: 2
        },
        card_type: 'debit',
        description: 'Pagamento',
        return_url:'https://4f29-2804-d41-ab26-9900-f462-4f16-6010-6b29.ngrok-free.app/webhook'
      }
    }
    const response = await this.sumupIntegracaoService.createCheckout(this.data, localStorage.getItem('reader_id'))
    if(response.data.client_transaction_id){

    }
  }

  
  cardSelected(type) {
    if (type == 'credito') { this.credit = true; this.debito = false; }
    if (type == 'debito') { this.debito = true; this.credit = false; }
  }
}
