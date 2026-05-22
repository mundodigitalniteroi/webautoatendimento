import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PlanoParcelamento } from 'src/app/interfaces/consulta.interface';
import { environment } from 'src/environments/environment.prod';
import * as signalR from '@microsoft/signalr';
import { SignalRService } from 'src/app/services/signalr/signalr.service';
import { Subscription } from 'rxjs';
import { ConsultaDebitoService } from 'src/app/services/consulta-debito/consulta-debito.service';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';
import { Store } from '@ngxs/store';
import { ConsultaState } from 'src/app/state/consulta/consulta.state';
import { AuthState } from 'src/app/state/auth/auth.state';
import { SumupIntegracaoService } from 'src/app/services/sumup-integracao/sumup-integracao.service';
import { Bandeira, CartaoRequest } from 'src/app/interfaces/pagamento.interface';
import { DiariasReboqueRequest } from 'src/app/interfaces/atendimento.interface';
import { AtendimentoState } from 'src/app/state/atendimento/atendimento.state';
import { PrintService } from 'src/app/services/print/print.service';

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
  optionsConsulta;
  options;
  atendimento;

  constructor(private print: PrintService, private signalRService: SignalRService, private sumupIntegracaoService: SumupIntegracaoService, private store: Store, private atendimentoService: AtendimentoService, private consultaDebitoService: ConsultaDebitoService, private router: Router) {
  }

  ngOnInit() {
    this.optionsConsulta = this.store.selectSnapshot(ConsultaState.all);
    this.options = this.store.selectSnapshot(AuthState.all);
    this.atendimento = this.store.selectSnapshot(AtendimentoState.all);
    this.subscription = this.signalRService.paymentStatus$.subscribe(async (payload) => {
      if (payload.status.toLowerCase() === 'successful') {
        try {
          await this.confirmarPagamento();
        } catch (error) {
          console.error('Erro na navegação:', error);
        }
      }
      else {
        await this.router.navigate(['/payment-card'], {
          queryParams: { paymentError: true }
        });
      }
    });
  }

  mapearBandeira(bandeiraString: string): Bandeira {
    const bandeiraNormalizada = bandeiraString.toUpperCase();
    switch (bandeiraNormalizada) {
      case "AMEX":
        return Bandeira.AmericanExpress;
      case "DINERS":
        return Bandeira.Diners;
      case "HIPERCARD":
        return Bandeira.Hipercard;
      case "MASTERCARD":
        return Bandeira.MasterCard;
      case "VISA":
        return Bandeira.Visa;
      case "ELO":
        return Bandeira.Elo;
      default:
        throw new Error(`Bandeira desconhecida: ${bandeiraString}`);
    }
  }

  async confirmarPagamento() {
    try {
      const indentifadorFaturamento =
        this.optionsConsulta.informacoesConsulta.veiculo.identificadorFaturamento;

      const identificadorUsuario = this.options.usuarioDPId;

      const transacaoResponse =
        await this.sumupIntegracaoService.getTransaction(
          localStorage.getItem('client_transaction_id')
        );

      const cartaoDados: CartaoRequest = {
        bandeira: this.mapearBandeira(transacaoResponse.card.type),
        numeroCartao: '****' + transacaoResponse.card.last_4_digits,
        codigoAutorizacao: transacaoResponse.auth_code
      };

      this.consultaDebitoService
        .alterarFormaPagamento(
          indentifadorFaturamento,
          identificadorUsuario,
          10
        )
        .subscribe(
          () => {
            this.consultaDebitoService
              .confirmarPagamentoCartao(
                indentifadorFaturamento,
                identificadorUsuario,
                cartaoDados
              )
              .subscribe(
                (resp: any) => {
                  if (resp?.faturamento?.status === 'P') {
                    const atendimentoId =
                      this.optionsConsulta.informacoesConsulta.atendimentoId;

                    const composicaoValues =
                      this.atendimento.informacaoConsulta.faturamento.listagemServico.map(
                        (composicao: any) => ({
                          descricao: composicao.nomeServico,
                          valor: composicao.valorFaturado
                        })
                      );

                    const diariasRequest: DiariasReboqueRequest = {
                      valor:
                        this.atendimento.informacaoConsulta.faturamento
                          .valorFaturado,
                      parcela:
                        this.optionsConsulta
                          .informacaoParcelaSelecionada.parcela,
                      referenciaExterna:
                        this.atendimento.informacaoConsulta
                          .identificadorProcesso,
                      cartao: {
                        bandeiraCartao: transacaoResponse.card.type,
                        codTransacao:
                          transacaoResponse.transaction_code,
                        numCartao: cartaoDados.numeroCartao,
                        codAutorizacao:
                          cartaoDados.codigoAutorizacao,
                        nsu: ''
                      },
                      cliente: {
                        cpfCnpj: this.atendimento.proprietario.cpf,
                        nome: this.atendimento.proprietario.nome
                      },
                      composicao: composicaoValues
                    };

                    this.atendimentoService
                      .confirmarPagamento(atendimentoId)
                      .subscribe(
                        () => {
                          this.consultaDebitoService
                            .diariasReboque(
                              diariasRequest,
                              localStorage.getItem(
                                'authTokenParcelas'
                              )
                            )
                            .subscribe(
                              () => { },
                              () => {
                                console.error(
                                  'Erro ao enviar diárias/reboque'
                                );
                              }
                            );

                          this.router.navigate([
                            '/payment-confirmed'
                          ]);
                        },
                        () => {
                          this.print.toast(
                            'Erro ao confirmar pagamento'
                          );
                        }
                      );
                  } else {
                    this.print.toast(
                      'Pagamento ainda não confirmado. Tente novamente.'
                    );
                  }
                },
                () => {
                  this.print.toast(
                    'Erro ao confirmar pagamento no cartão'
                  );
                }
              );
          },
          () => {
            this.print.toast(
              'Erro ao alterar forma de pagamento'
            );
          }
        );
    } catch (error) {
      console.error(error);

      this.print.toast(
        'Erro ao consultar transação do pagamento'
      );
    }
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
