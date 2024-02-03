import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { AtendimentoModel } from 'src/app/interfaces/atendimento.interface';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';
import { SetIdentity } from 'src/app/state/atendimento/atendimento.action';
import { AtendimentoState } from 'src/app/state/atendimento/atendimento.state';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss'],
})
export class IdentityComponent implements OnInit, OnDestroy {
  isPessoaFisica = false;
  isPessoaJuridica = false;
  form: FormGroup;
  @Select(AtendimentoState.all) state$: Observable<AtendimentoModel>;
  sub: Subscription[] = [];
  tipoPessoas = [];
  submitAttempt = false;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private atendimentoService: AtendimentoService,
    private router: Router
  ) {
    this.form = this.fb.group({
      tipoAtendimentoId: [null, Validators.required],
      tipoPessoaId: [null, Validators.required],
      proprietario: this.fb.group({
        nome: [null, Validators.required],
        dataNascimento: [null, Validators.required],
        cpfCnpj: [null, Validators.required],
        cnh: [null, Validators.required],
        telefone: [null],
        email: [null, Validators.email],
      }),
      responsavel: this.fb.group({
        nome: [null, Validators.required],
        dataNascimento: [null, Validators.required],
        cpf: [null, Validators.required],
        cnh: [null, Validators.required],
        telefone: [null],
        email: [null, Validators.email],
      }),
    });

    this.form.controls.tipoPessoaId.valueChanges.subscribe((tipo) => {
      this.isPessoaFisica = tipo == 1;
      this.isPessoaJuridica = tipo == 2;
      const atendimento = this.store.selectSnapshot(AtendimentoState.all);
      this.form
        .get('tipoAtendimentoId')
        .setValue(atendimento.tipoAtendimentoId);
      //Proprietario
      if (atendimento.tipoAtendimento == 'proprietario') {
        //PF
        if (tipo == 1) {
          this.form.removeControl('responsavel');
          console.log(this.form);
          const prop = this.form.get('proprietario') as FormGroup;
          prop.reset();
          prop.get('cnh').setValidators(Validators.required);
          prop.get('cnh').updateValueAndValidity();
          prop.get('dataNascimento').setValidators(Validators.required);
          prop.get('dataNascimento').updateValueAndValidity();
        }

        //PJ
        if (tipo == 2) {
          const prop = this.form.get('proprietario') as FormGroup;
          prop.reset();
          prop.get('cnh').clearValidators();
          prop.get('cnh').updateValueAndValidity();
          prop.get('dataNascimento').clearValidators();
          prop.get('dataNascimento').updateValueAndValidity();
          this.form.addControl(
            'responsavel',
            this.fb.group({
              nome: [null, Validators.required],
              dataNascimento: [null, Validators.required],
              cpf: [null, Validators.required],
              cnh: [null, Validators.required],
              telefone: [null],
              email: [null, Validators.email],
            })
          );
          this.form.updateValueAndValidity();
        }
      } else if (atendimento.tipoAtendimento == 'procurador') {
        //PJ
        if (tipo == 2) {
          const prop = this.form.get('proprietario') as FormGroup;
          prop.reset();
          prop.get('cnh').clearValidators();
          prop.get('cnh').updateValueAndValidity();
          prop.get('dataNascimento').clearValidators();
          prop.get('dataNascimento').updateValueAndValidity();
        } else {
          const prop = this.form.get('proprietario') as FormGroup;
          prop.reset();
          prop.get('cnh').setValidators(Validators.required);
          prop.get('cnh').updateValueAndValidity();
          prop.get('dataNascimento').setValidators(Validators.required);
          prop.get('dataNascimento').updateValueAndValidity();
        }

        if (!this.form.get('responsavel')) {
          this.form.addControl(
            'responsavel',
            this.fb.group({
              nome: [null, Validators.required],
              dataNascimento: [null, Validators.required],
              cpf: [null, Validators.required],
              cnh: [null, Validators.required],
              telefone: [null],
              email: [null, Validators.email],
            })
          );
          this.form.updateValueAndValidity();
        }
      }
    });
  }

  get proprietario(): FormGroup {
    const prop = this.form.get('proprietario') as FormGroup;
    return prop;
  }

  get responsavel(): FormGroup {
    return this.form.get('responsavel') as FormGroup;
  }

  ngOnInit(): void {
    this.getTipoPessoas();
  }

  getTipoPessoas() {
    this.sub.push(
      this.atendimentoService.getTipoPessoas().subscribe((item: any) => {
        this.tipoPessoas = item.data;
        const getPessoa = this.tipoPessoas.find(
          (pess) => pess.descricao == 'PF'
        );
        this.form.get('tipoPessoaId').patchValue(getPessoa.tipoPessoaId);
      })
    );
  }

  save() {
    this.submitAttempt = true;

    if (this.form.valid) {
      const formValue = this.form?.getRawValue();

      this.store.dispatch(new SetIdentity(formValue));
      this.router.navigate(['/address']);
    }
  }

  inputChanged(event: any) {
    // Remove caracteres não numéricos
    const inputValue = event.target.value.replace(/\D/g, '');

    // Atualiza o valor do campo de entrada
    event.target.value = inputValue;
  }

  inputChangedName(event: any) {
    const input = event.target.value;
    // Remove caracteres não alfabéticos
    const inputValue = event.target.value.replace(/[^a-zA-Z\s]+/g, '');

    // Atualiza o valor do campo de entrada
    event.target.value = inputValue;
  }

  voltar() {
    this.router.navigate(['/how-liberation']);
  }

  ngOnDestroy(): void {
    this.sub.forEach((item) => item.unsubscribe());
  }
}
