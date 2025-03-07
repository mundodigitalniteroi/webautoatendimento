import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthState } from 'src/app/state/auth/auth.state';
import { Store } from '@ngxs/store';
import { env } from 'process';
import { Observable } from 'rxjs';
import { PlanoParcelamento } from 'src/app/interfaces/consulta.interface';

@Injectable({
  providedIn: 'root',
})
export class ConsultaDebitoService {
  private apiConsultaUrl = environment.urlApiDP;
  private apiDebitourl = environment.urlApiAtendimento;
  private apiWebziPay = environment.urlApiWebziPay;
  headers: HttpHeaders;
  constructor(public http: HttpClient, private store: Store) {
    this.store.select(AuthState.token).subscribe((t) => {
      this.headers = new HttpHeaders({
        Authorization: `Bearer ${t}`,
      });
    });
  }

  guiaLiberacao(identificadorProcesso) {
    return this.http.get(
      this.apiConsultaUrl + `/api/Liberacao/GuiaAutorizacaoRetiradaVeiculo?IdentificadorProcesso=${identificadorProcesso}&identificadorUsuario=1`,
      {
        headers: this.headers,
      }
    );
  }

  consultaVeiculo(identificadoFaturamento) {
    return this.http.get(this.apiConsultaUrl + `/api/Faturamento/Consultar?identificadorFaturamento=${identificadoFaturamento}`, {
      headers: this.headers,
    });
  }

  simularVeiculo(payload) {
    return this.http.post(this.apiConsultaUrl + `/api/Faturamento/Simulacao`, payload, {
      headers: this.headers,
    });
  }

  consultaDebito(payload) {
    if (payload.length == 7) {
      return this.http.get(this.apiDebitourl + `/atendimento/consulta?placa=${payload}`, {
        headers: this.headers,
      });
    } else {
      return this.http.get(this.apiDebitourl + `/atendimento/consulta?protocolo=${payload}`, {
        headers: this.headers,
      });
    }
  }
  alterarBoleto(indentifadorFaturamento, identificadorUsuario) {
    return this.http.get(
      this.apiConsultaUrl +
        `/api/Faturamento/AlterarFormaPagamento?identificadorFaturamento=${indentifadorFaturamento}&identificadorUsuario=${identificadorUsuario}&identificadorNovaFormaPagamento=${1}`,
      {
        headers: this.headers,
      }
    );
  }

  consultarParcelamento(valor:number,op:number) : Observable<PlanoParcelamento[]>{
    return this.http.get<PlanoParcelamento[]>(this.apiWebziPay+`/api/Simulacao?valor=${valor}&op=${op}`,{
      headers: {
        'Authorization':`Bearer ${token}` 
      }
    })
  }

  alterarPixEstatico(indentifadorFaturamento, identificadorUsuario) {
    return this.http.get(
      this.apiConsultaUrl +
        `/api/Faturamento/AlterarFormaPagamento?identificadorFaturamento=${indentifadorFaturamento}&identificadorUsuario=${identificadorUsuario}&identificadorNovaFormaPagamento=${14}`,
      {
        headers: this.headers,
      }
    );
  }

  alterarPixDinamico(indentifadorFaturamento, identificadorUsuario) {
    return this.http.get(
      this.apiConsultaUrl +
        `/api/Faturamento/AlterarFormaPagamento?identificadorFaturamento=${indentifadorFaturamento}&identificadorUsuario=${identificadorUsuario}&identificadorNovaFormaPagamento=${17}`,
      {
        headers: this.headers,
      }
    );
  }

  gerarBoleto(indentifadorFaturamento, identificadorUsuario) {
    return this.http.get(
      this.apiConsultaUrl + `/api/banco/gerarboleto?identificadorFaturamento=${indentifadorFaturamento}&identificadorUsuario=${identificadorUsuario}`,
      {
        headers: this.headers,
      }
    );
  }
  gerarPixEstatico(indentifadorFaturamento, identificadorUsuario) {
    return this.http.get(
      this.apiConsultaUrl +
        `/api/banco/GerarPixEstatico?identificadorFaturamento=${indentifadorFaturamento}&identificadorUsuario=${identificadorUsuario}`,
      {
        headers: this.headers,
      }
    );
  }

  gerarPixDinamico(indentifadorFaturamento, identificadorUsuario) {
    return this.http.get(
      this.apiConsultaUrl +
        `/api/banco/GerarPixDinamico?identificadorFaturamento=${indentifadorFaturamento}&identificadorUsuario=${identificadorUsuario}`,
      {
        headers: this.headers,
      }
    );
  }

  consultarPixDinamico(indentifadorFaturamento, identificadorUsuario) {
    return this.http.get(
      this.apiConsultaUrl +
        `/api/banco/ConsultarPixDinamico?identificadorFaturamento=${indentifadorFaturamento}&identificadorUsuario=${identificadorUsuario}`,
      {
        headers: this.headers,
      }
    );
  }

  confirmarPagamento(indentifadorFaturamento, identificadorUsuario) {
    const body = {
      identificadorUsuario: identificadorUsuario,
      identificadorFaturamento: indentifadorFaturamento,
    };
    return this.http.post(this.apiConsultaUrl + `/api/pagamento/ConfirmarPagamento`, body, {
      headers: this.headers,
    });
  }
}
