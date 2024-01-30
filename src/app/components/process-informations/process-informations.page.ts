import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { RegistroState } from 'src/app/state/registro/registro.state';
import * as moment from 'moment';
import 'moment/locale/pt-br';
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

    this.informations.dataHoraGuarda = moment(this.informations.dataHoraGuarda).format('DD/MM/YYYY HH:mm');
    // console.log(this.informations)
    // this.informations?.debitos.forEach(item => {
    //   this.valorTotal += item.valorTotal;
    // }) 
    this.valorTotal = this.limitarDuasCasasDecimais(this.valorTotal);
  
  }

  ngOnInit(): void {
  }

  limitarDuasCasasDecimais(numero) {
    return parseFloat(numero.toString().match(/^\d+(?:\.\d{0,2})?/));
}

formatarNumero(numero: number): string {
  if (!isNaN(numero)) {
    return numero.toString().replace('.', ',');
  } else {
    return 'Número inválido';
  }
  }
}
