

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
