

export class SetPessoa {
    static readonly type = 'Armazenar Tipo Pessoa';
    constructor(public payload: any) {}
}

export class SetCadastro {
    static readonly type = 'Armazenar Dados iniciais';
    constructor(public payload: any) {}
}

export class SetInformations {
    static readonly type = 'Armazenar Dados da Consulta';
    constructor(public payload: any) {}
}

export class SetIdentity {
    static readonly type = 'Armazenar Dados da Identidade';
    constructor(public payload: any) {}
}

export class SetAdress {
    static readonly type = 'Armazenar Dados do endereço';
    constructor(public payload: any) {}
}
export class SetFacialRocgnition {
    static readonly type = 'Armazenar Foto do reconhecimento facial';
    constructor(public payload: any) {}
}

export class SetDocumentUpload{
    static readonly type = 'Armazenar Documentos Necessários';
    constructor(public payload: any) {}
}

export class SetProtocol{
    static readonly type = 'Armazenar Protocolo do Atendimento';
    constructor(public payload: any) {}
}

export class FinalizarAtendimento{
    static readonly type = 'Finalizar Atendimento';
    constructor(public payload: any) {}
}
