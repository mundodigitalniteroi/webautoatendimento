import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';
import { PrintService } from 'src/app/services/print/print.service';
import { AtendimentoState } from 'src/app/state/atendimento/atendimento.state';

@Component({
  selector: 'app-protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.scss'],
})
export class ProtocolComponent implements OnInit {
  loading: boolean = false;
  msgError: string;
  error: boolean = false;
  protocolo = 'SG001';

  constructor(
    private store: Store,
    private print: PrintService,
    private atendimento: AtendimentoService
  ) {}

  ngOnInit(): void {}

  ionViewWillEnter() {
    this.protocolo = null;
    this.gerarNovoProtocolo();
  }

gerarNovoProtocolo() {
  this.loading = true;
  this.error = false;
  this.msgError = '';

  this.atendimento
    .gerarProtocoloAtendimento()
    .subscribe(
      (resp: any) => {
        this.loading = false;

        if (!resp?.data?.protocolo) {
          this.error = true;
          this.msgError =
            'Não foi possível gerar o protocolo';

          this.print.toast(this.msgError);
          return;
        }

        this.protocolo = resp.data.protocolo;
        this.imprimir(this.protocolo);
      },
      (erro) => {
        this.loading = false;
        this.error = true;
        this.msgError =
          'Erro ao gerar novo protocolo';

        this.print.toast(this.msgError);
        console.error(
          'Erro gerarNovoProtocolo:',
          erro
        );
      }
    );
}

  imprimir(protocolo) {
    this.print.printProtocolo(protocolo);
  }
}
