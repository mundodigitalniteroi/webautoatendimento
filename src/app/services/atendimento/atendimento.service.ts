import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    
}
