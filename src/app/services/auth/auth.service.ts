import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.urlApiAtendimento;
  constructor(public http: HttpClient) {}

  login(codigo: string, senha: string) {
    const body = {
      codigo: codigo,
      senha: senha,
    };
    return this.http.post(this.apiUrl + '/terminal/login', body);
  }
}
