import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {
  private apiUrl ='https://api.atendimento.gestordepatios.app.br/';
  constructor(

    public http: HttpClient,
    ) { }

     getDebitos(termo: string) {
      return this.http.get(this.apiUrl + `consultar?termo=${termo}`);
    }

    getTipoPessoas(){
      return this.http.get(this.apiUrl + `TipoPessoa`);
    }

    getTipoPessoa(id){
      return this.http.get(this.apiUrl + `TipoPessoa/` + id);
    }

    getTipoDocumentos(){
      return this.http.get(this.apiUrl + `TipoDocumento`);
    }
    
    getTipoDocumento(id){
      return this.http.get(this.apiUrl + `TipoDocumento/` + id );
    }

    getEstabelecimentos(){
      return this.http.get(this.apiUrl + `Estabelecimento`);
    }

    getEstabelecimento(id){
      return this.http.get(this.apiUrl + `Estabelecimento/`+ id);
    }

    getTipoAtendimento(){
      return this.http.get(this.apiUrl + `TipoAtendimento`);
    }

    getTiposDocumentos(tipoPessoaId, terminalId, tipoAtendimentoId ){
      return this.http.get(this.apiUrl + `ChecklistDocumento/tiposDocumento?tipoPessoaId=${tipoPessoaId}&terminalId=${terminalId}&tipoAtendimentoId=${tipoAtendimentoId}`);
    }

    insertAtendimento(atendimento){
      return this.http.post(this.apiUrl + `Atendimento`, atendimento);
    }
    
}
