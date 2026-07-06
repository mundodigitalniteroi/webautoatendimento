import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.page.html',
  styleUrls: ['./steps.page.scss'],
})
export class StepsPage implements OnInit {
  step = 'indentity';
  title = 'Cadastro Pessoal';
  subtitle = 'Por favor, preencha os dados corretamente';
  email = 'nome@gmail.com';
  options;
  saveIdentity = false;
  saveAdress = false;
  form: boolean = false;
  tipoAtendimento: any = null;
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
  }

  changeStep() {
    if (this.step == 'indentity') {
      this.saveIdentity = true;
      setTimeout(() => {
        this.step = 'address';
        this.title = 'Cadastro de endereço';
      }, 1000);
      return;
    }
    if (this.step == 'address') {
      this.saveAdress = true;
      setTimeout(() => {
        this.router.navigate(['/facial-recognition']);
        // this.step = 'verify'
        // this.title = 'Verificação'
        // this.subtitle = 'Por favor, digite o código enviado para'
      }, 1000);

      return;
    }
    if (this.step == 'verify') {
      this.step = 'verifyComplete';
      this.title = 'Obrigado por se registrar';
      return;
    }
  }

  // receiveFormValue(event){
  //   this.form = event.form.valid;
  //   let formValues = event.form.value;
  //   event.tipoPessoa = "procurador"
  //     if(formValues.campo == 'PF' && event.tipoPessoa == "proprietario"){
  //     this.form =  formValues.nomeProp ?  true :  false;
  //     this.form =  formValues.dataProp ?   true : false;
  //     this.form =  formValues.cpfProp ?  true : false;
  //     this.form =  formValues.cnhProp ?  true : false;
  //     this.form =  formValues.telefoneProp ?  true : false;
  //     this.form =  formValues.emailProp ?   true : false;
  //     }

  //     if(formValues.campo == 'PJ' && event.tipoPessoa == "proprietario"){
  //       this.form = formValues.cnpj ?  true : false;
  //       this.form = formValues.razaoSocial ?  true : false;
  //     }

  //     if(formValues.campo == 'PF' && event.tipoPessoa == "procurador"){
  //       this.form = formValues.nomeProp ?  true : false;
  //       this.form = formValues.dataProp ?   true : false;
  //       this.form = formValues.cpfProp ?  true : false;
  //       this.form = formValues.cnhProp ?  true : false;
  //       this.form = formValues.telefoneProp ?  true : false;
  //       this.form = formValues.emailProp ?   true : false;

  //       this.form = formValues.nomeProc ?  true : false;
  //       this.form = formValues.dataProc ?  true : false;
  //       this.form = formValues.cpfProc ?  true : false;
  //       this.form = formValues.cnhProc ?  true : false;
  //       this.form = formValues.telefoneProc ?  true : false;
  //       this.form = formValues.emailProc ?  true : false;
  //     }

  //     if(formValues.campo == 'PJ' && event.tipoPessoa == "procurador"){
  //       this.form = formValues.nomeProp ?  true : false;
  //       this.form = formValues.dataProp ?   true : false;
  //       this.form = formValues.cpfProp ?  true : false;
  //       this.form = formValues.cnhProp ?  true : false;
  //       this.form = formValues.telefoneProp ?  true : false;
  //       this.form = formValues.emailProp ?   true : false;

  //       this.form = formValues.cnpj ?  true : false;
  //       this.form = formValues.razaoSocial ?  true : false;
  //     }
  // }

  voltar(step) {
    switch (step) {
      case 'indentity':
        this.router.navigate(['/how-liberation']);
        break;
      case 'address':
        setTimeout(() => {
          this.step = 'indentity';
          this.title = 'Cadastro Pessoal';
        }, 1000);
        break;
    }
  }
}
