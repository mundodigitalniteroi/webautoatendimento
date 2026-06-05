import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';
import { SetTipoAtendimento } from 'src/app/state/atendimento/atendimento.action';
import { ModalController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-how-liberation',
  templateUrl: './how-liberation.page.html',
  styleUrls: ['./how-liberation.page.scss'],
})
export class HowLiberationPage implements OnInit {
  toastController: ToastController;
  modalController: ModalController;
  selection: boolean = false;
  optionSelected;
  tiposAtendimentos = [];
  tipoAtendimentoId;
  loading: boolean = false;
  msgError: string;
  error: boolean = false;
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
  this.loading = true;
  this.error = false;
  this.msgError = '';

  this.atendimentoService.getTipoAtendimento().subscribe(
    (item: any) => {
      this.loading = false;

      if (!item?.data || item.data.length === 0) {
        this.error = true;
        this.msgError = 'Nenhum tipo de atendimento encontrado';
        return;
      }

      this.tiposAtendimentos = item.data;
    },
    (erro) => {
      this.loading = false;
      this.error = true;

      this.msgError =
        'Houve um erro ao buscar os tipos de atendimento. Tente novamente.';

      console.error('Erro getTipoAtendimento:', erro);
      this.toast(this.msgError);
    }

  );
}

  saveContact() {
    const payload = {
      tipoAtendimento: this.optionSelected,
      tipoAtendimentoId: this.tipoAtendimentoId,
    };
    this.store.dispatch(new SetTipoAtendimento(payload));

    this.router.navigate(['/identity']);
  }

  toast(msg: string) {
    this.toastController.create({
      message: msg,
      duration: 2000,
    }).then((toast) => {
      toast.present();
    });
  }
}
