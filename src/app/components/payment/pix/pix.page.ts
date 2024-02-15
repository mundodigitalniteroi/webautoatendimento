import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ConsultaState } from 'src/app/state/consulta/consulta.state';

@Component({
  selector: 'app-pix',
  templateUrl: './pix.page.html',
  styleUrls: ['./pix.page.scss']
})
export class PixPage implements OnInit {
  optionsConsulta;
  valorTotal;
  constructor(
    private store: Store
  ) {
    this.optionsConsulta = this.store.selectSnapshot(ConsultaState.all);
    this.valorTotal = this.optionsConsulta?.informacaoPixEstatico?.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
   }

  ngOnInit(): void {
    
  }

}
