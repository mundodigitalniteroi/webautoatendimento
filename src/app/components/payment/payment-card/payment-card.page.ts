import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.page.html',
  styleUrls: ['./payment-card.page.scss']
})

export class PaymentCardPage implements OnInit {
  credit = false;
  debito = false;
  parcelas = [
    { numeroParcelas: '12x', valor:'R$:35,00', valorTotal:'R$:410,00'},
    { numeroParcelas: '11x', valor:'R$:35,00', valorTotal:'R$:410,00'},
    { numeroParcelas: '10x', valor:'R$:35,00', valorTotal:'R$:410,00'},
    { numeroParcelas: '9x', valor:'R$:35,00', valorTotal:'R$:410,00'},
    { numeroParcelas: '8x', valor:'R$:35,00', valorTotal:'R$:410,00'},
    { numeroParcelas: '7x', valor:'R$:35,00', valorTotal:'R$:410,00'},
    { numeroParcelas: '6x', valor:'R$:35,00', valorTotal:'R$:410,00'},
    { numeroParcelas: '5x', valor:'R$:35,00', valorTotal:'R$:410,00'},
    { numeroParcelas: '4x', valor:'R$:35,00', valorTotal:'R$:410,00'},
    { numeroParcelas: '3x', valor:'R$:35,00', valorTotal:'R$:410,00'},
    { numeroParcelas: '2x', valor:'R$:35,00', valorTotal:'R$:410,00'},
    { numeroParcelas: '1x', valor:'R$:35,00', valorTotal:'R$:410,00'},
  ]
  constructor() { }

  ngOnInit(): void {
  }
  cardSelected(type){
    if(type == 'credito'){this.credit = true; this.debito = false;}
    if(type == 'debito'){this.debito = true; this.credit = false;}
  }
}
