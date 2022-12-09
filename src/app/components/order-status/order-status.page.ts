import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.page.html',
  styleUrls: ['./order-status.page.scss'],
})
export class OrderStatusPage implements OnInit {
  steps = [
    {status: 'aprovado', step:'Busca pública', data:'4 de Nov 2022 - 10:04h'},
    {status: 'aprovado', step:'Cadastro', data:'4 de Nov 2022 - 10:04h'},
    {status: 'aprovado', step:'Validação de código de segurança', data:'4 de Nov 2022 - 10:04h'},
    {status: 'aprovado', step:'Validação de identidade', data:'4 de Nov 2022 - 10:04h'},
    {status: 'analise', step:'Upload de documentos', data:'4 de Nov 2022 - 10:04h'},
    {status: 'aprovado', step:'Confirmação de pagamento', data:'4 de Nov 2022 - 10:04h'},
    {status: 'reprovado', step:'Agendamento', data:'4 de Nov 2022 - 10:04h'},
  ]
  constructor() { }

  ngOnInit() {
  }

}
