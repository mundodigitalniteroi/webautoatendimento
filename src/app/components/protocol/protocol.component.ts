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
  loading;
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
    this.atendimento.gerarProtocoloAtendimento().subscribe((resp: any) => {
      this.protocolo = resp.data.protocolo;
      this.imprimir(resp.data.protocolo);
      this.loading = false;
    });
  }

  imprimir(protocolo) {
    this.print.printProtocolo(protocolo);
  }
}
