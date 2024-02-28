import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AtendimentoModel } from 'src/app/interfaces/atendimento.interface';
import { ConsultaCepService } from 'src/app/services/consulta-cep.service';
import { SetAdress } from 'src/app/state/atendimento/atendimento.action';
import { AtendimentoState } from 'src/app/state/atendimento/atendimento.state';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  // @Input() saveFields = false;
  form: FormGroup;
  @Select(AtendimentoState.all) state$: Observable<AtendimentoModel>;
  submitAttempt = false;

  constructor(private cepService: ConsultaCepService, private fb: FormBuilder, private store: Store, private router: Router) {}

  ngOnInit(): void {
    //this.options = this.store.selectSnapshot(AtendimentoState.all);
    // // console.log(this.options)
    this.form = this.fb.group({
      enderecoProprietario: this.fb.group({
        cep: [null, Validators.required],
        rua: [null, Validators.required],
        numero: [null, [Validators.required, Validators.minLength(1)]],
        estado: [null, [Validators.required]],
        complemento: [null],
        cidade: [null, [Validators.required]],
        bairro: [null, [Validators.required]],
      }),
    });
  }

  get enderecoResponsavel() {
    return this.form.get('enderecoResponsavel') as FormGroup;
  }

  get enderecoProprietario() {
    return this.form.get('enderecoProprietario') as FormGroup;
  }

  ionViewWillEnter() {
    this.submitAttempt = false;
    this.state$.subscribe((state) => {
      if (state.tipoAtendimento == 'procurador' || (state.tipoAtendimento == 'proprietario' && state.tipoPessoaId == 2)) {
        this.form.addControl(
          'enderecoResponsavel',
          this.fb.group({
            cep: [null, Validators.required],
            rua: [null, Validators.required],
            numero: [null, [Validators.required, Validators.minLength(1)]],
            estado: [null, [Validators.required]],
            complemento: [null],
            cidade: [null, [Validators.required]],
            bairro: [null, [Validators.required]],
          })
        );
      }
    });
  }

  consultaCEP(param) {
    let cep;
    if (param == 'responsavel') {
      cep = this.enderecoResponsavel.get('cep').value;
    } else {
      cep = this.enderecoProprietario.get('cep').value;
    }

    if (cep != null && cep !== '' && cep.length == 9) {
      this.cepService.consultaCEP(cep).subscribe((dados) => this.populaDadosForm(dados, param));
    }
  }

  populaDadosForm(dados, param) {
    if (param == 'responsavel') {
      this.enderecoResponsavel.patchValue({
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      });
    } else {
      this.enderecoProprietario.patchValue({
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      });
    }
  }

  save() {
    this.submitAttempt = true;

    if (this.form.valid) {
      const formValue = this.form?.getRawValue();
      this.store.dispatch(new SetAdress(formValue));

      this.router.navigate(['/facial-recognition']);
    }
  }

  proprietarioInvalid(campo: string) {
    return !this.enderecoProprietario.get(campo).valid && (this.enderecoProprietario.get(campo).dirty || this.submitAttempt);
  }

  responsavelInvalid(campo: string) {
    return !this.enderecoResponsavel.get(campo).valid && (this.enderecoResponsavel.get(campo).dirty || this.submitAttempt);
  }

  inputChanged(event: any) {
    if (event.target.value) {
      // Remove caracteres não numéricos
      const inputValue = event.target.value.replace(/[^0-9.|\-\/()]/g, '');

      // Atualiza o valor do campo de entrada
      event.target.value = inputValue;
    }
  }

  inputChangedCep(event: any) {
    if (event.target.value) {
      // Remove caracteres não numéricos
      const inputValue = event.target.value.replace(/\D/g, '');

      // Atualiza o valor do campo de entrada
      event.target.value = inputValue;
    }
  }

  carregarDadosTeste() {
    this.enderecoProprietario.patchValue({
      rua: 'Rua Joaquim Salles Lima',
      cep: '24755-230',
      numero: '378',
      bairro: 'Tribobó',
      cidade: 'São Gonçalo',
      estado: 'RJ',
    });
  }

  voltar() {
    this.router.navigate(['/identity']);
  }
}
