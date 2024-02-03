import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { ConsultaDebitoService } from 'src/app/services/consulta-debito/consulta-debito.service';
import { AuthState } from 'src/app/state/auth/auth.state';
import { SetInformations } from 'src/app/state/atendimento/atendimento.action';

@Component({
  selector: 'app-public-search',
  templateUrl: './public-search.page.html',
  styleUrls: ['./public-search.page.scss'],
})
export class PublicSearchPage implements OnInit {
  form: FormGroup;
  informations;
  error = false;
  msgError = '';
  options;
  loading = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private consultaDebitoService: ConsultaDebitoService,
    private store: Store,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      placa: ['KUM3752', Validators.required],
    });
    this.options = this.store.selectSnapshot(AuthState.all);
  }

  consultarDebito() {
    this.loading = true;
    this.error = false;
    this.msgError = '';

    const payload = {
      codigoProduto: 'DEP',
      identificadorCliente: this.options.clienteId,
      identificadorDeposito: this.options.depositoId,
      identificadorUsuario: this.options.usuarioDPId,
      placa: this.form.value.placa,
    };
    this.consultaDebitoService.consultaVeiculo(payload).subscribe(
      (deb) => {
        this.loading = false;
        const payload = {
          informacaoConsulta: deb,
        };
        this.store.dispatch(new SetInformations(payload));
        this.router.navigate(['/process-informations']);
      },
      (erro) => {
        this.error = true;
        this.loading = false;
        if (
          erro.error &&
          erro.error.mensagem.avisosImpeditivos.includes('Processo inexistente')
        ) {
          this.msgError = 'Veículo não encontrado neste pátio';
        } else {
          this.msgError =
            'Houve um erro na busca do veículo, por favor tente novamente';
        }
      }
    );
  }

  inputChangedPlaca(event: any) {
    const input = event.target.value;
    const inputValue = event.target.value.replace(/[^a-zA-Z0-9]+/g, '');
    this.form.controls.placa.setValue(inputValue.toUpperCase());
  }

  goProcessInformation() {
    this.router.navigate(['/process-informations']);
  }
  async toast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }
}
