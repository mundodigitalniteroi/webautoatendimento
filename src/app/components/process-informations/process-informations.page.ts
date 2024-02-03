import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AtendimentoState } from 'src/app/state/atendimento/atendimento.state';
import * as moment from 'moment';
import 'moment/locale/pt-br';
@Component({
  selector: 'app-process-informations',
  templateUrl: './process-informations.page.html',
  styleUrls: ['./process-informations.page.scss'],
})
export class ProcessInformationsPage implements OnInit {
  options;
  informations;
  valorTotal = 0;
  constructor(private store: Store) {
    this.options = this.store.selectSnapshot(AtendimentoState.all);
    this.informations = this.options?.informacaoConsulta;
  }

  ngOnInit(): void {}
}
