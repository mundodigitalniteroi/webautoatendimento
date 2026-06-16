import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { PrintService } from 'src/app/services/print/print.service';
import { AtendimentoState } from 'src/app/state/atendimento/atendimento.state';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss'],
})
export class CompleteComponent implements OnInit {
  toastController: ToastController;
  options;

  constructor(private store: Store, private print: PrintService) {
    this.options = this.store.selectSnapshot(AtendimentoState.all);
    this.imprimir();
  }

  ngOnInit(): void {
    this.options = this.store.selectSnapshot(AtendimentoState.all);
    this.imprimir();
  }

  toast(msg: string) {
    this.toastController.create({
      message: msg,
      duration: 2000,
    }).then((toast) => {
      toast.present();
    });
  }

  imprimir() {
    const protocolo = this.options?.protocolo;

    if (!protocolo) {
      this.toast('Protocolo não encontrado');
      return;
    }

    try {
      this.print.printProtocolo(protocolo);
    } catch (erro) {
      console.error('Erro ao imprimir:', erro);
      this.toast('Erro ao imprimir protocolo');
    }
  }
}
