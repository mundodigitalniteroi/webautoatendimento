import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AtendimentoState } from 'src/app/state/atendimento/atendimento.state';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent implements OnInit {
  options;

  constructor(private store: Store) {
    this.options = this.store.selectSnapshot(AtendimentoState.all);
    // // console.log(this.options)
  }

  ngOnInit(): void {}
}
