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
      // // console.log(changes.saveFields);
      this.save();
    }
  }
 

  ngOnInit(): void {
    
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
      emailProp:[null, Validators.required, Validators.email],
      // Region Procurador
      nomeProc:[null, Validators.required],
      dataProc:[null, Validators.required],
      cpfProc:[null, Validators.required],
      cnhProc:[null, Validators.required],
      telefoneProc:[null, Validators.required],
      emailProc:[null, Validators.required, Validators.email],
      // Region Pessoa Jurídica
      cnpj:[null, Validators.required],
      razaoSocial:[null, Validators.required]

    });
    this.getTipoPessoas();
    // // console.log(this.saveFields)
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
      // // console.log(item)
      this.tipoPessoas = item.data;
      const getPessoa = this.tipoPessoas.find(pess => pess.descricao == 'PF');
      this.form.get('tipoPessoaId').patchValue(getPessoa.tipoPessoaId)
    })
    )
  }
  
  save() {
    const formValue = this.form?.value;
    // console.log(formValue)
    const payload = {
      tipoProprietario: formValue?.campo,
      tipoPessoaId: formValue?.tipoPessoaId,
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
inputChanged(event: any) {
  // Remove caracteres não numéricos
  const inputValue = event.target.value.replace(/\D/g, '');

  // Atualiza o valor do campo de entrada
  event.target.value = inputValue;
}

inputChangedCPF(event: any) {
  let input = event.target.value;
  if(input.length == 15){
    event.target.value =  this.validarCPF('input');
  }
  

  // Remove caracteres não numéricos
  // const inputValue = event.target.value.replace(/\D/g, '');

  // Atualiza o valor do campo de entrada
  // event.target.value = inputValue;
}
inputChangedName(event: any) {
  const input = event.target.value;
  // Remove caracteres não alfabéticos
  // const inputValue = event.target.value.replace(/[^A-Za-z]/g, '');

  // Atualiza o valor do campo de entrada
  // event.target.value = inputValue;
}
validarCPF(input: string): string {
  // Remove todos os caracteres não numéricos
  const numeros = input.replace(/[^0-9]/g, '');

  // Verifica se a string resultante tem o formato esperado (XXX.XXX.XXX-XX)
  const regex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
  const match = numeros.match(regex);

  if (match) {
    // Reorganiza os grupos com os caracteres específicos
    return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
  } else {
    // Retorna uma string vazia se o formato não for válido
    return '';
  }
}
  ngOnDestroy(): void {
    this.sub.forEach(item => item.unsubscribe())
  }
}
