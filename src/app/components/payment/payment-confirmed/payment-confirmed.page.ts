import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { StateClear } from 'ngxs-reset-plugin';
import { ConsultaDebitoService } from 'src/app/services/consulta-debito/consulta-debito.service';
import { PrintService } from 'src/app/services/print/print.service';
import { SumupIntegracaoService } from 'src/app/services/sumup-integracao/sumup-integracao.service';
import { AuthState } from 'src/app/state/auth/auth.state';
import { ConsultaState } from 'src/app/state/consulta/consulta.state';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-payment-confirmed',
  templateUrl: './payment-confirmed.page.html',
  styleUrls: ['./payment-confirmed.page.scss'],
})
export class PaymentConfirmedPage implements OnInit, OnDestroy {
  toastController: ToastController;
  loading: boolean = false;
  msgError: string;
  error: boolean = false;
  optionsConsulta;
  identificadorProcesso;
  imprimindo = false;
  private timeoutId: any;
  tipoPagamento: string = '';

  constructor(private store: Store, private router: Router, private sumupIntegracaoService: SumupIntegracaoService, private service: ConsultaDebitoService, private print: PrintService) {
    this.optionsConsulta = this.store.selectSnapshot(ConsultaState.all);
    this.identificadorProcesso = this.optionsConsulta.informacoesConsulta.veiculo.identificadorProcesso;
    this.tipoPagamento = this.optionsConsulta.informacaoTipoPagamento;
  }

  ngOnInit() {
    // Configura o timer de 40 segundos
    this.timeoutId = setTimeout(() => {
      this.irParaHome();
    }, 40000);
  }

  toast(msg: string) {
    this.toastController.create({
      message: msg,
      duration: 2000,
    }).then((toast) => {
      toast.present();
    });
  }

  ngOnDestroy() {
    // Limpa o timer quando o componente for destruído

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  async imprimirComprovante() {
    try {
      this.imprimindo = true;
      if (localStorage.getItem('client_transaction_id')) {
        const response = await this.sumupIntegracaoService.getTransaction(localStorage.getItem('client_transaction_id'));
        await this.print.printComprovante(response);
        this.imprimindo = false;
      }
    } catch (error) {
      console.error('Erro ao imprimir:', error);
      this.imprimindo = false;
    }
  }
  imprimirGuia() {
    this.imprimindo = true;
    this.error = false;
    this.msgError = '';

    if (!this.identificadorProcesso) {
      this.imprimindo = false;
      this.error = true;
      this.msgError = 'Processo não identificado';
      this.toast(this.msgError);
      return;
    }

    this.service.guiaLiberacao(this.identificadorProcesso).subscribe(
      (dados: any) => {
        this.imprimindo = false;

        if (!dados) {
          this.error = true;
          this.msgError = 'Guia não encontrada';
          this.toast(this.msgError);
          return;
        }

        this.print.printGuiaLiberacao(dados);
      },
      (erro) => {
        this.imprimindo = false;
        this.error = true;
        this.msgError = 'Não foi possível imprimir a Guia de Liberação';

        this.toast(this.msgError);
        console.error('Erro imprimirGuia:', erro);
      }
    );
  }

  irParaHome() {
    this.store.dispatch(new StateClear(AuthState));
    this.router.navigate(['/home']);
  }
}