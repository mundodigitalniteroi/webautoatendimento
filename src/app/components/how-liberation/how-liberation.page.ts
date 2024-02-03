import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';
import { SetTipoAtendimento } from 'src/app/state/atendimento/atendimento.action';

@Component({
  selector: 'app-how-liberation',
  templateUrl: './how-liberation.page.html',
  styleUrls: ['./how-liberation.page.scss'],
})
export class HowLiberationPage implements OnInit {
  selection: boolean = false;
  optionSelected;
  tiposAtendimentos = [];
  tipoAtendimentoId;
  constructor(
    private store: Store,
    private router: Router,
    private atendimentoService: AtendimentoService
  ) {}

  ngOnInit(): void {
    this.getTipoAtendimento();
  }

  changeSelection(option) {
    this.selection = true;
    this.optionSelected = option;
    const tipoAtendimento = this.tiposAtendimentos.find(
      (item) => item.descricao == option
    );
    this.tipoAtendimentoId = tipoAtendimento?.tipoAtendimentoId || 1;
  }

  getTipoAtendimento() {
    this.atendimentoService.getTipoAtendimento().subscribe((item: any) => {
      // // console.log(item);
      this.tiposAtendimentos = item.data;
    });
  }

  saveContact() {
    const payload = {
      tipoAtendimento: this.optionSelected,
      tipoAtendimentoId: this.tipoAtendimentoId,
    };
    this.store.dispatch(new SetTipoAtendimento(payload));

    // // console.log(payload)
    this.router.navigate(['/identity']);
  }
}
