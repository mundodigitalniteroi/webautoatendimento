export class SetInformacoesConsulta {
  static readonly type = 'Armazenar dados da consulta de protocolo';
  constructor(public payload: any) {}
}

export class SetInformations {
  static readonly type = 'Armazenar Debitos';
  constructor(public payload: any) {}
}
export class SetBoleto {
  static readonly type = 'Armazenar do Boleto';
  constructor(public payload: any) {}
}
export class SetPixEstatico {
  static readonly type = 'Armazenar Dados do Pix Estático';
  constructor(public payload: any) {}
}
export class SetParcelaSelecionada {
  static readonly type = 'Armazenar Dados da Parcela Selecionada';
  constructor(public payload: any) {}
}
export class SetTipoPagamento {
  static readonly type = 'Armazenar Dados do Tipo de Pagamento';
  constructor(public payload: any) {}
}


