import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { ConsultaDebitoService } from 'src/app/services/consulta-debito/consulta-debito.service';
import { SetInformations } from 'src/app/state/atendimento/atendimento.action';
import { AuthState } from 'src/app/state/auth/auth.state';
import { SetInformacoesConsulta } from 'src/app/state/consulta/consulta.action';

@Component({
  selector: 'app-query',
  templateUrl: './query.page.html',
  styleUrls: ['./query.page.scss'],
})
export class QueryPage implements OnInit {
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
      placa: ['LBK5H09', Validators.required],
    });
    this.options = this.store.selectSnapshot(AuthState.all);
  }

  consultarDebito() {
    this.loading = true;
    this.error = false;
    this.msgError = '';
    
    this.consultaDebitoService.consultaDebito(this.form.value.placa).subscribe(
      (deb: any) => {
        this.loading = false;
        this.store.dispatch(new SetInformacoesConsulta(deb.data));
        this.router.navigate(['/process-information']);
      },
      (erro) => {
        this.error = true;
        this.loading = false;
        if (
          erro.error &&
          erro.error.mensagem.avisosImpeditivos.includes('Processo inexistente')
        ) {
          this.msgError = 'Veículo não encontrado neste pátio ou protocolo inexistente';
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
  // consultarDebito() {
    // this.consultaDebitoService.consultaVeiculo().subscribe(deb => {
    //   const payload = {
    //     informacaoConsulta:deb
    //   }
    // })
  // }

  // goProcessInformation() {
    // this.router.navigate(['/process-informations'])
  // }
}
