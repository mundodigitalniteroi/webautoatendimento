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
