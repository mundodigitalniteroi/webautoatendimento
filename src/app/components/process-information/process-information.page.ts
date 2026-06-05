import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ConsultaDebitoService } from 'src/app/services/consulta-debito/consulta-debito.service';
import { AuthState } from 'src/app/state/auth/auth.state';
import { SetInformations } from 'src/app/state/consulta/consulta.action';
import { ConsultaState } from 'src/app/state/consulta/consulta.state';
import { ToastController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-process-information',
  templateUrl: './process-information.page.html',
  styleUrls: ['./process-information.page.scss'],
})
export class ProcessInformationPage implements OnInit {
  options;
  optionsConsulta;
  informations;
  toastController: ToastController;
  modalController: ModalController;
  informacoesConsulta;
  valorTotal = 0;
  error = false;
  msgError = '';
  loading = false;
  constructor(private store: Store, private consultaDebitoService: ConsultaDebitoService, private router: Router) {
    this.optionsConsulta = this.store.selectSnapshot(ConsultaState.all);
    this.options = this.store.selectSnapshot(AuthState.all);
    this.informacoesConsulta = this.optionsConsulta?.informacoesConsulta;
    this.consultarDebitos();
  }

  ngOnInit(): void {}
  consultarDebitos() {
    this.loading = true;
    this.error = false;
    this.msgError = '';

    this.consultaDebitoService.consultaVeiculo(this.informacoesConsulta?.veiculo?.identificadorFaturamento).subscribe(
      (deb: any) => {
        this.loading = false;
        this.informations = deb;
        this.store.dispatch(new SetInformations(deb));
      },
      (erro) => {
        this.error = true;
        this.loading = false;
        if (erro.error && erro.error.mensagem.avisosImpeditivos.includes('Processo inexistente')) {
          this.msgError = 'Veículo não encontrado neste pátio';
        } else {
          this.msgError = 'Houve um erro na busca do veículo, por favor tente novamente';
        }
        this.toast(this.msgError);
      }
    );
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
