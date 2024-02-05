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
      this.apiUrl +
        `/ChecklistDocumento/tiposDocumento?tipoPessoaId=${tipoPessoaId}&terminalId=${terminalId}&tipoAtendimentoId=${tipoAtendimentoId}`,
      { headers: this.headers }
    );
  }

  insertAtendimento(atendimento) {
    return this.http.post(this.apiUrl + `/Atendimento`, atendimento, {
      headers: this.headers,
    });
  }
}
