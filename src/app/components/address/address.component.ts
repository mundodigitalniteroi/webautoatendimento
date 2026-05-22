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
  error = false;
  msgError = '';
  loading = false;
  // @Input() saveFields = false;
  form: FormGroup;
  @Select(AtendimentoState.all) state$: Observable<AtendimentoModel>;
  submitAttempt = false;

  constructor(private cepService: ConsultaCepService, private fb: FormBuilder, private store: Store, private router: Router) { }

  // Validator customizado para CEP
  private cepValidator(control: any) {
    if (!control.value) {
      return null; // deixa o required validator tratar valores vazios
    }

    // Remove caracteres não numéricos para validação
    const digitsOnly = control.value.replace(/\D/g, '');

    if (digitsOnly.length !== 8) {
      return { pattern: true };
    }

    return null;
  }

  ngOnInit(): void {
    //this.options = this.store.selectSnapshot(AtendimentoState.all);
    // // console.log(this.options)
    this.form = this.fb.group({
      enderecoProprietario: this.fb.group({
        cep: [null, [Validators.required, this.cepValidator.bind(this)]],
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
            cep: [null, [Validators.required, this.cepValidator.bind(this)]],
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

  getCepErrorMessage(control: string, grupo: 'proprietario' | 'responsavel'): string {
    const formGroup = grupo === 'proprietario' ? this.enderecoProprietario : this.enderecoResponsavel;
    const cepControl = formGroup?.get(control);

    if (cepControl?.errors?.['required']) {
      return 'CEP é obrigatório';
    }
    if (cepControl?.errors?.['pattern']) {
      return 'CEP precisa ter exatamente 8 dígitos';
    }
    return '';
  }

  consultaCEP(param) {
    this.loading = true;
    this.error = false;
    this.msgError = '';

    let cep;

    if (param == 'responsavel') {
      cep = this.enderecoResponsavel.get('cep').value;
    } else {
      cep = this.enderecoProprietario.get('cep').value;
    }

    // Remove hífen para consulta na API e verifica se tem 8 dígitos
    const cepLimpo = cep?.replace(/\D/g, '');

    if (cepLimpo && cepLimpo.length === 8) {
      this.cepService.consultaCEP(cepLimpo).subscribe(
        (dados: any) => {
          this.loading = false;
            if (dados?.erro) {
            this.error = true;
            this.msgError = 'CEP inválido';
            return;
          }

          this.populaDadosForm(dados, param);
        },
        (erro) => {
          this.loading = false;
          this.error = true;

          if (erro.error?.mensagem?.includes('CEP não encontrado')) {
            this.msgError = 'CEP não encontrado';
          }
          else {
            this.msgError = 'Houve um erro ao consultar o CEP, por favor tente novamente';
          }
        }
      );
    } else {
      this.loading = false;
      this.error = true;
      this.msgError = 'CEP inválido';
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
    return (
      this.enderecoProprietario && !this.enderecoProprietario.get(campo).valid && (this.enderecoProprietario.get(campo).dirty || this.submitAttempt)
    );
  }

  responsavelInvalid(campo: string) {
    return (
      this.enderecoResponsavel && !this.enderecoResponsavel.get(campo).valid && (this.enderecoResponsavel.get(campo).dirty || this.submitAttempt)
    );
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
