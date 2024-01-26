export interface OperacaoModel {
    tipoPessoa: string;
    tipoPessoaId: number;
    tipoProprietario:string;
    endereco: EnderecoModel;
    proprietarioPf: ProprietarioPFModel;
    procuradorPf: ProprietarioPFModel;
    empresa: {
      cnpj:string,
      razaoSocial:string
    }
    tipoAtendimentoId:string;
    enderecoPF: EnderecoPFModel;
    enderecoPJ: EnderecoPJModel;
    informacaoConsulta:{};
    fotoFacial:{
      tipo:string;
      base64:string;
      tamanho: string;
    }
    fotos: [],
    protocolo: string;
    // geoLocalizacao: Geolocation;
    // dadosOperacao: DadosOperacaoModel;
    // dadosVeiculo: DadosVeiculoModel;
    // registroInfracoes: [];
    // checkList: [];
    // fotos: [];
    // dadosLacre: [];
    // dadosCondutor: CondutorModel;
    // assinaturaAgente: AssinaturaAgenteModel;
    // assinaturaCondutor: AssinaturaCondutorModel;
    // key: any;
    // action?: string;
    // status: string;
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
    observacoes: string;
  }
  
  export interface Geolocation {
    latitude: any;
    longitude: any;
  }
  export interface DadosOperacaoModel {
    grv: any;
    cliente: any;
    depositoDestino: any;
    autoridade: any;
    motivoApreensao: any;
    veiculoRecComb: any;
    reboque: any;
    reboquistaId: any;
    codigoIdentificacaoCliente: any;
  }
  
  export interface DadosVeiculoModel {
    placa: any;
    chassi: any;
    marcaModelo: any;
    tipo: any;
    veiculoSemChave: any;
    cor: any;
  }
  export interface FotoModel {
    base64: string;
    tipo: string;
  }
  export interface ProprietarioPFModel {
    nome: string;
    dataNascimento:string;
    cpf: string;
    cnh: string;
    telefone: string;
    email: string;

  }
  export interface EnderecoPFModel {
    cep: string;
    rua: string;
    numero: string;
    estado: string;
    complemento: string;
    cidade: string;
    bairro: string;
    observacoes: string;
  }

  export interface ProprietarioPJModel{
    cnpj: string;
    razaoSocial: string;
  }
  export interface EnderecoPJModel {
    cep: string;
    rua: string;
    numero: string;
    estado: string;
    complemento: string;
    cidade: string;
    bairro: string;
    observacoes: string;
  }
  export interface AssinaturaAgenteModel {
    nome: string;
    matricula: string;
    assinatura: any;
  }
  export interface AssinaturaCondutorModel {
    nome: string;
    matricula: string;
    assinatura: any;
    situacaoAssinatura: any;
  }
  export interface UsuarioModel {
    autoridadesResponsaveis: any;
    cliDep: [];
    clientes: [];
    cores: [];
    depositos: [];
    reboquistas: [];
    enquadramentoInfracoes: [];
    equipamentosOpcionais: [];
    motivosApreensao: [];
    reboques: any;
    tipoVeiculos: [];
    usuarioToken: {
      expiracao: string;
      token: string;
      decodedToken: any;
    };
    marcasModelos: [];
    tiposVeiculos: [];
    decodedToken: any;
    impressoraSelecionada: any;
  }
  export interface CadastroModel {
    id: string;
    nome: string;
    cpf: string;
    celular: string;
    email: string;
    senha: string;
    titulo: string;
    genero: string;
    enderecoId: number;
    endereco: {
      id: number;
      cep: string;
      logradouro: string;
      numero: string;
      complemento: string;
      bairro: string;
      cidade: string;
      estado: string;
      latitude: number;
      longitude: number;
    };
    perfil: number;
  }
  // export interface VistoriaModel {
  //   numero: string;
  //   leilaoId: number;
  //   nomeleilao: string;
  //   loteId: number;
  //   campos: VistoriaCampoModel[];
  //   checklist: VistoriaChecklistModel[];
  //   fotos: VistoriaFotoModel[];
  //   latitude: number;
  //   longitude: number;
  //   observacao: string;
  // }
  
  export interface VistoriaCampoModel {
    loteCampoId: number;
    valor: string;
    valorAnterior: string;
  }
  
  export interface VistoriaChecklistModel {
    vistoriaChecklistId: number;
    valor: string;
  }
  
  export interface FotoModel {
    foto: FotoModel;
  }
  