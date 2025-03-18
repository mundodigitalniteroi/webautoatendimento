import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ConsultaDebitoService } from 'src/app/services/consulta-debito/consulta-debito.service';
import { PrintService } from 'src/app/services/print/print.service';
import { SumupIntegracaoService } from 'src/app/services/sumup-integracao/sumup-integracao.service';
import { ConsultaState } from 'src/app/state/consulta/consulta.state';

@Component({
  selector: 'app-payment-confirmed',
  templateUrl: './payment-confirmed.page.html',
  styleUrls: ['./payment-confirmed.page.scss'],
})
export class PaymentConfirmedPage implements OnInit {
  optionsConsulta;
  identificadorProcesso;
  imprimindo = false;

  constructor(private store: Store,private sumupIntegracaoService: SumupIntegracaoService, private service: ConsultaDebitoService, private print: PrintService) {
    this.optionsConsulta = this.store.selectSnapshot(ConsultaState.all);
    this.identificadorProcesso = this.optionsConsulta.informacoesConsulta.veiculo.identificadorProcesso;
  }

  ngOnInit() { }

  async imprimirComprovante() {
    try {
      this.imprimindo = true;
      if(localStorage.getItem('client_transaction_id')){
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
    this.service.guiaLiberacao(this.identificadorProcesso).subscribe(
      (dados: any) => {
        this.print.printGuiaLiberacao(dados);
        this.imprimindo = false;
      },
      () => {
        this.print.toast('Não foi possível imprimir a Guia de Liberação');
        this.imprimindo = false;
      }
    );
  }
}