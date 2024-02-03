export interface AtendimentoModel {
  tipoAtendimento: string;
  tipoPessoaId: number;
  enderecoProprietario: EnderecoModel;
  proprietario: PessoaModel;
  responsavel: PessoaModel;
  tipoAtendimentoId: string;
  enderecoResponsavel: EnderecoModel;
  informacaoConsulta: {};
  fotoFacial: {
    tipo: string;
    base64: string;
    tamanho: string;
  };
  documentos: [];
  protocolo: string;
}

export interface InformacoesPlacaChassiModel {
  placa: string;
  chassi: string;
  chassiRemarcado: string;
  numeroRenavam: string;
  anoFabricacao: string;
  anoModelo: string;
  anoUltimaLicenca: string;
  uf: string;
  descricaoCor: string;
  descricaoMarca: string;
  descricaoTipo: string;
  descricaoCategoria: string;
  informacaoRoubo: string;
  flagVeiculoRoubadoFurtado: string;
  flagVeiculoNaoIdentificado: string;
  flagVeiculoSemRegistro: string;
  pesoBrutoTotal: string;
  classificacao: string;
  restricoesJuridicas: [];
  restricoesAdministrativas: [];
  restricaoEstelionato: [];
}

export interface EnderecoModel {
  cep: string;
  rua: string;
  numero: string;
  estado: string;
  complemento: string;
  cidade: string;
  bairro: string;
}

export interface Geolocation {
  latitude: any;
  longitude: any;
}

export interface FotoModel {
  base64: string;
  tipo: string;
}

export interface PessoaModel {
  nome: string;
  dataNascimento: string;
  cpf: string;
  cnh: string;
  telefone: string;
  email: string;
}
export interface EnderecoModel {
  cep: string;
  rua: string;
  numero: string;
  estado: string;
  complemento: string;
  cidade: string;
  bairro: string;
}
