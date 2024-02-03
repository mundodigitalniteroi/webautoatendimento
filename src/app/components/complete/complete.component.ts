import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FinalizarAtendimento } from 'src/app/state/atendimento/atendimento.action';
import { AtendimentoState } from 'src/app/state/atendimento/atendimento.state';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss'],
})
export class CompleteComponent implements OnInit {
  options;

  constructor(private store: Store) {
    this.options = this.store.selectSnapshot(AtendimentoState.all);
    // // console.log(this.options)
  }

  ngOnInit(): void {}

  imprimir() {
    this.store.dispatch(new FinalizarAtendimento({}));
  }
}
