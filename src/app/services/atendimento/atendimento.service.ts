import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { AuthState } from 'src/app/state/auth/auth.state';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AtendimentoService {
  private apiUrl = environment.urlApiAtendimento;
  emitInformations: Subject<any> = new Subject<any>();
  closeMenu: Subject<any> = new Subject<any>();
  headers: HttpHeaders;
  constructor(public http: HttpClient, private store: Store) {
    this.store.select(AuthState.token).subscribe((t) => {
      this.headers = new HttpHeaders({
        Authorization: `Bearer ${t}`,
      });
    });
  }

  getTipoPessoas() {
    return this.http.get(this.apiUrl + `/TipoPessoa`, {
      headers: this.headers,
    });
  }

  getTipoAtendimento() {
    return this.http.get(this.apiUrl + `/TipoAtendimento`, {
      headers: this.headers,
    });
  }

  getTiposDocumentos(tipoPessoaId, terminalId, tipoAtendimentoId) {
    return this.http.get(
      this.apiUrl + `/ChecklistDocumento/tiposDocumento?tipoPessoaId=${tipoPessoaId}&terminalId=${terminalId}&tipoAtendimentoId=${tipoAtendimentoId}`,
      { headers: this.headers }
    );
  }

  insertAtendimento(atendimento) {
    return this.http.post(this.apiUrl + `/Atendimento`, atendimento, {
      headers: this.headers,
    });
  }

  gerarProtocoloAtendimento() {
    return this.http.post(this.apiUrl + `/Atendimento/GerarProtocolo`, null, {
      headers: this.headers,
    });
  }

  uploadArquivo(arquivo, acesso = 'PUBLICO' || 'PRIVADO', diretorio = undefined) {
    const formData = new FormData();
    formData.append('arquivo', arquivo);

    if (acesso) {
      formData.append('acesso', acesso);
    }

    if (diretorio) {
      formData.append('diretorio', diretorio);
    }
    this.headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(this.apiUrl + `/arquivo/upload`, formData, {
      headers: this.headers,
    });
  }
}
