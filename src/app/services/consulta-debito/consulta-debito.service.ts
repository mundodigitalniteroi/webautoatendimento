import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthState } from 'src/app/state/auth/auth.state';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class ConsultaDebitoService {
  private apiConsultaUrl = environment.urlApiDP;
  private apiDebitourl = environment.urlApiAtendimento;
  headers: HttpHeaders;
  constructor(public http: HttpClient, private store: Store) {
    this.store.select(AuthState.token).subscribe((t) => {
      this.headers = new HttpHeaders({
        Authorization: `Bearer ${t}`,
      });
    });
  }

  consultaVeiculo(payload) {
    return this.http.post(
      this.apiConsultaUrl + '/api/Faturamento/Simulacao',
      payload
    );
  }
  consultaDebito(payload) {
    if(payload.length == 7){
      return this.http.get(
        this.apiDebitourl + `/atendimento/consulta?placa=${payload}`, {
          headers: this.headers,
        }
      );
    }else{
      return this.http.get(
        this.apiDebitourl + `/atendimento/consulta?protocolo=${payload}`, {
          headers: this.headers,
        }
      );
    }
    
  }
  alterarBoleto(indentifadorFaturamento, identificadorUsuario){
    return this.http.get(
      this.apiConsultaUrl + `/api/Faturamento/AlterarFormaPagamento?identificadorFaturamento=${indentifadorFaturamento}&identificadorUsuario=${identificadorUsuario}&identificadorNovaFormaPagamento=${1}`, {
        headers: this.headers,
      }
    );
  }
  alterarPixEstatico(indentifadorFaturamento, identificadorUsuario){
    return this.http.get(
      this.apiConsultaUrl + `/api/Faturamento/AlterarFormaPagamento?identificadorFaturamento=${indentifadorFaturamento}&identificadorUsuario=${identificadorUsuario}&identificadorNovaFormaPagamento=${14}`, {
        headers: this.headers,
      }
    );
  }

  gerarBoleto(indentifadorFaturamento, identificadorUsuario){
    return this.http.get(
      this.apiConsultaUrl + `/api/banco/gerarboleto?identificadorFaturamento=${indentifadorFaturamento}&identificadorUsuario=${identificadorUsuario}`, {
        headers: this.headers,
      }
    );
  }
  gerarPixEstatico(indentifadorFaturamento, identificadorUsuario){
    return this.http.get(
      this.apiConsultaUrl + `/api/banco/GerarPixEstatico?identificadorFaturamento=${indentifadorFaturamento}&identificadorUsuario=${identificadorUsuario}`, {
        headers: this.headers,
      }
    );
  }
}
