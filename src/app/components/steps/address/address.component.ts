import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ConsultaCepService } from 'src/app/services/consulta-cep.service';
import { SetAdress } from 'src/app/state/registro/registro.action';
import { RegistroState } from 'src/app/state/registro/registro.state';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit, OnChanges {
  @Input() saveFields = false;
  form: FormGroup;
  options;
  constructor( 
    private cepService: ConsultaCepService,
    private fb: FormBuilder,
    private store: Store,
    ) { }

  ngOnInit(): void {
    this.options = this.store.selectSnapshot(RegistroState.all);
    // console.log(this.options)
    this.form = this.fb.group({
      cepProp: [null, Validators.required],
      ruaProp: [null],
      numeroProp: [null, [Validators.required, Validators.minLength(1)]],
      estadoProp: [null, [Validators.required]],
      complementoProp: [null],
      cidadeProp: [null, [Validators.required]],
      bairroProp: [null, [Validators.required]],
      observacoesProp: [null],
      // region empresa
      cepEmpresa: [null, Validators.required],
      ruaEmpresa: [null],
      numeroEmpresa: [null, [Validators.required, Validators.minLength(1)]],
      estadoEmpresa: [null, [Validators.required]],
      complementoEmpresa: [null],
      cidadeEmpresa: [null, [Validators.required]],
      bairroEmpresa: [null, [Validators.required]],
      observacoesEmpresa: [null]
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
   
    if(changes.saveFields){
      // console.log(changes.saveFields);
      this.save();
    }
  }
  consultaCEP(param) {
    let cep;
    if(param == 'empresa'){
      cep = this.form.get('cepEmpresa').value;
    }else{
      cep = this.form.get('cepProp').value;
    }
    
    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
      .subscribe(dados => this.populaDadosForm(dados, param));
    }
  }
  populaDadosForm(dados, param) {
    // console.log(dados)
    if(param == 'empresa'){
      this.form.patchValue({
        ruaEmpresa:dados.logradouro,
        bairroEmpresa: dados.bairro,
        cidadeEmpresa: dados.localidade,
        estadoEmpresa: dados.uf
    });
    }else{
      
      this.form.patchValue({
        ruaProp:dados.logradouro,
        bairroProp: dados.bairro,
        cidadeProp: dados.localidade,
        estadoProp: dados.uf
    });
    }
    
  }
  save() {
    const formValue = this.form?.value;
    const payload = {
      enderecoPF: {
        cep: formValue?.cepProp,
        rua: formValue?.ruaProp,
        numero: formValue?.numeroProp,
        estado: formValue?.estadoProp,
        complemento: formValue?.complementoProp,
        cidade: formValue?.cidadeProp,
        bairro: formValue?.bairroProp,
        observacoes: formValue?.observacoesProp,

      },
      enderecoPJ: {
        cep: formValue?.cepEmpresa,
        rua: formValue?.ruaEmpresa,
        numero: formValue?.numeroEmpresa,
        estado: formValue?.estadoEmpresa,
        complemento: formValue?.complementoEmpresa,
        cidade: formValue?.cidadeEmpresa,
        bairro: formValue?.bairroEmpresa,
        observacoes: formValue?.observacoesEmpresa,
      },

    }
    this.store.dispatch(new SetAdress(payload));
}

}
