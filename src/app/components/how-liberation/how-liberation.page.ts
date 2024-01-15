import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';
import { SetPessoa } from 'src/app/state/registro/registro.action';

@Component({
  selector: 'app-how-liberation',
  templateUrl: './how-liberation.page.html',
  styleUrls: ['./how-liberation.page.scss']
})
export class HowLiberationPage implements OnInit {
  selection:boolean = false;
  optionSelected;
  tiposAtendimentos = [];
  tipoAtendimentoId;
  constructor(
    private store: Store,
    private router: Router,
    private atendimentoService: AtendimentoService
  ) { }

  ngOnInit(): void {
    this.getTipoAtendimento()
  }

  changeSelection(option){

    if(option == 'proprietario'){
      this.selection = true ;
      this.optionSelected = 'proprietario';
      this.tipoAtendimentoId = this.tiposAtendimentos[0].tipoAtendimentoId;
      return
    }
    if(option == 'procurador'){
      this.selection = true ;
      this.optionSelected = 'procurador';
      this.tipoAtendimentoId = this.tiposAtendimentos[1].tipoAtendimentoId;
    }
  }

  getTipoAtendimento(){
    this.atendimentoService.getTipoAtendimento().subscribe((item: any) => {
      // console.log(item);
      this.tiposAtendimentos = item.data;
    })
  }
  saveContact() {
    const tipoAtendimento = this.tiposAtendimentos.find(item => item.descricao)
    const payload = {
      tipoPessoa: this.optionSelected,
      tipoAtendimentoId:this.tipoAtendimentoId
    }
    this.store.dispatch(new SetPessoa(payload));

    // console.log(payload)
    this.router.navigate(['/step'])
  }
}
