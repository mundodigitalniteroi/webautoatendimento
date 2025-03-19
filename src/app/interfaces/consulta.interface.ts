export interface ConsultaModel {
  informacoesConsulta: {};
  informacaoDebito: {};
  informacaoBoleto: {};
  informacaoPixEstatico: {};
  informacaoParcelaSelecionada: {};
}

export interface PlanoParcelamento {
  planoParcelamentoId: number;
  valorDebitos: number;
  parcela: number;
  valorMensal: number;
  taxaServico: number;
  valorTotal: number;
  operacao: OperacaoEnum;
}

// Enum em TypeScript
export enum OperacaoEnum {
  CREDITO = 1,
  DEBITO = 2,
  PIX = 3,
  BOLETO = 4
}