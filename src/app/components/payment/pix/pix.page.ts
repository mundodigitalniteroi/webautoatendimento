import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';
import { ConsultaDebitoService } from 'src/app/services/consulta-debito/consulta-debito.service';
import { AuthState } from 'src/app/state/auth/auth.state';
import { ConsultaState } from 'src/app/state/consulta/consulta.state';
import { PrintService } from 'src/app/services/print/print.service';
import { ToastController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-pix',
  templateUrl: './pix.page.html',
  styleUrls: ['./pix.page.scss'],
})
export class PixPage implements OnInit {
  toastController: ToastController;
  modalController: ModalController;
  loading: boolean = false;
  msgError: string;
  error: boolean = false;
  optionsConsulta;
  valorTotal;
  tempo;
  segundos = 120;
  interval;
  options;
  intervalConsultaPix;

  constructor(
    private store: Store,
    private consultaDebitoService: ConsultaDebitoService,
    private router: Router,
    private atendimentoService: AtendimentoService,
    private print: PrintService,
  ) {
    this.print = print;
    this.optionsConsulta = this.store.selectSnapshot(ConsultaState.all);
    this.options = this.store.selectSnapshot(AuthState.all);
    this.valorTotal = this.optionsConsulta?.informacaoPixEstatico?.valorOriginal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    this.interval = setInterval(() => {
      this.tempo = this.formatarTempo(this.segundos);
      this.segundos--;

      if (this.segundos < 0) {
        clearInterval(this.interval);
      }
    }, 1000);

    this.intervalConsultaPix = setInterval(() => {
      this.confirmarPagamento();
    }, 5000);
  }

  ngOnInit(): void { }

  formatarTempo(segundos) {
    segundos %= 3600;
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;

    return `${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
  }

  toast(msg: string) {
    this.toastController.create({
      message: msg,
      duration: 2000,
    }).then((toast) => {
      toast.present();
    });
  }

  confirmarPagamento() {
    this.loading = true;
    this.error = false;
    this.msgError = '';

    const indentifadorFaturamento =
      this.optionsConsulta?.informacoesConsulta?.veiculo?.identificadorFaturamento;

    const identificadorUsuario = this.options?.usuarioDPId;

    if (!indentifadorFaturamento || !identificadorUsuario) {
      this.loading = false;
      this.error = true;
      this.msgError = 'Dados do pagamento não encontrados';
      this.print.toast(this.msgError);
      return;
    }

    this.consultaDebitoService
      .confirmarPagamento(
        indentifadorFaturamento,
        identificadorUsuario
      )
      .subscribe(
        (resp: any) => {
          this.loading = false;

          if (!resp?.faturamento) {
            this.error = true;
            this.msgError = 'Resposta inválida da API';
            this.print.toast(this.msgError);
            return;
          }

          if (resp.faturamento.status === 'P') {
            clearInterval(this.intervalConsultaPix);

            const atendimentoId =
              this.optionsConsulta?.informacoesConsulta?.atendimentoId;

            this.atendimentoService
              .confirmarPagamento(atendimentoId)
              .subscribe(
                () => {
                  this.router.navigate([
                    '/payment-confirmed'
                  ]);
                },
                (erro) => {
                  this.error = true;
                  this.msgError =
                    'Erro ao finalizar atendimento';

                  this.print.toast(this.msgError);
                  console.error(
                    'Erro confirmar atendimento:',
                    erro
                  );
                }
              );
          } else {
            this.msgError =
              'Pagamento ainda não confirmado';
          }
        },
        (erro) => {
          this.loading = false;
          this.error = true;
          this.msgError =
            'Erro ao consultar pagamento';

          this.print.toast(this.msgError);
          console.error(
            'Erro confirmarPagamento:',
            erro
          );
        }
      );
  }
}
