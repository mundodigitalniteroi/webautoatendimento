import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.page.html',
  styleUrls: ['./steps.page.scss']
})
export class StepsPage implements OnInit {
  step = 'indentity'
  title =  'Cadastro Pessoal'
  subtitle = 'Por favor, preencha os dados corretamente'
  email = 'nome@gmail.com'
  constructor() { }

  ngOnInit(): void {
  }
  changeStep(){
    if(this.step == 'indentity'){
      this.step = 'address'
      this.title = 'Cadastro de endereço'
      return
    }
    if(this.step == 'address'){
      this.step = 'verify'
      this.title =  'Verificação'
      this.subtitle = 'Por favor, digite o código enviado para'
      return
    }
    if(this.step == 'verify'){
      this.step = 'verifyComplete'
      this.title =  'Obrigado por se registrar'
      return
    }
  }

}
