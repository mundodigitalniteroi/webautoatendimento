import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { RegistroState } from 'src/app/state/registro/registro.state';

@Component({
  selector: 'app-process-informations',
  templateUrl: './process-informations.page.html',
  styleUrls: ['./process-informations.page.scss']
})
export class ProcessInformationsPage implements OnInit {
  options;
  informations;
  valorTotal = 0;
  constructor(
    private store: Store,
  ) {
    this.options = this.store.selectSnapshot(RegistroState.all);
    this.informations = this.options?.informacaoConsulta;
    // console.log(this.options)
    this.informations?.debitos.forEach(item => {
      this.valorTotal += item.valorTotal;
    }) 
    this.valorTotal = this.limitarDuasCasasDecimais(this.valorTotal);
  
  }

  ngOnInit(): void {
  }

  limitarDuasCasasDecimais(numero) {
    return parseFloat(numero.toString().match(/^\d+(?:\.\d{0,2})?/));
}
}
