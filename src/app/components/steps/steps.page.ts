import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { RegistroState } from 'src/app/state/registro/registro.state';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.page.html',
  styleUrls: ['./steps.page.scss']
})
export class StepsPage implements OnInit {
  step = 'indentity'
  title = 'Cadastro Pessoal'
  subtitle = 'Por favor, preencha os dados corretamente'
  email = 'nome@gmail.com'
  options;
  saveIdentity = false;
  saveAdress = false;
  constructor(
    private store: Store,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.options = this.store.selectSnapshot(RegistroState.all);
    // // console.log(this.options)
  }
  changeStep() {
    if (this.step == 'indentity') {
      this.saveIdentity = true;
      // // console.log(this.saveIdentity);
      setTimeout(() => {
        this.step = 'address'
        this.title = 'Cadastro de endereço'
      }, 1000);
      return
    }
    if (this.step == 'address') {
      this.saveAdress = true;
      setTimeout(() => {
        this.router.navigate(['/facial-recognition'])
        // this.step = 'verify'
        // this.title = 'Verificação'
        // this.subtitle = 'Por favor, digite o código enviado para'
      }, 1000);

      return
    }
    if (this.step == 'verify') {
      this.step = 'verifyComplete'
      this.title = 'Obrigado por se registrar'
      return
    }
  }

  voltar(step){
    switch (step) {
      case 'indentity':
        this.router.navigate(['/how-liberation'])
          break;
      case 'address':
        setTimeout(() => {
          this.step = 'indentity'
          this.title = 'Cadastro Pessoal'
        }, 1000);
      break
  }
  }
}
