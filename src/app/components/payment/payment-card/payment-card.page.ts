import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { CreateCheckoutRequest } from 'src/app/interfaces/sumup.interface';
import { SumupIntegracaoService } from 'src/app/services/sumup-integracao/sumup-integracao.service';
import { ConsultaState } from 'src/app/state/consulta/consulta.state';
import { ConsultaDebitoService } from 'src/app/services/consulta-debito/consulta-debito.service';
import { PlanoParcelamento } from 'src/app/interfaces/consulta.interface';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute } from '@angular/router';
import { App } from '@capacitor/app';
import { SignalRService } from 'src/app/services/signalr/signalr.service';
import { ToastController, AlertController } from '@ionic/angular';
import { SetParcelaSelecionada } from 'src/app/state/consulta/consulta.action';

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
  returnUrlPayment = environment.urlApiAtendimento;
  websocket: WebSocket;
  isLoading = false;
  showErrorAlert = false;
  @ViewChild('paymentAlert') paymentAlert: any;

  alertButtons = [
    {
      text: 'Fechar',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
  ];

  

  constructor(
    private store: Store,
    private sumupIntegracaoService: SumupIntegracaoService,
    private signalR: SignalRService,
    private consultaDebitoService: ConsultaDebitoService,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {
    this.informacaoDebito = this.store.selectSnapshot(state => state.consulta.informacaoDebito);
    console.log("informacaoDebito", this.informacaoDebito)
    this.consultaDebitoService
      .consultarParcelamento(this.informacaoDebito.faturamento.valorFaturado, 1, localStorage.getItem('authTokenParcelas'))
      .subscribe((parcelas) => {
        this.parcelamentoDados = parcelas;
      })

    this.activateRouter.queryParams.subscribe(async params => {
      if (params['paymentError'] === 'true') {
        this.presentAlert()
      }
    });
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      header: 'Erro no Pagamento',
      message: 'Houve um erro ao concluir a transação. Por favor, tente novamente.',
      buttons: ['Fechar'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
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
          value: Math.trunc(this.parcelaSelecionada.valorTotal * 100),
          currency: 'BRL',
          minor_unit: 2
        },
        installments: this.parcelaSelecionada.parcela,
        card_type: 'credit',
        description: this.informacaoDebito.veiculo.marcaModelo.marcaModelo,
        return_url: `${this.returnUrlPayment}/sumupwebhook`
      }
      this.store.dispatch(new SetParcelaSelecionada(this.parcelaSelecionada));
    }

    try {
      await this.sumupIntegracaoService.createCheckout(this.data, localStorage.getItem('reader_id'));
      if (localStorage.getItem('client_transaction_id') && localStorage.getItem('client_transaction_id') !== undefined) {
        this.signalR.receivePayment(localStorage.getItem('client_transaction_id'));
        this.router.navigate(['/payment-wait']);
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
