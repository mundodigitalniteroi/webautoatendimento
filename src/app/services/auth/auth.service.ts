import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://api.atendimento.gestordepatios.app.br/terminal/';
  constructor(public http: HttpClient) {}

  login(codigo: string, senha: string) {
    const body = {
      codigo: codigo,
      senha: senha,
    };
    return this.http.post(this.apiUrl + 'login', body);
  }
}
