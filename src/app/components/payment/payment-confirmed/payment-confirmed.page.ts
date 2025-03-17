import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Comprovante } from 'src/app/interfaces/comprovante.interface';
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
  optionsConsulta: any = [];
  identificadorProcesso: any = [];
  imprimindo = false;
  client_transaction_id = localStorage.getItem('client_transaction_id')

  constructor(private store: Store, private service: ConsultaDebitoService, private sumupIntegracaoService: SumupIntegracaoService, private print: PrintService) {

  }

  ngOnInit() {
    this.optionsConsulta = this.store.selectSnapshot(ConsultaState.all);
    console.log("consultas",this.optionsConsulta)
    this.identificadorProcesso = this.optionsConsulta.informacoesConsulta.veiculo.identificadorProcesso;
    console.log("identificador",this.identificadorProcesso)
  }

  imprimirComprovante() {
    this.imprimindo = true;
    this.sumupIntegracaoService.getTransaction(this.client_transaction_id).then((data: Comprovante) => {
      console.log(data)
      this.print.printComprovante(data);
      this.imprimindo = false;
    }).catch((err: any) => console.log(err))

    // if (localStorage.getItem('client_transaction_id')) {
    //   const response = await this.sumupIntegracaoService.getTransaction(localStorage.getItem('client_transaction_id'))
    //   this.print.printComprovante(response); 
    //   this.imprimindo = false;
    // }
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
