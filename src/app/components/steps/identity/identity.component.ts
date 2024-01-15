import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';
import { SetIdentity } from 'src/app/state/registro/registro.action';
import { RegistroState } from 'src/app/state/registro/registro.state';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss']
})
export class IdentityComponent implements OnInit, OnDestroy, OnChanges {
  @Input() saveFields = false;
  pessoaFisica = true;
  pessoaJuridica = false;
  form: FormGroup;
  options;
  sub: Subscription[] = [];
  tipoPessoas = [];
  constructor(
    private fb: FormBuilder,
    private toastController: ToastController,
    private store: Store,
    private atendimentoService: AtendimentoService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
   
    if(changes.saveFields){
      // console.log(changes.saveFields);
      this.save();
    }
  }
 

  ngOnInit(): void {
    this.getTipoPessoas();
    this.options = this.store.selectSnapshot(RegistroState.all);
    this.form = this.fb.group({
      pessoaJuridica: [false],
      pessoaFisica: [true],
      tipoPessoaId:[null, Validators.required],
      campo:['PF'],
      // Region Proprietario
      nomeProp:[null, Validators.required],
      dataProp:[null, Validators.required],
      cpfProp:[null, Validators.required],
      cnhProp:[null, Validators.required],
      telefoneProp:[null, Validators.required],
      emailProp:[null, Validators.required],
      // Region Procurador
      nomeProc:[null, Validators.required],
      dataProc:[null, Validators.required],
      cpfProc:[null, Validators.required],
      cnhProc:[null, Validators.required],
      telefoneProc:[null, Validators.required],
      emailProc:[null, Validators.required],
      // Region Pessoa Jurídica
      cnpj:[null, Validators.required],
      razaoSocial:[null, Validators.required]

    });
    // console.log(this.saveFields)
  }

  changeValues(campo) {
    const getPessoa = this.tipoPessoas.find(pess => pess.descricao == campo);
    if (campo == 'PF') {
      this.form.get('campo').patchValue('PF');
      this.form.get('pessoaFisica').patchValue(true);
      this.form.get('pessoaJuridica').patchValue(false);
      this.form.get('tipoPessoaId').patchValue(getPessoa.tipoPessoaId)
    } else if (campo == 'PJ') {
      this.form.get('campo').patchValue('PJ');
      this.form.get('pessoaFisica').patchValue(false);
      this.form.get('pessoaJuridica').patchValue(true);
      this.form.get('tipoPessoaId').patchValue(getPessoa.tipoPessoaId)
    }
  }

  getTipoPessoas(){
    this.sub.push(
    this.atendimentoService.getTipoPessoas().subscribe((item: any) => {
      // console.log(item)
      this.tipoPessoas = item.data;
    })
    )
  }
  
  save() {
    const formValue = this.form?.value;
    const payload = {
      tipoProprietario: formValue?.campo,
      proprietarioPf: {
        nomeProp: formValue?.nomeProp,
        dataProp:formValue?.dataProp,
        cpfProp:formValue?.cpfProp,
        cnhProp:formValue?.cnhProp,
        telefoneProp:formValue?.telefoneProp,
        emailProp:formValue?.emailProp,
      },
      procuradorPf: {
        nomeProc: formValue?.nomeProc,
        dataProc:formValue?.dataProc,
        cpfProc:formValue?.cpfProc,
        cnhProc:formValue?.cnhProc,
        telefoneProc:formValue?.telefoneProc,
        emailProc:formValue?.emailProc,
      },
      proprietarioPj: {
        cnpj: formValue?.cnpj,
        razaoSocial:formValue?.razaoSocial,
      },
    }
    this.store.dispatch(new SetIdentity(payload));
}

  ngOnDestroy(): void {
    this.sub.forEach(item => item.unsubscribe())
  }
}
