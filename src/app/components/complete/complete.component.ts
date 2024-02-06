import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { PrintService } from 'src/app/services/print/print.service';
import { AtendimentoState } from 'src/app/state/atendimento/atendimento.state';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss'],
})
export class CompleteComponent implements OnInit {
  options;

  constructor(private store: Store, private print: PrintService) {
    this.options = this.store.selectSnapshot(AtendimentoState.all);
    this.imprimir();
  }

  ngOnInit(): void {}

  imprimir() {
    const protocolo = this.options.protocolo;
    this.print.printProtocolo(protocolo);
  }
}
